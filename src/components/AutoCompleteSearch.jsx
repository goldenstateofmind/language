import {AutoComplete} from 'antd'
import 'antd/dist/antd.css'

const AutoCompleteSearch = ({options, handleChange, value}) => {
  console.log('options', options)
  // const [value, setValue] = useState('')
  // const [options, setOptions] = useState([])

  const onSearch = (searchText) => {
    // setOptions(
    //   !searchText
    //     ? []
    //     : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    // )
  }

  const onSelect = (data) => {
    console.log('onSelect', data)
  }

  const onChange = (data) => {
    // setValue(data)
  }

  return (
    <>
      <AutoComplete
        options={options}
        style={{
          width: 200,
        }}
        // onSelect={onSelect}
        // onSearch={onSearch}
        placeholder="input here"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </>
  )
}

export default AutoCompleteSearch
