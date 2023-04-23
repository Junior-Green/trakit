import mongoose from 'mongoose';
import {hockeyGameSchema} from './hockey-game-schema';

export const hockeySeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [hockeyGameSchema]
});

const hockeySeason = mongoose.model('Hockey Season', hockeySeasonSchema);

export default hockeySeason;