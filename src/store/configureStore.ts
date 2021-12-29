import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import appReducers from './reducers';
import { appSaga } from './sagas';

// This function was copied from redux chrome dev extension instruction page
const composeEnhancers =
  typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
);

// mount it on the Store
const store = createStore(appReducers, enhancer);

// then run the saga
sagaMiddleware.run(appSaga);
export { store };
// render the application
