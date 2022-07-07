import React, {useEffect, useRef, useState} from 'react'
// import {useServerConfig} from '../../../../contexts/serverConfig'
// import {IdentityProvider} from '../../../../gen/graphql-types'
// import {useSigninContext} from '../context'

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  // useIsomorphicLayoutEffect(() => {
  //   savedCallback.current = callback
  // }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

export default function GoogleButton() {
  // export default function GoogleButton(): JSX.Element {
  // const {signin, setState} = useSigninContext()
  const divRef = useRef(null)
  // const {googleOAuthClientId} = useServerConfig()
  const googleOAuthClientId =
    '482074946800-se9e3d3slh5nv11q6j75h4tb3co577jg.apps.googleusercontent.com'

  const [google, setGoogle] = useState(null)
  // const [google, setGoogle] = useState<Google>();
  const [googleIsLoading, setGoogleIsLoading] = useState(true)

  useInterval(
    () => {
      console.log(' - - useInterval - window', window)
      if (typeof window !== 'undefined' && window.google) {
        setGoogle(window.google)
        setGoogleIsLoading(false)
      }
    },
    googleIsLoading ? 100 : null
  )

  useEffect(() => {
    console.log(' - - useEffect - window.google', window.google)
    if (typeof window === 'undefined' || !window.google || !divRef.current) {
      return
    }

    try {
      window.google.accounts.id.initialize({
        client_id: googleOAuthClientId,
        callback: async (res) => {
          console.log('res', res)
        },
      })
      window.google.accounts.id.renderButton(divRef.current, {
        theme: 'outline',
        size: 'large',
      })
      // window.google.accounts.id.renderButton(divRef.current, opts)
    } catch (error) {
      // setState({error})
    }
  }, [googleOAuthClientId, window.google, divRef.current])

  return (
    <div>
      <div ref={divRef}>test</div>
    </div>
  )
}
