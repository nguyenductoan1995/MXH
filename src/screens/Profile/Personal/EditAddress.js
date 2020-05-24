import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { getHeight, getWidth, setValue, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { SelectList } from 'components/ListModal'
import { Input, Button } from 'components/common'
import { get, findIndex, upperCase } from 'lodash'
import { connect } from 'react-redux'
import { updateProfilePersonal, getProfilePersonal } from 'store/Profile/actions'

class EditAddress extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Line1: get(props, 'data.Address.Line1'),
      Line2: get(props, 'data.Address.Line2'),
      City: get(props, 'data.Address.City'),
      County: get(props, 'data.Address.County'),
      PostCode: get(props, 'data.Address.PostCode'),
      Country: get(props, 'data.Address.Country'),
    }
  }

  get getListCountry() {
    const { Country } = this.props
    const newData = [{ id: 0, name: 'None' }]
    Country.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get checkButton() {
    const Line1 = get(this.state, 'Line1')
    const Line2 = get(this.state, 'Line2')
    const City = get(this.state, 'City')
    const County = get(this.state, 'County')
    const PostCode = get(this.state, 'PostCode')
    const Country = get(this.state, 'Country')
    const obj = [Line1, Line2, City, County, Country, PostCode]
    return checkButton(obj)
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  onSelectCountry = (item) => {
    const Country = get(item, 'name')
    this.setState({
      Country,
    })
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  onUpdate = () => {
    const { updateData, data } = this.props
    updateData({
      ...data,
      Address: {
        ...data.Address,
        ...this.state,
      },
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
    const Line1 = get(data, 'Address.Line1')
    const Line2 = get(data, 'Address.Line2')
    const City = get(data, 'Address.City')
    const County = get(data, 'Address.County')
    const PostCode = get(data, 'Address.PostCode')
    const Country = get(data, 'Address.Country')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Edit Address " />
        </Block>
        <Block flex={1} middle>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollWrap}>
            <Block middle style={styles.main}>
              <Input
                style={styles.input}
                placeholder="Address Line 1*"
                value={Line1}
                onChangeText={(value) => this.handleInput('Line1', value)}
              />
              <Input
                style={styles.input}
                placeholder="Address Line 2*"
                value={Line2}
                onChangeText={(value) => this.handleInput('Line2', value)}
              />
              <Input
                style={styles.input}
                placeholder="Town/City*"
                value={City}
                onChangeText={(value) => this.handleInput('City', value)}
              />
              <Input
                style={styles.input}
                placeholder="County*"
                value={County}
                onChangeText={(value) => this.handleInput('County', value)}
              />
              <Input
                style={styles.input}
                placeholder="Post Code*"
                value={PostCode}
                onChangeText={(value) => this.handleInput('PostCode', value)}
              />
              <SelectList
                onSelect={this.onSelectCountry}
                style={styles.input}
                placeholder="Country*"
                data={this.getListCountry}
                selected={get(this.getListCountry, `${findIndex(this.getListCountry, { name: upperCase(Country) })}.id`)}
              //  initValue={Country}
              />
            </Block>
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
  const Country = get(optionStore, 'Country', [])
  return {
    data,
    Country,
  }
}


const mapDispatchToProps = (dispatch) => ({
  // doGetData: (evt, cb) => dispatch(getOptionLis(evt, cb)),
  updateData: (evt, cb) => dispatch(updateProfilePersonal(evt, cb)),
  doGetProfile: (evt, cb) => dispatch(getProfilePersonal(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditAddress)

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
    height: setValue(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
    marginVertical: getHeight(58),
  },
})
