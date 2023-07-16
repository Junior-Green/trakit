import { Schema, model, Model, Document, models, Types, ObjectId } from 'mongoose';
import { footballGameSchema, IFootballGame } from './football-game-schema';

export interface IFootballSeason extends Document {
    games: IFootballGame[]
}

export const footballSeasonSchema: Schema = new Schema({
    games: [footballGameSchema]
});

const FootballSeason: Model<IFootballSeason> = models.FootballSeason || model('FootballSeason', footballSeasonSchema);

export default FootballSeason;