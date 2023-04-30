import mongoose from 'mongoose';
import {soccerGameSchema} from './soccer-game-schema'

export const soccerSeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [soccerGameSchema]
});

const soccerSeason = mongoose.model('Soccer Season', soccerSeasonSchema);

export default soccerSeason;