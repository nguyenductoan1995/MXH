import React from 'react'
import { Block } from 'galio-framework'
import { HeaderHome } from 'components/common/Header'
import { StyleSheet, Text, Platform } from 'react-native'
import colors from 'utils/colors'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { screenWidth, getHeight, setValue } from 'utils/utils'
import { useNavigation } from '@react-navigation/native'
import screens from 'navgation/screens'
import Personal from './Personal/Personal'
import Company from './Company/Company'
import Onboarding from './Onboarding/Onboarding'
import P60 from './P60/P60'

export default function Document() {
  const navigation = useNavigation()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'Personal', title: 'PERSONAL' },
    { key: 'Company', title: 'COMPANY' },
    { key: 'Onboarding', title: 'ONBOARDING' },
    { key: 'P60', title: 'P60' },
  ])
  const renderScene = SceneMap({
    Personal,
    Company,
    Onboarding,
    P60,


  })

  const goMessage = () => {
    navigation.navigate(screens.Message)
  }


  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.TabBar}
      renderLabel={({ route, focused, color }) => (
        <Text style={[styles.labelTab, focused && styles.focused]}>
          {route.title}
        </Text>
      )}
    />
  )
  return (
    <Block flex={1} style={styles.contain}>
      <Block>
        <HeaderHome
          onPressRight={goMessage}
          shadow={false}
          title="Document"
          search
        />
      </Block>
      <Block flex={1} style={styles.main}>
        <TabView
          renderTabBar={renderTabBar}
          lazy
          style={styles.TabView}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: screenWidth }}
        />
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  contain: {

  },
  main: {

  },
  labelTab: {
    fontFamily: 'EffraMedium-Regular',
    fontSize: setValue(10),
    color: 'rgba(255, 255, 255, 0.54)',
  },
  focused: {
    color: colors.WHITE,
  },
  TabBar: {
    backgroundColor: colors.PRIMARY,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.24,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  TabView: {
    height: getHeight(48),
  },
  indicatorStyle: {
    height: getHeight(3),
    backgroundColor: colors.WHITE },
  borderRadius: setValue(2),
})
