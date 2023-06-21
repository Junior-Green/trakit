import {Schema, models, Model, Document, Types, model, ObjectId} from 'mongoose';

export interface IBasketBallGame extends Document {
    opponentTeam: string;
    teamScore: number,
    opponentScore: number,
    date: Date,
    assists: number,
    dunks: number
    minutesPlayed: number,
    pointsScored: number,
    fieldGoalsMade: number,
    fieldGoalsMissed: number,
    threePointersMade: number,
    threePointersMissed: number,
    freeThrowsMade: number,
    freeThrowsMissed: number,
    offensiveRebounds: number,
    defensiveRebounds: number,
    turnovers: number,
    steals: number,
    blocks: number,
    personalFouls: number,
}

export const basketballGameSchema: Schema = new Schema({
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
    assists: {
        type: Number,
        default: 0,
        min: 0
    },
    dunks: {
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
    },
    threePointersMade: {
        type: Number,
        default: 0,
        min: 0
    },
    threePointersMissed: {
        type: Number,
        default: 0,
        min: 0
    },
    freeThrowsMade: {
        type: Number,
        default: 0,
        min: 0
    },
    freeThrowsMissed: {
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

const BasketballGame: Model<IBasketBallGame> = models.BasketballGame || model('BasketballGame', basketballGameSchema);

export default BasketballGame;