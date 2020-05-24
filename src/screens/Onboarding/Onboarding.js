import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Block } from 'galio-framework'
import { HeaderMain } from 'components/common/Header'
import colors from 'utils/colors'
import CircleProgress from 'components/Onboarding/CircleProgress'
import { getHeight, setValue } from 'utils/utils'
import { OnboardingCheckList, ModalGetStarted } from 'components/Onboarding'
import { OnboardingData } from 'utils/mockupData'
import { ModalManager } from 'screens/Global'
import screens from 'navgation/screens'
import { AuthContext } from 'navgation/context'

const IconRight = React.memo(({ onPress }) => (
  <Block middle style={styles.btnActivity}>
    <Text onPress={onPress} style={styles.txtActivity}>Activity</Text>
  </Block>
))

export default ({ navigation }) => {
  const { onBoardingStack } = React.useContext(AuthContext)
  const [checkList, setChecklist] = React.useState([
    1, 2, 3, 4,
  ])


  const goHome = () => {
    ModalManager.hide()
    onBoardingStack()
  }

  const openModal = () => {
    ModalManager.show(<ModalGetStarted onPress={goHome} />, true, null, { justifyContent: 'flex-end' })
  }

  const goScreen = (value) => {
    switch (value) {
      case 2:
        return navigation.navigate(screens.VerifyAssignment)
      case 3:
        return // navigation.navigate(screens.EditBankDetails)
      case 4:
        return navigation.navigate(screens.P45StarterDetail)
      case 5:
        return navigation.navigate(screens.URTNumber)
      case 6:
        return navigation.navigate(screens.IncorporationDocument)
      case 7:
        return navigation.navigate(screens.VATCerificate)
      case 8:
        return navigation.navigate(screens.BankAccountProof)
      case screens.OnboardingSetting:
        return navigation.navigate(screens.OnboardingSetting)
      default:
        break
    }
  }
  return (
    <Block flex={1} styles={styles.contain}>
      <Block>
        <HeaderMain
          onPressLeft={() => goScreen(screens.OnboardingSetting)}
          onPressRight={() => {}}
          leftIconName="settings"
          title="Onboarding"
          prepend={<IconRight onPress={openModal} />}
        />
      </Block>
      <CircleProgress
        style={{ paddingTop: getHeight(36) }}
        value={60}
      />
      <OnboardingCheckList
        data={OnboardingData}
        checkList={checkList}
        onPress={goScreen}
      />
    </Block>
  )
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  // txt Activity
  btnActivity: {

  },
  txtActivity: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.WHITE,
    paddingRight: setValue(14),
  },
})
