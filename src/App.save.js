import React, {useContext, useState} from 'react'
import {FaBan, FaRegStar} from 'react-icons/fa'
import givenNamesAll from './assets/givenNames.wiki.json'
import Deck from './components/Deck'
import GSheetInfo from './components/GSheetInfo'
import styles from './styles.module.css'
import {quantileRank} from 'simple-statistics'

const countItemsWhere = (obj, prop, val) => {
  const counts = Object.values(obj).filter((x) => x[prop] === val)
  return counts.length
}

const allBirths = Object.values(givenNamesAll).reduce((acc, cv) => {
  return acc + cv.NumberBirths
}, 0)

const numberBirths = Object.values(givenNamesAll).map((x) => x.NumberBirths)

// const names = Object.keys(givenNamesAll).sort()
const names = Object.keys(givenNamesAll)
const testKeys = names.slice(0)
// const testKeys = names.slice(0, 10)

const givenNames = testKeys.reduce((acc, cv) => {
  acc[cv] = givenNamesAll[cv]
  acc[cv].name = cv
  // const floatPercent = (100 * acc[cv].NumberBirths) / allBirths
  const floatPercent = 100 * quantileRank(numberBirths, acc[cv].NumberBirths)
  acc[cv].percentile = 101 - Math.round(floatPercent)
  acc[cv].percentile += '%'

  return acc
}, {})

const activeIndex = 0
const activeName = names[activeIndex]
const cardInfo = givenNames[activeName]

const propsDict = {
  Pronounced: 'Phonetic',
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

const BNAMES_ID = '15488X0n6WmgSafYLz58oVa8pTSY1HyJKjNhf-Jaonus'
// const ACCESS_TOKEN =
//   'ya29.A0ARrdaM9HXoeGeXlecBSB5njPg67dEvy5wJaz4GDPmQjBFMMRg6oOKb2llG_so5ul4jwcpmAWDQ1H9AvJNr_JQ_RYlQMi8WxhlJ6hvvtVdi6ruXUZ85OG8zp68glaQjSNEVNPzndia0Rmxfjw0qww_BTx4lRO'

const ACCESS_TOKEN =
  'ya29.a0ARrdaM8XjPb4ujH0Rlc4fdXXPgwbXh87Vb2ofJzejalqNVwd3afam8FwEZ5fZ2erPCwRmTEaxa5Vbk3iZx1E03YFTq - iJ_GMGhCc6OZYb - 3V4STb0mlTphDPCnzVxjgd2dkxIvcVJ_m__mz0wolPNBNaYaJ88g'

const clientId =
  '482074946800-se9e3d3slh5nv11q6j75h4tb3co577jg.apps.googleusercontent.com'
const apiKey = 'AIzaSyAJSGn8b8hn1nbiN4mhq_dgUk4WgxR03P4'

const requestsInfo = (aValue, bValue) => ({
  requests: [
    {
      // updateCells: {},
      appendCells: {
        // Writes to first empty row
        sheetId: 0,
        rows: [
          {
            values: [
              {userEnteredValue: {stringValue: aValue}},
              {userEnteredValue: {stringValue: bValue}},
            ],
          },
        ],
        fields: '*',
      },
    },
  ],
})

const updateSheetValues = (aValue, bValue, access_token) => {
  console.log(' - updateSheetValues - access_token', access_token)
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${BNAMES_ID}:batchUpdate?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(requestsInfo(aValue, bValue)),
    }
  )
}

export const AppContext = React.createContext({
  givenNames,
  names,
  propsDict,
  testKeys,
})

// function reducer(state, action) {
//   switch (action.type) {
//     case 'ADD':
//       return [...state, action.item]
//     case 'NEXT':
//       return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
//     default:
//       throw new Error()
//   }
// }

