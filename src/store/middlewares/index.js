import { all } from 'redux-saga/effects'
import authSaga from 'store/Authorisation/sagas'
import type { Saga } from 'redux-saga'
import middlewareSagas from './sagas'

export default () => {
  function* rootSaga(): Saga {
    yield all([
      ...middlewareSagas,
      ...authSaga,
    ])
  }
  return rootSaga
}
