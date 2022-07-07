import React, {useContext, useEffect, useRef, useState} from 'react'
import {useSprings, animated, to as interpolate} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'

import {AppContext} from '../App'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const init = (_i: number) => ({x: 0, rot: 0, scale: 1, y: 0, delay: 0})

// interpolate rotation and scale into a css transform
const trans = (r, s) =>
  [
    'perspective(1500px)',
    // 'rotateX(30deg)',
    `rotateY(${r / 10}deg)`,
    `rotateZ(${r}deg)`,
    `scale(${s})`,
  ].join(' ')

function Deck(props) {
  console.log('DECK props', props)
  const {cardInfo} = props
  const {contextDict, dispatchUpdateEvent} = useContext(AppContext)
  // console.log('contextDict', contextDict)
  const {names, propsDict, access_token} = contextDict

  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out

  useEffect(
    (ps) => {
      // console.log(' ///////// useEffect', ps)
    },
    [props.cardInfo.name]
  )

  const [springProps, api] = useSprings(1, (i) => ({
    immediate: true,
    initial: null,
    to: {x: 0, y: 0},
    from: {x: 0, y: 0},
  }))

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag((dragProps) => {
    const {
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    } = dragProps

    const name = props.cardInfo.Name

    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger) {
      gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

      // Update the data. Right = yes, left = no
      const value = xDir === 1 ? 'YES' : xDir === -1 ? 'NO' : null

      dispatchUpdateEvent('UPDATE', {
        key: props.cardInfo.Name,
        // prop: 'Voter 1',
        value,
        access_token,
      })
    }

    api.start((i) => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = active ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: {
          friction: 50,
          duration: isGone ? null : 200,
          tension: active ? 800 : isGone ? 20000 : 500,
        },
      }
    })

    if (!active && gone.size === 1) {
      setTimeout(() => {
        gone.clear()
        api.start((i) => init(i))
      }, 600)
    }
  })

  // const formatCardInfo = (name) => {
  const formatCardInfo = (name) => {
    const info = props.cardInfo
    {
      return (
        <div className="Card">
          <div
            className="pt-4 text-xs extract_html"
            dangerouslySetInnerHTML={{
              __html: info.wikiExtractHtml
                .replaceAll('\\n', '')
                .replaceAll('\\"', '"'),
            }}
          />
          <div className="p-4">
            <table className="w-full">
              <thead></thead>
              <tbody>
                {Object.keys(propsDict).map((x) => {
                  return (
                    info[propsDict[x]] && (
                      <tr key={[name, x].join('-')} className="brder">
                        <td className="w-px p-1 brder whitespace-nowrap">
                          {x}
                        </td>
                        <td
                          className={[
                            'p-1 text-center brder',
                            propsDict[x],
                          ].join(' ')}
                        >
                          {info[propsDict[x]]}
                        </td>
                      </tr>
                    )
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {springProps.map(({x, y}, i) => (
        <animated.div
          className="flex items-center justify-center overflow-hidden zabsolute deck w-72 h-96"
          key={i}
          style={{x, y}}
        >
          <animated.div
            {...bind(i)}
            style={{transform: interpolate([0, 1], trans)}}
            className="flex flex-col items-center w-full h-full overflow-hidden bg-white border border-gray-400 rounded-lg ustify-center"
          >
            <div className="flex flex-col justify-center w-full h-20 text-center bg-gray-200">
              <h2 className="CardName">{props.cardInfo.Name}</h2>
            </div>
            <div className="w-full h-full p-4 mb-4 overflow-scroll text-sm select-none">
              {formatCardInfo(props.cardInfo.name)}
            </div>
          </animated.div>
        </animated.div>
      ))}
    </>
  )
}

export default Deck
