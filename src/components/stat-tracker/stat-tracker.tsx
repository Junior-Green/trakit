import styles from "./StatTracker.module.css"


type StatTrackerProps = {
    label: string,
    stat: number,
    dispatcher?: (option: 'increment' | 'decrement') => void
}

export const StatTracker = ({ label, dispatcher, stat }: StatTrackerProps) => {

    return (
        <div className={styles.body}>
            <h1 className={styles.label}>{label}</h1>
            <div className={styles.row}>
                {dispatcher && <button className={styles.button} onClick={() => dispatcher('decrement')}>-</button>}
                <span className={styles.counter}>{stat}</span>
                {dispatcher && <button className={styles.button} onClick={() => dispatcher('increment')}>+</button>}
            </div>
        </div>
    )
}