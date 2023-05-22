import { Schema, model, Model, Document, models } from 'mongoose';
import { basketballGameSchema, IBasketBallGame } from './basketball-game-schema';

export interface IBasketballSeason extends Document {
    games: IBasketBallGame[]
}

export const basketballSeasonSchema: Schema = new Schema({
    games: [basketballGameSchema]
});

const BasketballSeason: Model<IBasketballSeason> = models.BasketballSeason || model('BasketballSeason', basketballSeasonSchema);

export default BasketballSeason;