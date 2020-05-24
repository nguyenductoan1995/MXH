import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet } from 'react-native'
import { getWidth, getHeight } from 'utils/utils'
import colors from 'utils/colors'
import { SMPData } from 'components/Profile'
import { DataSMP } from 'utils/mockupData'
import screens from 'navgation/screens'
import { get } from 'lodash'
import { connect } from 'react-redux'

class SMP extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (id) => {
    const { navigation } = this.props
    navigation.navigate(screens.SMPDetail, { id })
  }

  render() {
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="SMP" />
        </Block>
        <Block flex={1} middle>
          <SMPData onPress={this.goTo} data={DataSMP} />
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'AttachmentOrdersDetail')
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  // doGetData: (evt, cb) => dispatch(getAttachmentOrdersDetail(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SMP)

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
})
