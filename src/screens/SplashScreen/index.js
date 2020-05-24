import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { logo } from 'assets/images'
import { setYAxisValue } from 'utils/utils'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { AuthContext } from 'navgation/context'
import axios from 'axios'

const SplashScreen = ({ navigation, logged, authData }) => {
  const { authStack, mainStack, onBoardingStack } = React.useContext(AuthContext)
  React.useEffect(() => {
    setTimeout(onStart, 1000)
  }, [])


  const onStart = () => {
    axios.defaults.headers.common.ClientID = get(authData, 'apiclientid')
    axios.defaults.headers.common.ClientSecret = get(authData, 'apiclientsecret')
    axios.defaults.headers.common.CompanyID = get(logged, 'CompanyID')
    axios.defaults.headers.common.ContractorID = get(logged, 'ContractorID')
    if (!logged) {
      authStack()
    } else {
      onBoardingStack()
      mainStack()
    }
  }


  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: setYAxisValue(115),
      }}
    >

      <Image resizeMode="contain" source={logo} style={{ width: '60%' }} />
    </TouchableOpacity>
  )
}

const mapStateToProps = ({ authStore }) => {
  const logged = get(authStore, 'LoginData')
  const authData = get(authStore, 'AuthorisationData')
  return {
    logged,
    authData,
  }
}


export default connect(mapStateToProps)(SplashScreen)
