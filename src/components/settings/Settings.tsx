import React, { useState } from 'react';
import SettingsForm from './SettingsForm';
import SettingsButton from './SettingsButton';
import styles from './SettingsStyles.module.css';



interface SettingsProps {
    handleFetchReviewer: (login: string, repo: string, blacklist: string[]) => void;
}

function Settings({ handleFetchReviewer }: SettingsProps) {
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className={styles.Settings}>
            <SettingsButton onClick={toggleSettings} />
            {showSettings && <SettingsForm handleFetchReviewer={handleFetchReviewer}/>}
        </div>
    );
}

export default Settings;
