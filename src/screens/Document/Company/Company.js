import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import screens from 'navgation/screens'
import { useNavigation } from '@react-navigation/native'
import { CompanyList } from 'components/Document'
import colors from 'utils/colors'

function Company() {
  const navigation = useNavigation()
  React.useEffect(() => {
  }, [])

  const goDetail = (id) => {
    navigation.navigate(screens.CompanyDetail, { id })
  }


  return (
    <Block flex={1} style={styles.contain}>
      <CompanyList onPress={goDetail} />
    </Block>
  )
}


export default connect()(Company)


const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.GREY97,
  },
})
