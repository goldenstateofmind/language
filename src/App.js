import React, {useEffect, useState} from 'react'
import {BsCalendar3, BsCalendar3Event} from 'react-icons/bs'
import {FaVolumeUp} from 'react-icons/fa'
import thumbsDownSVG from './assets/thumbs-down-crop.svg'
import thumbsUpSVG from './assets/thumbs-up-crop.svg'
import AddName from './components/AddName'
import AutoCompleteSearch from './components/AutoCompleteSearch'
import Deck from './components/Deck'
import StatsPage from './components/StatsPage'
import {
  client_email,
  LEFT_KEY,
  private_key,
  RIGHT_KEY,
  SHEET_ID,
  SHEET_TITLE,
} from './const'
import styles from './styles.module.css'
import {dateStringYYYYMMDD, textToSpeech} from './utils/utils'
const {GoogleSpreadsheet} = require('google-spreadsheet')

// import sentences from './assets/en-es.10k.json'
import sentences from './assets/en-es.10k.a.json'
console.log('sentences', sentences)

/* 
ieFlat = ie.map(x => (x.split(',').map(x => x.trim()))).flat()
a = us.filter(x => !ieFlat.includes(x))

git push https://<User Name>:<Token>@github.com/<User Name>/<Your Repository>.git

git push https://goldenstateofmind:ghp_...qs6@github.com/goldenstateofmind/names.git

correct	incorrect	dates

*/

async function asyncAuth() {
  const doc = new GoogleSpreadsheet(SHEET_ID)
  console.log('doc', doc)

  await doc.useServiceAccountAuth({client_email, private_key})
  await doc.loadInfo() // loads document properties and worksheets

  const sheet = doc.sheetsByTitle[SHEET_TITLE]
  const rows = await sheet.getRows() // can pass in { limit, offset }
  return {sheet, rows}
}

const propsDict = {
  // Pronounced: 'Phonetic',
  Meaning: 'Meaning',
  Origin: 'Origin',
  Nickname: 'Nickname',
  Popularity: 'Rank IE',
  Quantile: 'percentile',
  Notable: 'Notable',
  // '...': 'wikiExtractHtml',
}

