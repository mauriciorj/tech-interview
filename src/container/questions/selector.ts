import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectQuestions = (state: any) => state.questions || initialState;

export const makeSelectQuestions = (tech: any) =>
  createSelector(selectQuestions, (globalState) => globalState[tech]);

  export const makeSelectSetIsLoading = () =>
  createSelector(selectQuestions, (globalState) => globalState.loading);