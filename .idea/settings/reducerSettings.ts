import { ActionsSettingsTypes } from './actions';

export interface StateSettings {
    login: string;
    repo: string;
    blacklist: string;
    error: string;
}

const initialStateSettings: StateSettings = {
    login: "",
    repo: "",
    blacklist: "",
    error: "",
};

const reducerSettings = (state = initialStateSettings, action: { type: ActionsSettingsTypes; payload: unknown }) => {
    switch (action.type) {
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
        case 'SET_ERROR':
            return {
                ...state,
                blacklist: action.payload,
            };
        default:
            return state;
    }
};

export default reducerSettings;
