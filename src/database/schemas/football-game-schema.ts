import { Schema, model, Model, Document, models } from 'mongoose';

export interface IKickingStats {
    kickoffs: number,
    touchbacks: number,
    fieldGoalsMade: number,
    fieldGoalsMissed: number
}

export interface IRushingStats {
    carries: number,
    totalRushingYards: number,
    rushingTouchDowns: number,
    fumbles: number
}

export interface IRecievingStats {
    receptions: number,
    targets: number,
    totalRecievingYards: number,
    receivingTouchDowns: number,
    drops: number,
}

export interface IDefenceStats {
    tackles: number,
    sacks: number,
    passesDefended: number,
    interceptions: number,
    hurries: number,
    safeties: number
}

export interface IPassingStats {
    passesMade: number,
    passesMissed: number,
    passingTouchDowns: number,
    interceptions: number,
    totalPassingYards: number
}

export interface IFootballGame extends Document {
    opponentTeam: string,
    teamScore: number,
    opponentScore: number,
    date: Date,
    passingStats: IPassingStats,
    rushingStats: IRushingStats,
    receivingStats: IRecievingStats,
    defenceStats: IDefenceStats,
    kickingStats: IKickingStats
}


export const kickingStatsSchema = new Schema({
    kickoffs: {
        type: Number,
        default: 0,
        min: 0
    },
    touchbacks: {
        type: Number,
        default: 0,
        min: 0
    },
    fieldGoalsMade: {
        type: Number,
        default: 0,
        min: 0
    },
    fieldGoalsMissed: {
        type: Number,
        default: 0,
        min: 0
    }
});

export const rushingStatsSchema = new Schema({
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

export const receivingStatsSchema = new Schema({
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

export const defenceStatsSchema = new Schema({
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

export const passingStatsSchema = new Schema({
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

export const footballGameSchema: Schema = new Schema({
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

const FootballGame: Model<IFootballGame> = models.FootballGame || model('FootballGame', footballGameSchema);

export default FootballGame;