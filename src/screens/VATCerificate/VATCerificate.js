import React from 'react'
import { Block } from 'galio-framework'
import { Button, UpdateDocument } from 'components/common'
import { screenWidth, getHeight } from 'utils/utils'
import colors from 'utils/colors'
import { StyleSheet } from 'react-native'
import { Header } from 'components/common/Header'

class VATCerificate extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  render() {
    return (
      <Block flex={1}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="VAT Certificate" />
        </Block>
        <Block flex={1}>
          <Block style={{ height: getHeight(142), marginTop: getHeight(30) }}>
            <UpdateDocument style={styles.document} placeholder="Upload your VAT Certificate*" />
          </Block>
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

export default VATCerificate

const styles = StyleSheet.create({
  wrapBtn: {
    position: 'absolute',
    bottom: 0,
  },
  btnBottom: {
    width: screenWidth,
  },
  document: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },

})