export default function App() {
  const [ai, setAi] = useState(0)
  const [cardInfo, setCardInfo] = useState(givenNames[names[ai]])

  const [contextDict, setContextDict] = useState({
    givenNames,
    names,
    propsDict,
    testKeys,
    activeIndex,
    activeName,
    cardInfo,
  })

  // function handleAuthResult(authResult) {
  //   console.log('inside handleAuthResult function')
  //   console.log('authResult', authResult)
  //   console.log(gapi.auth.getToken())
  //   gapi.auth.authorize(
  //     {
  //       client_id: clientId,
  //       scope: 'https://www.googleapis.com/auth/spreadsheets',
  //       immediate: false,
  //     },
  //     handleAuthResult
  //   )
  // }

  // function gapiCallback() {
  //   gapi.client
  //     .init({
  //       clientId,
  //       apiKey,
  //       scope: 'https://www.googleapis.com/auth/spreadsheets',
  //     })
  //     .then(() => {
  //       const info = gapi.auth2.getAuthInstance().isSignedIn.get()
  //       gapi.client.setApiKey(apiKey)
  //       gapi.auth.authorize(
  //         {
  //           client_id: clientId,
  //           scope: 'https://www.googleapis.com/auth/spreadsheets',
  //           immediate: true,
  //         },
  //         handleAuthResult
  //       )
  //       // gapi.client.setToken({access_token: ACCESS_TOKEN})
  //     })
  // }

  // gapi.load('client:auth2', gapiCallback)

  const dispatchUpdateEvent = (actionType, payload) => {
    const {key, prop, value, loginName, access_token} = payload
    console.log('payload', payload)
    const newDict = {
      ...givenNames,
      [key]: {
        ...givenNames[key],
        [prop]: value,
      },
    }

    switch (actionType) {
      case 'LOGIN':
        setContextDict((ps) => {
          console.log('ps', ps)
          return {...ps, access_token, loginName}
        })
        return

      case 'UPDATE':
        console.log('AppContext', AppContext)
        console.log('AppContext', AppContext.current)
        // const {contextDict, dispatchUpdateEvent} = useContext(AppContext)
        updateSheetValues('foo', 'bar', access_token)
        setContextDict((ps) => {
          setAi((ps) => ps + 1)

          const nextGN = {
            ...ps.givenNames,
            [key]: {
              ...ps.givenNames[key],
              [prop]: value,
            },
          }
          const nextIndex = ps.activeIndex + 1
          const nextName = names[nextIndex]

          setCardInfo((ps) => {
            return givenNames[nextName]
          })

          const nextContext = {
            ...ps,
            givenNames: {...nextGN},
            activeIndex: nextIndex,
            activeName: nextName,
            cardInfo: givenNames[nextName],
          }
          return nextContext
        })
        return

      default:
        return
    }
  }

  const remaining = Object.values(contextDict.givenNames).filter(
    (x) => x['Voter 1'] === undefined
  ).length

  return (
    <AppContext.Provider value={{contextDict, dispatchUpdateEvent}}>
      <div className="flex flex-col h-screen">
        <header>
          <div id="login-wrapper" className="m-4">
            <GSheetInfo />
          </div>
        </header>
        <main className="grow">
          <div
            id="App"
            className={`flex overflow-hidden h-full items-center justify-center ${styles.container}`}
          >
            <div id="Deck-wrapper">
              <Deck cardInfo={cardInfo} />
              {/* <Deck cardInfo={cardInfo} handler={handler} /> */}
            </div>
          </div>
        </main>
        <footer>
          <div
            id="counter-wrapper"
            className="flex items-center self-end w-full h-24 stats justify-evenly"
          >
            {/* Viewed: {i} */}
            {/* Remaining: {names.length - i} */}
            <div className="flex items-center">
              <FaRegStar />{' '}
              <span className="p-1 text-xs">
                {countItemsWhere(contextDict.givenNames, 'Voter 1', 'YES')}
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex w-6 deck-of-cards">
                <div className="absolute w-4 h-5 translate-x-2 bg-white rounded icon-border"></div>
                <div className="absolute w-4 h-5 translate-x-1 bg-white rounded icon-border"></div>
                <div className="z-10 w-4 h-5 bg-white rounded icon-border"></div>
              </div>
              <span className="p-1 text-xs">
                {remaining}
                {/* {Object.keys(contextDict.givenNames).length} */}
              </span>
            </div>

            <div className="flex items-center">
              <FaBan />
              <span className="p-1 text-xs">
                {countItemsWhere(contextDict.givenNames, 'Voter 1', 'NO')}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  )
}
