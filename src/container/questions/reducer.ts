import produce from 'immer';
import { handleActions } from 'redux-actions';
import {
    getQuestionsSuccess,
} from './actions';

export const initialState: any = {};

const questionReducer = handleActions(
    {
        [getQuestionsSuccess as any]: produce((state = initialState, { payload }: any) => {
            const { tech, questions } = payload;
            return {...state, [tech]: questions};
        }),
    },
    initialState
);

export default questionReducer;
