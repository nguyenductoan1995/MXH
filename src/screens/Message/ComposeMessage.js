
import React from 'react'
import { Block } from 'galio-framework'
import { Header } from 'components/common/Header'
import { StyleSheet, ScrollView, Alert } from 'react-native'
import { getHeight, getWidth, setValue, checkButton } from 'utils/utils'
import colors from 'utils/colors'
import { Input, UpdateDocument, Button, Inputmultiline } from 'components/common'
import { SelectList } from 'components/ListModal'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { getOptionList } from 'store/OptionList/actions'
import { addMessageCompose, getMessage, addMessageDocument } from 'store/Message/actions'

class ComposeMessage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Subject: null,
      Priority: null,
      Category: null,
      Message: null,
      Attachments: [],
    }
  }

  componentDidMount() {
    this.getOption()
  }

  getOption = () => {
    const { doGetOption } = this.props
    doGetOption({ OptionType: 'MessageCategory' }, () => {
      doGetOption({ OptionType: 'MessagePriority' })
    })
  }

  get CategoryList() {
    const { CategoryOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    CategoryOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }

  get PriorityList() {
    const { PriorityOption } = this.props
    const newData = [{ id: 0, name: 'None' }]
    PriorityOption.map((item) => {
      newData.push({
        id: get(item, 'Key'),
        name: get(item, 'Text'),
      })
    })
    return newData
  }


  get checkButton() {
    const { Subject, Priority, Category, Message } = this.state
    const obj = [Subject, Priority, Category, Message]
    return checkButton(obj)
  }

  onSelectCategory = (item) => {
    const Category = get(item, 'id')
    this.setState({
      Category,
    })
  }

  onSelectPriority = (item) => {
    const Priority = get(item, 'name')
    this.setState({
      Priority,
    })
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.pop()
  }


  onAddHandle = () => {
    const { doAddData } = this.props
    const { Subject, Priority, Category, Message, Attachments } = this.state
    doAddData({
      Subject,
      Priority,
      Category,
      Message,
      // Attachments,
    }, this.handleSuccessBodyText)
  }

  handleSuccessBodyText = ({ success, errorMessage }) => {
    if (success) {
      const { doAddDocument, MessageBody } = this.props
      const id = get(MessageBody, 'RecordID', null)
      const { Attachments } = this.state
      doAddDocument({ Attachments, id }, this.handleSuccess)
    } else {
      Alert.alert(
        'Error',
        errorMessage,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      )
    }
  }

  handleSuccess = ({ success, errorMessage }) => {
    if (success) {
      const { doGetData } = this.props
      doGetData()
      Alert.alert(
        'Success',
        'Compose Message Success',
        [
          { text: 'OK', onPress: this.goBack },
        ],
        { cancelable: false },
      )
    } else {
      Alert.alert(
        'Error',
        errorMessage,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      )
    }
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  SelectDocument = (data) => {
    const Attachments = []
    data.map((item) => {
      Attachments.push({
        ...item,
        Image: get(item, 'Binary'),
        Extension: get(item, 'Extension') === 'image/jpeg' ? 'jpeg' : 'pdf',
      })
    })

    this.setState({ Attachments })
  }

  render() {
    return (
      <Block flex={1} style={styles.contain}>
        <Block>
          <Header
            onPressLeftIcon={this.goBack}
            title="Compose Message"
          />
        </Block>
        <Block flex={1} style={{}}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollWrap}>
            <Block center style={styles.main}>
              <Input
                onChangeText={(value) => this.handleInput('Subject', value)}
                style={styles.input}
                placeholder="Subject*"
              />
              <SelectList
                onSelect={this.onSelectCategory}
                style={styles.input}
                placeholder="Category*"
                data={this.CategoryList}
              />
              <SelectList
                onSelect={this.onSelectPriority}
                style={styles.input}
                placeholder="Priority*"
                data={this.PriorityList}
              />
              <Inputmultiline style={styles.input} onChangeText={(value) => this.handleInput('Message', value)} placeholder="Message*" />
            </Block>
            <UpdateDocument onPickerSelect={this.SelectDocument} placeholder="Upload Document" style={styles.updateDocument} />
            <Block flex={1} center>
              <Button disabled={this.checkButton} onPress={this.onAddHandle} title="SEND" style={styles.btnAdd} />
            </Block>
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const mapStateToProps = ({ optionStore, messageStore }) => {
  const CategoryOption = get(optionStore, 'MessageCategory', [])
  const PriorityOption = get(optionStore, 'MessagePriority', [])
  const MessageBody = get(messageStore, 'MessageBody')
  return {
    CategoryOption,
    PriorityOption,
    MessageBody,
  }
}


const mapDispatchToProps = (dispatch) => ({
  doAddData: (evt, cb) => dispatch(addMessageCompose(evt, cb)),
  doGetOption: (evt, cb) => dispatch(getOptionList(evt, cb)),
  doGetData: (evt, cb) => dispatch(getMessage(evt, cb)),
  doAddDocument: (evt, cb) => dispatch(addMessageDocument(evt, cb)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ComposeMessage)


const styles = StyleSheet.create({
  contain: {
    backgroundColor: colors.WHITE,
  },
  input: {
    width: getWidth(328),
    height: getHeight(52),
    marginTop: getHeight(25),
  },
  lastInput: {
    borderBottomWidth: 0,
  },
  main: {
  },
  scrollWrap: {

  },
  updateDocument: {
    marginTop: getHeight(30),
    borderBottomWidth: 0,
  },
  btnAdd: {
    width: getWidth(180),
    height: getHeight(50),
    borderRadius: setValue(25),
    overflow: 'hidden',
    marginVertical: getHeight(27),
  },
})
