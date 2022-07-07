import React, {useContext, useEffect, useState} from 'react'
import Login from './Login'
import Logout from './Logout'
import {AppContext} from '../App'

// https://levelup.gitconnected.com/google-sheets-api-tutorial-with-javascript-588f581aa1d9 access token expires every 24 hrs (can use something else?)
// maybe? https://blog.stephsmith.io/tutorial-google-sheets-api-node-js/
// Just for the oauth stuff (npm package not working with webpack 5) https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=oauth
// ? https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
// Google OAuth 2.0 Login for React in 5 minutes https://www.youtube.com/watch?v=HtJKUQXmtok

const BNAMES_ID = '15488X0n6WmgSafYLz58oVa8pTSY1HyJKjNhf-Jaonus'
const ACCESS_TOKEN =
  'ya29.A0ARrdaM9HXoeGeXlecBSB5njPg67dEvy5wJaz4GDPmQjBFMMRg6oOKb2llG_so5ul4jwcpmAWDQ1H9AvJNr_JQ_RYlQMi8WxhlJ6hvvtVdi6ruXUZ85OG8zp68glaQjSNEVNPzndia0Rmxfjw0qww_BTx4lRO'

const clientId =
  '482074946800-se9e3d3slh5nv11q6j75h4tb3co577jg.apps.googleusercontent.com'

const requestsInfo = {
  requests: [
    {
      // updateCells: {},
      appendCells: {
        // Writes to first empty row
        sheetId: 0,
        rows: [
          {
            values: [{userEnteredValue: {stringValue: 'test2'}}],
          },
        ],
        fields: '*',
      },
    },
  ],
}

const A = () => {
  return (
    // <div className="inline-block px-1 border border-gray-500 rounded-lg ">
    <button className="inline-block px-1 border border-gray-500 rounded-lg">
      Login
    </button>
    // </div>
  )
}

const B = () => {
  return <div className="rounded-full">Logout</div>
}

function GSheetInfo(props) {
  const {contextDict, dispatchUpdateEvent} = useContext(AppContext)
  console.log('contextDict', contextDict)

  const {loginName} = contextDict

  return (
    <div className="flex justify-end text-sm">
      {loginName ? <Logout /> : <Login />}
    </div>
  )
}

export default GSheetInfo
