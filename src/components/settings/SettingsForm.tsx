import React, { useEffect } from 'react';
import styles from './SettingsStyles.module.css';
import { useSelector } from "react-redux";
import store, {RootState, useAppDispatch} from "../redux/store";
import {asyncFetchReviewer, setBlacklist, setLogin, setRepo, setSettingsError} from "../redux/actions";


function SettingsForm(){

    const login = useSelector((state: RootState) => state.settings.login);
    const repo = useSelector((state: RootState) => state.settings.repo);
    const blacklist = useSelector((state: RootState) => state.settings.blacklist);
    const error = useSelector((state: RootState) => state.settings.settingsError);
    const dispatch = useAppDispatch();



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
        dispatch(asyncFetchReviewer());

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

