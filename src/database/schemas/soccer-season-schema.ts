import mongoose from 'mongoose';
import {soccerGameSchema} from './soccer-game-schema'

export const soccerSeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [soccerGameSchema]
});

const SoccerSeason = mongoose.models.SoccerSeason || mongoose.model('SoccerSeason', soccerSeasonSchema);

export default SoccerSeason;