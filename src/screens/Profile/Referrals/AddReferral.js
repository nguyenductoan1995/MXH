import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, screenWidth } from 'utils/utils'
import colors from 'utils/colors'
import { Input, DatePickers, Button } from 'components/common'
import { connect } from 'react-redux'
import { getProfilePersonal } from 'store/Profile/actions'
import { get } from 'lodash'

class AddReferral extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {

  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    navigation.navigate()
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="New Referrals"
          />
        </Block>

        <Block middle flex={1} style={styles.main}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: screenWidth }}
          >
            {/* PERSONAL */}
            <Block middle flex={1} style={styles.section}>
              <Input
                onChangeText={(value) => this.handleInput('Forename', value)}
                style={styles.input}
                placeholder="Forename"
              />
              <Input
                onChangeText={(value) => this.handleInput('Surname', value)}
                style={styles.input}
                placeholder="Surname"
              />
              <DatePickers
                placeholder="Date of Referral"
                onDateSelect={this.onDateSelect}
                style={styles.input}
              />
              <Input
                onChangeText={(value) => this.handleInput('Email', value)}
                style={styles.input}
                placeholder="Email"
              />
              <Input
                onChangeText={(value) => this.handleInput('Phone no.', value)}
                style={styles.input}
                placeholder="Phone no."
              />
            </Block>
          </ScrollView>
        </Block>
        <Block style={styles.btn}>
          <Button
            safe
            backgroundColor={colors.PRIMARY}
            onPress={() => {}}
            style={{ width: screenWidth }}
            title="SUBMIT"
          />
        </Block>
      </Block>
    )
  }
}
const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'ProfilePersonal', [])
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getProfilePersonal(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddReferral)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  section: {
  },
  main: {
  },
  txt1: {
    fontFamily: 'EffraMedium-Regular',
    fontSize: 10,
    color: colors.PRIMARY,
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(20),
  },
  inputlast: {
  },
  btn: {
    position: 'absolute',
    bottom: 0,
  },
})
