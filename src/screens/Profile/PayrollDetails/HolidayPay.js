import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet } from 'react-native'
import { getWidth, getHeight, setValue, formatMoney } from 'utils/utils'
import colors from 'utils/colors'
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component'
import { connect } from 'react-redux'
import { get } from 'lodash'

class HolidayPay extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tableHead: ['Week', 'Opening Balance', 'HP Accured', 'HP Paid', 'Balance'],
      tableData: [
        ['1', '£0.00', '£17.84', '£0.00', '£17.84'],
        ['2', '£0.00', '£17.84', '£0.00', '£17.84'],
        ['3', '£17.84', '£35.67', '£17.84', '£35.67'],
      ],
    }
  }

  get getData() {
    const { data } = this.props
    const newData = []
    data.map((item, index) => {
      newData.push([
        index + 1,
        formatMoney(get(data, 'OpeningBalance')),
        formatMoney(get(data, 'AccuredYTD')),
        formatMoney(get(data, 'PaidYTD')),
        formatMoney(get(data, 'Balance')),
      ])
    })
    return newData
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (screen) => {
    const { navigation } = this.props
  }

  render() {
    const { tableHead, tableData } = this.state
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header onPressLeftIcon={this.goBack} title="Holiday Pay" />
        </Block>
        <Block flex={1} style={styles.main}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#dcdcdc' }}>
            <TableWrapper borderStyle={{ borderWidth: 2, borderColor: 'blue' }}>
              <Row data={tableHead} flexArr={[45, 93, 71, 53, 66]} style={styles.head} borderStyle={{ borderWidth: 0 }} textStyle={styles.textHead} />
            </TableWrapper>
            <TableWrapper style={styles.wrapper}>
              <Rows data={this.getData} flexArr={[45, 93, 71, 53, 66]} style={styles.row} textStyle={styles.textValue} />
            </TableWrapper>
          </Table>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ profileStore }) => {
  const data = get(profileStore, 'PayrollDetail.HolidayPay', [])

  return {
    data,
  }
}


export default connect(mapStateToProps)(HolidayPay)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  main: {
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(20),
  },
  wrapper: { flexDirection: 'row' },

  head: {
    height: 30,
    backgroundColor: colors.PRIMARY,
  },
  row: {
    height: 30,
  },
  textHead: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(10),
    textAlign: 'center',
    color: colors.WHITE,
  },
  textValue: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(10),
    color: '#424242',
    textAlign: 'center',
  },
})
