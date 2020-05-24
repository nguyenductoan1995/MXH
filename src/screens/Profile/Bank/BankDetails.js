import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, setValue } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getBankDetail } from 'store/Profile/actions'

class BankDetails extends React.PureComponent {
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
      case screens.EditBankDetails:
        return navigation.navigate(screens.EditBankDetails)
      default:
        break
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
          <Header
            onPressRightIcon={() => this.goTo(screens.EditBankDetails)}
            onPressLeftIcon={this.goBack}
            title="Bank Details"
            rightIconName="pencil"
            typeright="simple"
          />
        </Block>
        <Block flex={1} middle>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollWrap}>
            <Block middle style={styles.main}>
              <RowData
                value={AccountName}
                style={styles.input}
                placeholder="Bank Account Name"
              />
              <RowData
                value={AccountNumber}
                style={styles.input}
                placeholder="Account Number"
              />
              <RowData
                value={SortCode}
                style={styles.input}
                placeholder="Sort Code"
              />
              <RowData
                value={BankName}
                style={styles.input}
                placeholder="Bank Name"
              />
              <RowData
                value={BuildingSocietyNumber}
                style={styles.input}
                placeholder="Building Society Number"
              />
            </Block>
          </ScrollView>
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
  // doGetOption: (evt, cb) => dispatch(getOptionList(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(BankDetails)

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
