
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { EmployerCode } from 'screens/EmployerCode'
import { Login, ForgotPassWord, SetNewPassWord, LoginWithTouchID } from 'screens/Login'
import { Onboarding, OnboardingSetting } from 'screens/Onboarding'
import { P45StarterDetail } from 'screens/P45StarterDetail'
import { URTNumber } from 'screens/UTRNumber'
import { VerifyAssignment, AssignmentDetail, Rate } from 'screens/VerifyAssignment'
import { IncorporationDocument } from 'screens/IncorporationDocument'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IconTabbarCustom } from 'components/common'
import { getHeight, setValue } from 'utils/utils'
import { Profile, PersonalDetails, EditPersonalDetails, EditAddress, EditContactDetails, BankDetails, EditBankDetails, HMRCDetails, StatutoryDeductions, SMP, SMPDetail, SSP, StudentLoan, AttachmentOrders, AttachmentOrdersDetail, SAP, SAPDetail, SPP, SPPDetail, PayrollDetails, HolidayPay, ChangePassword, ChangePIN, AutoEnrollment, Referrals, ReferralDetail, AddReferral, EditReferral } from 'screens/Profile'
import { Document, PersonalDetail, EditPersonal, AddPersonal, CompanyDetail } from 'screens/Document'
import { Dashboard } from 'screens/Dashboard'
import { Activity, TimeSheetDetail, AddTimesheet, RateTimeSheet, EditTimeSheet, AddExpenses, EditExpenses } from 'screens/Activity'
import { connect } from 'react-redux'
import { get } from 'lodash'
import ExpenseDetail from 'screens/Activity/Expenses/ExpenseDetail'
import { VATCerificate } from 'screens/VATCerificate'
import { BankAccountProof } from 'screens/BankAccountProof'
import { Message, ComposeMessage, MessageView } from 'screens/Message'
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
        activeBackgroundColor: 'rgba(38, 148, 120,0.2)',
        style: {
          height: getHeight(56),
          paddingTop: getHeight(12),
          borderTopWidth: 0,
        },
        tabStyle: {
          height: 31,
          borderRadius: setValue(6),

        },
      }}

    >
      <Tab.Screen name={screens.Dashboard} component={Dashboard} />
      <Tab.Screen name={screens.Activity} component={Activity} />
      <Tab.Screen name={screens.Document} component={Document} />
      <Tab.Screen name={screens.Profile} component={Profile} />

    </Tab.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      {/* Auth */}
      <Stack.Screen
        options={{ headerMode: 'none' }}
        name={screens.EmployerCode}
        component={EmployerCode}
      />
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
    if (!logged) {
      setAuthStack(true)
      setOnboarding(true)
    } else {
      setAuthStack(false)
      setOnboarding(false)
    }
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
              {onboarding && (
                <>
                  {/* Onboard */}
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.Onboarding}
                    component={Onboarding}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.OnboardingSetting}
                    component={OnboardingSetting}
                  />
                </>
              )}
              {touchID && !onboarding ? (
                <Stack.Screen
                  options={{ headerMode: 'none' }}
                  name={screens.LoginWithTouchID}
                  component={LoginWithTouchID}
                />
              ) : (
                <>
                  {/* Home */}
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.Home}
                    component={Home}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.PersonalDetails}
                    component={PersonalDetails}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditPersonalDetails}
                    component={EditPersonalDetails}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditAddress}
                    component={EditAddress}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditContactDetails}
                    component={EditContactDetails}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.BankDetails}
                    component={BankDetails}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditBankDetails}
                    component={EditBankDetails}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.HMRCDetails}
                    component={HMRCDetails}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.StatutoryDeductions}
                    component={StatutoryDeductions}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.SMP}
                    component={SMP}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.SMPDetail}
                    component={SMPDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.SSP}
                    component={SSP}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.StudentLoan}
                    component={StudentLoan}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AttachmentOrders}
                    component={AttachmentOrders}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AttachmentOrdersDetail}
                    component={AttachmentOrdersDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.SAP}
                    component={SAP}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.SAPDetail}
                    component={SAPDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.SPP}
                    component={SPP}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.SPPDetail}
                    component={SPPDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.PayrollDetails}
                    component={PayrollDetails}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.HolidayPay}
                    component={HolidayPay}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.ChangePassword}
                    component={ChangePassword}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.ChangePIN}
                    component={ChangePIN}
                  />
                  {/*  */}
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.P45StarterDetail}
                    component={P45StarterDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.URTNumber}
                    component={URTNumber}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.VerifyAssignment}
                    component={VerifyAssignment}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AssignmentDetail}
                    component={AssignmentDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.Rate}
                    component={Rate}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.IncorporationDocument}
                    component={IncorporationDocument}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.TimeSheetDetail}
                    component={TimeSheetDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AddTimesheet}
                    component={AddTimesheet}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.RateTimeSheet}
                    component={RateTimeSheet}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditTimeSheet}
                    component={EditTimeSheet}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.ExpenseDetail}
                    component={ExpenseDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AddExpenses}
                    component={AddExpenses}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditExpenses}
                    component={EditExpenses}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.PersonalDetail}
                    component={PersonalDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditPersonal}
                    component={EditPersonal}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AddPersonal}
                    component={AddPersonal}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.CompanyDetail}
                    component={CompanyDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AutoEnrollment}
                    component={AutoEnrollment}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.Referrals}
                    component={Referrals}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.ReferralDetail}
                    component={ReferralDetail}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.AddReferral}
                    component={AddReferral}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.VATCerificate}
                    component={VATCerificate}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.BankAccountProof}
                    component={BankAccountProof}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.Message}
                    component={Message}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.ComposeMessage}
                    component={ComposeMessage}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.MessageView}
                    component={MessageView}
                  />
                  <Stack.Screen
                    options={{ headerMode: 'none' }}
                    name={screens.EditReferral}
                    component={EditReferral}
                  />
                </>
              )}

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
