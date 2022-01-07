import { all } from 'redux-saga/effects';

import questionsSaga from '../../container/questions/saga';

export function* appSaga() {
  yield all([questionsSaga()]);
}
