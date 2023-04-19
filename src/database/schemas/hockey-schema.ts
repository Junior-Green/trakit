import mongoose from 'mongoose';

const hockeySchema: mongoose.Schema = new mongoose.Schema({
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
    goals: {
        type: Number,
        default: 0,
        min: 0
    },
    assists: {
        type: Number,
        default: 0,
        min: 0
    },
    penaltyMinutes: {
        type: Number,
        default: 0,
        min: 0
    },
    powerPlayGoals: {
        type: Number,
        default: 0,
        min: 0
    },
    shortHandedGoals: {
        type: Number,
        default: 0,
        min: 0
    },
    overTimeGoals: {
        type: Number,
        default: 0,
        min: 0
    },
    shotsTaken: {
        type: Number,
        default: 0,
        min: 0
    },
    faceoffWins: {
        type: Number,
        default: 0,
        min: 0
    },
    faceOffLosses: {
        type: Number,
        default: 0,
        min: 0
    },
    saves: {
        type: Number,
        default: 0,
        min: 0
    },
    goalsAgainst: {
        type: Number,
        default: 0,
        min: 0
    },
    shutOuts: {
        type: Number,
        default: 0,
        min: 0
    },
});

const hockeyGame = mongoose.model('Hockey Game', hockeySchema);

export default hockeyGame;