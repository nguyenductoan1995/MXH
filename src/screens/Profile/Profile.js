import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, ScrollView } from 'react-native'
import colors from 'utils/colors'
import { HeaderHome } from 'components/common/Header'
import { Avatar, Function } from 'components/Profile'
import { get } from 'lodash'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { logout } from 'store/Authorisation/actions'
import { AuthContext } from 'navgation/context'
import { useNavigation } from '@react-navigation/native'

const Profile = ({ doLogout }) => {
  const navigation = useNavigation()
  const { logoutTouchID } = React.useContext(AuthContext)


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
          <Function />
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
