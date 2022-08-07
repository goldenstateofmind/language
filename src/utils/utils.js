export function getWindowLocationHashParam(name) {
  const {hash} = window.location
  if (hash) {
    const params = new URLSearchParams(hash.slice(1))
    return params?.get(name)
  }
}

export const countItemsWhere = (obj, prop, val) => {
  const counts = Object.values(obj).filter((x) => x[prop] === val)
  return counts.length
}

export function dateStringYYYYMMDD(msTimestamp = Date.now(), delimiter = '-') {
  const date = new Date(msTimestamp)
  const year = date.toLocaleString('default', {year: 'numeric'})
  const month = date.toLocaleString('default', {month: '2-digit'})
  const day = date.toLocaleString('default', {day: '2-digit'})
  return [year, month, day].join(delimiter)
}

export const textToSpeech = ({e, text, language}) => {
  // https://talkrapp.com/speechSynthesis.html
  // e.stopPropagation()
  // e.nativeEvent.stopImmediatePropagation()
  var msg = new SpeechSynthesisUtterance()
  var voices = speechSynthesis.getVoices()
  const esEsFemale = voices.find((x) => x.voiceURI === 'Monica')
  const esMxFemale = voices.find((x) => x.name === 'Paulina')
  // const esMxFemale = voices.find((x) => x.lang === 'es-MX')
  // const esMxFemale = voices.find((x) => x.voiceURI === 'Paulina')
  // var voices = window.speechSynthesis.getVoices()
  msg.voice = esMxFemale // Note: some voices don't support altering params
  // msg.voice = voices[10] // Note: some voices don't support altering params
  // msg.voiceURI = 'native'
  // msg.volume = 1 // 0 to 1
  msg.rate = 0.71 // 0.1 to 10
  // msg.pitch = 2 //0 to 2
  msg.text = text
  msg.lang = 'es-MX'

  msg.onend = function (e) {
    console.log('Finished in ' + event.elapsedTime + ' seconds.')
  }

  speechSynthesis.speak(msg)
}
