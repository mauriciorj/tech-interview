import produce from 'immer';
import { handleActions } from 'redux-actions';
import {
    loadMainSuccess,
} from './actions';

export const initialState = {
    translations: null,
};

const mainReducer = handleActions(
    {
        [loadMainSuccess as any]: produce((draft, action) => {
            draft['translations'] = action.payload.translations
            return draft;
        }),
    },
    initialState
);

export default mainReducer;
