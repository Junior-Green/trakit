'use client';

import { BasketballIcon, FootballIcon, HockeyIcon, RightArrowIcon, SoccerIcon } from '../svgs';
import styles from './SelectSportModal.module.css';
import { useState } from 'react';
import classNames from 'classnames';
import { Alert, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import Router from 'next/router';
import { redirect } from 'next/navigation';
import { URL } from '@/src/utils';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8C71F4',
        },
    },
});

export const SelectSportModal = () => {
    const [index, setIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    return (
        <>
            <div className={classNames(styles.panel, styles.slidetop)}>
                <h1 className={styles.title}>Select your sport</h1>
                <div className={index === 0 ? classNames(styles.soccerButton, styles.selectedButton) : styles.soccerButton} onClick={() => setIndex(0)}>
                    <SoccerIcon className={styles.soccerIcon} width={25} />
                    <p className={styles.buttonLabel}>Soccer</p>
                </div>
                <div className={index === 1 ? classNames(styles.basketballButton, styles.selectedButton) : styles.basketballButton} onClick={() => setIndex(1)}>
                    <BasketballIcon width={25} />
                    <p className={styles.buttonLabel}>Basketball</p>
                </div>
                <div className={index === 2 ? classNames(styles.footballButton, styles.selectedButton) : styles.footballButton} onClick={() => setIndex(2)}>
                    <FootballIcon width={25} />
                    <p className={styles.buttonLabel}>Football</p>
                </div>
                <div className={index === 3 ? classNames(styles.hockeyButton, styles.selectedButton) : styles.hockeyButton} onClick={() => setIndex(3)}>
                    <HockeyIcon width={25} />
                    <p className={styles.buttonLabel}>Hockey</p>
                </div>
                {
                    isLoading ?
                        <ThemeProvider theme={theme}>
                            <CircularProgress className={styles.circularLoader} thickness={5.0} size={50} />
                        </ThemeProvider>
                        :
                        <button className={index != -1 ? styles.continueButton : styles.hidden} onClick={e => {
                            setIsLoading(true);
                            setError(false);
                            e.preventDefault();
                            updateUserData().then(
                                () => setIsLoading(false),
                                () => setIsLoading(false)
                            )
                        }}>
                            <RightArrowIcon width={25} />
                        </button>

                }
            </div>
            {error && <Alert className={styles.alert} severity='error' onClose={() => setError(false)} variant='filled'>Error - something went wrong</Alert>}
        </>
    );

    async function updateUserData() {
        const sportArr = ['soccer', 'basketball', 'football', 'hockey'] as const

        const res = await fetch(`/api/users/updatesport?sport=${sportArr[index]}`, { cache: 'no-store', method: 'PUT' });

        if (res.status === 200) {
            window.location.href = `${URL}/home`
        }
        else {
            setError(true)
        }
    }

};