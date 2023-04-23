import mongoose from 'mongoose';

export const hockeyGameSchema: mongoose.Schema = new mongoose.Schema({
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
    goalsGiven: {
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

const hockeyGame = mongoose.model('Hockey Game', hockeyGameSchema);

export default hockeyGame;