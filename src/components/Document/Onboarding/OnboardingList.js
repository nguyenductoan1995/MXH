import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import OnboardingListItem from './OnboardingListItem'

const list = [
  {
    id: 0,
    name: 'P45 Starter Details',
  },
  {
    id: 1,
    name: 'UTR',
  },
  {
    id: 2,
    name: 'Assignment',
  },
  {
    id: 3,
    name: 'Incorporation Document',
  },
  {
    id: 4,
    name: 'VAT Certificate',
  },
  {
    id: 5,
    name: 'Bank Account Proof',
  },
]

class OnboardingList extends React.PureComponent {
  renderItem=({ item }) => {
    const { onPress = () => {} } = this.props
    return (
      <OnboardingListItem
        id={item.id}
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

export default OnboardingList

const styles = StyleSheet.create({
  contain: {

  },
})
