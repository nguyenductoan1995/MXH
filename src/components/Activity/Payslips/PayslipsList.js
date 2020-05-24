import React from 'react'
import { FlatList } from 'react-native'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getPayslips } from 'store/Payslips/actions'
import PayslipsItem from './PayslipsItem'


class PayslipsList extends React.PureComponent {
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
    const time = `${get(item, 'TaxPeriod', null)}/${get(item, 'TaxYear', null)}`
    const amount = get(item, 'Amount', null)
    const { onPress } = this.props
    return (
      <PayslipsItem
        onPress={() => onPress(get(item, 'ID', null))}
        id={id}
        amount={amount}
        time={time}
      />
    )
  }

  render() {
    const { data, field, isLoading } = this.props
    const newData = data ? data.filter((item) => String(item.ID).match(field)) : []
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

const mapStateToProps = ({ payslipsStore, homeStore }) => {
  const data = get(payslipsStore, 'Payslips', [])
  const field = get(homeStore, 'field')
  const isLoading = get(payslipsStore, 'isLoading')
  return {
    data,
    field,
    isLoading,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getPayslips(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PayslipsList)
