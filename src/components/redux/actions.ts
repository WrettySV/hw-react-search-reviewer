import {Dispatch} from "redux";
import {RootState} from "./store";

export enum ActionTypes {
    SET_CONTRIBUTORS = 'SET_CONTRIBUTORS',
    SET_REVIEWER = 'SET_REVIEWER',
    SET_REVIEWER_ERROR = 'SET_REVIEWER_ERROR',
    SET_LOGIN = 'SET_LOGIN',
    SET_REPO = 'SET_REPO',
    SET_BLACKLIST = 'SET_BLACKLIST',
    SET_SETTINGS_ERROR = 'SET_SETTINGS_ERROR',
}

export const setContributors = (contributors: string[]) => ({
    type: ActionTypes.SET_CONTRIBUTORS,
    payload: contributors,
});

export const setReviewer = (reviewer: string) => ({
    type: ActionTypes.SET_REVIEWER,
    payload: reviewer,
});

export const setReviewerError = (error: string) => {
    return {
        type: ActionTypes.SET_REVIEWER_ERROR,
        payload: error }
};

export const setLogin = (login: string) => ({
    type: ActionTypes.SET_LOGIN,
    payload: login,
});

export const setBlacklist = (blacklist: string) => ({
    type: ActionTypes.SET_BLACKLIST,
    payload: blacklist,
});

export const setRepo = (repo: string) => ({
    type: ActionTypes.SET_REPO,
    payload: repo,
});

export const setSettingsError = (error: string) => {
    return {
        type: ActionTypes.SET_SETTINGS_ERROR,
        payload: error }
};


export const asyncFetchReviewer = (
    login: string,
    repo: string,
    blacklist: string[]
) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(setReviewerError(''));
        const contributorsUrl = 'https://api.github.com/repos/${login}/${repo}/contributors';
        const response = await fetch(contributorsUrl);
        const data = await response.json();

        const filteredContributors = data.filter(
            (contributor: any) => !blacklist.includes(contributor.login)
        );

        if (filteredContributors.length === 0) {
            dispatch(setReviewerError('Данные не найдены для указанного логина и репозитория'));
            return;
        }
        const randomIndex = Math.floor(Math.random() * filteredContributors.length);
        const randomReviewer = filteredContributors[randomIndex].login;

        dispatch(setContributors(filteredContributors.map((contributor: any) => contributor.login)));
        dispatch(setReviewer(randomReviewer));

        // const currentState = getState();
        // console.log('Текущее состояние:', currentState);
    } catch (error) {
        dispatch(setReviewerError('Произошла ошибка при получении данных'));
    }
};


