import React from 'react'
import { FlatList } from 'react-native'
import { get, sumBy } from 'lodash'
import RowRate from './RowRate'

/**
 * @param function countNet (Net, ListRate)=>{}
 */
export default class RateList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: get(this.props, 'data', []),
    }
  }

  componentDidMount() {
    const { data = [], countNet = () => {} } = this.props
    const dataMap = data.map((item) => {
      const obj = { ...item }
      obj.Rate = parseFloat(item.Rate) || 0
      obj.Units = parseFloat(item.Units) || 0
      obj.NetAmount = parseFloat(item.NetAmount) || 0
      return obj
    })
    countNet(sumBy(dataMap, 'NetAmount'), dataMap)
  }

  onChangeText=(index, value) => {
    const { data } = this.state
    const { countNet = () => {} } = this.props

    const newData = data
    const Units = parseFloat(value)
    const Rate = parseFloat(get(data, `${index}.Rate`, 0))
    const NetAmount = parseFloat(value * Rate)
    //
    newData[index] = {
      ...newData[index],
      Units,
      Rate,
      NetAmount,
    }
    //
    this.setState({
      data: newData,
    })
    const dataMap = newData.map((item) => {
      const obj = { ...item }
      obj.Rate = parseFloat(item.Rate) || 0
      obj.Units = parseFloat(item.Units) || 0
      obj.NetAmount = parseFloat(item.NetAmount) || 0
      return obj
    })
    countNet(sumBy(dataMap, 'NetAmount'), newData)
  }

  renderItem = ({ item, index }) => {
    const code = get(item, 'Code') || get(item, 'Description')
    const rate = get(item, 'Rate')
    const unit = get(item, 'Units')
    return (
      <RowRate
        onChangeText={(vl) => this.onChangeText(index, vl)}
        code={code}
        rate={rate}
        unit={unit}
      />
    )
  }

  render() {
    const { data = [] } = this.props
    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
      />
    )
  }
}
