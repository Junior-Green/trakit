import {SideBar} from '@/src/components/sidebar/sidebar';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '../api/auth/[...nextauth]/route';
import styles from './Layout.module.css'

export default async function HomeLayout({children}: {children: React.ReactNode;}) {
    const session = await getServerSession(authOptions);

    return (
        <div className={styles.root}>
            <div className={styles.sidebar}>
                <SideBar profileImagePath={session?.user.image} username={session?.user.name}></SideBar>
            </div>
            <div className={styles.child}>
                {children}
            </div>  
        </div>
    );
}