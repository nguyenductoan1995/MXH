import React from 'react'
import { StyleSheet, Platform, Alert } from 'react-native'
import { Block } from 'galio-framework'
import { Screen } from 'lib'
import { getWidth, getHeight, screenWidth, setValue } from 'utils/utils'
import { Input, Button } from 'components/common'
import colors from 'utils/colors'
import { Header } from 'components/common/Header'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

export default function SignUp({ }) {
  const navigation = useNavigation()
  const [username, setUserName] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [confirmPassWord, setConfirmPassWord] = React.useState(null)
  const goBack = () => {
    navigation.pop()
  }

  const doLogin = () => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then((value) => {
        console.tron.log(value)
        Alert.alert(
          'Success',
          'Sign up success',
          [
            { text: 'OK', onPress: goBack },
          ],
          { cancelable: false },
        )
        console.tron.log('User account created & signed in!')
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.tron.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.tron.log('That email address is invalid!')
        }

        console.tron.error(error)
      })
  }

  const isDisable = username !== null && password !== null && confirmPassWord !== null && password === confirmPassWord
  return (
    <Block style={styles.contain}>
      <Header onPressLeftIcon={goBack} title="Sign up" />
      <Block flex={1} center>
        <Input
          keyboardType="email-address"
          style={styles.input}
          placeholder="Username*"
          onChangeText={setUserName}
          value={username}
        />
        <Input
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Password*"
        />
        <Input
          onChangeText={setConfirmPassWord}
          secureTextEntry
          style={styles.input}
          placeholder="Confirm Password*"
        />
        <Block style={styles.buttonView}>
          <Button
            safe
            disabled={!isDisable}
            backgroundColor={colors.PRIMARY}
            onPress={doLogin}
            style={{ width: screenWidth, height: getHeight(50) }}
            title="SIGN UP"
          />
        </Block>
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: getWidth(30),
    marginTop: getHeight(20),
    marginBottom: getHeight(16),

  },
  input: {
    width: getWidth(327),
    height: getHeight(52),
    marginTop: getHeight(15),
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
  },
  btnBottom: {
    fontFamily: 'Effra-Regular',
    textAlign: 'left',
    alignSelf: 'flex-end',
    marginHorizontal: setValue(28),
    marginTop: setValue(19),
    ...Platform.select({
      ios: {
        marginBottom: 100,
      },
    }),
  },
})
