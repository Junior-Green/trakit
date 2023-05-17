'use client'

import { useReducer } from "react";

type GameRecorderProps = {
    sport: 'soccer' | 'basketball' | 'hockey' | 'football'
}

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
    offSides: 0,
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
    shutOuts: 0,
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
                pointsScored: action.payload == 'increment' ? state.pointsScored + 1 : state.pointsScored - 1,
                ...state
            };
        case 'fieldGoalsMade':
            return {
                fieldGoalsMade: action.payload == 'increment' ? state.fieldGoalsMade + 1 : state.fieldGoalsMade - 1,
                ...state
            };
        case 'fieldGoalsMissed':
            return {
                fieldGoalsMissed: action.payload == 'increment' ? state.fieldGoalsMissed + 1 : state.fieldGoalsMissed - 1,
                ...state
            };
        case 'threePointersMade':
            return {
                threePointersMade: action.payload == 'increment' ? state.threePointersMade + 1 : state.threePointersMade - 1,
                ...state
            };
        case 'threePointersMissed':
            return {
                threePointersMissed: action.payload == 'increment' ? state.threePointersMissed + 1 : state.threePointersMissed - 1,
                ...state
            };
        case 'freeThrowsMade':
            return {
                freeThrowsMade: action.payload == 'increment' ? state.freeThrowsMade + 1 : state.freeThrowsMade - 1,
                ...state
            };
        case 'freeThrowsMissed':
            return {
                freeThrowsMissed: action.payload == 'increment' ? state.freeThrowsMissed + 1 : state.freeThrowsMissed - 1,
                ...state
            };
        case 'offensiveRebounds':
            return {
                offensiveRebound: action.payload == 'increment' ? state.offensiveRebounds + 1 : state.offensiveRebounds - 1,
                ...state
            };
        case 'defensiveRebounds':
            return {
                defensiveRebounds: action.payload == 'increment' ? state.defensiveRebounds + 1 : state.defensiveRebounds - 1,
                ...state
            };
        case 'turnovers':
            return {
                turnovers: action.payload == 'increment' ? state.turnovers + 1 : state.turnovers - 1,
                ...state
            };
        case 'steals':
            return {
                steals: action.payload == 'increment' ? state.steals + 1 : state.steals - 1,
                ...state
            };
        case 'blocks':
            return {
                blocks: action.payload == 'increment' ? state.blocks + 1 : state.blocks - 1,
                ...state
            };
        case 'personalFouls':
            return {
                personalFouls: action.payload == 'increment' ? state.personalFouls + 1 : state.personalFouls - 1,
                ...state
            };
        default:
            throw new Error('Invalid reducer invocation');
    }
}

function soccerReducer(state: any, action: { type: string, payload: 'increment' | 'decrement' }) {
    switch (action.type) {
        case 'goals':
            return {
                goals: action.payload == 'increment' ? state.goals + 1 : state.goals - 1,
                ...state
            };
        case 'assists':
            return {
                assists: action.payload == 'increment' ? state.assists + 1 : state.assists - 1,
                ...state
            };
        case 'foulsCommitted':
            return {
                foulsCommitted: action.payload == 'increment' ? state.foulsCommitted + 1 : state.foulsCommitted - 1,
                ...state
            };
        case 'redCards':
            return {
                redCards: action.payload == 'increment' ? state.redCards + 1 : state.redCards - 1,
                ...state
            };
        case 'yellowCards':
            return {
                yellowCards: action.payload == 'increment' ? state.yellowCards + 1 : state.yellowCards - 1,
                ...state
            };
        case 'offSides':
            return {
                offSides: action.payload == 'increment' ? state.offSides + 1 : state.offSides - 1,
                ...state
            };
        case 'shotsOffTarget':
            return {
                shotsOffTarget: action.payload == 'increment' ? state.shotsOffTarget + 1 : state.shotsOffTarget - 1,
                ...state
            };
        case 'shotsOnTarget':
            return {
                shotsOnTarget: action.payload == 'increment' ? state.shotsOnTarget + 1 : state.shotsOnTarget - 1,
                ...state
            };
        case 'tackles':
            return {
                tackles: action.payload == 'increment' ? state.tackles + 1 : state.tackles - 1,
                ...state
            };
        case 'blocks':
            return {
                blocks: action.payload == 'increment' ? state.blocks + 1 : state.blocks - 1,
                ...state
            };
        case 'interceptions':
            return {
                interceptions: action.payload == 'increment' ? state.interceptions + 1 : state.interceptions - 1,
                ...state
            };
        case 'clearances':
            return {
                clearances: action.payload == 'increment' ? state.clearances + 1 : state.clearances - 1,
                ...state
            };
        case 'turnovers':
            return {
                turnovers: action.payload == 'increment' ? state.turnovers + 1 : state.turnovers - 1,
                ...state
            };
        case 'saves':
            return {
                saves: action.payload == 'increment' ? state.saves + 1 : state.saves - 1,
                ...state
            };
        case 'goalsGiven':
            return {
                goalsGiven: action.payload == 'increment' ? state.goalsGiven + 1 : state.goalsGiven - 1,
                ...state
            };
        default:
            throw new Error('Invalid reducer invocation');
    }
}

