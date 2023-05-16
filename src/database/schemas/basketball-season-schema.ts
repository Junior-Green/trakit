import { Schema, model, Model, Document, models } from 'mongoose';
import { basketballGameSchema, IBasketBallGame } from './basketball-game-schema';

export interface IBasketballSeason extends Document {
    seasons: [IBasketBallGame]
}

export const basketballSeasonSchema: Schema = new Schema({
    seasons: [basketballGameSchema]
});

const BasketballSeason: Model<IBasketballSeason> = models.BasketballSeason || model('BasketballSeason', basketballSeasonSchema);

export default BasketballSeason;