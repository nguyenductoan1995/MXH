import React from 'react'
import { Block } from 'galio-framework'
import { HeaderHome } from 'components/common/Header'
import { StyleSheet, FlatList, Text } from 'react-native'
import { getHeight, getWidth } from 'utils/utils'
import { connect } from 'react-redux'
import { get } from 'lodash'
import screens from 'navgation/screens'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import { utils } from '@react-native-firebase/app'
import { useNavigation } from '@react-navigation/native'


function NewFeeds() {
  const navigation = useNavigation()
  const [user, setUser] = React.useState([])
  // main
  React.useEffect(() => {
    database()
      .ref('/employees')
      .on('value', (snapshot) => {
        setUser(snapshot.val())
        console.tron.log('User data: ', snapshot.val())
      })
  }, [])

  const goMessage = () => {
    navigation.navigate(screens.Message)
  }

  return (
    <Block flex={1} style={styles.contain}>
      <Block>
        <HeaderHome
          title="New Feeds"
          onPressRight={goMessage}
        />
      </Block>
      <Block center flex={1} style={styles.main}>
        <FlatList
          data={user}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        />
      </Block>
    </Block>
  )
}

const mapStateToProps = ({ }) => ({

})

const mapDispatchToProps = (dispatch) => ({
  // doGetData: (evt, cb) => dispatch(getDashborad(evt, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewFeeds)

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
