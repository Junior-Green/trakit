import mongoose from 'mongoose';

export const kickingStatsSchema = new mongoose.Schema({
    kickoffs : {
        type: Number,
        default: 0,
        min: 0
    },
    touchbacks : {
        type: Number,
        default: 0,
        min: 0
    },
    fieldGoalsMade : {
        type: Number,
        default: 0,
        min: 0
    },
    fieldGoalsMissed : {
        type: Number,
        default: 0,
        min: 0
    }
});

export const rushingStatsSchema = new mongoose.Schema({
    carries: {
        type: Number,
        default: 0,
        min: 0
    },
    totalRushingYards: {
        type: Number,
        default: 0,
        min: 0
    },
    rushingTouchDowns: {
        type: Number,
        default: 0,
        min: 0
    },
    fumbles: {
        type: Number,
        default: 0,
        min: 0
    }
});

export const receivingStatsSchema = new mongoose.Schema({
    receptions: {
        type: Number,
        default: 0,
        min: 0
    },
    targets: {
        type: Number,
        default: 0,
        min: 0
    },
    totalRecievingYards: {
        type: Number,
        default: 0,
        min: 0
    },
    receivingTouchDowns: {
        type: Number,
        default: 0,
        min: 0
    },
    drops: {
        type: Number,
        default: 0,
        min: 0
    },
});

export const defenceStatsSchema = new mongoose.Schema({
    tackles: {
        type: Number,
        default: 0,
        min: 0
    },
    sacks: {
        type: Number,
        default: 0,
        min: 0
    },
    passesDefended: {
        type: Number,
        default: 0,
        min: 0
    },
    interceptions: {
        type: Number,
        default: 0,
        min: 0
    },
    hurries: {
        type: Number,
        default: 0,
        min: 0
    },
    safeties: {
        type: Number,
        default: 0,
        min: 0
    }
});

export const passingStatsSchema = new mongoose.Schema({
    passesMade: {
        type: Number,
        default: 0,
        min: 0
    },
    passesMissed: {
        type: Number,
        default: 0,
        min: 0
    },
    passingTouchDowns: {
        type: Number,
        default: 0,
        min: 0
    },
    interceptions: {
        type: Number,
        default: 0,
        min: 0
    },
    totalPassingYards: {
        type: Number,
        default: 0,
        min: 0
    }
});

export const footballGameSchema: mongoose.Schema = new mongoose.Schema({
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
    passingStats: passingStatsSchema,

    rushingStats: rushingStatsSchema,

    receivingStats: receivingStatsSchema,

    defenceStats: defenceStatsSchema,

    kickingStats: kickingStatsSchema
});

const footballGame = mongoose.model('Football Game', footballGameSchema);

export default footballGame;