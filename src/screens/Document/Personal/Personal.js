import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { getWidth, getHeight, setValue } from 'utils/utils'
import { connect } from 'react-redux'
import { get, lowerCase } from 'lodash'
import screens from 'navgation/screens'
import { PersonalList } from 'components/Document'
import { useNavigation } from '@react-navigation/native'
import VectorIcon from 'components/common/VectorIcon'
import colors from 'utils/colors'

function Personal({ data, field }) {
  const navigation = useNavigation()
  React.useEffect(() => {

  }, [])

  const goDetail = (id) => {
    navigation.navigate(screens.PersonalDetail, { id })
  }

  const onAddTimesheet = () => {
    navigation.navigate(screens.AddPersonal)
  }

  const newData = data ? data.filter((item) => String(lowerCase(item.Description)).match(lowerCase(field))) : []
  return (
    <Block flex={1} style={styles.contain}>
      <PersonalList onAddTimesheet={onAddTimesheet} onPress={goDetail} />
      <Block style={styles.WrapBtn}>
        {newData.length !== 0 && (
        <TouchableOpacity
          onPress={onAddTimesheet}
          style={styles.btnAdd}
        >
          <VectorIcon
            type="ent"
            name="plus"
            size={setValue(24)}
            color={colors.WHITE}
          />
        </TouchableOpacity>
        )}
      </Block>
    </Block>
  )
}

const mapStateToProps = ({ personalStore, homeStore }) => {
  const data = get(personalStore, 'Personal', [])
  const field = get(homeStore, 'field')
  return {
    data,
    field,
  }
}


export default connect(mapStateToProps)(Personal)


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
