import React, {useEffect, useState} from 'react'

const ListToWikiExtracts = () => {
  const [textList, setTextList] = useState([''])
  const [extractsDict, setExtractsDict] = useState({})

  const outputText = textList
    .map((x) => extractsDict?.[x]?.extract_html)
    .join('\n')

  // const urlList = textList.map((x) => extractsDict?.[x]?.url).join('\n')

  function sleep(milliseconds) {
    // async function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }

  useEffect(() => {
    // first
    // return () => {
    //   second
    // }
    console.log(
      'outputText',
      textList.map((x) => extractsDict?.[x]?.extract_html)
    )
    console.log(
      'urlList',
      textList.map((x) => extractsDict?.[x]?.url)
    )
  }, [Object.keys(extractsDict).length])

  let JSON_DATA = {}
  const STATUS = {}

  async function setWikiData(list) {
    // list.forEach(term => {
    for (let i = 0; i < list.length; i++) {
      const term = list[i]
        .split(',')[0]
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

      console.log(i, list.length, term)
      await sleep(1001) // HACK!
      const query = term + '_(given_name)'
      let wikiUrl =
        'https://en.wikipedia.org/api/rest_v1/page/summary/' +
        encodeURIComponent(query)

      fetch(`${wikiUrl}`)
        // return fetch(`${wikiUrl}`)
        .then((response) => {
          if (response?.ok) {
            return response.json()
          }
          wikiUrl =
            'https://en.wikipedia.org/api/rest_v1/page/summary/' +
            encodeURIComponent(term + '_(name)')
          return fetch(`${wikiUrl}`).then((response) => {
            if (response?.ok) {
              return response.json()
            }
            wikiUrl =
              'https://en.wikipedia.org/api/rest_v1/page/summary/' +
              encodeURIComponent(term)
            return fetch(`${wikiUrl}`).then((response) => {
              if (response?.ok) {
                return response.json()
              }
              return null
            })
            return null
          })
        })
        .then((x) => {
          if (x?.extract_html === undefined) {
            return null
          }
          STATUS[term] = x
          const {displaytitle, extract_html} = x
          const image = x.thumbnail?.source
          const url = x.content_urls?.mobile?.page

          const page0 = x?.query?.pages?.[0]
          const description = page0?.terms?.description?.[0]
          const extract = page0?.extract

          const item = {
            displaytitle,
            extract_html,
            image,
            url,
          }
          // console.log('item', item)

          // document.querySelector(
          //   '#info'
          // ).innerHTML += `<div class="extract_html">${extract_html}</div>`

          // JSON_DATA[term].wikiInfo = {
          //   displaytitle,
          //   image,
          //   url,
          // }
          // JSON_DATA[term].wikiExtractHtml = extract_html

          setExtractsDict((ps) => ({
            ...ps,
            [list[i]]: {extract_html, url},
          }))

          return item
          // return {displaytitle, extract_html, image, url}
        })

      // await sleep(1001) // HACK!
    }
    // console.log('extractsDict', extractsDict)
  }

  const queryWiki = async () => {
    setWikiData(textList)
  }

  return (
    <>
      <div id="list-input">
        <textarea
          rows="4"
          className="block p-2.5 w-full text-sm border border-gray-300 "
          placeholder={`Archibald
Saoirse
Ada`}
          onChange={(e) =>
            setTextList(
              e.target.value
                .split('\n')
                .map((x) => x.trim())
                .filter((x) => x?.length > 0)
            )
          }
        />
        {/* Archibald \n Saoirse \n Ada \n */}
        {/* </textarea> */}
        <button
          className="p-2 m-2 bg-gray-100 border rounded hover:bg-gray-200"
          title="Submit"
          onClick={queryWiki}
        >
          Submit
        </button>
      </div>

      <div id="table-output" className="text-left whitespace-pre">
        <div>
          <button
            className="p-2 m-2 bg-gray-100 border rounded hover:bg-gray-200"
            title="Copy text"
            onClick={() => {
              navigator.clipboard.writeText(outputText)
            }}
          >
            Copy text
          </button>
        </div>
        {outputText}
      </div>

      <div id="json-output"></div>
    </>
  )
}

export default ListToWikiExtracts
