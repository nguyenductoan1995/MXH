import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import screens from 'navgation/screens'
import { useNavigation } from '@react-navigation/native'
import colors from 'utils/colors'
import { OnboardingList } from 'components/Document'

function Onboarding({ }) {
  const navigation = useNavigation()
  React.useEffect(() => {

  }, [])

  const goTo = (screen) => {
    switch (screen) {
      case 0:
        return navigation.navigate(screens.P45StarterDetail)
      case 1:
        return navigation.navigate(screens.URTNumber)
      case 2:
        return navigation.navigate(screens.VerifyAssignment)
      case 3:
        return navigation.navigate(screens.IncorporationDocument)
      case 4:
        return navigation.navigate(screens.VATCerificate)
      case 5:
        return navigation.navigate(screens.BankAccountProof)
      default:
        break
    }
  }


  return (
    <Block flex={1} style={styles.contain}>
      <OnboardingList onPress={goTo} />
    </Block>
  )
}

const mapDispatchToProps = (dispatch) => ({
//  onGetData: (evt, cb) => dispatch(getData(evt, cb)),
})


export default connect(null, mapDispatchToProps)(Onboarding)


const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.GREY97,
  },
})
