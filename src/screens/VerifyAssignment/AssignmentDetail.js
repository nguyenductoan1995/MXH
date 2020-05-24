import React from 'react'
import { StyleSheet } from 'react-native'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { Button } from 'components/common'
import { screenWidth } from 'utils/utils'
import colors from 'utils/colors'
import { AssignmentDetailData, RejectModal } from 'components/VerifyAssignment'
import screens from 'navgation/screens'
import { ModalManager } from 'screens/Global'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getAssignmentDetail } from 'store/Assignments/actions'

class AssignmentDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  componentDidMount() {
    const { route, doGetData } = this.props

    const id = get(route, 'params.id')
    if (id) {
      this.setState({ title: id })
      doGetData({
        id,
      }, this.getDataCallBack)
    }
  }

 getDataCallBack = ({ success, errorMessage }) => {
   if (success) {
     //
   } else {
     alert(errorMessage)
   }
 }

  openModalReject = () => {
    ModalManager.show(<RejectModal onPress={ModalManager.hide} />)
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goRate = () => {
    const { navigation } = this.props
    navigation.navigate(screens.Rate)
  }

  render() {
    const { data } = this.props
    const { title } = this.state
    return (
      <Block flex={1} style={{ backgroundColor: colors.WHITE }}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title={`Assignment ${title}`} />
        </Block>
        <Block flex={1}>
          <AssignmentDetailData
            data={data}
            onRate={this.goRate}
          />
        </Block>
        <Block center row style={styles.wrapBtn}>
          <Button
            safe
            backgroundColor={colors.RED}
            style={styles.btnBottom}
            title="REJECT"
            onPress={this.openModalReject}
          />
          <Button
            onPress={this.goBack}
            safe
            backgroundColor={colors.PRIMARY}
            style={styles.btnBottom}
            title="ACCEPT"
          />
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ assignmentsStore }) => {
  const data = get(assignmentsStore, 'AssignmentDetail', [])
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getAssignmentDetail(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail)
const styles = StyleSheet.create({
  wrapBtn: {
    position: 'absolute',
    bottom: 0,
  },
  btnBottom: {
    width: screenWidth / 2,
  },

})
