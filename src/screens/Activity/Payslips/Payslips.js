import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, Platform, Alert } from 'react-native'
import { getWidth, getHeight } from 'utils/utils'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import colors from 'utils/colors'
import { PayslipsList } from 'components/Activity'
import { downloadPayslips } from 'store/Payslips/actions'

function Payslips({ onDownload }) {
  const navigation = useNavigation()

  React.useEffect(() => {

  }, [])


  const onDownloads = (id) => {
    onDownload({ id }, handleSuccess)
  }

  const handleSuccess = ({ success, errorMessage }) => {
    if (success) {
      Alert.alert(
        'Success',
        'Edit Expenses Success',
        [
          { text: 'OK', onPress: () => {} },
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


  return (
    <Block flex={1} style={styles.contain}>
      <PayslipsList onPress={onDownloads} />
    </Block>
  )
}


const mapDispatchToProps = (dispatch) => ({
  onDownload: (evt, cb) => dispatch(downloadPayslips(evt, cb)),
})


export default connect(null, mapDispatchToProps)(Payslips)

const styles = StyleSheet.create({
  contain: {

  },
  image: {
    width: getWidth(100),
    height: getHeight(100),
  },
  WrapBtn: {
    position: 'absolute',
    right: getWidth(16),
    bottom: getHeight(31),

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
