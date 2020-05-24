import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { getHeight, getWidth, setValue, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { SelectList } from 'components/ListModal'
import { Input, Button, DatePickers } from 'components/common'
import { RadioButton } from 'components/Profile'
import { get, findIndex } from 'lodash'
import { connect } from 'react-redux'
import { getOptionList } from 'store/OptionList/actions'
import { updateProfilePersonal, getProfilePersonal } from 'store/Profile/actions'

class EditPersonalDetails extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Title: get(props, 'data.Title'),
      Forename: get(props, 'data.Forename'),
      Surname: get(props, 'data.Surname'),
      DateofBirth: get(props, 'data.DateofBirth'),
      Gender: get(props, 'data.Gender'),
      MaritalStatus: get(props, 'data.MaritalStatus'),
    }
  }


  get getListTitle() {
    const { Title } = this.props
    const newData = [{ id: 0, name: 'None' }]
    Title.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get getListGender() {
    const { Gender } = this.props
    const newData = []
    Gender.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get getListMaritalStatus() {
    const { MaritalStatus } = this.props
    const newData = []
    MaritalStatus.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get checkButton() {
    const { Title, Forename, Surname, DateofBirth, Gender, MaritalStatus } = this.state
    const obj = [Title, Forename, Surname, DateofBirth, Gender, MaritalStatus]
    return checkButton(obj)
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  onSelectTitle = (item) => {
    // const id = get(item, 'id')
    const Title = get(item, 'name')
    this.setState({
      Title,
    })
  }

  onSelectGender = (item) => {
    const Gender = get(item, 'name')
    this.setState({
      Gender,
    })
  }

  onSelectMaritalStatus = (item) => {
    const MaritalStatus = get(item, 'name')
    this.setState({
      MaritalStatus,
    })
  }

  onUpdate = () => {
    const { updateData, data } = this.props
    updateData({
      ...data,
      ...this.state,
    }, this.handleSuccess)
  }

  handleSuccess = ({ success, errorMessage }) => {
    const { doGetProfile } = this.props
    if (success) {
      doGetProfile({}, () => {
        Alert.alert(
          'Success',
          'Update Profile Success',
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
    const Forename = get(data, 'Forename')
    const Surname = get(data, 'Surname')
    const Title = get(data, 'Title')
    const DateofBirth = get(this.state, 'DateofBirth')
    const Gender = get(data, 'Gender')
    const MaritalStatus = get(data, 'MaritalStatus')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Edit Personal Details" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap}>
            <Block middle style={styles.main}>
              <SelectList
                onSelect={this.onSelectTitle}
                style={styles.input}
                placeholder="Title*"
                data={this.getListTitle}
                selected={Title}
              />
              <Input
                value={Forename}
                onChangeText={(value) => this.handleInput('Forename', value)}
                placeholder="Forename*"
                style={styles.input}
              />
              <Input
                value={Surname}
                onChangeText={(value) => this.handleInput('Surname', value)}
                placeholder="Surname*"
                style={styles.input}
              />
            </Block>
            <RadioButton
              data={this.getListGender}
              title="Gender*"
              onSelect={this.onSelectGender}
              selected={findIndex(this.getListGender, { name: Gender })}
            />
            <Block middle>
              <DatePickers
                onDateSelect={(value) => this.handleInput('DateofBirth', value)}
                placeholder="Date of Birth*"
                style={[styles.input, styles.inputlast]}
                date={DateofBirth}
              />
            </Block>
            <RadioButton
              title="Marital Status*"
              onSelect={this.onSelectMaritalStatus}
              data={this.getListMaritalStatus}
              selected={findIndex(this.getListMaritalStatus, { name: MaritalStatus })}
            />
            <Block
              middle
            >
              <Button
                disabled={this.checkButton}
                onPress={this.onUpdate}
                style={styles.btnSubmit}
                title="SUBMIT"
              />
            </Block>
          </ScrollView>
        </Block>

      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore, optionStore }) => {
  const data = get(profileStore, 'ProfilePersonal', [])
  const Title = get(optionStore, 'Title', [])
  const Gender = get(optionStore, 'Gender', [])
  const MaritalStatus = get(optionStore, 'MaritalStatus', [])
  return {
    data,
    Title,
    Gender,
    MaritalStatus,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getOptionList(evt, cb)),
  updateData: (evt, cb) => dispatch(updateProfilePersonal(evt, cb)),
  doGetProfile: (evt, cb) => dispatch(getProfilePersonal(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalDetails)
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
    // position: 'absolute',
    // bottom: setValue(26),
    // borderRadius: setValue(25),
  },
  btnSubmit: {
    width: getWidth(180),
    height: setValue(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
    marginVertical: getHeight(30),
  },
})
