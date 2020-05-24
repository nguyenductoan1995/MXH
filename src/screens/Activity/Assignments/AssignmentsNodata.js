import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Block } from 'galio-framework'
import { nodataAssignments } from 'assets/images'
import { getWidth, getHeight, setValue } from 'utils/utils'
import colors from 'utils/colors'

export default class AssignmentNodata extends React.PureComponent {
  render() {
    return (
      <Block middle flex={1} style={styles.contain}>
        <FastImage resizeMode="contain" style={styles.image} source={nodataAssignments} />
        <Text style={styles.txt1}>Not Result Found!</Text>
        <Text style={styles.txt2}>Sorry we didn’t find anything.</Text>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  contain: {

  },
  image: {
    width: getWidth(130),
    height: getHeight(100),
  },
  txt1: {
    fontFamily: 'Effra-Bold',
    fontSize: setValue(16),
    color: 'rgba(0,0,0,0.87)',
    marginTop: getHeight(15),
  },
  txt2: {
    fontFamily: 'Effra-Regular',
    fontSize: setValue(14),
    color: colors.SMOKE,
    marginTop: getHeight(2),
  },
})
