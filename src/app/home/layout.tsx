import { SideBar } from '@/src/components/sidebar/sidebar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import styles from './Layout.module.css';
import { redirect } from 'next/navigation';
import UserData from '@/src/database/schemas/user-schema';
import dbConnect from '@/src/database/mongoose-connect';
import { ObjectId } from 'mongodb';
import { SelectSportModal } from '@/src/components/select-sport-modal/select-sport-modal';

export default async function HomeLayout({ children }: { children: React.ReactNode; }) {
    const session = await getServerSession(authOptions);
    let isSportSelected = true;
    await dbConnect();

    if (!session) {
        redirect('/signin');
    }
    else {
        const user = await UserData.findOne({ userId: new ObjectId(session.user.id) });
        if (!user) {
            isSportSelected = false;
            const newUser = new UserData({ userId: new ObjectId(session.user.id) });
            newUser.save().catch((err: any) => {
                console.error('An error occured while initializing user data');
                throw err;
            });
        }
        else if (!user.selectedSport) {
            isSportSelected = false;
        }
    }
    if (isSportSelected) {
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
    else {
        return (
            <div className={styles.overlay}>
                <SelectSportModal />
            </div>
        );
    }

}