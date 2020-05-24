import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { Input, Button } from 'components/common'
import colors from 'utils/colors'
import { screenWidth, getHeight, getWidth, setValue } from 'utils/utils'

export default class ChangePIN extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  goBack= () => {
    const { navigation } = this.props
    navigation.pop()
  }

  onSave = () => {
    //
    this.goBack()
  }

  render() {
    return (
      <Block style={styles.contain}>
        <Header onPressLeftIcon={this.goBack} title="Change PIN" />
        <Block flex={1} center>
          <Input secureTextEntry autoFocus style={styles.input} placeholder="Current PIN" />
          <Input secureTextEntry style={styles.input} placeholder="New PIN" />
          <Input secureTextEntry style={styles.input} placeholder="Confirm PIN" />
          <Block style={styles.buttonView}>
            <Button
              safe
              // disabled
              backgroundColor={colors.PRIMARY}
              onPress={this.onSave}
              style={{ width: screenWidth, height: setValue(50) }}
              title="CHANGE PASSWORD"
            />
          </Block>
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: getWidth(30),
    marginTop: getHeight(20),
    marginBottom: getHeight(16),

  },
  input: {
    width: getWidth(327),
    height: getHeight(52),
    marginTop: getHeight(15),
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
  },
  btnBottom: {
    fontFamily: 'Effra-Regular',
    textAlign: 'left',
    alignSelf: 'flex-end',
    marginHorizontal: setValue(28),
    marginTop: setValue(19),
    ...Platform.select({
      ios: {
        marginBottom: 100,
      },
    }),
  },
})
