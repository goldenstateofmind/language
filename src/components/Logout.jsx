import {useContext} from 'react'
import GoogleLogout from 'react-google-login'
import {AppContext} from '../App'

const clientId =
  '482074946800-se9e3d3slh5nv11q6j75h4tb3co577jg.apps.googleusercontent.com'

function Logout() {
  const {contextDict, dispatchUpdateEvent} = useContext(AppContext)
  const {loginName} = contextDict

  const onSuccess = (res) => {
    console.log('logged out res', res)
  }
  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            {loginName}
          </button>
        )}
      />
    </div>
  )
}

export default Logout
