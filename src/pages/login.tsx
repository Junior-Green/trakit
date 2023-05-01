import Head from 'next/head';
import styles from '../styles/Login.module.css';
import {GetStaticProps} from 'next/types';
import {SignInButton} from '../components/elements/signin-button/signin-button';
import {signIn} from 'next-auth/react';

export default function Login() {

    return (
        <div className={styles.main}>
            <Head>
                <title>Login</title>
                <meta name="description" content="login page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.panel}>
                <h1 className={styles.title}>Sign In</h1>
                <SignInButton image='/reddit_icon.png' textColor='black' backgroundColor={{r: 255, g: 255, b: 255}} provider='Reddit' onClick={() => signInWith('reddit')}></SignInButton>
                <SignInButton image='/google_icon.png' textColor='black' backgroundColor={{r: 255, g: 255, b: 255}} provider='Google' onClick={() => signInWith('google')}></SignInButton>
                <SignInButton image='/discord_icon.png' textColor='white' backgroundColor={{r: 114, g: 137, b: 218}} provider='Discord' onClick={() => signInWith('discord')}></SignInButton>
                <SignInButton image='/twitter_icon.png' textColor='white' backgroundColor={{r: 29, g: 161, b: 242}} provider='Twitter' onClick={() => signInWith('twitter')}></SignInButton>
            </div>
        </div>
    );

    function signInWith(provider: string) {
        signIn(provider, {
            redirect: true,
            callbackUrl: '/'
        });
    }
}

export const getStaticProps: GetStaticProps = async (_context) => {
    return {
        props: {}
    };
};
