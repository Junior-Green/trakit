'use client';
import {useState} from 'react';
import {SelectSportDropdown} from '../select-sport-dropdown/select-sport-dropdown';
import styles from './SettingsModal.module.css';

interface SettingsModalType {
    teamName: string,
    selectedSport: "basketball" | "football" | "soccer" | "hockey" | null | undefined;
}


export const SettingsModal = ({teamName, selectedSport}: SettingsModalType) => {
    const [sport, setSport] = useState(selectedSport);
    console.log(teamName);

    return (
        <div className={styles.container}>
            <label className="text-2xl font-semibold"> Team Name </label>
            <input className={styles.inputField} type="text" defaultValue={teamName} />
            <SelectSportDropdown defaultSport={selectedSport} setSport={setSport} />
            <div className={styles.spacer} />
            <button className={styles.save}>Save</button>
        </div>
    );
};