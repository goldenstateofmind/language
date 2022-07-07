import React, {useState} from 'react'
import RadioButtonGroup from './RadioButtonGroup'

export default function AddItem({addSheetItem}) {
  // Add item to "rows" (Context?), to be written to spreadsheet
  // onClick show inputs (Name, Meaning, Origin, Nicknames...)

  const [name, setName] = useState('')
  const [meaning, setMeaning] = useState('')
  const [nicknames, setNicknames] = useState('')
  const [origin, setOrigin] = useState('')
  const [yesOrNo, setYesOrNo] = useState('Yes')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleChangeRadio = (e) => {
    console.log('handleChangeRadio', e)
  }

  const handleSubmit = (e) => {
    console.log('name', name)
    console.log('yesOrNo', yesOrNo)
    addSheetItem({name, meaning, nicknames, origin, yesOrNo})
  }

  const inputs = [
    {placeholder: 'Name', setter: setName},
    {placeholder: 'Meaning', setter: setMeaning},
    {placeholder: 'Nicknames', setter: setNicknames},
    {placeholder: 'Origin', setter: setOrigin},
    {
      placeholder: 'Yes',
      type: 'radio',
      options: ['Yes', 'No'],
      setter: setYesOrNo,
    },
  ]

  return (
    <div className="m-4 AddItem">
      <button
        className="w-8 h-8 m-2 bg-gray-100 border rounded-full hover:bg-gray-200"
        title="Add item"
        onClick={() => setIsExpanded((ps) => !ps)}
      >
        +
      </button>

      {isExpanded && (
        <div>
          {inputs.map((x) => {
            return (
              <div key={x.placeholder}>
                {x.type === 'radio' ? (
                  <RadioButtonGroup
                    options={x.options}
                    handleChange={(e) => x.setter(e.target.value)}
                  />
                ) : (
                  <input
                    placeholder={x.placeholder}
                    className="p-1 m-1 border rounded-md"
                    onChange={(e) => x.setter(e.target.value)}
                  />
                )}
              </div>
            )
          })}
          <button
            className="px-2 py-1 m-2 border border-gray-400 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}
