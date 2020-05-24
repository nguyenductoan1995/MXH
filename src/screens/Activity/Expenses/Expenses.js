/* eslint-disable no-nested-ternary */
import React from 'react'
import { Block } from 'galio-framework'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { getWidth, getHeight, setValue } from 'utils/utils'
import { connect } from 'react-redux'
import { get } from 'lodash'
import screens from 'navgation/screens'
import { useNavigation } from '@react-navigation/native'
import { SelectDate, ExpensesList } from 'components/Activity'
import VectorIcon from 'components/common/VectorIcon'
import colors from 'utils/colors'
import Nodata from '../../../components/common/Nodata'

function Expenses({ data, field, isLoading }) {
  const navigation = useNavigation()

  React.useEffect(() => {

  }, [])


  const goDetail = (id) => {
    navigation.navigate(screens.ExpenseDetail, { id })
  }

  const onAddTimesheet = () => {
    navigation.navigate(screens.AddExpenses)
  }

  const newData = data ? data.filter((item) => String(item.ID).match(field)) : []

  return (
    <Block flex={1} style={styles.contain}>
      <SelectDate />
      <>
        <ExpensesList onPress={goDetail} />
      </>
      {!isLoading && (data.length === 0 || newData.length === 0) ? (
        data.length !== 0 ? (
          <Nodata
            title="No Expense"
            desc="You have not added expense yet."
          />
        ) : (
          <Nodata
            title="No Expense"
            desc="You have not added expense yet."
            buttonText="ADD EXPENSE"
            onPress={onAddTimesheet}
          />
        )
      ) : (
        <Block style={styles.WrapBtn}>
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
        </Block>
      )}


    </Block>
  )
}

const mapStateToProps = ({ expensesStore, homeStore }) => {
  const data = get(expensesStore, 'Expenses', [])
  const field = get(homeStore, 'field')
  const isLoading = get(expensesStore, 'isLoading')
  return {
    data,
    field,
    isLoading,
  }
}


const mapDispatchToProps = (dispatch) => ({
//
})


export default connect(mapStateToProps, mapDispatchToProps)(Expenses)

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
