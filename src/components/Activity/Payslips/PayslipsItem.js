import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Block } from 'galio-framework'
import { getHeight, getWidth, formatMoney, setValue } from 'utils/utils'
import colors from 'utils/colors'

/**
 * @param string id
 * @param string amount
 * @param string time
 * @param function onPress btn function
 */
export default class PayslipsItem extends React.PureComponent {
  render() {
    const { amount = 0, time, onPress = () => {} } = this.props
    return (

      <Block center row space="between" style={styles.contain}>
        <Block style={styles.row1}>
          <Text style={styles.txt1}>{formatMoney(amount)}</Text>
          <Block style={styles.WrapTxt2}>
            <Text style={styles.txt2}>{`Tax Period : ${time}`}</Text>
          </Block>
        </Block>
        <Block row style={styles.row2}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.btn}>DOWNLOAD</Text>
          </TouchableOpacity>
        </Block>
      </Block>
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
  row1: {
  },
  row2: {
  },
  txt1: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(16),
    marginBottom: getHeight(4),
  },
  WrapTxt2: {
    backgroundColor: 'rgba(38, 148, 120,0.2)',
    borderRadius: setValue(2),
    overflow: 'hidden',
    marginTop: getHeight(4),
  },
  txt2: {
    paddingHorizontal: getWidth(6),
    paddingVertical: getHeight(3),
    fontFamily: 'Effra-Regular',
    fontSize: setValue(12),
    color: colors.PRIMARY,
  },
  btn: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(14),
    color: colors.PRIMARY,
  },
})
