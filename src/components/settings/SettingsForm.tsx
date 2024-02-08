import React, { useEffect } from 'react';
import styles from './SettingsStyles.module.css';
import {useDispatch, useSelector} from "react-redux";
import store, {RootState} from "../redux/store";
import {setBlacklist, setLogin, setRepo, setSettingsError} from "../redux/actions";


interface SettingsFormProps {
    handleFetchReviewer: (login: string, repo: string, blacklist: string[]) => void;
}

function SettingsForm({ handleFetchReviewer }: SettingsFormProps){

    const login = useSelector((state: RootState) => state.login);
    const repo = useSelector((state: RootState) => state.repo);
    const blacklist = useSelector((state: RootState) => state.blacklist);
    const error = useSelector((state: RootState) => state.settingsError);
    const dispatch = useDispatch();



    useEffect(() => {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            const { login, repo, blacklist } = JSON.parse(savedSettings);
            dispatch(setLogin(login));
            dispatch(setRepo(repo));
            dispatch(setBlacklist(blacklist));
        }
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(setSettingsError(''));
        if (!login || !repo) {
            dispatch(setSettingsError('Ошибка: Логин и репозиторий должны быть заполнены'));
            return;
        }
        handleFetchReviewer(login, repo, blacklist.split(',').map((item: string) => item.trim()));

        const currentState = store.getState();
        console.log('Текущее состояние:', currentState);

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
                onChange={(e) => dispatch(setLogin(e.target.value))}
            />
            <input
                type="text"
                placeholder="Репозиторий"
                value={repo}
                onChange={(e) => dispatch(setRepo(e.target.value))}
            />
            <input
                type="text"
                placeholder="Blacklist (через запятую)"
                value={blacklist}
                onChange={(e) => dispatch(setBlacklist(e.target.value))}
            />
            <button onClick={handleSearch}>Поиска ревьюера</button>
            <p>Текущий пользователь: {login}</p>
        </div>

    );
}

export default SettingsForm;

