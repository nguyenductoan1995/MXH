
import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert, Text } from 'react-native'
import { getHeight, getWidth, setValue, formatMoney, screenHeight, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { Input, DatePickers, UpdateDocument, Button, Inputmultiline } from 'components/common'
import { SelectList } from 'components/ListModal'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getOptionList } from 'store/OptionList/actions'
import { getRates } from 'store/Assignments/actions'
import { addExpenses, getExpenses } from 'store/Expenses/actions'

class AddExpenses extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Date: null,
      Type: null,
      TypeText: null,
      ItemCode: null,
      VehicleType: null,
      VehicleTypeText: null,
      ClaimReference: null,
      Description: null,
      AmoundClaimed: 0,
      Document: null,
      TotalAmount: 0,
      VATCode: null,
      VATCodeText: null,
    }
  }

  componentDidMount() {
    this.getListOption()
  }

  getListOption =() => {
    const { doGetType } = this.props
    doGetType({ OptionType: 'ExpenseType' }, () => {
      doGetType({ OptionType: 'VATCodes' })
    })
  }

  get getVATCodesOption() {
    const { VATCodesOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    VATCodesOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get getExpenseTypeOption() {
    const { ExpenseTypeOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    ExpenseTypeOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get getExpenseItemOption() {
    const { Type } = this.state
    const { ExpenseItemOption, MileageListOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    switch (Type) {
      case 'OO':
        ExpenseItemOption.map((item) => {
          newData.push({
            id: get(item, 'Key'),
            name: get(item, 'Text'),
          })
        })
        break
      case 'OM':
        MileageListOption.map((item) => {
          newData.push({
            id: get(item, 'Key'),
            name: get(item, 'Text'),
          })
        })
        break
      default:
        break
    }

    return newData
  }

  get checkBtn() {
    const { Date, Type, TypeText, ItemCode, VehicleType, VehicleTypeText, ClaimReference, Description, AmoundClaimed, Document, VATCode, VATCodeText } = this.state
    if (Type === 'OO') {
      const obj = [Date, Type, TypeText, ItemCode, Description, AmoundClaimed, VATCode, VATCodeText]
      return checkButton(obj)
    }
    const obj = [Date, Type, TypeText, VehicleType, VehicleTypeText, Description, AmoundClaimed, VATCode, VATCodeText]
    return checkButton(obj)
  }


  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  SelectDocument = (Document) => {
    this.setState({ Document })
  }

  onSelectExpenseType = (item) => {
    const { doGetType } = this.props
    const Type = get(item, 'id')
    const TypeText = get(item, 'name')
    this.setState({
      selected: -1,
      Type,
      TypeText,
    })
    if (Type === 'OM') {
      return doGetType({ OptionType: 'MileageItem' }, () => { this.setState({ selected: Type }) })
    }
    return doGetType({ OptionType: 'ExpenseItem' }, () => { this.setState({ selected: Type }) })
  }

  onSelectExpenseItem = (item) => {
    const { Type } = this.state
    const id = get(item, 'id')
    const name = get(item, 'name')
    if (Type === 'OM') {
      return this.setState({
        VehicleType: id,
        VehicleTypeText: name,
        ItemCode: null,
      })
    }
    return this.setState({
      ItemCode: id,
      VehicleType: null,
      VehicleTypeText: null,
    })
  }

  onSelectVAT = (item) => {
    const VATCode = get(item, 'id')
    const VATCodeText = get(item, 'name')
    this.setState({
      VATCode,
      VATCodeText,
    })
  }

  onAddHandle = () => {
    const { doAddData, ContractorID } = this.props
    const {
      Date,
      Type,
      TypeText,
      ItemCode,
      VehicleType,
      VehicleTypeText,
      ClaimReference,
      Description,
      AmoundClaimed,
      Document,
      VATCode,
      VATCodeText,
    } = this.state
    doAddData({
      ContractorID,
      Date,
      Type,
      TypeText,
      ItemCode,
      VehicleType,
      VehicleTypeText,
      ClaimReference,
      Description,
      AmoundClaimed,
      Document,
      VATCode,
      VATCodeText,
    }, this.handleSuccess)
  }

  handleSuccess = ({ success, errorMessage }) => {
    if (success) {
      const { doGetData } = this.props
      doGetData()
      Alert.alert(
        'Success',
        'Add Expenses Success',
        [
          { text: 'OK', onPress: this.goBack },
        ],
        { cancelable: false },
      )
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
    const { selected, AmoundClaimed } = this.state
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Add Expenses"
          />
        </Block>
        <Block flex={1} style={{}}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollWrap}>
            <Block center style={styles.main}>
              <DatePickers onDateSelect={(value) => this.handleInput('Date', value)} placeholder="Date*" style={styles.input} />
              <SelectList
                onSelect={this.onSelectExpenseType}
                style={styles.input}
                placeholder="Select Assignment*"
                data={this.getExpenseTypeOption}
              />
              <SelectList
                onSelect={this.onSelectExpenseItem}
                style={styles.input}
                placeholder="Select Item*"
                data={this.getExpenseItemOption}
                styleModal={styles.modalSelect}
                selected={selected}
              />
              <Input onChangeText={(value) => this.handleInput('ClaimReference', value)} placeholder="Claim Reference" style={styles.input} />
              <Inputmultiline style={styles.input} onChangeText={(value) => this.handleInput('Description', value)} placeholder="Description*" />
              <Input keyboardType="numeric" onChangeText={(value) => this.handleInput('AmoundClaimed', value)} placeholder="Amount Claimed*" style={styles.input} />
              { AmoundClaimed ? (
                <SelectList
                  onSelect={this.onSelectVAT}
                  style={styles.input}
                  placeholder="Select VAT"
                  data={this.getVATCodesOption}
                  styleModal={styles.modalSelect}
                />
              ) : null}
            </Block>
            <Block row middle space="between" style={styles.wrapNet}>
              <Text style={styles.txt1}>Total Amount</Text>
              <Text style={styles.txt2}>{formatMoney(parseFloat(AmoundClaimed))}</Text>
            </Block>
            <UpdateDocument onPickerSelect={this.SelectDocument} placeholder="Upload Document" style={styles.updateDocument} />
            <Block flex={1} center>
              <Button disabled={this.checkBtn} onPress={this.onAddHandle} title="SUBMIT" style={styles.btnAdd} />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ optionStore, authStore }) => {
  const ExpenseTypeOption = get(optionStore, 'ExpenseType', [])
  const ExpenseItemOption = get(optionStore, 'ExpenseItem', [])
  const MileageListOption = get(optionStore, 'MileageItem', [])
  const VATCodesOption = get(optionStore, 'VATCodes', [])
  const ContractorID = get(authStore, 'LoginData.ContractorID')
  return {
    ExpenseTypeOption,
    ContractorID,
    ExpenseItemOption,
    MileageListOption,
    VATCodesOption,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetType: (evt, cb) => dispatch(getOptionList(evt, cb)),
  doAddData: (evt, cb) => dispatch(addExpenses(evt, cb)),
  doGetRates: (evt, cb) => dispatch(getRates(evt, cb)),
  doGetData: (evt, cb) => dispatch(getExpenses(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses)


const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(25),
  },
  lastInput: {
    borderBottomWidth: 0,
  },
  main: {
  },
  scrollWrap: {
    justifyContent: 'center',
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
  updateDocument: {
    borderBottomWidth: 0,
    paddingBottom: getHeight(0),
  },
  timeSheetRate: {

  },
  btnAdd: {
    width: getWidth(180),
    height: getHeight(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
    marginVertical: getHeight(27),
  },
  workLocation: {
    fontFamily: 'EffraMedium-Regular',
    fontSize: setValue(10),
    color: colors.PRIMARY,
    paddingHorizontal: getWidth(16),
    paddingTop: getHeight(15),
  },
  wrapNet: {
    marginTop: getHeight(22),
    height: getHeight(71),
    backgroundColor: '#efefef',
    paddingHorizontal: getWidth(24),
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.BLACK54,
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.BLACK87,
  },
  modalSelect: {
    height: screenHeight / 2,
  },
})
