'use client'

import { useReducer, useState } from "react";
import styles from './GameRecorder.module.css'
import { StatTracker } from "../stat-tracker/stat-tracker";
import { StopWatch } from "../stopwatch/stopwatch";
import { ThemeProvider } from "@emotion/react";
import { Alert, CircularProgress, createTheme } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import { RightArrowIcon } from "../svgs";

type GameRecorderProps = {
    sport: 'soccer' | 'basketball' | 'hockey' | 'football'
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#8C71F4',
        },
    },
});

const basketballIinitState = {
    pointsScored: 0,
    fieldGoalsMade: 0,
    fieldGoalsMissed: 0,
    threePointersMade: 0,
    threePointersMissed: 0,
    freeThrowsMade: 0,
    freeThrowsMissed: 0,
    offensiveRebounds: 0,
    defensiveRebounds: 0,
    turnovers: 0,
    steals: 0,
    blocks: 0,
    personalFouls: 0,
} as const

const soccerInitState = {
    goals: 0,
    assists: 0,
    foulsCommitted: 0,
    redCards: 0,
    yellowCards: 0,
    offsides: 0,
    shotsOffTarget: 0,
    shotsOnTarget: 0,
    tackles: 0,
    blocks: 0,
    interceptions: 0,
    clearances: 0,
    turnovers: 0,
    saves: 0,
    goalsGiven: 0,
} as const

const hockeyInitState = {
    goals: 0,
    assists: 0,
    penaltyMinutes: 0,
    powerPlayGoals: 0,
    shortHandedGoals: 0,
    overTimeGoals: 0,
    shotsTaken: 0,
    faceoffWins: 0,
    faceOffLosses: 0,
    saves: 0,
    goalsGiven: 0,
    shutouts: 0,
} as const

const footballInitState = {
    kickoffs: 0,
    touchbacks: 0,
    fieldGoalsMade: 0,
    fieldGoalsMissed: 0,
    carries: 0,
    totalRushingYards: 0,
    rushingTouchDowns: 0,
    fumbles: 0,
    receptions: 0,
    targets: 0,
    totalRecievingYards: 0,
    receivingTouchDowns: 0,
    drops: 0,
    tackles: 0,
    sacks: 0,
    passesDefended: 0,
    interceptions: 0,
    hurries: 0,
    safeties: 0,
    passesMade: 0,
    passesMissed: 0,
    passingTouchDowns: 0,
    interceptedPasses: 0,
    totalPassingYards: 0
} as const

function basektballReducer(state: any, action: { type: string, payload: 'increment' | 'decrement' }) {
    switch (action.type) {
        case 'pointsScored':
            return {
                ...state,
                pointsScored: action.payload === 'increment' ? state.pointsScored + 1 : Math.max(0, state.pointsScored - 1),
            };
        case 'fieldGoalsMade':
            return {
                ...state,
                fieldGoalsMade: action.payload === 'increment' ? state.fieldGoalsMade + 1 : Math.max(0, state.fieldGoalsMade - 1),

            };
        case 'fieldGoalsMissed':
            return {
                ...state,
                fieldGoalsMissed: action.payload === 'increment' ? state.fieldGoalsMissed + 1 : Math.max(0, state.fieldGoalsMissed - 1),

            };
        case 'threePointersMade':
            return {
                ...state,
                threePointersMade: action.payload === 'increment' ? state.threePointersMade + 1 : Math.max(0, state.threePointersMade - 1),
            };
        case 'threePointersMissed':
            return {
                ...state,
                threePointersMissed: action.payload === 'increment' ? state.threePointersMissed + 1 : Math.max(0, state.threePointersMissed - 1),
            };
        case 'freeThrowsMade':
            return {
                ...state,
                freeThrowsMade: action.payload === 'increment' ? state.freeThrowsMade + 1 : Math.max(0, state.freeThrowsMade - 1),
            };
        case 'freeThrowsMissed':
            return {
                ...state,
                freeThrowsMissed: action.payload === 'increment' ? state.freeThrowsMissed + 1 : Math.max(0, state.freeThrowsMissed - 1),
            };
        case 'offensiveRebounds':
            return {
                ...state,
                offensiveRebounds: action.payload === 'increment' ? state.offensiveRebounds + 1 : Math.max(0, state.offensiveRebounds - 1),
            };
        case 'defensiveRebounds':
            return {
                ...state,
                defensiveRebounds: action.payload === 'increment' ? state.defensiveRebounds + 1 : Math.max(0, state.defensiveRebounds - 1),
            };
        case 'turnovers':
            return {
                ...state,
                turnovers: action.payload === 'increment' ? state.turnovers + 1 : Math.max(0, state.turnovers - 1),
            };
        case 'steals':
            return {
                ...state,
                steals: action.payload === 'increment' ? state.steals + 1 : Math.max(0, state.steals - 1),
            };
        case 'blocks':
            return {
                ...state,
                blocks: action.payload === 'increment' ? state.blocks + 1 : Math.max(0, state.blocks - 1),
            };
        case 'personalFouls':
            return {
                ...state,
                personalFouls: action.payload === 'increment' ? state.personalFouls + 1 : Math.max(0, state.personalFouls - 1),
            };
        case 'reset':
            return {
                ...basketballIinitState
            }
        default:
            throw new Error('Invalid reducer invocation');
    }
}

