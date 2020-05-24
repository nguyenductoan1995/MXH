import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getWidth, getHeight, screenWidth, formatDate, formatMoney } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getAttachmentOrdersDetail } from 'store/Profile/actions'

class AttachmentOrdersDetail extends React.PureComponent {
  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { doGetData, route } = this.props
    const id = get(route, 'params.id', '')
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
    const { route } = this.props
    const id = get(route, 'params.id')
    const { data } = this.props
    const DeductionDescription = get(data, 'DeductionDescription')
    const Priority = get(data, 'Priority')
    const EffectiveDate = get(data, 'EffectiveDate') ? formatDate(get(data, 'EffectiveDate')) : ''
    const EndDate = get(data, 'EndDate') ? formatDate(get(data, 'EndDate')) : ''
    // const DeductionMethodID = get(data, 'DeductionMethodID')
    const DeductionMethod = get(data, 'DeductionMethod')
    const DeductionRate = formatMoney(get(data, 'DeductionRate'))
    const ProtectedMinimum = formatMoney(get(data, 'ProtectedMinimum'))
    const MarginFee = formatMoney(get(data, 'MarginFee'))
    // const OrderReference = get(data, 'OrderReference')
    const TotalAttachment = formatMoney(get(data, 'TotalAttachment'))
    const DeductionThisPeriod = formatMoney(get(data, 'DeductionThisPeriod'))
    const DeductionCF = formatMoney(get(data, 'DeductionCF'))
    const DeductionSoFar = formatMoney(get(data, 'DeductionSoFar'))
    const DeductionBF = formatMoney(get(data, 'DeductionBF'))
    const LastPaidDate = get(data, 'LastPaidDate') ? formatDate(get(data, 'LastPaidDate')) : ''
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title={`Attachment ${id} Orders`} />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData
                style={styles.input}
                placeholder="Deduction Description"
                value={DeductionDescription}
              />
              <RowData
                style={styles.input}
                placeholder="Priority"
                value={Priority}
              />
              <RowData
                style={styles.input}
                placeholder="Effective Date "
                value={EffectiveDate}
              />
              <RowData
                style={styles.input}
                placeholder="End Date"
                value={EndDate}
              />
              <RowData
                style={styles.input}
                placeholder="Deducition Method"
                value={DeductionMethod}
              />
              <RowData
                style={styles.input}
                placeholder="Deduction Rate"
                value={DeductionRate}
              />
              <RowData
                style={styles.input}
                placeholder="Protected Minimum"
                value={ProtectedMinimum}
              />
              <RowData
                style={styles.input}
                placeholder="Margin Fee"
                value={MarginFee}
              />
              <RowData
                style={styles.input}
                placeholder="Total Attachment"
                value={TotalAttachment}
              />
              <RowData
                style={styles.input}
                placeholder="Deduction this Period"
                value={DeductionThisPeriod}
              />
              <RowData
                style={styles.input}
                placeholder="Deduction C/F"
                value={DeductionCF}
              />
              <RowData
                style={styles.input}
                placeholder="Deduction so far"
                value={DeductionSoFar}
              />
              <RowData
                style={styles.input}
                placeholder="Deduction B/F"
                value={DeductionBF}
              />
              <RowData
                style={[styles.input]}
                placeholder="Last Paid Date"
                value={LastPaidDate}
              />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}


const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'AttachmentOrdersDetail')
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getAttachmentOrdersDetail(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentOrdersDetail)

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
})
