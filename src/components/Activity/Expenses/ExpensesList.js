import React from 'react'
import { FlatList } from 'react-native'
import { get } from 'lodash'
import { getExpenses } from 'store/Expenses/actions'
import { connect } from 'react-redux'
import ExpenseItem from './ExpenseItem'


class ExpensesList extends React.PureComponent {
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
    const id = `${get(item, 'ID', null)} - ${get(item, 'Description', null)}`
    const time = get(item, 'Date', null)
    const amount = get(item, 'Amount', null)
    const status = get(item, 'Status', null)
    const { onPress } = this.props
    return (
      <ExpenseItem
        onPress={() => onPress(get(item, 'ID', null))}
        id={id}
        amount={amount}
        time={time}
        status={status}
      />
    )
  }

  render() {
    const { data, field, isLoading } = this.props
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

const mapStateToProps = ({ expensesStore, homeStore }) => {
  const data = get(expensesStore, 'Expenses', [])
  const field = get(homeStore, 'field')
  const isLoading = get(expensesStore, 'isLoading', false)
  return {
    data,
    field,
    isLoading,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getExpenses(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList)
