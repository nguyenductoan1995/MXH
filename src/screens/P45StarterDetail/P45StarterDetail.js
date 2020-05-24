import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { Input, Button } from 'components/common'
import colors from 'utils/colors'
import { getWidth, getHeight, screenWidth } from 'utils/utils'
import { P45List } from 'utils/mockupData'
import { SelectList } from 'components/ListModal'

export default class P45StarterDetail extends React.PureComponent {
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
          <Header onPressLeftIcon={this.goBack} title="P45 Starter Details" />
        </Block>
        <ScrollView>
          <Block center style={styles.wrapMain}>
            <SelectList
              onSelect={(item) => {}}
              style={styles.input}
              placeholder="Starter Declaration Type*"
              data={P45List}
            />
            <Input
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Gross for Tax*"
            />
            <Input
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Tax Deducted*"
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
  wrapMain: {
    paddingTop: 12,
  },
  input: {
    width: getWidth(329),
    height: getHeight(52),
    marginTop: getHeight(25),
  },
  btnSave: { position: 'absolute', bottom: 0 },
})
