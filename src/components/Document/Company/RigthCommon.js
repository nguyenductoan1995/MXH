import React from 'react'
import { Block } from 'galio-framework'
import VectorIcon from 'components/common/VectorIcon'
import { setValue, getWidth } from 'utils/utils'
import { StyleSheet } from 'react-native'
import colors from 'utils/colors'

/**
 * @param function download
 * @param function print
 * @param object style
 */
export default class RightCommon extends React.PureComponent {
  render() {
    const { download = () => {}, print = () => {}, style } = this.props
    return (
      <Block row middle style={[styles.contain, style]}>
        <VectorIcon onPress={download} color={colors.WHITE} style={styles.download} size={setValue(18)} name="download" type="ant" />
        <VectorIcon onPress={print} color={colors.WHITE} style={styles.printer} size={setValue(18)} name="printer" type="simple" />
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {

  },
  download: {
    marginRight: getWidth(20),
  },
  printer: {

  },
})
