import React from 'react'

export default function StatsPage({userName, rowsUnfiltered, otherUser}) {
  console.log('userName', userName)
  console.log('otherUser', otherUser)

  const myYays = rowsUnfiltered
    .filter((x) => x[userName] === 'YES')
    .map((x) => x.Name)

  const matches = rowsUnfiltered
    .filter((x) => x[userName] === 'YES' && x[otherUser] === 'YES')
    .map((x) => x.Name)
    .sort()

  // const handleSubmit = (e) => {
  //   addSheetItem({name, yesOrNo: 'YES'})
  //   handleSearchSelect({value: name})
  // }

  return (
    <div className="flex justify-center h-full p-2 StatsPage">
      <div className="flex flex-col h-full p-0">
        <h2 className="mt-0">Matches</h2>
        <ul className="overflow-auto text-lg list-decimal list-inside">
          {matches.map((x) => (
            <li>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