function footballReducer(state: any, action: { type: string, payload: 'increment' | 'decrement' }) {
    switch (action.type) {
        case 'kickoffs':
            return {
                kickoffs: action.payload == 'increment' ? state.kickoffs + 1 : state.kickoffs - 1,
                ...state
            };
        case 'touchbacks':
            return {
                touchbacks: action.payload == 'increment' ? state.touchbacks + 1 : state.touchbacks - 1,
                ...state
            };
        case 'fieldGoalsMade':
            return {
                fieldGoalsMade: action.payload == 'increment' ? state.fieldGoalsMade + 1 : state.fieldGoalsMade - 1,
                ...state
            };
        case 'fieldGoalsMissed':
            return {
                fieldGoalsMissed: action.payload == 'increment' ? state.fieldGoalsMissed + 1 : state.fieldGoalsMissed - 1,
                ...state
            };
        case 'carries':
            return {
                carries: action.payload == 'increment' ? state.carries + 1 : state.carries - 1,
                ...state
            };
        case 'totalRushingYards':
            return {
                totalRushingYards: action.payload == 'increment' ? state.totalRushingYards + 1 : state.totalRushingYards - 1,
                ...state
            };
        case 'rushingTouchDowns':
            return {
                rushingTouchDowns: action.payload == 'increment' ? state.rushingTouchDowns + 1 : state.rushingTouchDowns - 1,
                ...state
            };
        case 'fumbles':
            return {
                fumbles: action.payload == 'increment' ? state.fumbles + 1 : state.fumbles - 1,
                ...state
            };
        case 'receptions':
            return {
                receptions: action.payload == 'increment' ? state.receptions + 1 : state.receptions - 1,
                ...state
            };
        case 'targets':
            return {
                targets: action.payload == 'increment' ? state.targets + 1 : state.targets - 1,
                ...state
            };
        case 'totalRecievingYards':
            return {
                totalRecievingYards: action.payload == 'increment' ? state.totalRecievingYards + 1 : state.totalRecievingYards - 1,
                ...state
            };
        case 'receivingTouchDowns':
            return {
                receivingTouchDowns: action.payload == 'increment' ? state.receivingTouchDowns + 1 : state.receivingTouchDowns - 1,
                ...state
            };
        case 'drops':
            return {
                drops: action.payload == 'increment' ? state.drops + 1 : state.drops - 1,
                ...state
            };
        case 'tackles':
            return {
                tackles: action.payload == 'increment' ? state.tackles + 1 : state.tackles - 1,
                ...state
            };
        case 'sacks':
            return {
                sacks: action.payload == 'increment' ? state.sacks + 1 : state.sacks - 1,
                ...state
            };
        case 'passesDefended':
            return {
                passesDefended: action.payload == 'increment' ? state.passesDefended + 1 : state.passesDefended - 1,
                ...state
            };
        case 'interceptions':
            return {
                interceptions: action.payload == 'increment' ? state.interceptions + 1 : state.interceptions - 1,
                ...state
            };
        case 'hurries':
            return {
                hurries: action.payload == 'increment' ? state.hurries + 1 : state.hurries - 1,
                ...state
            };
        case 'safeties':
            return {
                safeties: action.payload == 'increment' ? state.safeties + 1 : state.safeties - 1,
                ...state
            };
        case 'passesMade':
            return {
                passesMade: action.payload == 'increment' ? state.passesMade + 1 : state.passesMade - 1,
                ...state
            };
        case 'passesMissed':
            return {
                passesMissed: action.payload == 'increment' ? state.passesMissed + 1 : state.passesMissed - 1,
                ...state
            };
        case 'passingTouchDowns':
            return {
                passingTouchDowns: action.payload == 'increment' ? state.passingTouchDowns + 1 : state.passingTouchDowns - 1,
                ...state
            };
        case 'interceptedPasses':
            return {
                interceptedPasses: action.payload == 'increment' ? state.interceptedPasses + 1 : state.interceptedPasses - 1,
                ...state
            };
        case 'totalPassingYards':
            return {
                totalPassingYards: action.payload == 'increment' ? state.totalPassingYards + 1 : state.totalPassingYards - 1,
                ...state
            };
        default:
            throw new Error('Invalid reducer invocation');
    }
}

