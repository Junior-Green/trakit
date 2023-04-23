import mongoose from 'mongoose';

export const basketballGameSchema: mongoose.Schema = new mongoose.Schema({
    opponentTeam: {
        type: String,
        required: [true, 'Opponent team cannot be undefined'],
        trim: true,
        minLength: 1
    },
    teamScore: {
        type: Number,
        required: [true, 'Team score cannot be undefined'],
        min: 0
    },
    opponentScore: {
        type: Number,
        required: [true, 'Opponent score cannot be undefined'],
        min: 0,
    },
    date: {
        type: Date,
        required: [true, 'Date of game is required']
    },
    minutesPlayed: {
        type: Number,
        min: 0,
        default: 0
    },
    pointsScored: {
        type: Number,
        default: 0,
        min: 0
    },
    fieldGoalsMade: {
        type: Number,
        default: 0,
        min: 0
    },
    fieldGoalsAttempted: {
        type: Number,
        default: 0,
        min: 0
    },
    threePointersMade: {
        type: Number,
        default: 0,
        min: 0
    },
    threePointersAttempted: {
        type: Number,
        default: 0,
        min: 0
    },
    freeThrowsMade: {
        type: Number,
        default: 0,
        min: 0
    },
    freeThrowsAttempted: {
        type: Number,
        default: 0,
        min: 0
    },
    offensiveRebounds: {
        type: Number,
        default: 0,
        min: 0
    },
    defensiveRebounds: {
        type: Number,
        default: 0,
        min: 0
    },
    turnovers: {
        type: Number,
        default: 0,
        min: 0
    },
    steals: {
        type: Number,
        default: 0,
        min: 0
    },
    blocks: {
        type: Number,
        default: 0,
        min: 0
    },
    personalFouls: {
        type: Number,
        default: 0,
        min: 0
    },
});

const basketballGame = mongoose.model('Basketball Game', basketballGameSchema);

export default basketballGame;