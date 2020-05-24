import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { getHeight, getWidth, setValue, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { Input, Button } from 'components/common'
import { updateProfilePersonal, getProfilePersonal } from 'store/Profile/actions'
import { get } from 'lodash'
import { connect } from 'react-redux'

class EditContact extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Email: get(props, 'data.Email'),
      Mobile: get(props, 'data.Mobile'),
      Landline: get(props, 'data.Landline'),
    }
  }

  get checkButton() {
    const Email = get(this.state, 'Email')
    const Mobile = get(this.state, 'Mobile')
    const obj = [Email, Mobile]
    return checkButton(obj)
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
    const Email = get(data, 'Email')
    const Mobile = get(data, 'Mobile')
    const Landline = get(data, 'Landline')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Edit Contact Details" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap}>
            <Block middle style={styles.main}>
              <Input
                style={styles.input}
                placeholder="Email*"
                value={Email}
                onChangeText={(value) => this.handleInput('Email', value)}
              />
              <Input
                keyboardType="phone-pad"
                style={styles.input}
                placeholder="Mobile*"
                value={Mobile}
                onChangeText={(value) => this.handleInput('Mobile', value)}
              />
              <Input
                keyboardType="numeric"
                style={styles.input}
                placeholder="Landline"
                value={Landline}
                onChangeText={(value) => this.handleInput('Landline', value)}
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
            disabled={this.checkButton}
            onPress={this.onUpdate}
            style={styles.btnSubmit}
            title="SUBMIT"
          />
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore, optionStore }) => {
  const data = get(profileStore, 'ProfilePersonal', [])
  const Country = get(optionStore, 'Country', [])
  return {
    data,
    Country,
  }
}


const mapDispatchToProps = (dispatch) => ({
  updateData: (evt, cb) => dispatch(updateProfilePersonal(evt, cb)),
  doGetProfile: (evt, cb) => dispatch(getProfilePersonal(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditContact)

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
