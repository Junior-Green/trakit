import { Schema, model, Model, Document, models, Types, ObjectId } from 'mongoose';

export interface IFootballGame extends Document {
    team: string,
    opponentTeam: string,
    teamScore: number,
    opponentScore: number,
    date: Date,
    passesMade: number,
    passesMissed: number,
    passingTouchDowns: number,
    interceptedPasses: number,
    totalPassingYards: number,
    tackles: number,
    sacks: number,
    passesDefended: number,
    interceptions: number,
    hurries: number,
    safeties: number,
    receptions: number,
    targets: number,
    totalRecievingYards: number,
    receivingTouchDowns: number,
    drops: number,
    carries: number,
    totalRushingYards: number,
    rushingTouchDowns: number,
    fumbles: number,
    kickoffs: number,
    touchbacks: number,
    fieldGoalsMade: number,
    fieldGoalsMissed: number;
}

export const footballGameSchema: Schema = new Schema({
    team: {
        type: String,
        required: [true, 'Team cannot be undefined'],
        trim: true,
        minLength: 1
    },
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
    interceptedPasses: {
        type: Number,
        default: 0,
        min: 0
    },
    totalPassingYards: {
        type: Number,
        default: 0,
        min: 0
    },
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
    },
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

const FootballGame: Model<IFootballGame> = models.FootballGame || model('FootballGame', footballGameSchema);

export default FootballGame;