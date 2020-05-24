import React from 'react'
import { Block } from 'galio-framework'
import { Text, TextInput, StyleSheet } from 'react-native'
import { getWidth, getHeight, setValue } from 'utils/utils'
import colors from 'utils/colors'

/**
 * @param string code
 * @param string rate
 * @param function onChangeText
 */
export default class RowRate extends React.PureComponent {
  render() {
    const { code, rate, unit, onChangeText = () => {}, style } = this.props
    return (
      <Block flex={1} space="between" row style={[styles.contains, style]}>
        <Block middle left>
          <Text style={styles.txt1}>{code}</Text>
          <Text style={styles.txt2}>{`Rate : £${rate}`}</Text>
        </Block>
        <Block center style={styles.WrapInput}>
          <TextInput
            onChangeText={onChangeText}
            keyboardType="numeric"
            placeholder="0.00"
            style={styles.input}
            value={unit}
          />
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contains: {
    width: getWidth(328),
    height: getHeight(70),
    borderBottomWidth: getHeight(1),
    borderBottomColor: colors.GREY,
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.BLACK87,
    marginBottom: getHeight(2),
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: 'rgba(0,0,0,0.38)',
    marginTop: getHeight(2),
  },
  WrapInput: {
    width: getWidth(80),
    height: getHeight(30),
    borderBottomWidth: getHeight(1),
    borderBottomColor: colors.PRIMARY,
    color: colors.BLACK87,
  },
  input: {
    flex: 1,
    width: '100%',
    textAlign: 'right',
  },
})
