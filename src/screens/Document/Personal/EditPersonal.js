
import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { getHeight, getWidth, setValue, screenHeight, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { Input, DatePickers, UpdateDocument, Button, Inputmultiline } from 'components/common'
import { SelectList } from 'components/ListModal'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getOptionList } from 'store/OptionList/actions'
import { getRates } from 'store/Assignments/actions'
import { editDocument, getListCompanyPersonal } from 'store/Personal/actions'

class EditPersonal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Description: get(props, 'PersonalDetail.Description'),
      ReceviedOn: get(props, 'PersonalDetail.ReceviedOn'),
      GroupID: get(props, 'PersonalDetail.GroupID'),
      TypeID: get(props, 'PersonalDetail.TypeID'),
      ExpiryDate: get(props, 'PersonalDetail.ExpiryDate'),
      Notes: get(props, 'PersonalDetail.Notes'),
      Document: get(props, 'PersonalDetail.Document'),
    }
  }

  componentDidMount() {
    this.getListOption()
  }

  getListOption =() => {
    const { doGetType } = this.props
    doGetType({ OptionType: 'DocumentGroup' }, () => {
      doGetType({ OptionType: 'VATCodes' })
    })
  }


  get getGroup() {
    const { DocumentGroupOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    DocumentGroupOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get getType() {
    const { DocumentGroupOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    DocumentGroupOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get checkButton() {
    const { Description, ReceviedOn, GroupID, TypeID, ExpiryDate, Document } = this.state
    const obj = [Description, ReceviedOn, GroupID, TypeID, ExpiryDate, Document]
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

  onSelectGroup = (item) => {
    const GroupID = get(item, 'id')
    const GroupText = get(item, 'name')
    this.setState({
      GroupID,
      GroupText,
    })
  }

  onSelectType = (item) => {
    const TypeID = get(item, 'id')
    const TypeText = get(item, 'name')
    return this.setState({
      TypeID,
      TypeText,
    })
  }

  onAddHandle = () => {
    const { doEditData, PersonalDetail } = this.props
    const {
      Description,
      ReceviedOn,
      GroupID,
      TypeID,
      ExpiryDate,
      Notes,
      Document,
    } = this.state
    doEditData({
      id: get(PersonalDetail, 'ID'),
      Description,
      ReceviedOn,
      GroupID,
      TypeID,
      ExpiryDate,
      Notes,
      Document,
    }, this.handleSuccess)
  }

  handleSuccess = ({ success, errorMessage }) => {
    const { onGetData } = this.props
    if (success) {
      onGetData({}, () => {
        Alert.alert(
          'Success',
          'Edit Document Success',
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
    const { PersonalDetail } = this.props
    const Description = get(PersonalDetail, 'Description')
    const ID = get(PersonalDetail, 'GroupID')
    const GroupText = get(PersonalDetail, 'GroupText')
    const TypeID = get(PersonalDetail, 'TypeID')
    const TypeText = get(PersonalDetail, 'TypeText')
    const ReceviedOn = get(PersonalDetail, 'ReceviedOn')
    const ExpiryDate = get(PersonalDetail, 'ExpiryDate')
    const Notes = get(PersonalDetail, 'Notes')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Edit Personal"
          />
        </Block>
        <Block flex={1} style={{}}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollWrap}>
            <Block center style={styles.main}>
              <Input value={Description} onChangeText={(value) => this.handleInput('Description', value)} placeholder="Document Title*" style={styles.input} />
              <SelectList
                onSelect={this.onSelectGroup}
                style={styles.input}
                placeholder="Group*"
                data={this.getGroup}
                selected={ID}
                initValue={GroupText}
              />
              <SelectList
                onSelect={this.onSelectType}
                style={styles.input}
                placeholder="Type*"
                data={this.getType}
                selected={TypeID}
                initValue={TypeText}
              />
              <DatePickers
                onDateSelect={(value) => this.handleInput('ReceviedOn', value)}
                placeholder="Document Date*"
                style={[styles.input, styles.inputlast]}
                date={ReceviedOn}
              />
              <DatePickers
                onDateSelect={(value) => this.handleInput('ExpiryDate', value)}
                placeholder="Expiry Date*"
                style={[styles.input, styles.inputlast]}
                date={ExpiryDate}
              />
              <Inputmultiline
                style={styles.input}
                onChangeText={(value) => this.handleInput('Notes', value)}
                placeholder="Notes"
                value={Notes}
              />
            </Block>
            <UpdateDocument onPickerSelect={this.SelectDocument} placeholder="Upload Document*" style={styles.updateDocument} />
            <Block flex={1} center>
              <Button disabled={this.checkButton} onPress={this.onAddHandle} title="SAVE" style={styles.btnAdd} />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ optionStore, personalStore }) => {
  const DocumentGroupOption = get(optionStore, 'DocumentGroup', [])
  const PersonalDetail = get(personalStore, 'PersonalDetail.0', [])
  return {
    DocumentGroupOption,
    PersonalDetail,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetType: (evt, cb) => dispatch(getOptionList(evt, cb)),
  doEditData: (evt, cb) => dispatch(editDocument(evt, cb)),
  doGetRates: (evt, cb) => dispatch(getRates(evt, cb)),
  onGetData: (evt, cb) => dispatch(getListCompanyPersonal(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditPersonal)


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
    height: getHeight(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
  },
  updateDocument: {
    borderBottomWidth: 0,
    paddingBottom: getHeight(0),
    marginTop: getHeight(30),
  },
  timeSheetRate: {

  },
  btnAdd: {
    width: getWidth(180),
    height: setValue(50),
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
