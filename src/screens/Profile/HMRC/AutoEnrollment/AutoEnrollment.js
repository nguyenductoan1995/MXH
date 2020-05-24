import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, ScrollView } from 'react-native'
import { Header } from 'components/common/Header'
import { getWidth, getHeight } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import { connect } from 'react-redux'
import { get } from 'lodash'

class AutoEnrollment extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  render() {
    const { data } = this.props
    const Category = get(data, 'AutoEnrolment.Category')
    const Date = get(data, 'AutoEnrolment.Date')
    const PensionScheme = get(data, 'AutoEnrolment.PensionScheme')
    const OptIn = get(data, 'AutoEnrolment.OptIn')
    const OptOut = get(data, 'AutoEnrolment.OptOut')
    const LastAssessmentDoneOn = get(data, 'AutoEnrolment.LastAssessmentDoneOn')
    const OptOutDate = get(data, 'AutoEnrolment.OptOutDate')
    const OptInDate = get(data, 'AutoEnrolment.OptInDate')


    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Auto Enrollment" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData
                style={styles.input}
                placeholder="Category"
                value={Category}
              />
              <RowData
                style={styles.input}
                placeholder="Date"
                value={Date}
              />
              <RowData
                style={styles.input}
                placeholder="Pension Scheme"
                value={PensionScheme}
              />
              <RowData
                style={[styles.input]}
                placeholder="Opt-In"
                value={OptIn}
              />
              <RowData
                style={[styles.input]}
                placeholder="Opt-In Date"
                value={OptInDate}
              />
              <RowData
                style={[styles.input, styles.rowDataLast]}
                placeholder="Opt-Out"
                value={OptOut}
              />
              <RowData
                style={[styles.input, styles.rowDataLast]}
                placeholder="Opt-Out Date"
                value={OptOutDate}
              />
              <RowData
                style={[styles.input, styles.rowDataLast]}
                placeholder="Last Assessment done on"
                value={LastAssessmentDoneOn}
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


export default connect(mapStateToProps, null)(AutoEnrollment)

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
