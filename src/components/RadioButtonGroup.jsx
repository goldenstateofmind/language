import {Radio} from 'antd'
import 'antd/dist/antd.css'

const RadioButtonGroup = ({options, handleChange, value}) => (
  <>
    <Radio.Group
      defaultValue={options[0]}
      buttonStyle="solid"
      onChange={handleChange}
      value={value}
    >
      {options.map((opt) => (
        <Radio.Button key={opt} value={opt}>
          <div className="w-16">{opt}</div>
        </Radio.Button>
      ))}
    </Radio.Group>
  </>
)

export default RadioButtonGroup
