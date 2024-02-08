import {ActionTypes} from './actions';

export interface State {
    contributors: string[];
    reviewer: string;
    reviewerError: string;
    login: string;
    repo: string;
    blacklist: string;
    settingsError: string;
}


const initialState: State = {
    contributors: [] as string[],
    reviewer: '',
    reviewerError: '',
    login: '',
    repo: '',
    blacklist: '',
    settingsError: ''
};


const reducer = (state: State = initialState, action: { type: ActionTypes; payload: any }): State => {
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
        case 'SET_LOGIN':
            return {
                ...state,
                login: action.payload,
            };
        case 'SET_REPO':
            return {
                ...state,
                repo: action.payload,
            };
        case 'SET_BLACKLIST':
            return {
                ...state,
                blacklist: action.payload,
            };
        case 'SET_SETTINGS_ERROR':
            return {
                ...state,
                settingsError: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
