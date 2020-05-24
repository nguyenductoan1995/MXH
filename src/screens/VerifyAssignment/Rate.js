import React from 'react'
import { StyleSheet } from 'react-native'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { RateList } from 'components/VerifyAssignment'
import { connect } from 'react-redux'
import { get } from 'lodash'

class Rate extends React.PureComponent {
  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  render() {
    const { data } = this.props
    return (
      <Block flex={1}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Rate"
          />
        </Block>
        <Block flex={1}>
          <RateList data={data} />
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ assignmentsStore }) => {
  const data = get(assignmentsStore, 'AssignmentDetail.Rates', [])
  return {
    data,
  }
}


// const mapDispatchToProps = (dispatch) => ({
//   doGetData: (evt, cb) => dispatch(getAssignmentDetail(evt, cb)),
// })


export default connect(mapStateToProps)(Rate)
const styles = StyleSheet.create({

})
