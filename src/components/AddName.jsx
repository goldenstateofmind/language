import React from 'react'

export default function AddName({addSheetItem, handleSearchSelect, name}) {
  const handleSubmit = (e) => {
    // addSheetItem({name, yesOrNo: ''})
    addSheetItem({name, yesOrNo: 'YES'})
    handleSearchSelect({value: name})
  }

  return (
    <div className="mx-4 whitespace-pre AddName">
      <button
        className="h-8 px-2 border border-gray-400 rounded "
        onClick={handleSubmit}
      >
        Add "{name}"
      </button>
    </div>
  )
}
