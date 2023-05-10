import mongoose from 'mongoose';
import {hockeyGameSchema} from './hockey-game-schema';

export const hockeySeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [hockeyGameSchema]
});

const HockeySeason = mongoose.models.HockeySeason || mongoose.model('HockeySeason', hockeySeasonSchema);

export default HockeySeason;