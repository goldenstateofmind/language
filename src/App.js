import React, {useEffect, useState} from 'react'
import {FaBan, FaRegStar} from 'react-icons/fa'
// import givenNamesAll from './assets/givenNames.wiki.json'
import thumbsDownSVG from './assets/thumbs-down-crop.svg'
import thumbsUpSVG from './assets/thumbs-up-crop.svg'
import AddName from './components/AddName'
import AutoCompleteSearch from './components/AutoCompleteSearch'
import Deck from './components/Deck'
import GSheetInfo from './components/GSheetInfo'
import RadioButtonGroup from './components/RadioButtonGroup'
import StatsPage from './components/StatsPage'
import {client_email, private_key, SHEET_ID} from './const'
import styles from './styles.module.css'
import {getWindowLocationHashParam} from './utils/utils'
const {GoogleSpreadsheet} = require('google-spreadsheet')

/* 
ieFlat = ie.map(x => (x.split(',').map(x => x.trim()))).flat()
a = us.filter(x => !ieFlat.includes(x))

git push https://<User Name>:<Token>@github.com/<User Name>/<Your Repository>.git

git push https://goldenstateofmind:ghp_...qs6@github.com/goldenstateofmind/names.git
*/

const userNames = ['Jennifer', 'John']

async function asyncAuth() {
  const doc = new GoogleSpreadsheet(SHEET_ID)
  console.log('doc', doc)

  await doc.useServiceAccountAuth({client_email, private_key})
  await doc.loadInfo() // loads document properties and worksheets

  const sheet = doc.sheetsByTitle['votes']
  // const sheet = doc.sheetsByTitle['testReadWrite']
  // const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows() // can pass in { limit, offset }
  // console.log('rows', rows)
  return {sheet, rows}
}

