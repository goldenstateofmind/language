import {animated, to as interpolate, useSprings} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
import React, {useContext, useEffect, useState} from 'react'
import {FaVolumeUp} from 'react-icons/fa'
import {MdFlipCameraAndroid} from 'react-icons/md'
import {AppContext} from '../App'
import {LEFT_KEY, RIGHT_KEY} from '../const'
import {textToSpeech} from '../utils/utils'

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
  const {
    cardBodyBack,
    cardInfo,
    cardKey,
    isShowingFront,
    reverseKey,
    setIsShowingFront,
  } = props
  console.log('Deck props', props)
  console.log(' --- cardBodyBack', cardBodyBack)
  const {contextDict, dispatchUpdateEvent} = useContext(AppContext)
  const {names, propsDict, access_token} = contextDict

  // const [isShowingFront, setIsShowingFront] = useState(true)

  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out

  useEffect(
    (ps) => {
      // console.log(' ///////// useEffect', ps)
    },
    [props.cardInfo[cardKey]]
  )

  const [springProps, api] = useSprings(1, (i) => ({
    immediate: true,
    initial: null,
    to: {x: 0, y: 0},
    from: {x: 0, y: 0},
  }))

  const handleClickFlip = () => {
    console.log('click')
    setIsShowingFront((ps) => !ps)
    console.log('isShowingFront', isShowingFront)
    console.log('props.cardInfo[reverseKey]', props.cardInfo[reverseKey])
  }

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag((dragProps) => {
    console.log('dragProps', dragProps)
    const {
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx, vy],
      down,
      // vy: [vy],
    } = dragProps

    // if (down === true) handleClick()

    const name = props.cardInfo[cardKey]

    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    const triggerDown = vy > 0.1

    if (!active && trigger) {
      gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

      // Update the data. Right = yes, left = no
      const value = xDir === 1 ? RIGHT_KEY : xDir === -1 ? LEFT_KEY : null

      dispatchUpdateEvent('UPDATE', {
        key: props.cardInfo[cardKey],
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
    const info = props?.cardInfo
    let html = info.wikiExtractHtml || ''
    html = html.replaceAll('\\n', '').replaceAll('\\"', '"')
    if (info?.wikiUrl?.length > 0) {
      html += `<a class="text-gray-400" href="${info.wikiUrl}">»</a>`
    }

    {
      return (
        <div className="Card" onClick={handleClick}>
          {info.Phonetic && (
            <div className="italic text-center pronunciation">
              ({info.Phonetic})
            </div>
          )}
          <div
            className="pt-4 text-sm extract_html"
            dangerouslySetInnerHTML={{__html: html}}
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

  const activeSideWord = isShowingFront
    ? props.cardInfo[cardKey]
    : props.cardInfo[reverseKey]

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {springProps.map(({x, y}, i) => (
        <animated.div
          id="card"
          className="flex items-center justify-center overflow-hidden h-72 zabsolute deck w-72 "
          key={i}
          style={{x, y}}
        >
          <animated.div
            {...bind(i)}
            style={{transform: interpolate([0, 1], trans)}}
            className="flex flex-col items-center justify-start w-full h-full overflow-hidden bg-white border border-gray-400 rounded-lg ustify-center"
          >
            {/* card-header */}
            <div className="flex flex-col justify-center w-full h-24 overflow-auto text-center bg-gray-200">
              <h2 className="h-full CardName">
                {isShowingFront
                  ? props.cardInfo[cardKey]
                  : props.cardInfo[reverseKey]}
                {!isShowingFront && (
                  <button
                    className="mx-2"
                    onClick={(e) => textToSpeech({e, text: activeSideWord})}
                  >
                    <FaVolumeUp size={'1rem'} color="#333" />
                  </button>
                )}
              </h2>
            </div>

            {/* card-body */}
            <div
              id="card-body"
              className="flex flex-col justify-between w-full h-full p-4 mx-auto mb-4 overflow-auto text-sm select-none card-body gro"
            >
              <div className="flex">
                {/* {formatCardInfo(props.cardInfo[cardKey])} */}
                {isShowingFront ? (
                  <ol
                    className="list-disc list-inside "
                    style={{margin: '0 auto'}}
                    dangerouslySetInnerHTML={{__html: props.cardBodyFront}}
                  ></ol>
                ) : (
                  cardBodyBack
                )}
              </div>

              <button
                className="flex justify-center m-4"
                onClick={handleClickFlip}
              >
                <MdFlipCameraAndroid size={'2rem'} color="#aaa" />
              </button>
            </div>
          </animated.div>
        </animated.div>
      ))}
    </>
  )
}

export default Deck