function hockeyReducer(state: any, action: { type: string, payload: 'increment' | 'decrement' }) {
    switch (action.type) {
        case 'goals':
            return {
                goals: action.payload == 'increment' ? state.goals + 1 : state.goals - 1,
                ...state
            };
        case 'assists':
            return {
                assists: action.payload == 'increment' ? state.assists + 1 : state.assists - 1,
                ...state
            };
        case 'penaltyMinutes':
            return {
                penaltyMinutes: action.payload == 'increment' ? state.penaltyMinutes + 1 : state.penaltyMinutes - 1,
                ...state
            };
        case 'powerPlayGoals':
            return {
                powerPlayGoals: action.payload == 'increment' ? state.powerPlayGoals + 1 : state.powerPlayGoals - 1,
                ...state
            };
        case 'shortHandedGoals':
            return {
                shortHandedGoals: action.payload == 'increment' ? state.shortHandedGoals + 1 : state.shortHandedGoals - 1,
                ...state
            };
        case 'overTimeGoals':
            return {
                overTimeGoals: action.payload == 'increment' ? state.overTimeGoals + 1 : state.overTimeGoals - 1,
                ...state
            };
        case 'shotsTaken':
            return {
                shotsTaken: action.payload == 'increment' ? state.shotsTaken + 1 : state.shotsTaken - 1,
                ...state
            };
        case 'faceoffWins':
            return {
                faceoffWins: action.payload == 'increment' ? state.faceoffWins + 1 : state.faceoffWins - 1,
                ...state
            };
        case 'faceOffLosses':
            return {
                faceOffLosses: action.payload == 'increment' ? state.faceOffLosses + 1 : state.faceOffLosses - 1,
                ...state
            };
        case 'saves':
            return {
                saves: action.payload == 'increment' ? state.saves + 1 : state.saves - 1,
                ...state
            };
        case 'goalsGiven':
            return {
                goalsGiven: action.payload == 'increment' ? state.goalsGiven + 1 : state.goalsGiven - 1,
                ...state
            };
        case 'shutOuts':
            return {
                shutOuts: action.payload == 'increment' ? state.shutOuts + 1 : state.shutOuts - 1,
                ...state
            };
        default:
            throw new Error('Invalid reducer invocation');
    }
}

export const GameRecorder = ({ sport }: GameRecorderProps) => {
    let reducer: (state: any, action: { type: string, payload: 'increment' | 'decrement' }) => any;
    let initialState: any;

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
            throw new Error('Error initializing reducer function')
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>

        </>
    )
}