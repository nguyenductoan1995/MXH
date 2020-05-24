import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getMessageDetail } from 'store/Message/actions'
import { ScrollView, StyleSheet } from 'react-native'
import { BubbleReceive, BubbleSent, Attachments, InputMessage } from 'components/Message'
import FastImage from 'react-native-fast-image'
import { undrawReferral } from 'assets/images'
import { formatDate, getHeight } from 'utils/utils'

class MessageView extends React.PureComponent {
  componentDidMount() {
    const { doGetData, route } = this.props
    const id = get(route, 'params.id')
    doGetData({ id }, this.handleGetData)
  }

  handleGetData = ({ success, errorMessage }) => {
    if (success) {
      //
    } else {
      alert(errorMessage)
    }
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }

  render() {
    const { data } = this.props
    const title = get(data, 'Source.Subject')
    const name = get(data, 'Source.Name')
    const desc = get(data, 'Source.Description')
    const time = get(data, 'Source.Date') ? formatDate(get(data, 'Source.Date')) : ''
    const attachments = get(data, 'Source.Attachments', [])
    return (
      <Block flex={1}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title={`${title || ''}`}
          />
        </Block>
        <Block flex={1} style={{ }}>
          <ScrollView style={{ marginBottom: getHeight(65) }}>
            <BubbleReceive
              user={name}
              time={time}
              text={desc}
            />
            <Attachments data={attachments} />
            {/* <BubbleSent
              time="10:08 pm"
              text="Hello"
            />
            <Attachments isSent data={attachments} /> */}
          </ScrollView>
          <InputMessage onPress={(value) => alert(value)} />
        </Block>

      </Block>
    )
  }
}

const mapStateToProps = ({ messageStore }) => {
  const data = get(messageStore, 'MessageDetail', [])

  return {
    data,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doGetData: (evt, cb) => dispatch(getMessageDetail(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MessageView)


const styles = StyleSheet.create({
  contain: {

  },
})
