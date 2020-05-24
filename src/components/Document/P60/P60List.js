import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import P60Item from './P60Item'

const list = [
  {
    id: 0,
    name: '2018-19',
  },
  {
    id: 1,
    name: '2018-19',
  },
  {
    id: 2,
    name: '2018-19',
  },
  {
    id: 3,
    name: '2018-19',
  },
  {
    id: 4,
    name: '2018-19',
  },
  {
    id: 5,
    name: '2018-19',
  },
]

class P60List extends React.PureComponent {
  renderItem=({ item }) => {
    const { onPress = () => {} } = this.props
    return (
      <P60Item
        name={item.name}
        onPress={() => onPress(item.id)}
      />
    )
  }

  render() {
    return (
      <FlatList
        data={list}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
      />
    )
  }
}

export default P60List

const styles = StyleSheet.create({
  contain: {

  },
})
