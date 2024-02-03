import React from 'react';
import styles from './SettingsStyles.module.css';


interface SettingsButtonProps {
    onClick: () => void;
}

function SettingsButton({ onClick }: SettingsButtonProps) {
    return (
        <button className={styles.SettingsButton} onClick={onClick}>Настройки</button>
    );
}

export default SettingsButton;
