import React from 'react'
import { Text, Block } from 'galio-framework'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { getWidth, getHeight, setValue } from 'utils/utils'
import colors from 'utils/colors'

class OnboardingListItem extends React.PureComponent {
  render() {
    const { name, onPress = () => {} } = this.props
    return (
      <Block row middle space="between" style={styles.contain}>
        <Text style={styles.txt1}>{name}</Text>
        <TouchableOpacity style={styles.wrapBtn} onPress={onPress}>
          <Text style={styles.txt2}>DOWNLOAD</Text>
        </TouchableOpacity>
      </Block>
    )
  }
}

export default OnboardingListItem

const styles = StyleSheet.create({
  contain: {
    marginHorizontal: getWidth(6),
    height: getHeight(50),
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.19)',
    paddingHorizontal: getWidth(10),
  },
  txt1: {
    fontFamily: 'EffraMedium-Regular',
    fontSize: setValue(16),
    color: colors.BLACK87,
  },
  wrapBtn: {

  },
  txt2: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(14),
    color: colors.PRIMARY,
  },

})
