
import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert, Text } from 'react-native'
import { getHeight, getWidth, setValue, formatMoney, screenHeight, formatDate, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { Input, DatePickers, UpdateDocument, Button, Inputmultiline } from 'components/common'
import { SelectList } from 'components/ListModal'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getOptionList } from 'store/OptionList/actions'
import { getRates } from 'store/Assignments/actions'
import { editExpenses } from 'store/Expenses/actions'

class EditExpenses extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Date: get(props, 'data.Date'),
      Type: get(props, 'data.Type'),
      TypeText: get(props, 'data.TypeText'),
      ItemCode: get(props, 'data.ItemCode'),
      VehicleType: get(props, 'data.VehicleType'),
      VehicleTypeText: get(props, 'data.VehicleTypeText'),
      ClaimReference: get(props, 'data.ClaimReference'),
      Description: get(props, 'data.Description'),
      AmoundClaimed: get(props, 'data.AmoundClaimed', 0),
      Document: null,
      TotalAmount: 0,
      VATCode: get(props, 'data.VATCode'),
      VATCodeText: get(props, 'data.VATCodeText'),
    }
  }

  componentDidMount() {
    this.getListOption()
  }

  getListOption =() => {
    const { doGetType, data, MileageListOption, ExpenseItemOption } = this.props
    const Type = get(data, 'Type')
    doGetType({ OptionType: 'ExpenseType' }, () => {
      doGetType({ OptionType: 'VATCodes' }, () => {
        if (Type === 'OM' && MileageListOption.length === 0) {
          return doGetType({ OptionType: 'MileageItem' }, () => { this.setState({ selected: Type }) })
        } if (ExpenseItemOption.length === 0) {
          return doGetType({ OptionType: 'ExpenseItem' }, () => { this.setState({ selected: Type }) })
        }
      })
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

  get getItemCodeShow() {
    const { data } = this.props
    const { Type } = this.state
    if (Type === 'OO') {
      return get(data, 'ItemCode')
    }
    return get(data, 'VehicleType')
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

  onSaveHandle = () => {
    const { doEditData, ContractorID, data } = this.props
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
    } = this.state
    doEditData({
      id: get(data, 'ID'),
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
    }, this.handleSuccess)
  }

  handleSuccess = ({ success, errorMessage }) => {
    const { route } = this.props
    const getData = get(route, 'params.getData', () => {})
    if (success) {
      getData()
      Alert.alert(
        'Success',
        'Edit Expenses Success',
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

  onSelectVAT = (item) => {
    const VATCode = get(item, 'id')
    const VATCodeText = get(item, 'name')
    this.setState({
      VATCode,
      VATCodeText,
    })
  }


  render() {
    const { TotalAmount = 0, selected } = this.state
    const { data } = this.props
    const time = get(data, 'Date')
    const date = formatDate(time)
    const ClaimReference = get(data, 'ClaimReference')
    const Description = get(data, 'Description')
    const Type = get(data, 'Type')
    const TypeText = get(data, 'TypeText')
    const AmoundClaimed = formatMoney(get(data, 'AmoundClaimed'))
    // const ItemCodeText = get(data, 'ItemCode') || get(data, 'VehicleTypeText')
    const VATCodeText = get(data, 'VATCodeText')

    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Edit Expenses"
          />
        </Block>
        <Block flex={1} style={{}}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollWrap}>
            <Block center style={styles.main}>
              <DatePickers
                onDateSelect={(value) => this.handleInput('Date', value)}
                placeholder="Date*"
                style={styles.input}
                date={date}
              />
              {this.getExpenseTypeOption.length !== 0 && (
                <SelectList
                  onSelect={this.onSelectExpenseType}
                  style={styles.input}
                  placeholder="Select Assignment*"
                  data={this.getExpenseTypeOption}
                  selected={Type}
                //  initValue={TypeText}
                />
              )}

              <SelectList
                onSelect={this.onSelectExpenseItem}
                style={styles.input}
                placeholder="Select Assignment*"
                data={this.getExpenseItemOption}
                styleModal={styles.modalSelect}
                // selected={selected}
                selected={selected || this.getItemCodeShow}
              />
              <Input
                value={ClaimReference}
                onChangeText={(value) => this.handleInput('ClaimReference', value)}
                placeholder="Claim Reference*"
                style={styles.input}
              />
              <Inputmultiline
                style={styles.input}
                onChangeText={(value) => this.handleInput('Description', value)}
                placeholder="Description*"
                value={Description}
              />
              <Input
                value={AmoundClaimed}
                keyboardType="numeric"
                onChangeText={(value) => this.handleInput('AmoundClaimed', value)}
                placeholder="Amount Claimed*"
                style={styles.input}
              />
              { AmoundClaimed ? (
                <SelectList
                  onSelect={this.onSelectVAT}
                  style={styles.input}
                  placeholder="Select VAT"
                  data={this.getVATCodesOption}
                  styleModal={styles.modalSelect}
                  // selected={selected}
                  selected={VATCodeText}
                />
              ) : null}
            </Block>
            <Block row middle space="between" style={styles.wrapNet}>
              <Text style={styles.txt1}>Total Amount</Text>
              <Text style={styles.txt2}>{formatMoney(parseFloat(TotalAmount))}</Text>
            </Block>
            <UpdateDocument onPickerSelect={this.SelectDocument} placeholder="Upload Document*" style={styles.updateDocument} />
            <Block flex={1} center>
              <Button disabled={this.checkBtn} onPress={this.onSaveHandle} title="SAVE" style={styles.btnAdd} />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ optionStore, authStore, expensesStore }) => {
  const ExpenseTypeOption = get(optionStore, 'ExpenseType', [])
  const ExpenseItemOption = get(optionStore, 'ExpenseItem', [])
  const MileageListOption = get(optionStore, 'MileageItem', [])
  const VATCodesOption = get(optionStore, 'VATCodes', [])
  const ContractorID = get(authStore, 'LoginData.ContractorID')
  const data = get(expensesStore, 'ExpenseDetail', [])
  return {
    data,
    ExpenseTypeOption,
    ContractorID,
    ExpenseItemOption,
    MileageListOption,
    VATCodesOption,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetType: (evt, cb) => dispatch(getOptionList(evt, cb)),
  doEditData: (evt, cb) => dispatch(editExpenses(evt, cb)),
  doGetRates: (evt, cb) => dispatch(getRates(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditExpenses)


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
