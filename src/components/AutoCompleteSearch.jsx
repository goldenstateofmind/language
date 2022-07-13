import {AutoComplete} from 'antd'
import 'antd/dist/antd.css'

const AutoCompleteSearch = ({options, handleSearch, value}) => {
  console.log('options', options)
  // const [value, setValue] = useState('')
  // const [options, setOptions] = useState([])

  const values = options.map((x) => x.value.toUpperCase())

  const onSearch = (searchText) => {
    const isNotListed = !values.includes(searchText.toUpperCase())
    handleSearch({isNotListed, searchText})

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
        style={{width: 200}}
        // onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Search"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </>
  )
}

export default AutoCompleteSearch
