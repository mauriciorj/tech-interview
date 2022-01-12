import produce from 'immer';
import { handleActions } from 'redux-actions';
import {
    getQuestionsSuccess,
    setIsLoading
} from './actions';

export const initialState: any = { loading: false };

const questionReducer = handleActions(
    {
        [getQuestionsSuccess as any]: produce((state = initialState, { payload }: any) => {
            const { tech, questions } = payload;
            return {...state, [tech]: questions};
        }),
        [setIsLoading as any]: produce((state = initialState, { payload }: any) => {
            return {...state, loading: payload};
        }),
    },
    initialState
);

export default questionReducer;