function soccerReducer(state: any, action: { type: string, payload: 'increment' | 'decrement' }) {
    switch (action.type) {
        case 'goals':
            return {
                ...state,
                goals: action.payload === 'increment' ? state.goals + 1 : Math.max(0, state.goals - 1),
            };
        case 'assists':
            return {
                ...state,
                assists: action.payload === 'increment' ? state.assists + 1 : Math.max(0, state.assists - 1),
            };
        case 'foulsCommitted':
            return {
                ...state,
                foulsCommitted: action.payload === 'increment' ? state.foulsCommitted + 1 : Math.max(0, state.foulsCommitted - 1),
            };
        case 'redCards':
            return {
                ...state,
                redCards: action.payload === 'increment' ? state.redCards + 1 : Math.max(0, state.redCards - 1),
            };
        case 'yellowCards':
            return {
                ...state,
                yellowCards: action.payload === 'increment' ? state.yellowCards + 1 : Math.max(0, state.yellowCards - 1),
            };
        case 'offsides':
            return {
                ...state,
                offSides: action.payload === 'increment' ? state.offSides + 1 : Math.max(0, state.offSides - 1),
            };
        case 'shotsOffTarget':
            return {
                ...state,
                shotsOffTarget: action.payload === 'increment' ? state.shotsOffTarget + 1 : Math.max(0, state.shotsOffTarget - 1),
            };
        case 'shotsOnTarget':
            return {
                ...state,
                shotsOnTarget: action.payload === 'increment' ? state.shotsOnTarget + 1 : Math.max(0, state.shotsOnTarget - 1),
            };
        case 'tackles':
            return {
                ...state,
                tackles: action.payload === 'increment' ? state.tackles + 1 : Math.max(0, state.tackles - 1),
            };
        case 'blocks':
            return {
                ...state,
                blocks: action.payload === 'increment' ? state.blocks + 1 : Math.max(0, state.blocks - 1),
            };
        case 'interceptions':
            return {
                ...state,
                interceptions: action.payload === 'increment' ? state.interceptions + 1 : Math.max(0, state.interceptions - 1),
            };
        case 'clearances':
            return {
                ...state,
                clearances: action.payload === 'increment' ? state.clearances + 1 : Math.max(0, state.clearances - 1),
            };
        case 'turnovers':
            return {
                ...state,
                turnovers: action.payload === 'increment' ? state.turnovers + 1 : Math.max(0, state.turnovers - 1),
            };
        case 'saves':
            return {
                ...state,
                saves: action.payload === 'increment' ? state.saves + 1 : Math.max(0, state.saves - 1),
            };
        case 'goalsGiven':
            return {
                ...state,
                goalsGiven: action.payload === 'increment' ? state.goalsGiven + 1 : Math.max(0, state.goalsGiven - 1),
            };
        case 'reset':
            return {
                ...soccerInitState
            }
        default:
            throw new Error('Invalid reducer invocation');
    }
}

