import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, setValue, formatDate, formatMoney } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import screens from 'navgation/screens'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getExpenseDetail } from 'store/Expenses/actions'
import { getOptionList } from 'store/OptionList/actions'

class ExpenseDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { doGetData, route, doGetType } = this.props
    const id = get(route, 'params.id')
    this.setState({ title: id })
    doGetData({ id }, this.getDataCallBack)
    doGetType({ OptionType: 'MileageItem' }, () => {
      doGetType({ OptionType: 'ExpenseItem' })
    })
  }

  getDataCallBack = ({ success, errorMessage }) => {
    if (success) {
      //
    } else {
      alert(errorMessage)
    }
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    switch (screen) {
      case screens.EditExpenses:
        return navigation.navigate(screens.EditExpenses, { getData: this.getData })
      default:
        break
    }
  }

  render() {
    const { data } = this.props
    const { title } = this.state
    const time = get(data, 'Date')
    const date = formatDate(time)
    const Reference = get(data, 'ClaimReference')
    const Description = get(data, 'Description')
    const Type = get(data, 'Type')
    const AmoundClaimed = get(data, 'AmoundClaimed') ? formatMoney(get(data, 'AmoundClaimed')) : ''
    const Paid = formatMoney(get(data, 'Paid'))
    const Outstanding = get(data, 'Outstanding') ? formatMoney(get(data, 'Outstanding')) : ''
    const Status = get(data, 'Status')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressRightIcon={() => this.goTo(screens.EditExpenses)}
            onPressLeftIcon={this.goBack}
            title={`Expense ${title}`}
            rightIconName="pencil"
            typeright="simple"
          />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData checkValue={false} value={date} style={styles.input} placeholder="Date" />
              <RowData checkValue={false} value={Reference} style={styles.input} placeholder="Reference" />
              <RowData checkValue={false} value={Description} style={styles.input} placeholder="Description" />
              <RowData checkValue={false} value={Type} style={styles.input} placeholder="Type" />
              <RowData checkValue={false} value={AmoundClaimed} style={styles.input} placeholder="Claim" />
              <RowData checkValue={false} value={Paid} style={styles.input} placeholder="Paid" />
              <RowData checkValue={false} value={Outstanding} style={styles.input} placeholder="Outstanding" />
              <RowData checkValue={false} value={Status} style={[styles.input, styles.inputLast]} placeholder="Status" />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ expensesStore, homeStore }) => {
  const data = get(expensesStore, 'ExpenseDetail', [])
  const field = get(homeStore, 'field')
  return {
    data,
    field,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getExpenseDetail(evt, cb)),
  doGetType: (evt, cb) => dispatch(getOptionList(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetail)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(25),
  },
  main: {
    paddingTop: getHeight(22),
  },
  scrollWrap: {

  },
  wrapBtnSubmit: {
    position: 'absolute',
    bottom: setValue(26),
    borderRadius: setValue(25),
  },
  btnSubmit: {
    width: getWidth(180),
    height: getHeight(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
  },
  inputLast: {
    marginBottom: getHeight(32),
  },
})
