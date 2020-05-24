import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { Input, Button } from 'components/common'
import colors from 'utils/colors'
import { getWidth, getHeight, screenWidth } from 'utils/utils'
import { get } from 'lodash'

export default class UTRNumber extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  render() {
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="UTR"
          />
        </Block>
        <ScrollView>
          <Block middle style={styles.main}>
            <Input
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Enter UTR*"
            />
          </Block>
        </ScrollView>
        <Block style={styles.btnSave}>
          <Button backgroundColor={colors.PRIMARY} safe onPress={this.goBack} style={{ width: screenWidth }} title="SAVE" />
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  main: {
    paddingTop: getHeight(30),
  },
  input: {
    width: getWidth(325),
    height: getHeight(52),
  },
  btnSave: { position: 'absolute', bottom: 0 },
})
