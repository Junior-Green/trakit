import mongoose from 'mongoose';
import {basketballGameSchema} from './basketball-game-schema';

export const basketballSeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [basketballGameSchema]
});

const basketballSeason = mongoose.model('Basketball Season', basketballSeasonSchema);

export default basketballSeason;