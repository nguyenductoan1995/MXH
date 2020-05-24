import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, ScrollView } from 'react-native'
import colors from 'utils/colors'
import { HeaderHome } from 'components/common/Header'
import { Avatar, Detail, Function } from 'components/Profile'
import { get } from 'lodash'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { logout } from 'store/Authorisation/actions'
import { AuthContext } from 'navgation/context'
import { useNavigation } from '@react-navigation/native'

const Profile = ({ doLogout }) => {
  const navigation = useNavigation()
  const { logoutTouchID } = React.useContext(AuthContext)
  const goTo = (data) => {
    const screen = get(data, 'name')
    switch (screen) {
      case 'Personal Details':
        return navigation.navigate(screens.PersonalDetails)
      case 'Bank Details':
        return navigation.navigate(screens.BankDetails)
      case 'HMRC Details':
        return navigation.navigate(screens.HMRCDetails)
      case 'Payroll Details':
        return navigation.navigate(screens.PayrollDetails)
      case 'Change Password':
        return navigation.navigate(screens.ChangePassword)
      case 'Change PIN':
        return navigation.navigate(screens.ChangePIN)
      case 'Referrals':
        return navigation.navigate(screens.Referrals)
      case 'Logout':
        onLogout()
        break
      default:
        break
    }
  }

  const goMessage = () => {
    navigation.navigate(screens.Message)
  }

  const onLogout = () => {
    // doLogout()
    logoutTouchID()
  }


  return (
    <Block flex={1} style={styles.contain}>
      <Block>
        <HeaderHome
          onPressRight={goMessage}
          title="Profile"
        />
      </Block>
      <Block flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Avatar />
          <Detail onPress={goTo} />
          <Function onPress={goTo} />
        </ScrollView>
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
  doLogout: (evt, cb) => dispatch(logout(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
})
