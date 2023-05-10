import mongoose from 'mongoose';
import { footballGameSchema } from './football-game-schema';

export const footballSeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [footballGameSchema]
});

const FootballSeason = mongoose.models.FootballSeason || mongoose.model('FootballSeason', footballSeasonSchema);

export default FootballSeason;