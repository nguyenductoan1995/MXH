import React from 'react'
import { View, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native'
import { Input, Button } from 'components/common'
import { screenWidth, setYAxisValue, setValue, setXAxisValue } from 'utils/utils'
import colors from 'utils/colors'
import { Screen } from 'lib'
import { ModalManager } from 'screens/Global'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getAuthorisation } from 'store/Authorisation/actions'

class EmployerCode extends Screen {
  constructor(props) {
    super(props)

    this.state = {
      code: 'EMPR1001', //
    }
  }


  onChangeText= (code) => {
    this.setState({ code })
  }

  onGetAuthorisation = () => {
    const { doEmployerCode } = this.props
    const { code } = this.state
    doEmployerCode({
      EmployerCode: code,
      BearerToken: '2206793d-9a41-4c3d-b62e-d9c768d88749',
    }, this.onNext)
  }

  onNext = ({ success, errorMessage }) => {
    if (success) {
      const { navigation } = this.props
      navigation.navigate(screens.Login)
    } else {
      alert(errorMessage)
    }
  }


  emptyCode = () => {
    ModalManager.show(
      <View style={styles.wrapPopup}>
        <Text style={styles.txt4}>
          {`This could mean one of two things
1. Your employer is not registered 
  to use the app
2. Contact your employer to issue
  your employer code and login 
 credentials`}
        </Text>
        <TouchableOpacity onPress={() => ModalManager.hide()} style={styles.btnOk}>
          <Text style={styles.txt6}>OK</Text>
        </TouchableOpacity>
      </View>, false,
    )
  }


  render() {
    const { code } = this.state
    return (
      <View style={styles.contain}>
        <Text style={styles.txt1}>Hey!</Text>
        <Text style={styles.txt2}>Please enter your employer code</Text>
        <Input
          keyboardType="name-phone-pad"
          style={styles.textInput}
          placeholder="Enter Employer Code*"
          onChangeText={this.onChangeText}
          autoFocus

        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnBottom}
          onPress={this.emptyCode}
        >
          <Text style={styles.txt3}>Don’t have  employer code?</Text>
        </TouchableOpacity>
        <View style={styles.buttonView}>
          <Button
            safe
            backgroundColor={colors.PRIMARY}
            onPress={this.onGetAuthorisation}
            style={{ width: screenWidth, height: 50 }}
            disabled={!code}
            title="NEXT"
          />
        </View>
      </View>

    )
  }
}

const mapStateToProps = ({ authStore }) => {
  const fullname = get(authStore, 'signIn.data.fullname')
  return {
    fullname,
  }
}

const mapDispatchToProps = (dispatch) => ({
  doEmployerCode: (evt, cb) => dispatch(getAuthorisation(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployerCode)

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(24),
    color: colors.PRIMARY,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginHorizontal: setXAxisValue(28),
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginHorizontal: setXAxisValue(28),
    marginTop: setYAxisValue(8),
    color: colors.BLACK,
  },
  textInput: {
    width: screenWidth * 0.83,
    marginTop: setYAxisValue(25),

  },
  buttonView: { position: 'absolute', bottom: 0 },
  btnBottom: {
    fontFamily: 'Effra-Regular',
    textAlign: 'left',
    alignSelf: 'flex-end',
    marginHorizontal: setXAxisValue(28),
    marginTop: setYAxisValue(19),
    ...Platform.select({
      ios: {
        marginBottom: 100,
      },
    }),
  },
  txt3: {
    color: colors.PRIMARY,
  },
  wrapPopup: {
    backgroundColor: colors.WHITE,
    marginHorizontal: setXAxisValue(40),
    borderRadius: setValue(2),
  },
  btnOk: {
    width: setXAxisValue(74),
    height: setYAxisValue(52),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  txt4: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    marginHorizontal: setYAxisValue(24),
    marginTop: setYAxisValue(20),
    color: '#333333',
    lineHeight: 24,
  },
  txt6: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(14),
    color: colors.PRIMARY,
  },
})
