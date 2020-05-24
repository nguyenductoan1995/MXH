import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, ScrollView } from 'react-native'
import colors from 'utils/colors'
import { Header } from 'components/common/Header'
import { Avatar, Function } from 'components/Profile'
import { OnboardingList } from 'utils/mockupData'
import screens from 'navgation/screens'
import { get } from 'lodash'
import { AuthContext } from 'navgation/context'
import { useNavigation } from '@react-navigation/native'

const OnboardingSetting = () => {
  const navigation = useNavigation()
  const { authStackCancel } = React.useContext(AuthContext)
  const goTo = (data) => {
    const screen = get(data, 'name')
    switch (screen) {
      case 'Change Password':
        return navigation.navigate(screens.ChangePassword)
      case 'Change PIN':
        return navigation.navigate(screens.ChangePIN)
      case 'Logout':
        onLogout()
        break
      default:
        break
    }
  }

  const onLogout = () => {
    // doLogout()
    authStackCancel()
  }

  const goBack = () => {
    navigation.pop()
  }


  return (
    <Block flex={1} style={styles.contain}>
      <Block>
        <Header
          onPressLeftIcon={goBack}
          title="Settings"
        />
      </Block>
      <Block flex={1}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Avatar />
        <Function
          data={OnboardingList}
          onPress={goTo}
        />
        {/* </ScrollView> */}
      </Block>
    </Block>
  )
}

export default OnboardingSetting

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
})
