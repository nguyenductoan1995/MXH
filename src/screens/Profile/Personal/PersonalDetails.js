import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import VectorIcon from 'components/common/VectorIcon'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, setValue, screenWidth, formatDate } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { getProfilePersonal } from 'store/Profile/actions'
import { get } from 'lodash'
import { getOptionList } from 'store/OptionList/actions'

class PersonalDetails extends React.PureComponent {
  componentDidMount() {
    const { doGetData, doGetOption, Title, Gender, MaritalStatus, Country } = this.props
    doGetData({}, () => {
      if (Title.length === 0 || Gender.length === 0 || MaritalStatus.length === 0 || Country.length === 0) {
        doGetOption({ OptionType: 'Title' }, () => {
          doGetOption({ OptionType: 'Gender' }, () => {
            doGetOption({ OptionType: 'MaritalStatus' }, () => {
              doGetOption({ OptionType: 'Country' })
            })
          })
        })
      }
    })
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    switch (screen) {
      case screens.EditPersonalDetails:
        return navigation.navigate(screens.EditPersonalDetails)
      case screens.EditAddress:
        return navigation.navigate(screens.EditAddress)
      case screens.EditContactDetails:
        return navigation.navigate(screens.EditContactDetails)
      default:
        return null
    }
  }

  render() {
    const { data } = this.props
    const Title = get(data, 'Title', '')
    const Forename = get(data, 'Forename', '')
    const Surname = get(data, 'Surname', '')
    const Gender = get(data, 'Gender')
    const DateofBirth = get(data, 'DateofBirth') ? formatDate(get(data, 'DateofBirth')) : ''
    const MaritalStatus = get(data, 'MaritalStatus')
    const Email = get(data, 'Email')
    const Mobile = get(data, 'Mobile')
    const Landline = get(data, 'Landline')
    const Line1 = get(data, 'Address.Line1')
    const Line2 = get(data, 'Address.Line2')
    const City = get(data, 'Address.City')
    const County = get(data, 'Address.County')
    const PostCode = get(data, 'Address.PostCode')
    const Country = get(data, 'Address.Country')

    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Personal Details" />
        </Block>

        <Block middle flex={1} style={styles.main}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: screenWidth }}
          >
            {/* PERSONAL */}
            <Block middle flex={1} style={styles.section}>
              <Block
                row
                space="between"
                style={styles.wrapTitle}
              >
                <Text style={styles.txt1}>PERSONAL</Text>
                <VectorIcon
                  onPress={() => this.goTo(screens.EditPersonalDetails)}
                  name="pencil"
                  type="simple"
                  size={setValue(16)}
                  color={colors.PRIMARY}
                />
              </Block>
              <RowData value={`${Title} ${Forename} ${Surname}`} style={styles.input} placeholder="Name" />
              <RowData value={Gender} style={styles.input} placeholder="Gender" />
              <RowData value={DateofBirth} style={styles.input} placeholder="Date of Birth" />
              <RowData value={MaritalStatus} style={[styles.input, styles.inputlast]} placeholder="Marital Status" />
            </Block>
            {/* ADDRESS */}
            <Block middle flex={1} style={styles.section}>
              <Block
                row
                space="between"
                style={styles.wrapTitle}
              >
                <Text style={styles.txt1}>ADDRESS</Text>
                <VectorIcon
                  onPress={() => this.goTo(screens.EditAddress)}
                  name="pencil"
                  type="simple"
                  size={setValue(16)}
                  color={colors.PRIMARY}
                />
              </Block>
              <RowData value={Line1} style={styles.input} placeholder="Address Line 1" />
              <RowData value={Line2} style={styles.input} placeholder="Address Line 2" />
              <RowData value={City} style={styles.input} placeholder="Town/City" />
              <RowData value={County} style={styles.input} placeholder="County" />
              <RowData value={PostCode} style={styles.input} placeholder="Post Code" />
              <RowData value={Country} style={[styles.input, styles.inputlast]} placeholder="Country" />
            </Block>
            {/* CONTACT */}
            <Block middle flex={1} style={[styles.section, styles.lastsection]}>
              <Block
                row
                space="between"
                style={styles.wrapTitle}
              >
                <Text style={styles.txt1}>CONTACT</Text>
                <VectorIcon
                  onPress={() => this.goTo(screens.EditContactDetails)}
                  name="pencil"
                  type="simple"
                  size={setValue(16)}
                  color={colors.PRIMARY}
                />
              </Block>
              <RowData value={Email} style={styles.input} placeholder="Email" />
              <RowData value={Mobile} style={styles.input} placeholder="Mobile" />
              <RowData value={Landline} style={[styles.input, styles.inputlast]} placeholder="Landline" />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}
const mapStateToProps = ({ profileStore, optionStore }) => {
  const data = get(profileStore, 'ProfilePersonal', [])
  const Title = get(optionStore, 'Title', [])
  const Gender = get(optionStore, 'Gender', [])
  const MaritalStatus = get(optionStore, 'MaritalStatus', [])
  const Country = get(optionStore, 'Country', [])
  return {
    data,
    Title,
    Gender,
    MaritalStatus,
    Country,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getProfilePersonal(evt, cb)),
  doGetOption: (evt, cb) => dispatch(getOptionList(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  wrapTitle: {
    paddingTop: getHeight(20),
    width: getWidth(328),
  },
  section: {
    borderBottomWidth: setValue(3),
    borderBottomColor: '#ebebeb',
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
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  lastsection: {
    marginBottom: 20,
  },
})
