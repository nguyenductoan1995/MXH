
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
import { addTimeSheets, editTimeSheets } from 'store/TimeSheets/actions'
import { getRates } from 'store/Assignments/actions'
import screens from 'navgation/screens'

class EditTimeSheet extends React.PureComponent {
  constructor(props) {
    super(props)
    const { data } = props
    this.state = {
      AgencyName: get(data, 'AgencyName', null),
      AssignmentID: get(data, 'AssignmentID', null),
      StartDate: get(data, 'StartDate', null),
      EndDate: get(data, 'EndDate', null),
      NetAmount: get(data, 'NetAmount', null),
      AddressLine1: get(data, 'WorkLocation.AddressLine1', null),
      AddressLine2: get(data, 'WorkLocation.AddressLine2', null),
      Town: get(data, 'WorkLocation.Town', null),
      County: get(data, 'WorkLocation.County', null),
      PostCode: get(data, 'WorkLocation.PostCode', null),
      CountryID: get(data, 'WorkLocation.CountryID', null),
      Document: get(data, 'Document', null),
      Lines: get(data, 'Lines', null),
    }
  }


  get assignmentList() {
    const { AssignmentOption } = this.props
    const newData = [{ id: -1, name: 'None' }]
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
    const newData = [{ id: -1, name: 'None' }]
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
    const { navigation, data } = this.props
    switch (screen) {
      case 'Timesheet Rates*':
        return navigation.navigate(screens.RateTimeSheet, { handleRate: this.handleRate, Lines: get(data, 'Lines', []) })
      default:
    }
  }

  handleRate = (NetAmount, Lines) => {
    this.setState({ NetAmount, Lines })
  }

  onAddHandle = () => {
    const { doEditData, ContractorID, data } = this.props
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
    const id = get(data, 'ID')
    doEditData({
      id,
      AgencyName,
      AssignmentID,
      ContractorID,
      StartDate,
      EndDate,
      NetAmount,
      Document,
      WorkLocation: {
        AddressLine1,
        AddressLine2,
        Town,
        County,
        PostCode,
        CountryID,
      },
      Lines,
      // Document: get(Document, '0', {}),
    }, this.handleSuccess)
  }

  handleSuccess = ({ success, errorMessage }) => {
    if (success) {
      Alert.alert(
        'Success',
        'Edit Time Sheet Success',
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
    const { NetAmount: net } = this.state
    const { data } = this.props
    const AgencyName = get(data, 'AgencyName')
    const AssignmentID = get(data, 'AssignmentID')
    const StartDate = get(data, 'StartDate')
    const EndDate = get(data, 'EndDate')
    const NetAmount = get(data, 'NetAmount')
    const AddressLine1 = get(data, 'WorkLocation.AddressLine1')
    const AddressLine2 = get(data, 'WorkLocation.AddressLine2')
    const Town = get(data, 'WorkLocation.Town')
    const County = get(data, 'WorkLocation.County')
    const PostCode = get(data, 'WorkLocation.PostCode')
    const CountryID = get(data, 'WorkLocation.CountryID')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Edit Timesheet"
          />
        </Block>
        <Block flex={1} style={{}}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollWrap}
            showsVerticalScrollIndicator={false}
          >
            <Block center style={styles.main}>
              <Input value={AgencyName} onChangeText={(value) => this.handleInput('AgencyName', value)} style={styles.input} placeholder="Agency Name" />
              <SelectList
                onSelect={this.onSelectAssignment}
                style={styles.input}
                placeholder="Select Assignment*"
                data={this.assignmentList}
                selected={AssignmentID}
              />
              <DatePickers date={StartDate} onDateSelect={(value) => this.handleInput('StartDate', value)} placeholder="Start Date*" style={styles.input} />
              <DatePickers date={EndDate} onDateSelect={(value) => this.handleInput('EndDate', value)} placeholder="End Date*" style={[styles.input]} />
            </Block>
            <UpdateDocument onPickerSelect={this.SelectDocument} placeholder="Upload Document" style={styles.updateDocument} />
            <RowRateAddTimeSheet
              onPress={this.goTo}
              style={styles.timeSheetRate}
              title="Timesheet Rates*"
              rateAmount={net || NetAmount}
            />
            <Block left>
              <Text style={styles.workLocation}>WORK LOCATION</Text>
            </Block>
            <Block flex={1} center>
              <Input value={PostCode} onChangeText={(value) => this.handleInput('PostCode', value)} placeholder="Postcode*" style={styles.input} />
              <Input value={AddressLine1} onChangeText={(value) => this.handleInput('AddressLine1', value)} placeholder="Address Line 1*" style={styles.input} />
              <Input value={AddressLine2} onChangeText={(value) => this.handleInput('AddressLine2', value)} placeholder="Address Line 2" style={styles.input} />
              <Input value={Town} onChangeText={(value) => this.handleInput('Town', value)} placeholder="Town/City" style={styles.input} />
              <Input value={County} onChangeText={(value) => this.handleInput('County', value)} placeholder="County" style={styles.input} />
              <SelectList
                onSelect={(item) => { this.setState({ CountryID: item.id }) }}
                style={styles.input}
                placeholder="Country*"
                data={this.CountryOption}
                selected={CountryID}
              />
              <Button disabled={this.checkButton} onPress={this.onAddHandle} title="SUBMIT" style={styles.btnAdd} />
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
  doAddData: (evt, cb) => dispatch(addTimeSheets(evt, cb)),
  doGetRates: (evt, cb) => dispatch(getRates(evt, cb)),
  doEditData: (evt, cb) => dispatch(editTimeSheets(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditTimeSheet)


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
