import { Schema, model, Model, Document, models, ObjectId, Types } from 'mongoose';

export interface ISoccerGame extends Document {
    team: string,
    opponentTeam: string,
    teamScore: number,
    opponentScore: number,
    date: Date,
    minutesPlayed: number,
    goals: number,
    assists: number,
    foulsCommitted: number,
    redCards: number
    yellowCards: number,
    offSides: number,
    shotsOffTarget: number,
    shotsOnTarget: number,
    tackles: number,
    blocks: number,
    interceptions: number,
    clearances: number,
    turnovers: number,
    saves: number,
    goalsGiven: number,
}

export const soccerGameSchema: Schema = new Schema({
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
    minutesPlayed: {
        type: Number,
        min: 0,
        default: 0
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
    foulsCommitted: {
        type: Number,
        default: 0,
        min: 0
    },
    redCards: {
        type: Number,
        default: 0,
        min: 0
    },
    yellowCards: {
        type: Number,
        default: 0,
        min: 0
    },
    offSides: {
        type: Number,
        default: 0,
        min: 0
    },
    shotsOffTarget: {
        type: Number,
        default: 0,
        min: 0
    },
    shotsOnTarget: {
        type: Number,
        default: 0,
        min: 0
    },
    tackles: {
        type: Number,
        default: 0,
        min: 0
    },
    blocks: {
        type: Number,
        default: 0,
        min: 0
    },
    interceptions: {
        type: Number,
        default: 0,
        min: 0
    },
    clearances: {
        type: Number,
        default: 0,
        min: 0
    },
    turnovers: {
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
});

const SoccerGame: Model<ISoccerGame> = models.SoccerGame || model('SoccerGame', soccerGameSchema);

export default SoccerGame;