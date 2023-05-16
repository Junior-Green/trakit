'use client';

import { BasketballIcon, FootballIcon, HockeyIcon, RightArrowIcon, SoccerIcon } from '../svgs';
import styles from './SelectSportModal.module.css';
import { useState } from 'react';
import classNames from 'classnames';
import { URL } from '@/src/utils';

export const SelectSportModal = () => {
    const [index, setIndex] = useState(-1);

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
            <button className={index != -1 ? styles.continueButton : styles.hidden} onClick={async e => {
                e.preventDefault();
                await updateUserData();
            }}>
                <RightArrowIcon width={25} />
            </button>
        </div>
    );

    async function updateUserData() {
        const sportArr = ['soccer', 'basketball', 'football', 'hockey'] as const

        const res = await fetch(`/api/users/updatesport?sport=${sportArr[index]}`, { cache: 'no-store', method: 'PUT' });

        if (res.status === 200) {

        }
    }

};