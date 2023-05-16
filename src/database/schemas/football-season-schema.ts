import { Schema, model, Model, Document, models } from 'mongoose';
import { footballGameSchema, IFootballGame } from './football-game-schema';

export interface IFootballSeason extends Document {
    seasons: [IFootballGame]
}

export const footballSeasonSchema: Schema = new Schema({
    seasons: [footballGameSchema]
});

const FootballSeason: Model<IFootballSeason> = models.FootballSeason || model('FootballSeason', footballSeasonSchema);

export default FootballSeason;