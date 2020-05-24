import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { Text, StyleSheet } from 'react-native'
import { setValue, getHeight, getWidth, screenWidth } from 'utils/utils'
import { ListDocumnet } from 'components/IncorporationDocument'
import colors from 'utils/colors'
import { Input, Button, UpdateDocument } from 'components/common'

export default class componentName extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      height: null,
      text: null,
    }
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  render() {
    const { height, text } = this.state
    const length = text ? text.length : 0
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Incorporation Document" />
        </Block>
        <Block flex={1}>
          <Block style={{ height: getHeight(142) }}>
            <UpdateDocument style={styles.document} placeholder="Upload your Incorporation Document* " />
          </Block>
          <Block middle style={styles.wrapInput}>
            <Input
              onChangeText={(value) => this.setState({ text: value })}
              multiline
              style={[styles.input, height && { height }]}
              placeholder="Notes"
              onContentSizeChange={(e) => {
                this.setState({ height: e.nativeEvent.contentSize.height + 30 })
              }}
              maxLength={50}
            />
          </Block>
          <Block bottom>
            <Text style={styles.txt2}>{`${length}/50`}</Text>
          </Block>
        </Block>
        <Block style={styles.btnSave}>
          <Button
            backgroundColor={colors.PRIMARY}
            safe
            onPress={this.goBack}
            style={{ width: screenWidth }}
            title="SAVE"
          />
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    lineHeight: setValue(24),
    color: 'rgba(0,0,0,0.87)',
    paddingTop: getHeight(30),
    paddingLeft: getWidth(16),
  },
  wrapInput: {
    paddingTop: getHeight(20),
  },
  input: {
    width: getWidth(328),
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(12),
    color: 'rgba(0, 0, 0, 0.38)',
    marginTop: getHeight(8),
    marginHorizontal: getWidth(16),
  },
  btnSave: { position: 'absolute', bottom: 0 },
  document: {
    borderTopWidth: 0,
  },
})
