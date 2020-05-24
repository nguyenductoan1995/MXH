import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { getHeight, getWidth, setValue } from 'utils/utils'
import colors from 'utils/colors'
import { Input, Button } from 'components/common'
import { getBankDetail, updateBankDetail } from 'store/Profile/actions'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { InCorrect } from 'components/Login'

class EditBankDetails extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  get checkAcountNumber() {
    const AccountNumber = get(this.state, 'AccountNumber')
    const length = AccountNumber ? AccountNumber.length : 0
    switch (true) {
      case length > 0 && length !== 8:
        return (
          <InCorrect message="Account number should be 8 digits" />
        )
      default:
        return null
    }
  }

  get checkSortCode() {
    const SortCode = get(this.state, 'SortCode')
    const length = SortCode ? SortCode.length : 0
    switch (true) {
      case length > 0 && length !== 6:
        return (
          <InCorrect message="Sort code should be 6 digits" />
        )
      default:
        return null
    }
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  onUpdate = () => {
    const { updateData, data } = this.props
    updateData({
      ...data,
      ...this.state,
    }, this.handleSuccess)
  }

  handleSuccess = ({ success, errorMessage }) => {
    const { doGetData } = this.props
    if (success) {
      doGetData({}, () => {
        Alert.alert(
          'Success',
          'Update Banks Success',
          [
            { text: 'OK', onPress: this.goBack },
          ],
          { cancelable: false },
        )
      })
    } else {
      Alert.alert(
        'Error',
        errorMessage,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      )
    }
  }

  render() {
    const { data } = this.props
    const AccountName = get(data, 'AccountName')
    const AccountNumber = get(data, 'AccountNumber')
    const SortCode = get(data, 'SortCode')
    const BankName = get(data, 'BankName')
    const BuildingSocietyNumber = get(data, 'BuildingSocietyNumber')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Edit Bank Details" />
        </Block>
        <Block flex={1} middle>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollWrap}>
            <Block middle style={styles.main}>
              <Input
                style={styles.input}
                placeholder="Bank Account Name"
                value={AccountName}
                onChangeText={(value) => this.handleInput('AccountName', value)}
              />
              <Input
                style={styles.input}
                placeholder="Account Number"
                value={AccountNumber}
                onChangeText={(value) => this.handleInput('AccountNumber', value)}
                incorrect={this.checkAcountNumber}
                prepend={this.checkAcountNumber}
              />
              <Input
                style={styles.input}
                placeholder="Sort Code"
                value={SortCode}
                onChangeText={(value) => this.handleInput('SortCode', value)}
                incorrect={this.checkSortCode}
                prepend={this.checkSortCode}
              />
              <Input
                style={styles.input}
                placeholder="Bank Name"
                value={BankName}
                onChangeText={(value) => this.handleInput('BankName', value)}
              />
              <Input
                style={[styles.input]}
                placeholder="Building Society Number"
                value={BuildingSocietyNumber}
                onChangeText={(value) => this.handleInput('BuildingSocietyNumber', value)}
              />
            </Block>
          </ScrollView>
        </Block>
        <Block
          safe
          center
          style={styles.wrapBtnSubmit}
        >
          <Button
            disabled={this.checkAcountNumber || this.checkSortCode}
            onPress={this.onUpdate}
            style={styles.btnSubmit}
            title="SUBMIT"
          />
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'BankDetail', [])

  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getBankDetail(evt, cb)),
  updateData: (evt, cb) => dispatch(updateBankDetail(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBankDetails)

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
  wrapBtnSubmit: {
    position: 'absolute',
    bottom: setValue(26),
    borderRadius: setValue(25),
  },
  btnSubmit: {
    width: getWidth(180),
    height: setValue(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
  },
})
