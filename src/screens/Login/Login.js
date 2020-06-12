import React from 'react'
import { StyleSheet, Text, Platform, TouchableOpacity, StatusBar } from 'react-native'
import { Block } from 'galio-framework'
import colors from 'utils/colors'
import { getHeight, getWidth, setValue, screenWidth } from 'utils/utils'
import FastImage from 'react-native-fast-image'
import { tree } from 'assets/images'
import { Input, Button } from 'components/common'
import { InCorrect } from 'components/Login'
import { ScrollView } from 'react-native-gesture-handler'
import screens from 'navgation/screens'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { login } from 'store/Authorisation/actions'
import { AuthContext } from 'navgation/context'
import auth from '@react-native-firebase/auth'


function Login({ doLogin, AuthorisationData, navigation }) {
  const { mainStack } = React.useContext(AuthContext)
  const [username, setUserName] = React.useState('toan@gmail.com')
  const [password, setPassWord] = React.useState('toan123')

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = React.useState(true)
  const [user, setUser] = React.useState()

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.tron.log(user)
    if (user) {
      mainStack()
    }
    setUser(user)
    if (initializing) setInitializing(false)
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  const forgotPassword = () => {
    navigation.navigate(screens.ForgotPassWord)
  }

  const onLogin = () => {
    doLogin({
      params: {
        username,
        password,
      },
      callback: () => onNext(),
    })
  }

  const onNext = ({ success, errorMessage }) => {
    if (success) {
      return mainStack()
    }
    return mainStack()
    alert(errorMessage)
  }

  const onSignUp = () => {
    navigation.navigate(screens.SignUp)
  }

  const isActive = username && password
  if (initializing) return null
  return (
    <Block flex={1} style={{ backgroundColor: colors.WHITE }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.PRIMARY} />
      <Block
        space="between"
        row
        style={styles.header}
      >
        <Block left bottom style={styles.wrapTxt}>
          <Text style={styles.txt1}>Welcome to</Text>
          <Text style={styles.txt2}>MXH Tòn Péo</Text>
        </Block>
      </Block>
      <ScrollView>
        <Block center>
          <Input
            keyboardType="email-address"
            style={styles.input}
            placeholder="Username*"
            onChangeText={(value) => setUserName(value)}
            value={username}
          />
          <Input
            onChangeText={(value) => setPassWord(value)}
            secureTextEntry
              // prepend={<InCorrect message="Incorrect Password" />}
              // incorrect
            style={styles.input}
            placeholder="Password*"
            value={password}
          />
          <Block row bottom>
            <TouchableOpacity style={styles.btnSignup} onPress={onSignUp}>
              <Text style={styles.txtForgot}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnForgot} onPress={forgotPassword}>
              <Text style={styles.txtForgot}>Forgot Password</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </ScrollView>
      <Block style={[styles.btnLogin]}>
        <Button
          disabled={!isActive}
          safe
          backgroundColor={colors.PRIMARY}
          onPress={onLogin}
          style={{ width: screenWidth }}
          title="LOGIN"
        />
      </Block>
    </Block>
  )
}

const mapStateToProps = ({ authStore }) => {
  const AuthorisationData = get(authStore, 'AuthorisationData')
  return {
    AuthorisationData,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doLogin: (evt, cb) => dispatch(login(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  // header
  header: {
    backgroundColor: colors.PRIMARY,
    height: getHeight(96),
    paddingHorizontal: setValue(10),
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.24,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  wrapTxt: {
    marginBottom: setValue(11),
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: 'rgba(255,255,255,0.54)',
    marginLeft: 6,
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(20),
    color: '#ffffff',
    marginLeft: 6,
  },
  treeStyle: {
    width: getWidth(110),
    height: getHeight(73),
  },
  // Main
  input: {
    width: getWidth(327),
    height: getHeight(52),
    marginTop: setValue(30),
    borderBottomColor: 'rgba(0,0,0,0.12)',
  },
  btnLogin: { position: 'absolute', bottom: 0 },
  btnForgot: {
    marginTop: setValue(20),
  },
  btnSignup: {
    marginTop: setValue(20),
    marginRight: getWidth(10),
  },
  txtForgot: {
    fontFamily: 'Effra-Regular',
    color: colors.PRIMARY,
    fontSize: setValue(16),
  },
})
