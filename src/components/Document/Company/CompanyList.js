import React from 'react'
import { FlatList } from 'react-native'
import { get, lowerCase } from 'lodash'
import { connect } from 'react-redux'
import { Nodata } from 'components/common'
import { undrawCompany } from 'assets/images'
import { getListCompanyPersonal } from 'store/Personal/actions'
import CompanyItem from './CompanyItem'


class CompanyList extends React.PureComponent {
  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { doGetData } = this.props
    doGetData({}, this.getDataCallBack)
  }

  getDataCallBack = ({ success, errorMessage }) => {
    if (success) {
      //
    } else {
      alert(errorMessage)
    }
  }

  renderItem=({ item }) => {
    const id = get(item, 'ID', null)
    const desc = get(item, 'Description', null)
    const status = get(item, 'Status', null)
    const readOn = get(item, 'ReadOn', null)
    const readDeadline = get(item, 'ReadDeadline', null)
    const { onPress } = this.props
    return (
      <CompanyItem
        onPress={() => onPress(get(item, 'ID', null))}
        id={id}
        desc={desc}
        status={status}
        readOn={readOn}
        readDeadline={readDeadline}
      />
    )
  }

  render() {
    const { data, field, isLoading } = this.props
    const newData = data ? data.filter((item) => String(lowerCase(item.Description)).match(lowerCase(field))) : []
    if (!isLoading && newData.length === 0) {
      return (
        <Nodata
          image={undrawCompany}
          title="Not Result Found!"
          desc="Sorry we didn’t find anything."
        />
      )
    }
    return (
      <FlatList
        refreshing={isLoading}
        onRefresh={this.getData}
        showsVerticalScrollIndicator={false}
        data={newData}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ marginTop: 4 }}
      />
    )
  }
}

const mapStateToProps = ({ personalStore, homeStore }) => {
  const data = get(personalStore, 'Company', [])
  const field = get(homeStore, 'field')
  const isLoading = get(personalStore, 'isLoading')
  return {
    data,
    field,
    isLoading,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getListCompanyPersonal(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList)
