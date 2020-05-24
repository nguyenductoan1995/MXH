import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, ScrollView } from 'react-native'
import { Header } from 'components/common/Header'
import { getWidth, getHeight } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import { RowHMRC } from 'components/Profile'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getHMRCDetail } from 'store/Profile/actions'

class HMRCDetails extends React.PureComponent {
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
    switch (screen) {
      case 'Statutory Deductions':
        return navigation.navigate(screens.StatutoryDeductions)
      case 'Student Loan':
        return navigation.navigate(screens.StudentLoan)
      case 'Attachment Orders':
        return navigation.navigate(screens.AttachmentOrders)
      case 'Auto Enrollment':
        return navigation.navigate(screens.AutoEnrollment)
      default:
        break
    }
  }

  render() {
    const { data } = this.props
    const NINumber = get(data, 'NINumber')
    const TaxCode = get(data, 'TaxCode')
    const TaxBasisText = get(data, 'TaxBasisText')
    const StarterType = get(data, 'StarterType')
    const P45GrossforTax = get(data, 'P45GrossforTax')
    const P45TaxDeducted = get(data, 'P45TaxDeducted')
    // const NINumber = get(data, 'NINumber')
    // const NINumber = get(data, 'NINumber')
    // const NINumber = get(data, 'NINumber')
    // const NINumber = get(data, 'NINumber')
    // const NINumber = get(data, 'NINumber')

    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="HMRC Details" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData
                style={styles.input}
                placeholder="NI Number"
                value={NINumber}
              />
              <RowData
                style={styles.input}
                placeholder="Tax Code"
                value={TaxCode}
              />
              <RowData
                style={styles.input}
                placeholder="Tax Basis"
                value={TaxBasisText}
              />
              <RowData
                style={[styles.input]}
                placeholder="Starter Type"
                value={StarterType}
              />
              <RowData
                style={[styles.input]}
                placeholder="P45 Gross for Tax"
                value={P45GrossforTax}
              />
              <RowData
                style={[styles.input, styles.rowDataLast]}
                placeholder="P45 Tax Deducted"
                value={P45TaxDeducted}
              />
              <RowHMRC
                onPress={this.goTo}
                title="Statutory Deductions"
              />
              <RowHMRC
                onPress={this.goTo}
                title="Student Loan"
              />
              <RowHMRC
                onPress={this.goTo}
                title="Attachment Orders"
              />
              <RowHMRC
                onPress={this.goTo}
                title="Auto Enrollment"
              />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'HMRCDetail', [])

  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getHMRCDetail(evt, cb)),
  // doGetOption: (evt, cb) => dispatch(getOptionList(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(HMRCDetails)

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
    paddingBottom: getHeight(100),
  },
  scrollWrap: {

  },
  rowDataLast: {
    borderBottomWidth: 0,
  },
})
