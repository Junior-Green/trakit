
type StatTrackerProps = {
    label: string,
    stat: number,
    dispatcher: (option: 'increment' | 'decrement') => void
}

export const StatTracker = ({label, dispatcher} : StatTrackerProps) => {

    return (
        <>
        </>
    )
}