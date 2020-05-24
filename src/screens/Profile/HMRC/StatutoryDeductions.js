import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getWidth, getHeight } from 'utils/utils'
import colors from 'utils/colors'
import { RowStatutory } from 'components/Profile'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { get } from 'lodash'

class StatutoryDeductions extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    switch (screen) {
      case 'SMP':
        return navigation.navigate(screens.SMP)
      case 'SSP':
        return navigation.navigate(screens.SSP)
      case 'SAP':
        return navigation.navigate(screens.SAP)
      case 'SPP':
        return navigation.navigate(screens.SPP)

      default:
        break
    }
  }

  render() {
    const { data } = this.props
    const SMP = get(data, 'StatutoryDeductions.SMP')
    const SSP = get(data, 'StatutoryDeductions.SSP')
    const SAP = get(data, 'StatutoryDeductions.SAP')
    const SPP = get(data, 'StatutoryDeductions.SPP')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Statutory Deductions" />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowStatutory onPress={this.goTo} title="SMP" status={SMP} />
              <RowStatutory onPress={this.goTo} title="SSP" status={SSP} />
              <RowStatutory onPress={this.goTo} title="SAP" status={SAP} />
              <RowStatutory onPress={this.goTo} title="SPP" status={SPP} />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'HMRCDetail', [])

  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  // doGetData: (evt, cb) => dispatch(getHMRCDetail(evt, cb)),
  // doGetOption: (evt, cb) => dispatch(getOptionList(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(StatutoryDeductions)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(25),
  },
  main: {
    paddingTop: getHeight(22),
    paddingBottom: getHeight(100),
  },
  scrollWrap: {

  },
  rowDataLast: {
    borderBottomWidth: 0,
  },
})
