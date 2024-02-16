import {ActionReviewerTypes} from './actions';

export interface StateReviewer {
    contributors: string[];
    reviewer: string;
    error: string;
}

const initialStateReviewer: StateReviewer = {
    contributors: [],
    reviewer: '',
    error: '',
};


const reducerReviewer = (state = initialStateReviewer, action: { type: ActionReviewerTypes; payload: unknown }) => {
    switch (action.type) {
        case ActionReviewerTypes.SET_CONTRIBUTORS:
            return {
                ...state,
                contributors: action.payload,
            };
        case ActionReviewerTypes.SET_REVIEWER:
            return {
                ...state,
                reviewer: action.payload,
            };
        case ActionReviewerTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducerReviewer;
