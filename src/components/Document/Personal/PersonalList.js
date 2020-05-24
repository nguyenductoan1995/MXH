import React from 'react'
import { FlatList } from 'react-native'
import { get, lowerCase } from 'lodash'
import { connect } from 'react-redux'
import { Nodata } from 'components/common'
import { undraw } from 'assets/images'
import { getListCompanyPersonal } from 'store/Personal/actions'
import PersonalItem from './PersonalItem'


class PersonalList extends React.PureComponent {
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
    const { onPress } = this.props
    return (
      <PersonalItem
        onPress={() => onPress(get(item, 'ID', null))}
        id={id}
        desc={desc}
      />
    )
  }

  render() {
    const { data, field, isLoading, onAddTimesheet = () => {} } = this.props
    const newData = data ? data.filter((item) => String(lowerCase(item.Description)).match(lowerCase(field))) : []
    if (!isLoading && data.length === 0) {
      return (
        <Nodata
          image={undraw}
          title="No Personal Document"
          desc="You have not added personal Document."
          buttonText="ADD EXPENSES"
          onPress={onAddTimesheet}
        />
      )
    }
    if (!isLoading && newData.length === 0) {
      return (
        <Nodata
          image={undraw}
          title="No Personal Document"
          desc="You have not added personal Document."
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
      />
    )
  }
}

const mapStateToProps = ({ personalStore, homeStore }) => {
  const data = get(personalStore, 'Personal', [])
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalList)
