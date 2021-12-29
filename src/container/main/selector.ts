import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMain = (state: any) => state.translations || initialState;

export const makeSelectLoadMain = () =>
  createSelector(selectMain, (globalState) => globalState);
