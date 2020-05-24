import React from 'react'
import { Block } from 'galio-framework'
import { HeaderHome } from 'components/common/Header'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { getHeight, getWidth } from 'utils/utils'
import { connect } from 'react-redux'
import { getDashborad } from 'store/Dashboard/actions'
import { get } from 'lodash'
import { RowData } from 'components/common'
import moment from 'moment'
import screens from 'navgation/screens'

class Dashboard extends React.PureComponent {
  // main
  componentDidMount() {
    this.getData()
  }

goMessage = () => {
  const { navigation } = this.props
  navigation.navigate(screens.Message)
}

getData = () => {
  const { doGetData } = this.props
  doGetData({}, this.handleSuccess)
}

handleSuccess = ({ success, errorMessage }) => {
  if (success) {
  //
  } else {
    alert(errorMessage)
  }
}

onRefresh = () => {
  this.getData({}, this.handleSuccess)
}

render() {
  const { sumaryData, isLoading } = this.props
  const lastPaymentDate = get(sumaryData, 'LastPaymentDate') ? moment(get(sumaryData, 'LastPaymentDate'), 'DD-MM-YYYY').format('DD/MM/YYYY') : 'NA'
  const lastPayAmount = get(sumaryData, 'LastPayAmount') ? `£${get(sumaryData, 'LastPayAmount')}` : 'NA'
  const nextPaymentDate = get(sumaryData, 'NextPaymentDate') ? moment(get(sumaryData, 'NextPaymentDate'), 'DD-MM-YYYY').format('DD/MM/YYYY') : 'NA'
  return (
    <Block flex={1} style={styles.contain}>
      <Block>
        <HeaderHome
          title="Dashboard"
          onPressRight={this.goMessage}
        />
      </Block>
      <Block center flex={1} style={styles.main}>
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.onRefresh}
            />
        )}
          showsVerticalScrollIndicator={false}
        >
          <Block flex={1}>
            <RowData checkValue={false} value={lastPaymentDate} style={styles.input} placeholder="Your last payment was on" />
            <RowData checkValue={false} value={lastPayAmount} style={styles.input} placeholder="Your last payment was" />
            <RowData checkValue={false} value={nextPaymentDate} style={styles.input} placeholder="Your next payment is on" />
          </Block>
        </ScrollView>
      </Block>
    </Block>
  )
}
}

const mapStateToProps = ({ dashBoardStore }) => {
  const sumaryData = get(dashBoardStore, 'dashBoardData', {})
  const isLoading = get(dashBoardStore, 'isLoading')
  return {
    sumaryData,
    isLoading,
  }
}

const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getDashborad(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

const styles = StyleSheet.create({
  contain: {

  },
  main: {
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(25),
  },
})