const propsDict = {
  // Pronounced: 'Phonetic',
  Meaning: 'Meaning',
  Origin: 'Origin',
  Nickname: 'Nickname',
  // 'Rank Eire': 'Rank IE',
  // 'Rank USA': 'Rank US',
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
  // const [sheetState, setSheetState] = useState([])
  const [showStatsPage, setShowStatsPage] = useState(false)
  const [userName, setUserName] = useState(userNames[1])

  const [FILTERED_YES_COUNT, setFILTERED_YES_COUNT] = useState(0)
  const [FILTERED_NO_COUNT, setFILTERED_NO_COUNT] = useState(0)
  const [SESSION_YES_COUNT, setSESSION_YES_COUNT] = useState(0)
  const [SESSION_NO_COUNT, setSESSION_NO_COUNT] = useState(0)
  const [flipped, setFlipped] = useState(0)

  const names = Object.keys(sheetInfo) ?? []
  const activeName = names?.[activeIndex]
  const cardInfo = sheetInfo[names[activeIndex]]
  const lastIndex = Object.keys(sheetInfo).length - 1

  let TOTAL_CARDS = 1
  let CARDS_REMAINING = rowsState?.filter(
    (x) => x[userName] === undefined || x[userName] === ''
  ).length

  useEffect(() => {
    const user = getWindowLocationHashParam('user') || userNames[0]
    setUserName(user)
    console.log('user', user)
    asyncAuth().then(({sheet, rows}) => {
      TOTAL_CARDS = rows.length
      console.log('TOTAL_CARDS', TOTAL_CARDS)
      const rowsFiltered = rows.filter((x) => {
        return !x[user] || x[user].length === 0
      })
      CARDS_REMAINING = rowsFiltered.length

      setFILTERED_YES_COUNT(rows.filter((x) => x[user] === 'YES').length)
      console.log('FILTERED_YES_COUNT', FILTERED_YES_COUNT)
      setFILTERED_NO_COUNT(rows.filter((x) => x[user] === 'NO').length)
      console.log('FILTERED_NO_COUNT', FILTERED_NO_COUNT)

      setRowsUnfiltered(rows)
      console.log('rows', rows)
      setRowsState(rowsFiltered)
      setSheetState(sheet)
      const tempInfo = {}
      rowsFiltered.forEach((row) => {
        tempInfo[row.Name] = {...row}
      })
      setSheetInfo(tempInfo)
      setContextDict((ps) => {
        return {...ps, givenNames: {...sheetInfo}}
      })
    })

    // return () => {
    //   second (callback)
    // }
  }, [userName])
  // }, [Object.keys(givenNames)[0]])

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
    console.log(' - updateSheetValues - ', key, userName, value)
    const row = rowsState.find((x) => x.Name === key)
    row[userName] = value
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
      [userName]: yesOrNo,
      Meaning: meaning,
      Nickname: nicknames,
      Origin: origin,
      'Added By': userName,
    }
    // const a = await sheetState.addRow(row)
    sheetState.addRow(row)
    setSearchText('')
    console.log('activeIndex', activeIndex)
  }

  const dispatchUpdateEvent = (actionType, payload) => {
    const {key, prop, value, loginName, access_token} = payload

    switch (actionType) {
      case 'LOGIN':
        setContextDict((ps) => {
          console.log('ps', ps)
          return {...ps, access_token, loginName}
        })
        return

      case 'SET_USER':
        const {userName} = payload
        console.log('userName', userName)
        // Update the url?
        setUserName(userName)
        setContextDict((ps) => {
          console.log('ps', ps)
          return {...ps, activeUser: userName}
        })
        return

      case 'UPDATE':
        console.log('AppContext', AppContext)
        console.log('AppContext', AppContext.current)
        console.log('names', names)
        console.log('names 0', names[0])
        console.log('names -1', names[-1])
        updateSheetValues({key, userName, value}) // undefined, Voter 1, "NO"
        console.log('key, userName, value', key, userName, value)
        if (value === 'YES') {
          console.log('value', value)
          setSESSION_YES_COUNT((ps) => ps + 1)
          const otherUser = userNames.filter((x) => x !== userName)[0]
          console.log('otherUser', otherUser)
          console.log('rowsUnfiltered', rowsUnfiltered)
          const nameRow = rowsUnfiltered.find((x) => x.Name === key)
          console.log('nameRow', nameRow)
          if (nameRow[otherUser] === 'YES') {
            flip()
          }
        }
        if (value === 'NO') {
          setSESSION_NO_COUNT((ps) => ps + 1)
        }
        console.log('lastIndex', lastIndex)
        setActiveIndex((ps) => (ps < lastIndex ? ps + 1 : 0))
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

  const handleSearchSelect = ({value, option}) => {
    const nameIndex = names.indexOf(value)
    setSearchText('')
    // setActiveIndex(nameIndex)
  }

  const SearchAndDeck = (
    <>
      <div id="Search" className="flex items-start justify-center m-8">
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
        className={`flex overflow-hidden h-ull items-center justify-center ${styles.container}`}
      >
        {/* <GoogleButton /> */}

        <div
          id="Deck-wrapper"
          className="flex items-end justify-between w-full"
        >
          <div className="w-12 h-12 m-4">
            <img
              src={thumbsDownSVG}
              onClick={() =>
                dispatchUpdateEvent('UPDATE', {
                  key: cardInfo.Name,
                  userName,
                  value: 'NO',
                })
              }
            />
          </div>
          {cardInfo && <Deck cardInfo={cardInfo} />}
          <div className="w-12 h-12 m-4">
            <img
              src={thumbsUpSVG}
              onClick={() =>
                dispatchUpdateEvent('UPDATE', {
                  key: cardInfo.Name,
                  userName,
                  value: 'YES',
                })
              }
            />
          </div>
          {/* <Deck cardInfo={cardInfo} handler={handler} /> */}
        </div>
      </div>
    </>
  )

  return (
    <AppContext.Provider value={{contextDict, dispatchUpdateEvent}}>
      <div className="flex flex-col h-screen">
        <header className="text-center bg-gray-100">
          <div id="login-wrapper" className="m-2">
            {/* <GSheetInfo /> */}
            <div className="flex justify-end p-2 text-sm">
              <button onClick={() => setShowStatsPage((ps) => !ps)}>
                {userName}
              </button>
            </div>
            {/* <RadioButtonGroup
              options={[userName]}
              // options={userNames}
              value={userName}
              handleChange={handleChangeUser}
            /> */}
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {/* <div><ListToWikiExtracts /></div> */}

          {showStatsPage ? (
            <StatsPage
              userName={userName}
              otherUser={userNames.filter((x) => x !== userName)[0]}
              rowsUnfiltered={rowsUnfiltered}
            />
          ) : (
            SearchAndDeck
          )}
        </main>

        <footer className="bg-gray-100">
          <div
            id="counter-wrapper"
            className="flex items-center self-end w-full h-24 stats justify-evenly"
          >
            <div className="flex items-center">
              <FaBan />
              <span className="p-1 text-xs">
                {SESSION_NO_COUNT + FILTERED_NO_COUNT}
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex w-6 deck-of-cards">
                <div className="absolute w-4 h-5 translate-x-2 bg-white rounded icon-border"></div>
                <div className="absolute w-4 h-5 translate-x-1 bg-white rounded icon-border"></div>
                <div className="z-10 w-4 h-5 bg-white rounded icon-border"></div>
              </div>
              <span className="p-1 text-xs">
                {CARDS_REMAINING && CARDS_REMAINING}
              </span>
            </div>

            <div className="flex items-center">
              <div className={`flip-animation-${flipped}`}>
                <FaRegStar onClick={flip} />{' '}
              </div>
              <span className="p-1 text-xs">
                {SESSION_YES_COUNT + FILTERED_YES_COUNT}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  )
}
