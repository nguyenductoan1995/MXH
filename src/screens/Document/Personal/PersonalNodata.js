import React from 'react'
import { Block } from 'galio-framework'
import { Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { undraw } from 'assets/images'
import { getWidth, getHeight } from 'utils/utils'

export default function PersonalNodata() {
  return (
    <Block middle flex={1}>
      <Block>
        <FastImage style={styles.image} source={undraw} />
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  contain: {

  },
  image: {
    width: getWidth(100),
    height: getHeight(100),
  },
})
