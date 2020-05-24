
import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Text, Alert } from 'react-native'
import { getHeight, getWidth, setValue, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { Input, DatePickers, UpdateDocument, Button } from 'components/common'
import { SelectList } from 'components/ListModal'
import { RowRateAddTimeSheet } from 'components/Activity'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getAssignmentList, getOptionList } from 'store/OptionList/actions'
import { addTimeSheets, getTimeSheets } from 'store/TimeSheets/actions'
import { getRates } from 'store/Assignments/actions'
import screens from 'navgation/screens'

class AddTimesheet extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      AgencyName: null,
      AssignmentID: null,
      StartDate: null,
      EndDate: null,
      NetAmount: null,
      AddressLine1: null,
      AddressLine2: null,
      Town: null,
      County: null,
      PostCode: null,
      CountryID: null,
      Document: null,
      Lines: null,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { doGetCountry, doGetListAssignment, AssignmentOption, CountryOption } = this.props
    if (AssignmentOption.length === 0) {
      doGetListAssignment()
    }
    if (CountryOption) {
      doGetCountry({ OptionType: 'Country' })
    }
  }


  get assignmentList() {
    const { AssignmentOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    AssignmentOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get CountryOption() {
    const { CountryOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    CountryOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get checkButton() {
    const { AssignmentID, StartDate, EndDate, NetAmount, AddressLine1, PostCode, CountryID, Lines } = this.state
    const obj = [AssignmentID, StartDate, EndDate, NetAmount, AddressLine1, PostCode, CountryID, Lines]
    return checkButton(obj)
  }


  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    switch (screen) {
      case 'Timesheet Rates*':
        return navigation.navigate(screens.RateTimeSheet, { handleRate: this.handleRate })
      default:
    }
  }

  handleRate = (NetAmount, Lines) => {
    this.setState({ NetAmount, Lines })
  }

  onAddHandle = () => {
    const { doAddData, ContractorID } = this.props
    const {
      AgencyName,
      AssignmentID,
      StartDate,
      EndDate,
      NetAmount,
      AddressLine1,
      AddressLine2,
      Town,
      County,
      PostCode,
      CountryID,
      Document,
      Lines,
    } = this.state
    doAddData({
      AgencyName,
      AssignmentID,
      ContractorID,
      StartDate,
      EndDate,
      NetAmount,
      WorkLocation: {
        AddressLine1,
        AddressLine2,
        Town,
        County,
        PostCode,
        CountryID,
      },
      Lines,
      Document: get(Document, '0', {}),
    }, this.handleSuccess)
  }

  handleSuccess = ({ success, errorMessage }) => {
    if (success) {
      const { doGetData } = this.props
      doGetData()
      Alert.alert(
        'Success',
        'Add Time Sheet Success',
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

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  SelectDocument = (Document) => {
    this.setState({ Document })
  }

  onSelectAssignment = (item) => {
    const { doGetRates } = this.props
    const id = get(item, 'id')
    this.setState({ AssignmentID: id })
    doGetRates({ id })
  }


  render() {
    const { NetAmount } = this.state
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Add Timesheet"
          />
        </Block>
        <Block flex={1} style={{}}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollWrap}
            showsVerticalScrollIndicator={false}
          >
            <Block center style={styles.main}>
              <Input onChangeText={(value) => this.handleInput('AgencyName', value)} style={styles.input} placeholder="Agency Name" />
              <SelectList
                onSelect={this.onSelectAssignment}
                style={styles.input}
                placeholder="Select Assignment*"
                data={this.assignmentList}
              />
              <DatePickers onDateSelect={(value) => this.handleInput('StartDate', value)} placeholder="Start Date*" style={styles.input} />
              <DatePickers onDateSelect={(value) => this.handleInput('EndDate', value)} placeholder="End Date*" style={[styles.input]} />
            </Block>
            <UpdateDocument onPickerSelect={this.SelectDocument} placeholder="Upload Document" style={styles.updateDocument} />
            <RowRateAddTimeSheet
              onPress={this.goTo}
              style={styles.timeSheetRate}
              title="Timesheet Rates*"
              rateAmount={NetAmount}
            />
            <Block left>
              <Text style={styles.workLocation}>WORK LOCATION</Text>
            </Block>
            <Block flex={1} center>
              <Input onChangeText={(value) => this.handleInput('PostCode', value)} placeholder="Postcode*" style={styles.input} />
              <Input onChangeText={(value) => this.handleInput('AddressLine1', value)} placeholder="Address Line 1*" style={styles.input} />
              <Input onChangeText={(value) => this.handleInput('AddressLine2', value)} placeholder="Address Line 2" style={styles.input} />
              <Input onChangeText={(value) => this.handleInput('Town', value)} placeholder="Town/City" style={styles.input} />
              <Input onChangeText={(value) => this.handleInput('County', value)} placeholder="County" style={styles.input} />
              <SelectList
                onSelect={(item) => { this.setState({ CountryID: get(item, 'id', null) }) }}
                style={styles.input}
                placeholder="Country*"
                data={this.CountryOption}
              />
              <Button disabled={this.checkButton} amount onPress={this.onAddHandle} title="SUBMIT" style={styles.btnAdd} />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ timeSheetsStore, optionStore, authStore }) => {
  const data = get(timeSheetsStore, 'timeSheetDetail', [])
  const AssignmentOption = get(optionStore, 'Assignments', [])
  const CountryOption = get(optionStore, 'Country', [])
  const ContractorID = get(authStore, 'LoginData.ContractorID')
  return {
    data,
    AssignmentOption,
    CountryOption,
    ContractorID,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetListAssignment: (evt, cb) => dispatch(getAssignmentList(evt, cb)),
  doGetCountry: (evt, cb) => dispatch(getOptionList(evt, cb)),
  doAddData: (evt, cb) => dispatch(addTimeSheets(evt, cb)),
  doGetRates: (evt, cb) => dispatch(getRates(evt, cb)),
  doGetData: (evt, cb) => dispatch(getTimeSheets(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddTimesheet)


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
    marginTop: getHeight(26),
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
})
