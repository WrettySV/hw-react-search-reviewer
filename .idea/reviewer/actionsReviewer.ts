import {Dispatch} from "redux";
import {RootState} from "../../src/components/redux/store";

export enum ActionReviewerTypes {
    SET_CONTRIBUTORS = 'SET_CONTRIBUTORS',
    SET_REVIEWER = 'SET_REVIEWER',
    SET_ERROR = 'SET_ERROR',
}

export const setContributors = (contributors: string[]) => ({
    type: ActionReviewerTypes.SET_CONTRIBUTORS,
    payload: contributors,
});

export const setReviewer = (reviewer: string) => ({
    type: ActionReviewerTypes.SET_REVIEWER,
    payload: reviewer,
});

export const setError = (error: string) => {
    return {
        type: ActionReviewerTypes.SET_ERROR,
        payload: error }
};

export const asyncFetchReviewer = (
    login: string,
    repo: string,
    blacklist: string[]
) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch(setError(''));
        const contributorsUrl = 'https://api.github.com/repos/${login}/${repo}/contributors';
        const response = await fetch(contributorsUrl);
        const data = await response.json();

        const filteredContributors = data.filter(
            (contributor: any) => !blacklist.includes(contributor.login)
        );

        if (filteredContributors.length === 0) {
            dispatch(setError('Данные не найдены для указанного логина и репозитория'));
            return;
        }
        const randomIndex = Math.floor(Math.random() * filteredContributors.length);
        const randomReviewer = filteredContributors[randomIndex].login;

        dispatch(setContributors(filteredContributors.map((contributor: any) => contributor.login)));
        dispatch(setReviewer(randomReviewer));

        const currentState = getState();
        console.log('Текущее состояние:', currentState);
    } catch (error) {
        dispatch(setError('Произошла ошибка при получении данных'));
    }
};


