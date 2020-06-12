import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet } from 'react-native'
import { get } from 'lodash'
import { setValue, getWidth } from 'utils/utils'
import colors from 'utils/colors'
import screens from 'navgation/screens'
import VectorIcon from './VectorIcon'

export default class IconTabbarCustom extends React.PureComponent {
  get getIcon() {
    const { route } = this.props
    switch (route.name) {
      case screens.NewFeeds:
        return 'newspaper'
      case screens.Notification:
        return 'notifications'
      case screens.Profile:
        return 'account'
      default:
        return ''
    }
  }

  get getIconType() {
    const { route } = this.props
    switch (route.name) {
      case screens.NewFeeds:
        return 'mdc'
      case screens.Notification:
        return 'md'
      case screens.Profile:
        return 'mdc'
      default:
        return ''
    }
  }


  get sizeIcon() {
    const { route } = this.props
    switch (route.name) {
      case screens.NewFeeds:
        return 30
      case screens.Notification:
        return 30
      default:
        return 30
    }
  }

  get colorIcon() {
    const { focused } = this.props
    if (focused) {
      return colors.PRIMARY
    }
    return colors.BLACK87
  }


  render() {
    const { focused, size, color, route } = this.props
    const name = get(route, 'name')
    return (
      <Block middle styles={styles.contain}>
        <VectorIcon
          color={this.colorIcon}
          size={this.sizeIcon}
          type={this.getIconType}
          name={this.getIcon}
        />
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {

  },
  labelInActive: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(12),
    color: 'rgba(0,0,0,0.38)',
    paddingLeft: getWidth(5),
  },
  labelActive: {
    fontFamily: 'EffraMedium-Regular',
    fontSize: setValue(12),
    color: colors.PRIMARY,
    paddingLeft: getWidth(5),
  },
})
