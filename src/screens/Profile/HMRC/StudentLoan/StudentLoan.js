import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, ScrollView } from 'react-native'
import { Header } from 'components/common/Header'
import { getWidth, getHeight } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { get } from 'lodash'

class StudentLoan extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    switch (screen) {
      case 'Statutory Deductions':
        return navigation.navigate(screens.StatutoryDeductions)
      default:
        break
    }
  }

  render() {
    const { data } = this.props
    const StudentLoans = get(data, 'StudentLoan.StudentLoan')
    const PGStudentLoan = get(data, 'StudentLoan.PGStudentLoan')

    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Student Loan" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData value={StudentLoans} style={styles.input} placeholder="Student Loan" />
              <RowData value={PGStudentLoan} style={styles.input} placeholder="PG Student Loan" />
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
  // doGetData: (evt, cb) => dispatch(getHMRCDetail(evt, cb)),
  // doGetOption: (evt, cb) => dispatch(getOptionList(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(StudentLoan)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  input: {
    width: getWidth(328),
    height: getHeight(72),
    marginTop: getHeight(25),
  },
  main: {
    paddingBottom: getHeight(100),
  },
  scrollWrap: {

  },
  rowDataLast: {
    borderBottomWidth: 0,
  },
})
