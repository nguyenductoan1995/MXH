import React from 'react'
import { FlatList } from 'react-native'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getTimeSheets } from 'store/TimeSheets/actions'
import TimeSheetItem from './TimeSheetItem'


class TimeSheetsList extends React.PureComponent {
  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { doGetData } = this.props
    doGetData({}, this.getDataCallBack)
  }

   getDataCallBack = ({ success, errorMessage }) => {
     if (success) {
       //
     } else {
       alert(errorMessage)
     }
   }

  renderItem=({ item }) => {
    const id = get(item, 'ID', null)
    const name = get(item, 'AgencyName', null)
    const time = get(item, 'TaxPeriodDisplayText', null)
    const amount = get(item, 'Amount', null)
    const status = get(item, 'Status', null)
    const { onPress } = this.props
    return (
      <TimeSheetItem
        onPress={() => onPress(id)}
        id={id}
        name={name}
        amount={amount}
        time={time}
        status={status}
      />
    )
  }

  render() {
    const { data, isLoading, field } = this.props
    const newData = data ? data.filter((item) => String(item.ID).match(field)) : []
    if (data.length === 0 || newData.length === 0) return null
    return (
      <FlatList
        refreshing={isLoading}
        onRefresh={this.getData}
        showsVerticalScrollIndicator={false}
        data={newData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    )
  }
}

const mapStateToProps = ({ timeSheetsStore, homeStore }) => {
  const data = get(timeSheetsStore, 'timeSheets', [])
  const field = get(homeStore, 'field')
  const isLoading = get(timeSheetsStore, 'isLoading')
  return {
    data,
    field,
    isLoading,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getTimeSheets(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetsList)
