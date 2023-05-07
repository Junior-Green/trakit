"use client";

import styles from './Sidebar.module.css';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

type SideBarProps = {
    username: string | null | undefined,
    profileImagePath: string | null | undefined;
};

export const SideBar = ({username, profileImagePath}: SideBarProps) => {
    const currPath: string = usePathname().substring(1);

    return (
        <div className={styles.panel}>
            <Image className={styles.logo} src={'/trakit_logo.png'} alt={'logo'} width={65} height={80}></Image>
            <div className={styles.navigationContainer}>
                <div className={currPath == 'home' ? styles.containerSelected : styles.container}>
                    <p className={styles.containerLabel}>Dashboard</p>
                </div>
                <div className={currPath == 'seasons' ? styles.containerSelected : styles.container}>
                    <p className={styles.containerLabel}>Games</p>
                </div>
                <div className={currPath == 'livegame' ? styles.containerSelected : styles.container}>
                    <p className={styles.containerLabel}>Live Game</p>
                </div>
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.userInfoContainer}>
                <Image className={styles.profilePicture} src={profileImagePath ? profileImagePath : '/profile_placeholder.png'} alt={'profile image'} width={30} height={30}></Image>
                <p className={styles.username}>{username ? username : 'User'}</p>
            </div>
            <button className={styles.signout}>Sign Out</button>
        </div>
    );
};