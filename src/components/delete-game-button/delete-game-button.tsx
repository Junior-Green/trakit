'use client';

import {debounce} from '@mui/material';
import {TrashIcon} from '../svgs';
import styles from './DeleteGameButton.module.css';
import {useEffect, useMemo} from 'react';
import {deleteGame} from '@/src/utils/server-actions';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';

export const DeleteGameButton = ({id}: {id: string;}) => {
    const router = useRouter();
    const {data} = useSession();

    const debouncedFunc = useMemo(
        () => debounce(async () => {
            if (!data?.user) return;
            const res = await deleteGame(data.user.id, id);
            if (res) {
                router.back();
            }
        }, 1000)
        , [data?.user, id, router]);

    useEffect(() => {
        return () => {
            debouncedFunc.clear();
        };
    });

    return (
        <div className={styles.container} onClick={debouncedFunc}>
            <TrashIcon width={40} className={styles.icon} />
        </div>
    );
}

