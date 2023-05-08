
import styles from './SignIn.module.css';
import {SignInButton} from '../../components/signin-button/signin-button';
import Image from 'next/image';

export const metadata = {
    title: 'Sign In',
    generator: 'Next.js',
    applicationName: 'TrakIt',
    authors: [{name: 'Junior'}],
    colorScheme: 'dark',
    creator: 'Junior Green',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

export default function SignIn() {

    return (
        <div className={styles.background}>
            <div className={styles.panel}>
                <Image src="/trakit_logo.png" alt="trakit logo" width={150} height={100} className={styles.logo}></Image>
                <SignInButton image='/reddit_icon.png' textColor='black' backgroundColor={{r: 255, g: 255, b: 255}} provider='Reddit'></SignInButton>
                <SignInButton image='/google_icon.png' textColor='black' backgroundColor={{r: 255, g: 255, b: 255}} provider='Google'></SignInButton>
                <SignInButton image='/discord_icon.png' textColor='white' backgroundColor={{r: 114, g: 137, b: 218}} provider='Discord'></SignInButton>
                <SignInButton image='/twitter_icon.png' textColor='white' backgroundColor={{r: 29, g: 161, b: 242}} provider='Twitter'></SignInButton>
            </div>
        </div>
    );
}
