import { createActions } from 'redux-actions';

export const {
    getQuestions,
    getQuestionsSuccess,
    getQuestionsError
} = createActions(
    'GET_QUESTIONS',
    'GET_QUESTIONS_SUCCESS',
    'GET_QUESTIONS_ERROR',
);
