import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getWidth, getHeight, screenWidth } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'

export default class SSP extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
  }

  render() {
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="SSP" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData style={styles.input} placeholder="First Linked PIW Started" />
              <RowData style={styles.input} placeholder="Last Linked PIW Ended" />
              <RowData style={styles.input} placeholder="SSP Entitlement Ended" />
              <RowData style={styles.input} placeholder="Waiting Days Accrued" />
              <RowData style={styles.input} placeholder="Days Since Last PIW" />
              <RowData style={styles.input} placeholder="Weeks SSP Paid" />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  input: {
    width: getWidth(328),
    height: getHeight(72),
    marginTop: getHeight(25),
  },
  scrollWrap: {
    width: screenWidth,
  },
  main: {
    paddingBottom: getHeight(50),
  },
})
