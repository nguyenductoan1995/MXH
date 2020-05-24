import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, setValue, formatMoney } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import screens from 'navgation/screens'
import { getTimeSheetDetail } from 'store/TimeSheets/actions'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getOptionList, getAssignmentList } from 'store/OptionList/actions'

class TimeSheetDetail extends React.PureComponent {
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
    const { doGetData, route, doGetCountry, doGetListAssignment, Assignments, CountryOption } = this.props
    const id = get(route, 'params.id')
    this.setState({ title: id })
    doGetData({ id }, this.getDataCallBack)
    if (Assignments.length === 0) {
      doGetListAssignment()
    }
    if (CountryOption) {
      doGetCountry({ OptionType: 'Country' })
    }
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
      case screens.EditTimeSheet:
        return navigation.navigate(screens.EditTimeSheet)
      default:
        break
    }
  }

  render() {
    const { data } = this.props
    const { title } = this.state
    const AgencyName = get(data, 'AgencyName')
    const StartDate = get(data, 'StartDate')
    const EndDate = get(data, 'EndDate')
    const TaxPeriod = get(data, 'TaxPeriod')
    const NetAmount = get(data, 'NetAmount') ? formatMoney(get(data, 'NetAmount')) : ''
    const PeriodPaid = get(data, 'PeriodPaid')
    const Outstanding = get(data, 'Outstanding') ? formatMoney(get(data, 'Outstanding')) : ''
    const Status = get(data, 'Status')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressRightIcon={() => this.goTo(screens.EditTimeSheet)}
            onPressLeftIcon={this.goBack}
            title={`Timesheet ${title}`}
            rightIconName="pencil"
            typeright="simple"
          />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData value={AgencyName} style={styles.input} placeholder="Agency Name" />
              <RowData value={StartDate} style={styles.input} placeholder="Period Start Date" />
              <RowData value={EndDate} style={styles.input} placeholder="Period End Date" />
              <RowData value={TaxPeriod} style={styles.input} placeholder="Tax Period" />
              <RowData value={NetAmount} style={styles.input} placeholder="Amount" />
              <RowData value={PeriodPaid} style={styles.input} placeholder="Period Paid" />
              <RowData value={Outstanding} style={styles.input} placeholder="Outstanding" />
              <RowData value={Status} style={styles.input} placeholder="Status" />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ timeSheetsStore, homeStore, optionStore }) => {
  const data = get(timeSheetsStore, 'timeSheetDetail', [])
  const field = get(homeStore, 'field')
  const Assignments = get(optionStore, 'Assignments')
  const CountryOption = get(optionStore, 'Country', [])
  return {
    data,
    field,
    Assignments,
    CountryOption,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getTimeSheetDetail(evt, cb)),
  doGetCountry: (evt, cb) => dispatch(getOptionList(evt, cb)),
  doGetListAssignment: (evt, cb) => dispatch(getAssignmentList(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetDetail)

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
})
