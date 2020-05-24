import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Block } from 'galio-framework'
import { getHeight, getWidth, setValue } from 'utils/utils'
import colors from 'utils/colors'

/**
 * @param string id
 * @param string desc
 * @param string status
 * @param string readOn
 * @param string readDeadline
 * @param function onPress btn function
 */
export default class CompanyItem extends React.PureComponent {
  get getStatus() {
    const { status } = this.props
    switch (status) {
      case 'Read':
        return [
          styles.txt2,
          styles.Green,
        ]
      case 'Unread':
        return [
          styles.txt2,
          styles.Orange,
        ]
      default:
        return [
          styles.txt2,
          styles.Green,
        ]
    }
  }

  get getType() {
    const { status } = this.props
    switch (status) {
      case 'Read':
        return 'Read On : '
      case 'Unread':
        return 'Read Deadline : '
      default:
        return ''
    }
  }

  get getTime() {
    const { status, readOn, readDeadline } = this.props
    switch (status) {
      case 'Read':
        return readOn
      case 'Unread':
        return readDeadline
      default:
        return ''
    }
  }

  render() {
    const { id, status, desc, onPress = () => {} } = this.props
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1, alignItems: 'center' }}>
        <Block style={styles.contain}>
          <Block row space="between" style={styles.row1}>
            <Text style={styles.txt1}>{id}</Text>
            <Text style={this.getStatus}>{status}</Text>
          </Block>
          <Block row space="between" style={styles.row2}>
            <Text style={styles.txt3}>{desc}</Text>
            <Block middle row>
              <Text style={styles.txt4}>{this.getType}</Text>
              <Text style={styles.txt5}>{this.getTime}</Text>
            </Block>
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
    fontFamily: 'Effra-Bold',
    fontSize: setValue(16),
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: colors.BLACK38,
  },
  txt3: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: colors.BLACK38,
  },
  txt4: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(12),
    color: colors.BLACK38,
  },
  txt5: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(12),
    color: colors.BLACKTEXT,
  },
  Orange: {
    color: colors.ORANGE,
  },
  Green: {
    color: colors.GREEN,
  },
})
