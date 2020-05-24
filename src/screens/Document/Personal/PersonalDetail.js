import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, setValue, formatDate, formatMoney } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import screens from 'navgation/screens'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getPersonalDetail } from 'store/Personal/actions'
import { RightCommon } from 'components/Document'

class PersonalDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { doGetData, route } = this.props
    const id = get(route, 'params.id')
    this.setState({ title: id })
    doGetData({ id }, this.getDataCallBack)
  }

  getDataCallBack = ({ success, errorMessage }) => {
    if (success) {
      //
    } else {
      alert(errorMessage)
    }
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
    switch (screen) {
      case screens.EditExpenses:
        return navigation.navigate(screens.EditPersonal)
      default:
        break
    }
  }

  render() {
    const { data } = this.props
    const { title } = this.state
    const Description = get(data, 'Description')
    const ReceviedOn = get(data, 'ReceviedOn')
    const GroupText = get(data, 'GroupText')
    const TypeText = get(data, 'TypeText')
    const ExpiryDate = get(data, 'ExpiryDate') ? formatDate(get(data, 'ExpiryDate')) : ''
    const Notes = get(data, 'Notes')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressRightIcon={() => this.goTo(screens.EditExpenses)}
            onPressLeftIcon={this.goBack}
            title={`Document ${title}`}
            rightIconName="pencil"
            typeright="simple"
            rightCommon={(
              <RightCommon
                download={() => { alert('download') }}
                print={() => { alert('print') }}
              />
)}
          />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData checkValue={false} value={Description} style={styles.input} placeholder="Description" />
              <RowData checkValue={false} value={ReceviedOn} style={styles.input} placeholder="Received On" />
              <RowData checkValue={false} value={GroupText} style={styles.input} placeholder="Group" />
              <RowData checkValue={false} value={TypeText} style={styles.input} placeholder="Type" />
              <RowData checkValue={false} value={ExpiryDate} style={styles.input} placeholder="Expiry Date" />
              <RowData checkValue={false} value={Notes} style={styles.input} placeholder="Notes" />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ personalStore }) => {
  const data = get(personalStore, 'PersonalDetail.0', [])
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getPersonalDetail(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)

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
  },
  scrollWrap: {

  },
  wrapBtnSubmit: {
    position: 'absolute',
    bottom: setValue(26),
    borderRadius: setValue(25),
  },
  btnSubmit: {
    width: getWidth(180),
    height: getHeight(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
  },
  inputLast: {
    marginBottom: getHeight(32),
  },
})
