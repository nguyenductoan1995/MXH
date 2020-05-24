import React from 'react'
import { Text } from 'galio-framework'
import { TouchableOpacity, StyleSheet } from 'react-native'
import VectorIcon from 'components/common/VectorIcon'
import { getWidth, getHeight } from 'utils/utils'

class OnboardingListItem extends React.PureComponent {
  render() {
    const { name, onPress = () => {} } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.contain}
      >
        <Text style={styles.name}>{name}</Text>
        <VectorIcon
          type="fa"
          name="angle-right"
          size={16}
          style={styles.icon}
        />
      </TouchableOpacity>
    )
  }
}

export default OnboardingListItem

const styles = StyleSheet.create({
  contain: {
    marginHorizontal: getWidth(20),
    height: getHeight(47),
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.19)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Effra-Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.87)',
    marginLeft: getWidth(10),
  },
  icon: {
    marginRight: getWidth(10),
  },
})
