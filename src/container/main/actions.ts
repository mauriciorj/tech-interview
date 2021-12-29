import { createActions } from 'redux-actions';

export const {
    loadMain,
    loadMainSuccess,
    loadMainError
} = createActions(
    'LOAD_MAIN',
    'LOAD_MAIN_SUCCESS',
    'LOAD_MAIN_ERROR',
);
