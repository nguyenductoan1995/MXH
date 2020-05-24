import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Block } from 'galio-framework'
import { getHeight, getWidth, setValue } from 'utils/utils'
import colors from 'utils/colors'

/**
 * @param string id
 * @param string desc
 * @param function onPress btn function
 */
export default class PersonalItem extends React.PureComponent {
  render() {
    const { id, desc, onPress = () => {} } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1, alignItems: 'center' }}>
        <Block middle left style={styles.contain}>
          <Text style={styles.txt1}>{id}</Text>
          <Text style={styles.txt2}>{desc}</Text>
        </Block>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    height: getHeight(74),
    width: getWidth(348),
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY,
    paddingHorizontal: getWidth(10),
  },
  txt1: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(16),
    marginBottom: getHeight(4),
  },
  txt2: {
    marginTop: getHeight(4),
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: colors.BLACK38,
  },
  btn: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(14),
    color: colors.PRIMARY,
  },
})
