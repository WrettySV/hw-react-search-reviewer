import React from 'react';
import { useSelector } from 'react-redux';
import Settings from '../settings/Settings';
import styles from './ReviewerStyles.module.css';
import { RootState } from '../redux/store';

function Reviewer() {
    const reviewer = useSelector((state: RootState) => state.reviewer.reviewer);
    const contributors = useSelector((state: RootState) => state.reviewer.contributors);
    const error = useSelector((state: RootState) => state.reviewer.reviewerError);

    return (
        <div className={styles.Reviewer}>
            {error && <p>{error}</p>}
            <Settings />
            <p>Рандомный ревьюер: {reviewer}</p>
            <p>Остальные контрибьютеры:</p>
            <ul>
                {contributors.map((contributor: string) => (
                    <li key={contributor}>{contributor}</li>
                ))}
            </ul>
        </div>
    );
}

export default Reviewer;
