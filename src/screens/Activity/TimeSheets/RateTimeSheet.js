import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, Text } from 'react-native'
import { getHeight, getWidth, formatMoney, screenWidth, setValue } from 'utils/utils'
import colors from 'utils/colors'
import { Button } from 'components/common'
import { getTimeSheetDetail } from 'store/TimeSheets/actions'
import { get } from 'lodash'
import { connect } from 'react-redux'
import RateList from 'components/Activity/TimeSheets/RateList'

class RateTimeSheet extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      net: 0,
      listRate: [],
    }
  }

  componentDidMount() {
    // this.setState({
    //   net: 0,
    //   listRate: [],
    // })
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  onSummit = () => {
    const { navigation, route } = this.props
    const { net, listRate } = this.state
    const onSummit = get(route, 'params.handleRate', () => {})
    onSummit(net, listRate)
    navigation.pop()
  }

  render() {
    const { data, route } = this.props
    const Lines = get(route, 'params.Lines', null)
    const { net } = this.state
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Timesheet Rates"
          />
        </Block>
        <Block flex={1} middle>
          <RateList data={Lines || data} countNet={(nets, listRate) => { this.setState({ net: nets, listRate }) }} />
        </Block>
        <Block row center space="between" style={[styles.wrapNet]}>
          <Text style={styles.txt1}>Net</Text>
          <Text style={styles.txt2}>{`${formatMoney(net)}`}</Text>
        </Block>
        <Block center style={styles.wrapBtn}>
          <Button
            backgroundColor={colors.PRIMARY}
            safe
            onPress={this.onSummit}
            style={styles.btnBottom}
            title="NEXT"
          />
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ assignmentsStore }) => {
  const data = get(assignmentsStore, 'Rates')
  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getTimeSheetDetail(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(RateTimeSheet)

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
  wrapNet: {
    position: 'absolute',
    bottom: getHeight(49),
    backgroundColor: '#efefef',
    width: screenWidth,
    height: getHeight(59),
    paddingHorizontal: getWidth(24),
  },
  txt1: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.BLACK54,
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(16),
    color: colors.BLACK87,
  },
  wrapBtn: {
    position: 'absolute',
    bottom: 0,
  },
  btnBottom: {
    width: screenWidth,
    height: getHeight(49),
  },
})
