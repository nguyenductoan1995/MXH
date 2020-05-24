import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getWidth, getHeight, screenWidth } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import { get } from 'lodash'
import { connect } from 'react-redux'

class SPPDetail extends React.PureComponent {
  componentDidMount() {
    const { route, doGetData } = this.props
    const id = get(route, 'params.id')
    doGetData({ id }, this.handleGetData)
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


  render() {
    const { data } = this.props
    const DueDate = get(data, '')
    const TaxPeriod = get(data, '')
    const Amount = get(data, '')
    const Type = get(data, '')
    const Paid = get(data, '')
    const KitDays = get(data, '')
    const StopReason = get(data, '')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="SPP Detail" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData styleValue={styles.styleTxtRow} value={DueDate} style={styles.input} placeholder="Due Date" />
              <RowData styleValue={styles.styleTxtRow} value={TaxPeriod} style={styles.input} placeholder="Tax Period" />
              <RowData styleValue={styles.styleTxtRow} value={Amount} style={styles.input} placeholder="Amount" />
              <RowData styleValue={styles.styleTxtRow} value={Type} style={[styles.input]} placeholder="Type" />
              <RowData styleValue={styles.styleTxtRow} value={Paid} style={[styles.input]} placeholder="Paid?" />
              <RowData styleValue={styles.styleTxtRow} value={KitDays} style={[styles.input]} placeholder="Kit Days" />
              <RowData styleValue={styles.styleTxtRow} value={StopReason} style={[styles.input, styles.rowDataLast]} placeholder="Stop Reason" />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'SPPDetail', {})
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  // doGetData: (evt, cb) => dispatch(getSMPDetail(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SPPDetail)

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
    width: screenWidth,
  },
  styleTxtRow: { fontFamily: 'EffraMedium-Regular' },
})
