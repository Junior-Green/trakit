import { useState } from "react";
import styles from './StopWatch.module.css'

type StopWatchProps = {
    time: number,
    setTime: (newVal: number) => void
}

export const StopWatch = ({ time, setTime }: StopWatchProps) => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    return (
        <>
            <div className={styles.main}>
                <h1 className={styles.label}>My Playtime</h1>
                <div>
                    <span className={styles.digits}>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span className={styles.digits}>
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    </span>
                </div>
            </div>
        </>
    )
}