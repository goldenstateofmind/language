import {AutoComplete} from 'antd'
import 'antd/dist/antd.css'

const AutoCompleteSearch = ({
  options,
  handleSearch,
  handleSearchSelect,
  value,
}) => {
  const values = options.map((x) => x.value.toUpperCase())

  const onSearch = (searchText) => {
    const isNotListed = !values.includes(searchText.toUpperCase())
    handleSearch({isNotListed, searchText})
  }

  return (
    <>
      <AutoComplete
        options={options}
        style={{width: 200}}
        // onSelect={onSelect}
        onSelect={(value, option) => handleSearchSelect({value, option})}
        onSearch={onSearch}
        placeholder="Search"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        value={value}
      />
    </>
  )
}

export default AutoCompleteSearch
