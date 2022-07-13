import React from 'react'

export default function AddName({addSheetItem, name}) {
  const handleSubmit = (e) => {
    addSheetItem({name, yesOrNo: 'YES'})
  }

  return (
    <div className="mx-4 AddName">
      <button
        className="h-8 px-2 border border-gray-400 rounded "
        onClick={handleSubmit}
      >
        Add "{name}"
      </button>
    </div>
  )
}
