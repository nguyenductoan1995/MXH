import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import colors from 'utils/colors'
import { P60List } from 'components/Document'

function P60({ }) {
  const navigation = useNavigation()
  React.useEffect(() => {

  }, [])

  const goTo = (screen) => {

  }


  return (
    <Block flex={1} style={styles.contain}>
      <P60List onPress={(vl) => { alert(vl) }} />
    </Block>
  )
}

const mapDispatchToProps = (dispatch) => ({
//  onGetData: (evt, cb) => dispatch(getData(evt, cb)),
})


export default connect(null, mapDispatchToProps)(P60)


const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.GREY97,
  },
})