function footballReducer(state: any, action: { type: string, payload: 'increment' | 'decrement' }) {
    switch (action.type) {
        case 'kickoffs':
            return {
                ...state,
                kickoffs: action.payload === 'increment' ? state.kickoffs + 1 : Math.max(0, state.kickoffs - 1),
            };
        case 'touchbacks':
            return {
                ...state,
                touchbacks: action.payload === 'increment' ? state.touchbacks + 1 : Math.max(0, state.touchbacks - 1),
            };
        case 'fieldGoalsMade':
            return {
                ...state,
                fieldGoalsMade: action.payload === 'increment' ? state.fieldGoalsMade + 1 : Math.max(0, state.fieldGoalsMade - 1),
            };
        case 'fieldGoalsMissed':
            return {
                ...state,
                fieldGoalsMissed: action.payload === 'increment' ? state.fieldGoalsMissed + 1 : Math.max(0, state.fieldGoalsMissed - 1),
            };
        case 'carries':
            return {
                ...state,
                carries: action.payload === 'increment' ? state.carries + 1 : Math.max(0, state.carries - 1),
            };
        case 'totalRushingYards':
            return {
                ...state,
                totalRushingYards: action.payload === 'increment' ? state.totalRushingYards + 1 : Math.max(0, state.totalRushingYards - 1),
            };
        case 'rushingTouchDowns':
            return {
                ...state,
                rushingTouchDowns: action.payload === 'increment' ? state.rushingTouchDowns + 1 : Math.max(0, state.rushingTouchDowns - 1),
            };
        case 'fumbles':
            return {
                ...state,
                fumbles: action.payload === 'increment' ? state.fumbles + 1 : Math.max(0, state.fumbles - 1),
            };
        case 'receptions':
            return {
                ...state,
                receptions: action.payload === 'increment' ? state.receptions + 1 : Math.max(0, state.receptions - 1),
            };
        case 'targets':
            return {
                ...state,
                targets: action.payload === 'increment' ? state.targets + 1 : Math.max(0, state.targets - 1),
            };
        case 'totalRecievingYards':
            return {
                ...state,
                totalRecievingYards: action.payload === 'increment' ? state.totalRecievingYards + 1 : Math.max(0, state.totalRecievingYards - 1),
            };
        case 'receivingTouchDowns':
            return {
                ...state,
                receivingTouchDowns: action.payload === 'increment' ? state.receivingTouchDowns + 1 : Math.max(0, state.receivingTouchDowns - 1),
            };
        case 'drops':
            return {
                ...state,
                drops: action.payload === 'increment' ? state.drops + 1 : Math.max(0, state.drops - 1),
            };
        case 'tackles':
            return {
                ...state,
                tackles: action.payload === 'increment' ? state.tackles + 1 : Math.max(0, state.tackles - 1),
            };
        case 'sacks':
            return {
                ...state,
                sacks: action.payload === 'increment' ? state.sacks + 1 : Math.max(0, state.sacks - 1),
            };
        case 'passesDefended':
            return {
                ...state,
                passesDefended: action.payload === 'increment' ? state.passesDefended + 1 : Math.max(0, state.passesDefended - 1),
            };
        case 'interceptions':
            return {
                ...state,
                interceptions: action.payload === 'increment' ? state.interceptions + 1 : Math.max(0, state.interceptions - 1),
            };
        case 'hurries':
            return {
                ...state,
                hurries: action.payload === 'increment' ? state.hurries + 1 : Math.max(0, state.hurries - 1),
            };
        case 'safeties':
            return {
                ...state,
                safeties: action.payload === 'increment' ? state.safeties + 1 : Math.max(0, state.safeties - 1),
            };
        case 'passesMade':
            return {
                ...state,
                passesMade: action.payload === 'increment' ? state.passesMade + 1 : Math.max(0, state.passesMade - 1),
            };
        case 'passesMissed':
            return {
                ...state,
                passesMissed: action.payload === 'increment' ? state.passesMissed + 1 : Math.max(0, state.passesMissed - 1),
            };
        case 'passingTouchDowns':
            return {
                ...state,
                passingTouchDowns: action.payload === 'increment' ? state.passingTouchDowns + 1 : Math.max(0, state.passingTouchDowns - 1),
            };
        case 'interceptedPasses':
            return {
                ...state,
                interceptedPasses: action.payload === 'increment' ? state.interceptedPasses + 1 : Math.max(0, state.interceptedPasses - 1),
            };
        case 'totalPassingYards':
            return {
                ...state,
                totalPassingYards: action.payload === 'increment' ? state.totalPassingYards + 1 : Math.max(0, state.totalPassingYards - 1),
            };
        case 'reset':
            return {
                ...footballInitState
            }
        default:
            throw new Error('Invalid reducer invocation');
    }
}

