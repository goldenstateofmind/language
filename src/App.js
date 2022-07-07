import React, {useContext, useEffect, useState} from 'react'
import {FaBan, FaRegStar} from 'react-icons/fa'
// import givenNamesAll from './assets/givenNames.wiki.json'
import Deck from './components/Deck'
import styles from './styles.module.css'
import {quantileRank} from 'simple-statistics'
import {client_email, private_key, SHEET_ID} from './const'
import GSheetInfo from './components/GSheetInfo'
import GoogleButton from './components/GoogleButton'
import RadioButtonGroup from './components/RadioButtonGroup'
import AddItem from './components/AddItem'
const {GoogleSpreadsheet} = require('google-spreadsheet')
import AutoCompleteSearch from './components/AutoCompleteSearch'
import thumbsDownSVG from './assets/thumbs-down-crop.svg'
import thumbsUpSVG from './assets/thumbs-up-crop.svg'

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

const countItemsWhere = (obj, prop, val) => {
  const counts = Object.values(obj).filter((x) => x[prop] === val)
  return counts.length
}

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

export const AppContext = React.createContext({
  // givenNames,
  // names,
  propsDict,
  // testKeys,
})

const sheetInfo = {}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sheetInfo, setSheetInfo] = useState({})
  const [userName, setUserName] = useState(userNames[1])
  const [rowsState, setRowsState] = useState([])
  const [sheetState, setSheetState] = useState([])

  const names = Object.keys(sheetInfo) ?? []
  const activeName = names?.[activeIndex]
  const numberBirths = Object.values(sheetInfo).map((x) => x.NumberBirths)
  const cardInfo = sheetInfo[names[activeIndex]]

  useEffect(() => {
    asyncAuth().then(({sheet, rows}) => {
      const newRows = rows.filter((x) => x[userName] === '')
      setRowsState(newRows)
      setSheetState(sheet)
      const tempInfo = {}
      newRows.forEach((row) => {
        tempInfo[row.Name] = {...row}
      })
      setSheetInfo(tempInfo)
      setContextDict((ps) => {
        console.log('ps', ps)
        return {...ps, givenNames: {...sheetInfo}}
      })
    })

    // return () => {
    //   second (callback)
    // }
  }, [])
  // }, [Object.keys(givenNames)[0]])

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
    console.log('row', row)
    const a = await row.save()
    console.log('a', a)
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
    console.log('row', row)

    const a = await sheetState.addRow(row)
    console.log('a', a)
  }

  const handleChangeUser = (e) => {
    const {value} = e.target
    dispatchUpdateEvent('SET_USER', {userName: value})
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
        setUserName(userName)
        setContextDict((ps) => {
          console.log('ps', ps)
          return {...ps, activeUser: userName}
        })
        return

      case 'UPDATE':
        console.log('AppContext', AppContext)
        console.log('AppContext', AppContext.current)
        updateSheetValues({key, userName, value}) // undefined, Voter 1, "NO"

        setActiveIndex((ps) => ps + 1)

        // setContextDict((ps) => {
        //   setActiveIndex((ps) => ps + 1)

        // const nextGN = {
        //   ...ps.givenNames,
        //   [key]: {
        //     ...ps.givenNames[key],
        //     [prop]: value,
        //   },
        // }
        // const nextIndex = ps.activeIndex + 1
        // const nextName = names[nextIndex]

        // setCardInfo((ps) => {
        //   return givenNames[nextName]
        // })

        // const nextContext = {
        //   ...ps,
        //   givenNames: {...nextGN},
        //   activeIndex: nextIndex,
        //   activeName: nextName,
        //   cardInfo: givenNames[nextName],
        // }
        // return nextContext
        // })
        return

      default:
        return
    }
  }

  // const remaining = Object.values(contextDict.givenNames).filter(
  //   (x) => x['Voter 1'] === undefined
  // ).length

  return (
    <AppContext.Provider value={{contextDict, dispatchUpdateEvent}}>
      <div className="flex flex-col h-screen">
        <header className="text-center">
          <div id="login-wrapper" className="m-2">
            <GSheetInfo />
            <RadioButtonGroup
              options={userNames}
              value={userName}
              handleChange={handleChangeUser}
            />
          </div>
          <AddItem addSheetItem={addSheetItem} />
          <AutoCompleteSearch
            options={names
              .slice(0)
              .sort()
              .map((x) => ({
                value: x,
              }))}
          />
        </header>
        <main className="grow">
          <div
            id="App"
            className={`flex overflow-hidden h-full items-center justify-center ${styles.container}`}
          >
            {/* <GoogleButton /> */}

            <div
              id="Deck-wrapper"
              className="flex items-center justify-between w-full"
            >
              <div className="w-12 h-12 m-4">
                <img src={thumbsDownSVG} />
              </div>
              {cardInfo && <Deck cardInfo={cardInfo} />}
              <div className="w-12 h-12 m-4">
                <img src={thumbsUpSVG} />
              </div>
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
                {/* {countItemsWhere(contextDict.givenNames, 'Voter 1', 'YES')} */}
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex w-6 deck-of-cards">
                <div className="absolute w-4 h-5 translate-x-2 bg-white rounded icon-border"></div>
                <div className="absolute w-4 h-5 translate-x-1 bg-white rounded icon-border"></div>
                <div className="z-10 w-4 h-5 bg-white rounded icon-border"></div>
              </div>
              <span className="p-1 text-xs">
                {/* {remaining} */}
                {/* {Object.keys(contextDict.givenNames).length} */}
              </span>
            </div>

            <div className="flex items-center">
              <FaBan />
              <span className="p-1 text-xs">
                {/* {countItemsWhere(contextDict.givenNames, 'Voter 1', 'NO')} */}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  )
}
