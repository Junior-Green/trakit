import mongoose from 'mongoose';
import {basketballGameSchema} from './basketball-game-schema';

export const basketballSeasonSchema: mongoose.Schema = new mongoose.Schema({
    seasons: [basketballGameSchema]
});

const BasketballSeason = mongoose.models.BasketballSeason || mongoose.model('BasketballSeason', basketballSeasonSchema);

export default BasketballSeason;