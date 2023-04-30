import mongoose from 'mongoose';
import { footballGameSchema } from './football-game-schema';

export const footballSeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [footballGameSchema]
});

const footballSeason = mongoose.model('Football Season', footballSeasonSchema);

export default footballSeason;