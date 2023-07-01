'use client';
import { useState } from 'react';
import { SelectSportDropdown } from '../select-sport-dropdown/select-sport-dropdown';
import styles from './SettingsModal.module.css';
import { Alert, CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import { updateSettings } from '@/src/utils/server-actions';
import { useSession } from 'next-auth/react';

interface SettingsModalType {
    teamName: string,
    selectedSport: "basketball" | "football" | "soccer" | "hockey" | null | undefined;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#8C71F4',
        },
    },
});


export const SettingsModal = ({ teamName, selectedSport }: SettingsModalType) => {
    const [sport, setSport] = useState(selectedSport);
    const [name, setName] = useState(teamName);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, showSuccess] = useState(false);
    const [error, showError] = useState(false);
    const { data } = useSession()

    return (
        <div className={styles.container + " drop-shadow-lg"}>
            <label className="text-lg font-semibold"> Team Name </label>
            <input className="outline-none border-none text-lg bg-trakit-600 pl-1 pt-1 pb-1 h-15 text-center rounded-md mb-3" type="text" placeholder={teamName}
                onInput={(input) => {
                    const newName = input.currentTarget.value.trim()
                    setName((_) => newName === "" ? teamName : newName)
                    setIsDisabled(input.currentTarget.value !== "" && newName === "")
                }} />
            <label className="text-lg font-semibold"> Sport </label>
            <SelectSportDropdown defaultSport={selectedSport} setSport={setSport} />
            <div className={styles.spacer} />
            <button className={styles.save + ` ${isDisabled ? "hidden" : ""}`} onClick={async () => {
                if (!sport || !data?.user.id) return;

                setIsLoading(true)
                setIsDisabled(true)

                const res = await updateSettings({ teamName: name, sport, userId: data.user.id })
                res ? showSuccess(true) : showError(true)
                setIsLoading(false)
                setIsDisabled(false)
            }}>Save</button>
            {isLoading &&
                <ThemeProvider theme={theme}>
                    <CircularProgress thickness={5.0} size={40} />
                </ThemeProvider>
            }
            {error && <Alert className="absolute bottom-5 left-auto right-auto" severity='error' onClose={() => showError(false)} variant='filled'>Error - something went wrong</Alert>}
            {success && <Alert className="absolute bottom-5 left-auto right-auto" severity='success' onClose={() => showSuccess(false)} variant='filled'>Settings updated</Alert>}
        </div>
    );

    function handleSave() {

    }
};