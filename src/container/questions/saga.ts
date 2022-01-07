import { takeLatest, put, call, select } from '@redux-saga/core/effects';
import { getQuestions, getQuestionsSuccess, getQuestionsError } from './actions';
import { makeSelectQuestions } from './selector';
import axios from 'axios';


const getQuestionsAxios = (url: string) => axios.get(url, { headers: {
  'Content-Type': 'application/json',
  }} as any)
  .then(response => response.data)
  .catch(error => error)

const getQuestionsAPIUrl = (tech: string) => `https://ztrvektg3c.execute-api.us-east-2.amazonaws.com/dev/getquestions?tech=${tech}`;

export function* getQuestionsEvent({ payload }: any): any {

  const { tech } = payload;

  let questions;
  questions = yield select(makeSelectQuestions(tech));

  try {
    if(!questions){
      questions = yield call(getQuestionsAxios, getQuestionsAPIUrl(tech));
    }
    yield put(getQuestionsSuccess({questions, tech}));
  } catch (error) {
    yield put(getQuestionsError('Login User Error'));
  }
}

export default function* questionsSaga() {
  yield takeLatest(getQuestions().type, getQuestionsEvent);
}
