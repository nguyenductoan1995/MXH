import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet } from 'react-native'
import { getHeight, getWidth } from 'utils/utils'
import { connect } from 'react-redux'
import { get } from 'lodash'
import screens from 'navgation/screens'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import { utils } from '@react-native-firebase/app'

class Message extends React.PureComponent {
  // main
  componentDidMount() {
  //  this.getData()
    database()
      .ref('/users')
      .on('value', (snapshot) => {
        console.tron.log('User data: ', snapshot.val())
      })
  }

goMessage = () => {
  const { navigation } = this.props
  navigation.navigate(screens.Message)
}

getData = () => {
  const { doGetData } = this.props
  doGetData({}, this.handleSuccess)
}

handleSuccess = ({ success, errorMessage }) => {
  if (success) {
  //
  } else {
    alert(errorMessage)
  }
}

onRefresh = () => {
  this.getData({}, this.handleSuccess)
}

render() {
  const { sumaryData, isLoading, navigation } = this.props
  return (
    <Block flex={1} style={styles.contain}>
      <Block>
        <Header
          title="Message"
          onPressLeftIcon={() => navigation.pop()}
        />
      </Block>
      <Block center flex={1} style={styles.main} />
    </Block>
  )
}
}

const mapStateToProps = ({ dashBoardStore }) => ({

})

const mapDispatchToProps = (dispatch) => ({
  // doGetData: (evt, cb) => dispatch(getDashborad(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)

const styles = StyleSheet.create({
  contain: {

  },
  main: {
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(25),
  },
})
