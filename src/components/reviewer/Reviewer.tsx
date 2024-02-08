import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Settings from '../settings/Settings';
import styles from './ReviewerStyles.module.css';
import {asyncFetchReviewer, setContributors, setReviewerError, setReviewer} from '../redux/actions';
import store, { RootState } from '../redux/store';

function Reviewer() {
    const reviewer = useSelector((state: RootState) => state.reviewer);
    const contributors = useSelector((state: RootState) => state.contributors);
    const error = useSelector((state: RootState) => state.reviewerError);
    const dispatch = useDispatch();

    // const handleFetchReviewer = (login: string, repo: string, blacklist: string[]) => {
    //     dispatch(asyncFetchReviewer(login, repo, blacklist));
    // };

    const fetchReviewer = async (login: string, repo: string, blacklist: string[]) => {
        try {
            dispatch(setReviewerError(''));
            const contributorsUrl = `https://api.github.com/repos/${login}/${repo}/contributors`;
            const response = await fetch(contributorsUrl);
            const data = await response.json();

            const filteredContributors = data.filter((contributor: any) => !blacklist.includes(contributor.login));

            if (filteredContributors.length === 0) {
                dispatch(setReviewerError('Данные не найдены для указанного логина и репозитория'));
                return;
            }
            const randomIndex = Math.floor(Math.random() * filteredContributors.length);
            const randomReviewer = filteredContributors[randomIndex].login;

            dispatch(setContributors(filteredContributors.map((contributor: any) => contributor.login)));
            dispatch(setReviewer(randomReviewer));


        } catch (error) {
            dispatch(setReviewerError('Произошла ошибка при получении данных'));
        }

    };

    return (
        <div className={styles.Reviewer}>
            {error && <p>{error}</p>}
            <Settings handleFetchReviewer={fetchReviewer} />
            <p>Рандомный ревьюер: {reviewer}</p>
            <p>Остальные контрибьютеры:</p>
            <ul>
                {contributors.map((contributor) => (
                    <li key={contributor}>{contributor}</li>
                ))}
            </ul>
        </div>
    );
}

export default Reviewer;
