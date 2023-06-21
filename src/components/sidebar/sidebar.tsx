"use client";

import {signOut} from 'next-auth/react';
import styles from './Sidebar.module.css';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {DashBoardIcon, RecordIcon, ScoreIcon} from '../svgs';

type SideBarProps = {
    username: string | null | undefined,
    profileImagePath: string | null | undefined;
};

export const SideBar = ({username, profileImagePath}: SideBarProps) => {
    const currPath: string | undefined = usePathname().split('/').pop();
    const router = useRouter();

    return (
        <div className={styles.panel}>
            <Image className={styles.logo} src={'/trakit_logo.png'} alt={'logo'} width={65} height={80}></Image>
            <div className={currPath == 'home' ? styles.containerSelected : styles.container} onClick={() => router.push('/home')}>
                <DashBoardIcon className={styles.containerIcon} />
                <p className={styles.containerLabel}>Dashboard</p>
            </div>
            <div className={currPath == 'seasons' ? styles.containerSelected : styles.container} onClick={() => router.push('/home/seasons')}>
                <ScoreIcon className={styles.containerIcon} />
                <p className={styles.containerLabel}>Game History</p>
            </div>
            <div className={currPath == 'livegame' ? styles.containerSelected : styles.container} onClick={() => router.push('/home/livegame')}>
                <RecordIcon className={styles.containerIcon} />
                <p className={styles.containerLabel}>Record Game</p>
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.userInfoContainer}>
                <Image className={styles.profilePicture} src={profileImagePath ? profileImagePath : '/profile_placeholder.png'} alt={'profile image'} width={30} height={30}></Image>
                <p className={styles.username}>{username ? username : 'User'}</p>
            </div>
            <button className={styles.signout} onClick={(event) => {
                event.preventDefault();
                signOut();
            }}>Sign Out</button>
        </div>
    );
};