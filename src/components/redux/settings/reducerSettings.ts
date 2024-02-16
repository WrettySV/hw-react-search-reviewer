import {ActionTypes} from '../actions';

export interface StateSettings {
    login: string;
    repo: string;
    blacklist: string;
    settingsError: string;
}


const initialState: StateSettings = {
    login: '',
    repo: '',
    blacklist: '',
    settingsError: ''
};


const reducerSettings = (state: StateSettings = initialState, action: { type: ActionTypes; payload: any }) => {
    switch (action.type) {
        case ActionTypes.SET_LOGIN:
            return {
                ...state,
                login: action.payload,
            };
        case ActionTypes.SET_REPO:
            return {
                ...state,
                repo: action.payload,
            };
        case ActionTypes.SET_BLACKLIST:
            return {
                ...state,
                blacklist: action.payload,
            };
        case ActionTypes.SET_SETTINGS_ERROR:
            return {
                ...state,
                settingsError: action.payload,
            };
        default:
            return state;
    }
};

export default reducerSettings;
