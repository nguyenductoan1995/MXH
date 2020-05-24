import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView } from 'react-native'
import { getHeight, getWidth, setValue, formatDate } from 'utils/utils'
import colors from 'utils/colors'
import { RowData } from 'components/common'
import screens from 'navgation/screens'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getCompanyDetail } from 'store/Personal/actions'
import { AssignmentDocument } from 'components/VerifyAssignment'
import { RightCommon } from 'components/Document'

class CompanyDetail extends React.PureComponent {
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
    const ReadDeadline = get(data, 'ReadDeadline') ? formatDate(get(data, 'ReadDeadline')) : ''
    const ReadOn = get(data, 'ReadOn')
    const LastupdatedOn = get(data, 'LastupdatedOn')
    const GroupID = get(data, 'GroupID')
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressRightIcon={() => this.goTo(screens.EditExpenses)}
            onPressLeftIcon={this.goBack}
            title={`Document ${title}`}
            rightCommon={(
              <RightCommon
                download={() => { alert('download') }}
                print={() => { alert('print') }}
                style={{ paddingRight: getWidth(16) }}
              />
)}
          />
        </Block>
        <Block flex={1} middle>
          <ScrollView style={styles.scrollWrap} showsVerticalScrollIndicator={false}>
            <Block middle style={styles.main}>
              <RowData checkValue={false} value={Description} style={styles.input} placeholder="Description" />
              <RowData checkValue={false} value={ReadOn} style={styles.input} placeholder="Read On" />
              <RowData checkValue={false} value={ReadDeadline} style={styles.input} placeholder="Read Deadline" />
              <RowData checkValue={false} value={LastupdatedOn} style={styles.input} placeholder="Last updated On" />
              <RowData checkValue={false} value={GroupID} style={styles.input} placeholder="Group" />
            </Block>
            <AssignmentDocument />
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ personalStore }) => {
  const data = get(personalStore, 'CompanyDetail.0', [])
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getCompanyDetail(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail)

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
