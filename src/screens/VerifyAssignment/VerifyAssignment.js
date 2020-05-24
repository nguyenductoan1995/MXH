import React from 'react'
import { StyleSheet } from 'react-native'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { AssignmentList } from 'components/VerifyAssignment'
import { Button } from 'components/common'
import { screenWidth } from 'utils/utils'
import screens from 'navgation/screens'
import colors from 'utils/colors'
import { VerifyAssignment as data } from 'utils/mockupData'

export default class VerifyAssignment extends React.PureComponent {
goDetail = () => {
  const { navigation } = this.props
  navigation.navigate(screens.AssignmentDetail)
}

goBack = () => {
  const { navigation } = this.props
  navigation.pop()
}

render() {
  return (
    <Block flex={1}>
      <Block>
        <Header onPressLeftIcon={this.goBack} title="Verify Assignment" />
      </Block>
      <Block flex={1}>
        <AssignmentList data={data} onPress={this.goDetail} />
      </Block>
      <Block center style={styles.wrapBtn}>
        <Button
          backgroundColor={colors.PRIMARY}
          safe
          onPress={this.goBack}
          style={styles.btnBottom}
          title="SAVE"
        />
      </Block>
    </Block>
  )
}
}
const styles = StyleSheet.create({
  wrapBtn: {
    position: 'absolute',
    bottom: 0,
  },
  btnBottom: {
    width: screenWidth,
  },

})
