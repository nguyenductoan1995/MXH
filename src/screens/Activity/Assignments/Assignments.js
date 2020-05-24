import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet } from 'react-native'
import { AssignmentList } from 'components/VerifyAssignment'
import { connect } from 'react-redux'
import screens from 'navgation/screens'
import { useNavigation } from '@react-navigation/native'

function Assignments({ assignmentsData }) {
  const navigation = useNavigation()

  React.useEffect(() => {

  }, [])


  const goDetail = (id) => {
    navigation.navigate(screens.AssignmentDetail, { id })
  }


  return (
    <Block flex={1} style={styles.contain}>
      <AssignmentList data={assignmentsData} onPress={goDetail} />
    </Block>
  )
}


export default connect()(Assignments)

const styles = StyleSheet.create({
  contain: {

  },
})
