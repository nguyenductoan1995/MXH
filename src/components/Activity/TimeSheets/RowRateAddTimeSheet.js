import React from 'react'
import { Block } from 'galio-framework'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import VectorIcon from 'components/common/VectorIcon'
import { screenWidth, getHeight, getWidth, setValue, formatMoney } from 'utils/utils'
import colors from 'utils/colors'

/**
 * @param string title
 * @param function onPress return (title)
 * @param object style
 * @param object titleStyle
 */
export default class RowRateAddTimeSheet extends React.PureComponent {
  render() {
    const { title, onPress = () => {}, style, titleStyle, disabled, rateAmount } = this.props
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={disabled}
          onPress={() => onPress(title)}
          style={[styles.contain, style, !rateAmount && { borderBottomWidth: getHeight(3) }]}
        >
          <Block flex={1} middle space="between" row style={styles.wrapView}>
            <Text style={[styles.txt, titleStyle]}>{title}</Text>
            <VectorIcon
              type="fa"
              name="angle-right"
              size={setValue(16)}
              style={styles.icon}
            />
          </Block>
        </TouchableOpacity>
        {rateAmount ? (
          <Block row middle space="between" style={styles.wrapNet}>
            <Text style={styles.txt1}>Net</Text>
            <Text style={styles.txt2}>{formatMoney(parseFloat(rateAmount))}</Text>
          </Block>
        ) : null}
      </>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth,
    borderBottomColor: '#ebebeb',
    height: getHeight(45),
    paddingHorizontal: getWidth(16),
  },
  wrapView: {
  },
  txt: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: colors.BLACK87,
  },
  wrapNet: {
    height: getHeight(71),
    backgroundColor: '#efefef',
    paddingHorizontal: getWidth(24),
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.BLACK54,
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.BLACK87,
  },
})
