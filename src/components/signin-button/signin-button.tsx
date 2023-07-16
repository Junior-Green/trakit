"use client";

import styles from './signin-button.module.css';
import Image from 'next/image';
import {signIn} from 'next-auth/react';

type SignInButtonProps = {
    image: string,
    backgroundColor: {
        r: number,
        g: number,
        b: number;
    },
    provider: string,
    textColor: 'white' | 'black',
};

export const SignInButton = ({image, backgroundColor, provider, textColor}: SignInButtonProps) => {
    return (
        <div className={styles.main} style={{backgroundColor: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`}} onClick={() => signInWith(provider.toLowerCase())}>
            <Image alt={``} src={image} style={{objectFit: 'contain', display: 'inline-flex'}} width={30} height={30}></Image>
            <p className={styles.label} style={{color: `${textColor}`}}>{`Sign in with ${provider}`}</p>
        </div>
    );

    function signInWith(provider: string) {
        signIn(provider, {
            redirect: true,
            callbackUrl: '/home'
        });
    }
};