function hockeyReducer(state: any, action: { type: string, payload: 'increment' | 'decrement' }) {
    switch (action.type) {
        case 'goals':
            return {
                goals: action.payload === 'increment' ? state.goals + 1 : Math.max(0, state.goals - 1),
                ...state
            };
        case 'assists':
            return {
                assists: action.payload === 'increment' ? state.assists + 1 : Math.max(0, state.assists - 1),
                ...state
            };
        case 'penaltyMinutes':
            return {
                penaltyMinutes: action.payload === 'increment' ? state.penaltyMinutes + 1 : Math.max(0, state.penaltyMinutes - 1),
                ...state
            };
        case 'powerPlayGoals':
            return {
                powerPlayGoals: action.payload === 'increment' ? state.powerPlayGoals + 1 : Math.max(0, state.powerPlayGoals - 1),
                ...state
            };
        case 'shortHandedGoals':
            return {
                shortHandedGoals: action.payload === 'increment' ? state.shortHandedGoals + 1 : Math.max(0, state.shortHandedGoals - 1),
                ...state
            };
        case 'overTimeGoals':
            return {
                overTimeGoals: action.payload === 'increment' ? state.overTimeGoals + 1 : Math.max(0, state.overTimeGoals - 1),
                ...state
            };
        case 'shotsTaken':
            return {
                shotsTaken: action.payload === 'increment' ? state.shotsTaken + 1 : Math.max(0, state.shotsTaken - 1),
                ...state
            };
        case 'faceoffWins':
            return {
                faceoffWins: action.payload === 'increment' ? state.faceoffWins + 1 : Math.max(0, state.faceoffWins - 1),
                ...state
            };
        case 'faceOffLosses':
            return {
                faceOffLosses: action.payload === 'increment' ? state.faceOffLosses + 1 : Math.max(0, state.faceOffLosses - 1),
                ...state
            };
        case 'saves':
            return {
                saves: action.payload === 'increment' ? state.saves + 1 : Math.max(0, state.saves - 1),
                ...state
            };
        case 'goalsGiven':
            return {
                goalsGiven: action.payload === 'increment' ? state.goalsGiven + 1 : Math.max(0, state.goalsGiven - 1),
                ...state
            };
        case 'shutOuts':
            return {
                shutOuts: action.payload === 'increment' ? state.shutOuts + 1 : Math.max(0, state.shutOuts - 1),
                ...state
            };
        case 'reset':
            return {
                ...hockeyInitState
            }
        default:
            throw new Error('Invalid reducer invocation');
    }
}