export const AppContext = React.createContext({
  // givenNames,
  // names,
  propsDict,
  // testKeys,
})

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isSearchUnlisted, setIsSearchUnlisted] = useState(false)
  const [rowsState, setRowsState] = useState([])
  const [rowsUnfiltered, setRowsUnfiltered] = useState([])
  const [searchText, setSearchText] = useState('')
  const [sheetInfo, setSheetInfo] = useState({})
  const [sheetState, setSheetState] = useState({})
  const [showStatsPage, setShowStatsPage] = useState(false)

  const [isShowingFront, setIsShowingFront] = useState(true)
  const [previousItems, setPreviousItems] = useState([])
  // const [previousItems, setPreviousItems] = useState([['', '']])

  const [allTimeCount, setAllTimeCount] = useState(0)
  const [todayCount, setTodayCount] = useState(0)
  const [flipped, setFlipped] = useState(0)

  const TODAY_YYYYMMDD = dateStringYYYYMMDD()

  const cardKey = 'en'
  const reverseKey = 'es_auto'
  const names = Object.keys(sheetInfo) ?? []
  const activeName = names?.[activeIndex]
  const cardInfo = sheetInfo[names[activeIndex]]
  const lastIndex = Object.keys(sheetInfo).length - 1
  const activeSentences = sentences
    .filter(({en, es}) =>
      en
        .split(' ')
        .map((x) => x.toLowerCase())
        .includes(activeName)
    )
    .slice(0, 2)

  const cardBody = activeSentences.map((x) => {
    const front = x.en
      .split(' ')
      .map((x) =>
        x.toLowerCase() === activeName ? ['<em>', x, '</em>'].join('') : x
      )
      .join(' ')
    const back = (
      <div>
        {x.es}{' '}
        <button className="mx-2" onClick={() => textToSpeech({text: x.es})}>
          <FaVolumeUp size={'0.75rem'} color="#333" />
        </button>
      </div>
    )
    console.log('back', back)
    return [`<li>${front}</li>`, back]
    // return [`<li>${front}</li>`, `<li>${back}</li>`]
  })
  const cardBodyFront = cardBody.map((x) => x[0]).join('')
  const cardBodyBack = cardBody.map((x, xi) => <div key={x}>{x[1]}</div>)
  console.log('cardBodyBack', cardBodyBack)
  // const cardBodyBack = cardBody.map((x) => x[1]).join('')

  useEffect(() => {
    asyncAuth().then(({sheet, rows}) => {
      // TOTAL_CARDS = rows.length
      // console.log(' --- rows', rows)

      setRowsState(rows)
      setSheetState(sheet)
      const tempInfo = {}
      rows.forEach((row) => {
        tempInfo[row[cardKey]] = {...row}
      })
      const allTimeIncorrect = rows.reduce((acc, cv) => {
        return acc + Number(cv.incorrect)
      }, 0)
      const allTimeCorrect = rows.reduce((acc, cv) => {
        return acc + Number(cv.incorrect)
      }, 0)
      const dateItems = rows
        .map((row) => row['dates'].split(','))
        .flat()
        .filter((x) => x.includes(TODAY_YYYYMMDD))

      setTodayCount(dateItems.length)
      setSheetInfo(tempInfo)
      setAllTimeCount(allTimeIncorrect + allTimeCorrect)
      setContextDict((ps) => {
        return {...ps, givenNames: {...sheetInfo}}
      })
    })
  }, [])

  const flip = () => {
    setFlipped((ps) => !ps)
    setTimeout(() => {
      setFlipped((ps) => !ps)
    }, 800)
  }

  const [contextDict, setContextDict] = useState({
    // givenNames,
    names,
    propsDict,
    // testKeys,
    activeIndex,
    activeName,
    cardInfo,
    userName: '',
  })

  const updateSheetValues = async ({key, value}) => {
    console.log('value', value)
    console.log('key', key)
    // updateSheetValues({key: 'the', value: 'correct'})
    const row = rowsState.find((x) => x[cardKey] === key)
    row[value] = Number(row[value]) + 1 // coerce null or '' to 0
    row.dates += ',' + TODAY_YYYYMMDD
    console.log('row[value]', row[value])
    console.log('row', row)
    const a = await row.save()
  }

  const addSheetItem = async ({
    name,
    meaning = '',
    nicknames = '',
    origin = '',
    yesOrNo,
  }) => {
    const row = {
      Name: name,
      Meaning: meaning,
      Nickname: nicknames,
      Origin: origin,
    }
    // const a = await sheetState.addRow(row)
    sheetState.addRow(row)
    setSearchText('')
  }

  const dispatchUpdateEvent = (actionType, payload) => {
    const {key, prop, value, loginName, access_token} = payload
    // value will be LEFT_KEY or RIGHT_KEY ('incorrect', 'correct')
    // key is the en word: "the"

    switch (actionType) {
      case 'UPDATE':
        updateSheetValues({key, value})
        setAllTimeCount((ps) => ps + 1)
        setTodayCount((ps) => ps + 1)
        console.log('lastIndex', lastIndex)
        console.log('cardInfo', cardInfo)
        console.log('previousItems', previousItems)
        setPreviousItems((ps) => {
          const pair = [
            cardInfo[cardKey],
            <span>
              {cardInfo[reverseKey]}
              <button
                className="mx-2"
                onClick={() => textToSpeech({text: cardInfo[reverseKey]})}
              >
                <FaVolumeUp size={'0.75rem'} color="#333" />
              </button>
            </span>,
          ]
          console.log('pair', pair)
          const cv = [pair, ...ps]
          console.log('cv', cv)
          return cv
        })
        setActiveIndex(Math.floor(Math.random() * names.length))
        setIsShowingFront(true)
        return

      default:
        return
    }
  }

  const handleSearch = ({isNotListed, searchText}) => {
    // If isNotListed, show the addItem button
    setIsSearchUnlisted(isNotListed)
    setSearchText(searchText)
  }

  const handleSearchSelect = () => {
    setSearchText('')
  }

  const SearchAndDeck = (
    <>
      <div id="Search" className="flex items-start justify-center m-1 mb-4">
        <AutoCompleteSearch
          handleSearch={handleSearch}
          handleSearchSelect={handleSearchSelect}
          value={{value: searchText}}
          options={names
            .slice(0)
            .sort()
            .map((x) => ({
              value: x,
            }))}
        />
        {isSearchUnlisted && searchText?.length ? (
          <AddName
            addSheetItem={addSheetItem}
            handleSearchSelect={handleSearchSelect}
            name={searchText}
          />
        ) : (
          <></>
        )}
      </div>

      <div
        id="App"
        className={`flex flex-col overflow-hidden pb-4 h-full items-center justify-center ${styles.container}`}
      >
        {/* <GoogleButton /> */}
        <div
          id="previous-items"
          className="flex flex-col flex-1 w-full overflow-auto text-lg"
        >
          {previousItems.length > 0
            ? previousItems.map(([x, y]) => (
                <div className="flex mx-4 justify-evenly">
                  <span className="flex justify-end mx-2 flex-one">{x}</span>
                  <span className="text-gray-400">=</span>
                  <span className="mx-2 flex-one">{y}</span>
                </div>
              ))
            : null}
        </div>
        <div
          id="Deck-wrapper"
          className="flex items-end justify-between flex-auto w-full h-full overflow-hidden flex-one"
        >
          <div id="thumbs-down" className="w-12 h-12 m-1">
            <img
              src={thumbsDownSVG}
              onClick={() =>
                dispatchUpdateEvent('UPDATE', {
                  key: cardInfo[cardKey],
                  value: LEFT_KEY,
                })
              }
            />
          </div>
          {cardInfo && (
            <Deck
              cardInfo={cardInfo}
              cardKey={cardKey}
              reverseKey={reverseKey}
              cardBodyFront={cardBodyFront}
              cardBodyBack={cardBodyBack}
              setIsShowingFront={setIsShowingFront}
              isShowingFront={isShowingFront}
            />
          )}
          <div id="thumbs-up" className="w-12 h-12 m-1">
            <img
              src={thumbsUpSVG}
              onClick={() =>
                dispatchUpdateEvent('UPDATE', {
                  key: cardInfo[cardKey],
                  value: RIGHT_KEY,
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <AppContext.Provider value={{contextDict, dispatchUpdateEvent}}>
      <div
        id="outer"
        className="flex flex-col justify-between flex-auto h-full grow"
      >
        <header className="sticky top-0 text-center bg-gray-100">
          <div id="login-wrapper" className="m-2">
            {/* <GSheetInfo /> */}
            <div className="flex justify-end p-2 text-sm">
              <button onClick={() => setShowStatsPage((ps) => !ps)}>i</button>
            </div>
          </div>
        </header>

        <main className="flex flex-col flex-auto overflow-auto grow">
          {/* <main className="flex-1 overflow-auto"> */}
          {/* <div><ListToWikiExtracts /></div> */}

          {showStatsPage ? (
            <StatsPage rowsUnfiltered={rowsUnfiltered} />
          ) : (
            SearchAndDeck
          )}
        </main>

        <footer className="sticky bottom-0 p-2 bg-gray-100">
          <div
            id="counter-wrapper"
            className="flex items-center self-end w-full stats justify-evenly"
          >
            <div className="flex items-center">
              <BsCalendar3 />
              <span className="p-1 text-xs">{allTimeCount}</span>
            </div>

            {/* <div className="flex items-center">
              <div className="flex text-xs"></div>
            </div> */}

            <div className="flex items-center">
              <BsCalendar3Event />
              <span className="p-1 text-xs">{todayCount}</span>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  )
}
