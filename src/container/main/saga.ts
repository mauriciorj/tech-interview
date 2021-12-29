import { takeLatest, put } from '@redux-saga/core/effects';
import { loadMain, loadMainSuccess, loadMainError } from './actions';

export function* loadMainEvent({ payload }: any) {
  const { translations } = payload;

  try {
    yield put(loadMainSuccess(translations));
  } catch (error) {
    yield put(loadMainError('Login User Error'));
  }
}

export default function* mainSaga() {
  yield takeLatest(loadMain().type, loadMainEvent);
}
