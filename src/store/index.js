import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import storage from '@react-native-community/async-storage'
import createSaga from './middlewares'
//
import authReducer from './Authorisation/reducer'
import authAction from './Authorisation/actions'


import 'config/ReactotronConfig'


const config = {
  key: 'root',
  storage,
  blacklist: [
    'authStore',
    'homeStore',
    'dashBoardStore',
    'assignmentsStore',
    'timeSheetsStore',
    'expensesStore',
    'payslipsStore',
    'personalStore',
    'profileStore',
    'optionStore',
    'messageStore',
  ],
}

const authConfig = {
  key: 'authStore',
  storage,
  whitelist: ['AuthorisationData', 'LoginData'],
  blacklist: ['isLoading'],
}

const createReducers = () => persistCombineReducers(config, {
  authStore: persistReducer(authConfig, authReducer),
})

const createMiddlewares = (sagaMiddleware) => {
  const middlewares = []

  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware)
  }
  return applyMiddleware.apply({}, middlewares)
}
let store
const buildStore = (reducers, initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  if (__DEV__) {
    // eslint-disable-line
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      store = createStore(
        reducers,
        {},
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
          compose(
            applyMiddleware(sagaMiddleware),
            Reactotron.createEnhancer(),
          ),
        ),
      )
    } else {
      store = createStore(
        createReducers(reducers),
        {},
        compose(
          applyMiddleware(sagaMiddleware),
          Reactotron.createEnhancer(),
        ),
      )
    }
  } else {
    store = createStore(createReducers(reducers), initialState, compose(createMiddlewares(sagaMiddleware)))
  }

  const persistor = persistStore(store)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(reducers))
    })
  }
  store.reducers = createReducers(reducers)
  sagaMiddleware.run(createSaga())
  return { persistor, store }
}

export default buildStore()
export const actions = {
  ...authAction,
}
export const stores = store
export { default as effects } from './middlewares/effects'
