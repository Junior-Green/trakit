import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from './StopWatch.module.css'
import { PauseIcon, PlayIcon } from "../svgs";

type StopWatchProps = {
    time: number,
    setTime: Dispatch<SetStateAction<number>>
}

export const StopWatch = ({ time, setTime }: StopWatchProps) => {
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timer | undefined;

        if (!isPaused) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };

    }, [isPaused])

    return (
        <>
            <div className={styles.main}>
                <h1 className={styles.label}>My Playtime</h1>
                <div className={styles.displayContainer}  >
                    <div className={styles.spacer} />
                    <span className={styles.digits}>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2) + ":" + ("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    </span>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={() => setIsPaused(!isPaused)}>
                            {!isPaused ? <PauseIcon className={styles.buttonIcon} /> : <PlayIcon className={styles.buttonIcon} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}