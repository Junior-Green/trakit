'use client';

import {BasketballIcon, FootballIcon, HockeyIcon, SoccerIcon} from '../svgs';
import styles from './SelectSportModal.module.css';
import {useState} from 'react';
import classNames from 'classnames';
import {useEffect} from 'react';
import {useSession} from 'next-auth/react';

export const SelectSportModal = () => {
    const [index, setIndex] = useState(-1);
    const {data: session} = useSession();


    return (
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
            <button className={index != -1 ? styles.continueButton : styles.hidden}>{'>'}</button>
        </div>
    );

    async function updateUserData() {
        let selection: string;

        if (index === 0) {
            selection = 'soccer';
        }
        else if (index === 1) {
            selection = 'basketball';
        }
        else if (index === 2) {
            selection = 'football';
        }
        else if (index === 3) {
            selection = 'hockey';
        }
        else {
            throw new Error('index invalid');
        }

        const res = await fetch(`/api/users/updatesport/${selection}`);

    }

};