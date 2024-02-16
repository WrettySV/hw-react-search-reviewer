export enum ActionsSettingsTypes {
    SET_LOGIN = 'SET_LOGIN',
    SET_REPO = 'SET_REPO',
    SET_BLACKLIST = 'SET_BLACKLIST',
    SET_ERROR = 'SET_ERROR'
}

export const setLogin = (login: string) => ({
    type: ActionsSettingsTypes.SET_LOGIN,
    payload: login,
});

export const setBlacklist = (blacklist: string) => ({
    type: ActionsSettingsTypes.SET_BLACKLIST,
    payload: blacklist,
});

export const setRepo = (repo: string) => ({
    type: ActionsSettingsTypes.SET_REPO,
    payload: repo,
});

export const setSettingFormError = (error: string) => {
    return {
        type: ActionsSettingsTypes.SET_ERROR,
        payload: error }
};
