import React, { useState, useEffect } from 'react';
import styles from './SettingsStyles.module.css';


interface SettingsFormProps {
    handleFetchReviewer: (login: string, repo: string, blacklist: string[]) => void;
}

function SettingsForm({ handleFetchReviewer }: SettingsFormProps){
    const [login, setLogin] = useState('');
    const [repo, setRepo] = useState('');
    const [blacklist, setBlacklist] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            const { login, repo, blacklist } = JSON.parse(savedSettings);
            setLogin(login);
            setRepo(repo);
            setBlacklist(blacklist);
        }
    }, []);

    const handleSearch = () => {
        setError('');
        if (!login || !repo) {
            setError('Ошибка: Логин и репозиторий должны быть заполнены');
            return;
        }
        handleFetchReviewer(login, repo, blacklist.split(',').map((item) => item.trim()));
        const settings = { login, repo, blacklist };
        localStorage.setItem('settings', JSON.stringify(settings));
        console.log("saved settings", login, repo, blacklist);
    };

    return (
        <div className={styles.SettingsForm}>
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Логин текущего пользователя"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                type="text"
                placeholder="Репозиторий"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Blacklist (через запятую)"
                value={blacklist}
                onChange={(e) => setBlacklist(e.target.value)}
            />
            <button onClick={handleSearch}>Поиска ревьюера</button>
            <p>Текущий пользователь: {login}</p>
        </div>

    );
}

export default SettingsForm;

