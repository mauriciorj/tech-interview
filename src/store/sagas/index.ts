import { all } from 'redux-saga/effects';

import mainSaga from '../../container/main/saga';

export function* appSaga() {
  yield all([mainSaga()]);
}
