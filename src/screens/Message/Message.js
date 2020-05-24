import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'
import colors from 'utils/colors'
import { SelectPicker } from 'components/common'
import screens from 'navgation/screens'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { getBankDetail } from 'store/Profile/actions'
import { MessageList } from 'components/Message'
import VectorIcon from 'components/common/VectorIcon'
import { setValue, getWidth, getHeight } from 'utils/utils'

const list = [
  { id: 0, name: 'All' },
  { id: 1, name: 'Closed' },
  { id: 2, name: 'Pending' },
]

class Message extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      filter: null,
    }
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  goTo = (id) => {
    const { navigation } = this.props
    navigation.navigate(screens.MessageView, { id })
  }

  onCreateMessage = () => {
    const { navigation } = this.props
    navigation.navigate(screens.ComposeMessage)
  }

  render() {
    const { filter } = this.state
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Message"
          />
        </Block>
        <Block flex={1}>
          <SelectPicker data={list} placeholder="Messages" />
          <MessageList filter={filter} onPress={this.goTo} />
          <Block style={styles.WrapBtn}>
            <TouchableOpacity
              onPress={this.onCreateMessage}
              style={styles.btnAdd}
            >
              <VectorIcon
                type="ent"
                name="plus"
                size={setValue(24)}
                color={colors.WHITE}
              />
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    )
  }
}

// const mapStateToProps = ({  }) => {

//   return {
//     ,
//   }
// }


// const mapDispatchToProps = (dispatch) => ({
//   //
// })


export default connect()(Message)

const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.GREY97,
  },
  WrapBtn: {
    position: 'absolute',
    right: getWidth(16),
    bottom: getHeight(87),

  },
  btnAdd: {
    width: getWidth(56),
    height: getWidth(56),
    borderRadius: getWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ORANGE,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.24,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
})
