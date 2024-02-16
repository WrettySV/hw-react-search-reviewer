import {ActionTypes} from '../actions';

export interface StateReviewer {
    contributors: string[];
    reviewer: string;
    reviewerError: string;
}


const initialState: StateReviewer = {
    contributors: [] as string[],
    reviewer: '',
    reviewerError: '',
};


const reducerReviewer = (state: StateReviewer = initialState, action: { type: ActionTypes; payload: any }) => {
    switch (action.type) {
        case ActionTypes.SET_CONTRIBUTORS:
            return {
                ...state,
                contributors: action.payload,
            };
        case ActionTypes.SET_REVIEWER:
            return {
                ...state,
                reviewer: action.payload,
            };
        case ActionTypes.SET_REVIEWER_ERROR:
            return {
                ...state,
                reviewerError: action.payload,
            };
        default:
            return state;
    }
};

export default reducerReviewer;
