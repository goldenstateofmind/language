import {useContext} from 'react'
import GoogleLogin from 'react-google-login'
import {AppContext} from '../App'
import {gapi} from 'gapi-script'

// 100199013807472835237

const clientId =
  '482074946800-se9e3d3slh5nv11q6j75h4tb3co577jg.apps.googleusercontent.com'
const apiKey = 'AIzaSyAJSGn8b8hn1nbiN4mhq_dgUk4WgxR03P4'
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets'

function Login() {
  const {contextDict, dispatchUpdateEvent} = useContext(AppContext)
  // const ref = useRef(useContext(AppContext))

  // function initClient() {
  //   gapi.client
  //     .init({
  //       apiKey,
  //       // discoveryDocs: DISCOVERY_DOCS,
  //       clientId,
  //       scope: SCOPES,
  //     })
  //     .then(function (x) {
  //       console.log('x', x)
  //     })
  // }

  // initClient()

  gapi.load('client:auth2', () => {
    gapi.client
      .init({
        clientId,
        scope: SCOPES,
        // plugin_name: 'chat',
      })
      .then(function (x) {
        console.log('x', x)
      })
  })

  const onSuccess = (res) => {
    console.log('success res', res)
    console.log('res', res)
    // const user = res?.profileObj?.name
    const loginName = res?.profileObj?.givenName
    const access_token = res?.tokenObj?.access_token
    console.log('access_token', access_token)
    dispatchUpdateEvent('LOGIN', {access_token, loginName})

    /*  {
      "Ca": "106117747901493479188",
      "xc": {
          "token_type": "Bearer",
          "access_token": "...",
          "scope": "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
          "login_hint": "AJDLj6JUa8yxXrhHdWRHIV0S13cAnff9OPkEeHlRLxQI8X9SUj8zjnIDqkM63JRYlPRc1j-nSawPFmMLJrF4Ln8afXvW-26DBQ",
          "expires_in": 3599,
          "id_token": "...",
          "session_state": {
              "extraQueryParams": {
                  "authuser": "0"
              }
          },
          "first_issued_at": 1652910572366,
          "expires_at": 1652914171366,
          "idpId": "google"
      },
      "wt": {
          "NT": "106117747901493479188",
          "Ad": "John Kelly",
          "rV": "John",
          "uT": "Kelly",
          "hK": "https://lh3.googleusercontent.com/a/AATXAJxU7nQNo3OimF1S_JWZ_08AGrsP3Wru96wCkxHb=s96-c",
          "cu": "jhnklly@gmail.com"
      },
      "googleId": "106117747901493479188",
      "tokenObj": {
          "token_type": "Bearer",
          "access_token": "...",
          "scope": "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
          "login_hint": "AJDLj6JUa8yxXrhHdWRHIV0S13cAnff9OPkEeHlRLxQI8X9SUj8zjnIDqkM63JRYlPRc1j-nSawPFmMLJrF4Ln8afXvW-26DBQ",
          "expires_in": 3599,
          "id_token": "...",
          "session_state": {
              "extraQueryParams": {
                  "authuser": "0"
              }
          },
          "first_issued_at": 1652910572366,
          "expires_at": 1652914171366,
          "idpId": "google"
      },
      "tokenId": "eyJ...tw",
      "accessToken": "...",
      "profileObj": {
          "googleId": "106117747901493479188",
          "imageUrl": "https://lh3.googleusercontent.com/a/AATXAJxU7nQNo3OimF1S_JWZ_08AGrsP3Wru96wCkxHb=s96-c",
          "email": "jhnklly@gmail.com",
          "name": "John Kelly",
          "givenName": "John",
          "familyName": "Kelly"
      }
    }
     */
  }
  const onFailure = (res) => {
    console.log('fail res', res)
  }

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login
          </button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
      />
    </div>
  )
}

export default Login
