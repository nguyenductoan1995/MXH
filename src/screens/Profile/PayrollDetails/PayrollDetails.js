import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getWidth, getHeight, screenWidth } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import { RowHMRC } from 'components/Profile'
import screens from 'navgation/screens'
import { getPayrollDetail } from 'store/Profile/actions'
import { connect } from 'react-redux'
import { get } from 'lodash'

class PayrollDetails extends React.PureComponent {
  componentDidMount() {
    const { doGetData } = this.props
    doGetData({})
  }

  handleGetData = ({ success, errorMessage }) => {
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
    navigation.navigate(screens.HolidayPay)
  }

  render() {
    const { data } = this.props
    const AgencyReference = get(data, 'AgencyReference')
    const WorkPatternText = get(data, 'WorkPatternText')
    const PayrollFrequencyText = get(data, 'PayrollFrequencyText')
    const HolidayPayMethodText = get(data, 'HolidayPayMethodText')
    const PaymentTermText = get(data, 'PaymentTermText')
    const AdminFee = get(data, 'AdminFee')
    // const AgencyReference = get(data, 'AgencyReference')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Payroll Details" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData
                style={styles.input}
                placeholder="Agency Reference"
                value={AgencyReference}
              />
              <RowData
                style={styles.input}
                placeholder="Work Pattern"
                value={WorkPatternText}
              />
              <RowData
                style={styles.input}
                placeholder="Payroll Frequency"
                value={PayrollFrequencyText}
              />
              <RowData
                style={styles.input}
                placeholder="Holiday Pay Method"
                value={HolidayPayMethodText}
              />
              <RowData
                style={styles.input}
                placeholder="Payment Term"
                value={PaymentTermText}
              />
              <RowData
                style={[styles.input, styles.inputLast]}
                placeholder="Admin Fee"
                value={AdminFee}
              />
              <RowHMRC
                style={styles.lastRow}
                onPress={this.goTo}
                title="Statutory Deductions"
              />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'PayrollDetail', [])

  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getPayrollDetail(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PayrollDetails)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  input: {
    width: getWidth(328),
    height: getHeight(72),
    marginTop: getHeight(25),
  },
  scrollWrap: {
    width: screenWidth,
  },
  main: {
    paddingBottom: getHeight(50),
  },
  inputLast: {
    borderBottomWidth: 0,
  },
  lastRow: {
    borderBottomWidth: getHeight(3),
    borderBottomColor: '#ebebeb',
  },
})
