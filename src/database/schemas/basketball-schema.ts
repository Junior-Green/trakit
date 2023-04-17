import mongoose from 'mongoose';

const basketballGameSchema : mongoose.Schema = new mongoose.Schema({
    opponentTeam: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    teamScore: {
        type: Number,
        required: true,
        min: 0
    },
    opponentScore: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        required: true
    },
    minutesPlayed: {
        type: Number,
        min: 0,
        required: true,
    },
    pointsScored: {
        type: Number,
        required: true,
        min: 0
    },
    fieldGoalsMade: {
        type: Number,
        required: true,
        min: 0
    },
    fieldGoalsAttempted: {
        type: Number,
        required: true,
        min: 0
    },
    threePointersMade: {
        type: Number,
        required: true,
        min: 0
    },
    threePointersAttempted: {
        type: Number,
        required: true,
        min: 0
    },
    freeThrowsMade: {
        type: Number,
        required: true,
        min: 0
    },
    freeThrowsAttempted: {
        type: Number,
        required: true,
        min: 0
    },
    offensiveRebounds: {
        type: Number,
        required: true,
        min: 0
    },
    defensiveRebounds: {
        type: Number,
        required: true,
        min: 0
    },
    turnovers: {
        type: Number,
        required: true,
        min: 0
    },
    steals: {
        type: Number,
        required: true,
        min: 0
    },
    blocks: {
        type: Number,
        required: true,
        min: 0
    },
    personalFouls: {
        type: Number,
        required: true,
        min: 0
    },
});

const basketballGame = mongoose.model('Basketball Game', basketballGameSchema);

export default basketballGame;