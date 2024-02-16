import React, { useState } from 'react';
import SettingsForm from './SettingsForm';
import SettingsButton from './SettingsButton';
import styles from './SettingsStyles.module.css';


function Settings() {
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className={styles.Settings}>
            <SettingsButton onClick={toggleSettings} />
            {showSettings && <SettingsForm />}
        </div>
    );
}

export default Settings;
