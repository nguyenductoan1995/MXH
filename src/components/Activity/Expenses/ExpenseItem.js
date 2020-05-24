import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Block } from 'galio-framework'
import { getHeight, getWidth, setValue, formatDate, formatMoney } from 'utils/utils'
import colors from 'utils/colors'

/**
 * @param string id
 * @param string amount
 * @param string time
 * @param strong status
 * @param function onPress
 */
export default class ExpenseItem extends React.PureComponent {
  get status() {
    const { status } = this.props
    switch (status) {
      case 'Submitted':
        return [styles.txt6, styles.orange]
      case 'Approved':
      case 'Approved & Paid':
        return [styles.txt6, styles.green]
      default:
        return [styles.txt6]
    }
  }


  render() {
    const { id, amount, time, onPress = () => {}, status } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <Block style={styles.contain}>
          <Block row space="between" style={styles.row1}>
            <Text style={styles.txt1}>{id}</Text>
            <Text style={styles.txt4}>{amount ? formatMoney(amount) : ''}</Text>
          </Block>
          <Block space="between" row style={styles.row2}>
            <Text style={styles.txt5}>{formatDate(time)}</Text>
            <Text style={this.status}>{status}</Text>
          </Block>
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
    justifyContent: 'center',
  },
  row1: {
    marginBottom: getHeight(4),
  },
  row2: {
    marginTop: getHeight(4),
  },
  txt1: {
    fontSize: setValue(16),
    fontFamily: 'Effra-Bold',
    color: 'rgba(0,0,0,0.87)',
  },
  WrapTxt3: {
    backgroundColor: 'rgba(38, 148, 120,0.2)',
    borderRadius: setValue(2),
    overflow: 'hidden',
    marginLeft: getWidth(10),
  },
  txt3: {
    paddingHorizontal: getWidth(6),
    paddingVertical: getHeight(3),
    fontFamily: 'Effra-Regular',
    fontSize: setValue(12),
    color: colors.PRIMARY,
  },
  txt4: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(16),
    color: colors.PRIMARY,
  },
  txt5: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: 'rgba(0,0,0,0.38)',
  },
  txt6: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
  },
  orange: {
    color: '#f5a623',
  },
  green: {
    color: '#5eb400',
  },
})
