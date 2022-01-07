import { takeLatest, put, call } from '@redux-saga/core/effects';
import { getQuestions, getQuestionsSuccess, getQuestionsError } from './actions';
import axios from 'axios';


const getQuestionsAxios = (url: string) => axios.get(url, { headers: {
  'Content-Type': 'application/json',
  }} as any)
  .then(response => response.data)
  .catch(error => error)

const getQuestionsAPIUrl = (tech: string) => `https://ztrvektg3c.execute-api.us-east-2.amazonaws.com/dev/getquestions?tech=${tech}`;

export function* getQuestionsEvent({ payload }: any): any {

  // TODO: update the API to accept params and lambda to use it to filters questions by tech
  const { tech } = payload;

  try {
    const questions = yield call(getQuestionsAxios, getQuestionsAPIUrl(tech));
    yield put(getQuestionsSuccess({questions, tech}));
  } catch (error) {
    yield put(getQuestionsError('Login User Error'));
  }
}

export default function* questionsSaga() {
  yield takeLatest(getQuestions().type, getQuestionsEvent);
}
