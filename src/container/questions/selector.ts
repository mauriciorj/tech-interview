import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectQuestions = (state: any) => state.questions || initialState;

export const makeSelectQuestions = () =>
  createSelector(selectQuestions, (globalState) => globalState);
