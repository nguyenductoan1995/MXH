import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet } from 'react-native'
import colors from 'utils/colors'
// import { AttachmentOrdersData } from 'utils/mockupData'
import { AttachmentOrdersList } from 'components/Profile'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { get } from 'lodash'

class AttachmentOrders extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    navigation.navigate(screens.AttachmentOrdersDetail, { id: screen })
  }

  render() {
    const { data } = this.props
    const AttachmentOrdersData = get(data, 'AttachmentOrders')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Attachment Orders" />
        </Block>
        <Block flex={1} middle>
          <AttachmentOrdersList onPress={this.goTo} data={AttachmentOrdersData} />
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'AttachmentOrders', [])

  return {
    data,
  }
}

export default connect(mapStateToProps)(AttachmentOrders)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
})
