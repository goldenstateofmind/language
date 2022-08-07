import React, {useEffect, useState} from 'react'
import {BsCalendar3, BsCalendar3Event} from 'react-icons/bs'
import {FaVolumeUp} from 'react-icons/fa'
import {IoVolumeMuteOutline, IoVolumeHighOutline} from 'react-icons/io5'
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

/* 
ieFlat = ie.map(x => (x.split(',').map(x => x.trim()))).flat()
a = us.filter(x => !ieFlat.includes(x))

git push https://<User Name>:<Token>@github.com/<User Name>/<Your Repository>.git

git push https://goldenstateofmind:ghp_...qs6@github.com/goldenstateofmind/names.git

correct	incorrect	dates

*/
const rando = (arr) => Math.floor(Math.random() * arr.length)

async function asyncAuth() {
  const doc = new GoogleSpreadsheet(SHEET_ID)
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
  const [rowsState, setRowsState] = useState([])
  const [rowsUnfiltered, setRowsUnfiltered] = useState([])
  const [sheetInfo, setSheetInfo] = useState({})
  const [sheetState, setSheetState] = useState({})
  const [showStatsPage, setShowStatsPage] = useState(false)
  const [isAudioOn, setIsAudioOn] = useState(false)

  const [isShowingFront, setIsShowingFront] = useState(true)
  const [previousItems, setPreviousItems] = useState([])

  const [allTimeCount, setAllTimeCount] = useState(0)
  const [todayCount, setTodayCount] = useState(0)
  const [flipped, setFlipped] = useState(0)

  const TODAY_YYYYMMDD = dateStringYYYYMMDD()

  const cardKey = 'en'
  const reverseKey = 'es_auto'
  const names = Object.keys(sheetInfo) ?? []
  const activeName = names?.[activeIndex]
  const cardInfo = sheetInfo[names[activeIndex]]
  if (cardInfo?.[reverseKey]) {
    cardInfo[reverseKey] = cardInfo[reverseKey].toLowerCase()
  }
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
    return [`<li>${front}</li>`, back]
    // return [`<li>${front}</li>`, `<li>${back}</li>`]
  })
  const cardBodyFront = cardBody.map((x) => x[0]).join('')
  const cardBodyBack = cardBody.map((x, xi) => <div key={x}>{x[1]}</div>)
  // const cardBodyBack = cardBody.map((x) => x[1]).join('')

  useEffect(() => {
    asyncAuth().then(({sheet, rows}) => {
      rows = rows.filter((x) => Number(x.Order) > 0 && Number(x.Order) <= 1)
      console.log(
        'rows',
        rows.map((x) => x.Order)
      )
      setRowsState(rows)
      setSheetState(sheet)
      setActiveIndex(rando(rows))
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
    const row = rowsState.find((x) => x[cardKey] === key)
    row[value] = Number(row[value]) + 1 // coerce null or '' to 0
    row.dates += ',' + TODAY_YYYYMMDD
    const a = await row.save()
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
        setPreviousItems((ps) => {
          const pair = [
            cardInfo[cardKey],
            <span className="inline-flex align-middle">
              {cardInfo[reverseKey]}
              <button
                className="mx-2"
                onClick={() => textToSpeech({text: cardInfo[reverseKey]})}
              >
                <FaVolumeUp size={'0.95rem'} color="#333" />
              </button>
            </span>,
          ]
          const cv = [pair, ...ps]
          return cv
        })
        setActiveIndex(rando(names))
        setIsShowingFront(true)
        return

      default:
        return
    }
  }

  const calendarInfo = [0, 0, 0, 100, 134, 200, 43]
  const DAILY_GOAL = 100

  const SearchAndDeck = (
    <>
      <div
        id="progress-calendar"
        className="flex items-start justify-center m-1 mb-4"
      >
        {calendarInfo.map((x, xi) => {
          let boxContent = ''
          if (x >= DAILY_GOAL) {
            boxContent = (
              <div
                className="checkmark draw"
                style={{display: 'block', '--order': xi}}
              ></div>
            )
          }
          return (
            <div className="relative flex items-center justify-center w-12 h-12 m-1 border">
              {boxContent}
            </div>
          )
        })}
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
                <div className="flex mx-4 align-middle">
                  <span className="flex justify-end w-1/3 mx-2">{x}</span>
                  <span className="w-2/3">
                    <span className="text-gray-400 ">=</span>
                    <span className="inline-flex items-center mx-2">{y}</span>
                  </span>
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
              cardBodyBack={cardBodyBack}
              cardBodyFront={cardBodyFront}
              cardInfo={cardInfo}
              cardKey={cardKey}
              isAudioOn={isAudioOn}
              isShowingFront={isShowingFront}
              reverseKey={reverseKey}
              setIsShowingFront={setIsShowingFront}
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
            <div id="audio-wrapper" className="flex justify-end p-2 text-lg">
              <button onClick={() => setIsAudioOn((ps) => !ps)}>
                {isAudioOn ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
              </button>
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
