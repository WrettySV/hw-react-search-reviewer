import React, { useState, useEffect } from 'react';
import Settings from "../settings/Settings";
import styles from './ReviewerStyles.module.css';


function Reviewer() {
    const [reviewer, setReviewer] = useState('');
    const [contributors, setContributors] = useState<string[]>([]);
    const [error, setError] = useState('');



    const fetchReviewer = async (login: string, repo: string, blacklist: string[]) => {
        try {
            setError('');
            const contributorsUrl = `https://api.github.com/repos/${login}/${repo}/contributors`;
            const response = await fetch(contributorsUrl);
            const data = await response.json();

            const filteredContributors = data.filter((contributor: any) => !blacklist.includes(contributor.login));

            if (filteredContributors.length === 0) {
                setError('Данные не найдены для указанного логина и репозитория');
                return;
            }
            const randomIndex = Math.floor(Math.random() * filteredContributors.length);
            const randomReviewer = filteredContributors[randomIndex].login;

            setContributors(filteredContributors.map((contributor: any) => contributor.login));
            setReviewer(randomReviewer);
        } catch (error) {
            setError('Произошла ошибка при получении данных');
        }
    };

    return (
        <div className={styles.Reviewer}>
            {error && <p>{error}</p>}
            <Settings handleFetchReviewer={fetchReviewer}/>
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
