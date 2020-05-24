import React from 'react'
import { StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Block } from 'galio-framework'
import { Screen } from 'lib'
import { getWidth, getHeight, setValue } from 'utils/utils'
import { Nodata } from 'components/common'
import colors from 'utils/colors'
import { Header } from 'components/common/Header'
import { undrawReferral } from 'assets/images'
import { ReferralsList } from 'components/Profile'
import VectorIcon from 'components/common/VectorIcon'
import screens from 'navgation/screens'

export default class Referrals extends Screen {
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

  goDetail = (id) => {
    const { navigation } = this.props
    navigation.navigate(screens.ReferralDetail, { id })
  }

  onAddReferrals= () => {
    const { navigation } = this.props
    navigation.navigate(screens.AddReferral)
  }

  render() {
    const x = true
    return (
      <Block style={styles.contain}>
        <Header onPressLeftIcon={this.goBack} title="Referrals" />
        {x ? (
          <Block flex={1} middle>
            <ReferralsList onPress={this.goDetail} />
            <Block style={styles.WrapBtn}>
              <TouchableOpacity
                onPress={this.onAddReferrals}
                style={styles.btnAdd}
              >
                <VectorIcon
                  type="ent"
                  name="plus"
                  size={setValue(24)}
                  color={colors.WHITE}
                />
              </TouchableOpacity>
            </Block>
          </Block>
        ) : (
          <Nodata
            image={undrawReferral}
            title="No Referral"
            desc="You have not referred anyone."
            buttonText="REFER SOMEONE"
            onPress={() => {}}
          />
        )}


      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  image: {
    width: getWidth(92),
    height: getHeight(100),
  },
  WrapBtn: {
    position: 'absolute',
    right: getWidth(16),
    bottom: getHeight(87),

  },
  btnAdd: {
    width: getWidth(56),
    height: getWidth(56),
    borderRadius: getWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ORANGE,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.24,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
})
