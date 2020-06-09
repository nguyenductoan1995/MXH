
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, ForgotPassWord, SetNewPassWord, LoginWithTouchID } from 'screens/Login'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IconTabbarCustom } from 'components/common'
import { getHeight, setValue } from 'utils/utils'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { NewFeeds } from 'screens/NewFeeds'
import { Notification } from 'screens/Notification'
import screens from './screens'
import { AuthContext } from './context'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Home() {
  return (
    <Tab.Navigator
      initialRouteName={screens.Dashboard}
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        tabBarIcon: (props) => (
          <IconTabbarCustom {...props} route={route} />
        )
        ,
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'blue',
        // activeBackgroundColor: 'rgba(38, 148, 120,0.2)',
        style: {
          height: getHeight(56),
          // paddingTop: getHeight(12),
        },
        tabStyle: {
          // borderTopWidth: 1,
        },
      }}

    >
      <Tab.Screen name={screens.NewFeeds} component={NewFeeds} />
      <Tab.Screen name={screens.Notification} component={Notification} />
      {/*   <Tab.Screen name={screens.Document} component={Document} />
      <Tab.Screen name={screens.Profile} component={Profile} /> */}

    </Tab.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      {/* Auth */}
      <Stack.Screen
        options={{ headerMode: 'none' }}
        name={screens.Login}
        component={Login}
      />
      <Stack.Screen
        options={{ headerMode: 'none' }}
        name={screens.ForgotPassWord}
        component={ForgotPassWord}
      />
      <Stack.Screen
        options={{ headerMode: 'none' }}
        name={screens.SetNewPassWord}
        component={SetNewPassWord}
      />
    </Stack.Navigator>
  )
}

function App({ logged }) {
  const [authStack, setAuthStack] = React.useState(true)
  const [onboarding, setOnboarding] = React.useState(true)
  const [touchID, setTouchID] = React.useState(true)
  const authContext = React.useMemo(() => ({
    onBoardingStack: () => {
      setOnboarding(false)
    },
    authStack: () => {
      setAuthStack(true)
      setOnboarding(true)
    },
    authStackCancel: () => {
      setAuthStack(true)
      setOnboarding(true)
      setTouchID(false)
    },
    mainStack: () => {
      setAuthStack(false)
      // setOnboarding(false)
    },
    loginTouchID: () => {
      setTouchID(false)
    },
    logoutTouchID: () => {
      setTouchID(true)
    },
  }), [])

  React.useEffect(() => {
    // if (!logged) {
    //   setAuthStack(true)
    //   setOnboarding(true)
    // } else {
    //   setAuthStack(false)
    //   setOnboarding(false)
    // }
  }, [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {authStack ? (
            <Stack.Screen
              name={screens.AuthStack}
              component={AuthStack}
            />
          ) : (
            <>
              {/* Home */}
              <Stack.Screen
                options={{ headerMode: 'none' }}
                name={screens.Home}
                component={Home}
              />
            </>
          ) }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const mapStateToProps = ({ authStore }) => {
  const logged = get(authStore, 'LoginData')
  return {
    logged,
  }
}


export default connect(mapStateToProps)(App)