export const GameRecorder = ({ sport }: GameRecorderProps) => {
    let reducer: (state: any, action: { type: string, payload: 'increment' | 'decrement' }) => any;
    let initialState;
    switch (sport) {
        case 'basketball':
            reducer = basektballReducer
            initialState = basketballIinitState
            break;
        case 'soccer':
            reducer = soccerReducer
            initialState = soccerInitState
            break;
        case 'hockey':
            reducer = hockeyReducer
            initialState = hockeyInitState
            break;
        case 'football':
            reducer = footballReducer
            initialState = footballInitState
            break;
        default:
            throw new Error('Error initializing useReducer dependencies')
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [teamScore, setTeamScore] = useState(0)
    const [opponentScore, setOpponentScore] = useState(0)
    const [time, setTime] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [error, showError] = useState(false)
    const [success, showSuccess] = useState(false)
    const [dialog, showTeamNameDialog] = useState(false)
    const [opponentName, setOpponentName] = useState("")

    if (isLoading) {
        return (
            <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ThemeProvider theme={theme}>
                    <CircularProgress className={styles.circularLoader} thickness={5.0} size={100} />
                </ThemeProvider>
            </div>
        )
    }
    if (dialog) {
        return (
            <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className={styles.popupContainer}>
                    <h1 style={{ margin: "0", fontSize: "1.75em", fontWeight: "400" }}>Enter opponent team name</h1>
                    <div className={styles.form}>
                        <input className={styles.inputField} type="text" placeholder="name" onInput={(input) => setOpponentName(input.currentTarget.value.trim())} />
                        <button className={styles.arrowButton} onClick={() => writeToDatabase()} disabled={opponentName === ""}><RightArrowIcon /></button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.scoreboard}>
                <div className={styles.score}>
                    <h2 className={styles.teamLabel}>Team</h2>
                    <h1 className={styles.scoreLabel}>{String(teamScore).padStart(3, '0')}</h1>
                    <div className={styles.buttons}>
                        <button className={styles.decrement} onClick={() => setTeamScore(Math.max(0, teamScore - 1))}>-</button>
                        <button className={styles.increment} onClick={() => setTeamScore(teamScore + 1)}>+</button>
                    </div>
                </div>
                <div className={styles.midSection}>
                    <div className={styles.spacer} />
                    <StopWatch time={time} setTime={setTime} />
                    <div className={styles.spacer}>
                        <button className={styles.endSessionButton} onClick={() => showTeamNameDialog(true)}>End Game</button>
                    </div>
                </div>
                <div className={styles.score}>
                    <h2 className={styles.teamLabel}>Opponent</h2>
                    <h1 className={styles.scoreLabel}>{String(opponentScore).padStart(3, '0')}</h1>
                    <div className={styles.buttons}>
                        <button className={styles.decrement} onClick={() => setOpponentScore(Math.max(0, opponentScore - 1))}>-</button>
                        <button className={styles.increment} onClick={() => setOpponentScore(opponentScore + 1)}>+</button>
                    </div>
                </div>
            </div>
            <div className={styles.trackerContainer}>
                {
                    Object.keys(initialState).sort((a, b) => a.localeCompare(b)).map(
                        (key) => <StatTracker key={key} label={camelCaseToTitleCase(key)} dispatcher={(option: 'increment' | 'decrement') => dispatch({ type: key, payload: option })} stat={state[key]} />
                    )
                }
            </div>
            {error && <Alert className={styles.alert} severity='error' onClose={() => showError(false)} variant='filled'>Error - something went wrong</Alert>}
            {success && <Alert className={styles.alert} severity='success' onClose={() => showSuccess(false)} variant='filled'>Game succesfully saved</Alert>}
        </>
    )

    async function writeToDatabase(): Promise<void> {
        setLoading(true);
        showTeamNameDialog(false);
        const res = await fetch(`/api/users/savegame`,
            {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    opponentTeam: opponentName,
                    teamScore: teamScore,
                    opponentScore: opponentScore,
                    minutesPlayed: Math.round(time / 60),
                    ...state,
                })
            });

        if (res.status !== 200) {
            showError(true);
        }
        else {
            dispatch({ type: 'reset', payload: 'decrement' });
            setOpponentScore(0);
            setTeamScore(0);
            setTime(0);
            showSuccess(true)
        }
        setOpponentName("");
        setLoading(false);
    }
}

function camelCaseToTitleCase(str: string): string {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}
