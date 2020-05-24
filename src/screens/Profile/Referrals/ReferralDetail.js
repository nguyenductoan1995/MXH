import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, setValue, screenWidth } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import { connect } from 'react-redux'
import { getProfilePersonal } from 'store/Profile/actions'
import { get } from 'lodash'
import screens from 'navgation/screens'

class ReferralDetail extends React.PureComponent {
  componentDidMount() {

  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    navigation.navigate(screens.EditReferral)
  }

  render() {
    const { data, route } = this.props
    // const Name = get(data, 'Name')
    // const DateofReferral = get(data, 'DateofReferral')
    // const Email = get(data, 'Email')
    // const PhoneNo = get(data, 'PhoneNo')
    const id = get(route, 'params.id')

    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            rightIconName="pencil"
            typeright="simple"
            onPressRightIcon={this.goTo}
            onPressLeftIcon={this.goBack}
            title={`Referral #${id} Detail`}
          />
        </Block>

        <Block middle flex={1} style={styles.main}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: screenWidth }}
          >
            {/* PERSONAL */}
            <Block middle flex={1} style={styles.section}>
              <RowData value="Hemchandra Chakravorty" style={styles.input} placeholder="Name" />
              <RowData value="11/11/2019" style={styles.input} placeholder="Date of Referral" />
              <RowData value="hemchandra.chakravorty@gmail.com" style={styles.input} placeholder="Email" />
              <RowData value="1234567890" style={[styles.input, styles.inputlast]} placeholder="Phone No." />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}
const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'ReferralDetail', [])
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getProfilePersonal(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ReferralDetail)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  wrapTitle: {
    paddingTop: getHeight(20),
    width: getWidth(328),
  },
  section: {

  },
  main: {
  //  backgroundColor: 'skyblue',
  },
  txt1: {
    fontFamily: 'EffraMedium-Regular',
    fontSize: 10,
    color: colors.PRIMARY,
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(20),
  },
  inputlast: {

  },
  lastsection: {
    marginBottom: 20,
  },
})
