import { Schema, model, Model, Document, models } from 'mongoose';
import { ISoccerGame, soccerGameSchema } from './soccer-game-schema'

export interface ISoccerSeason extends Document {
    seasons: ISoccerGame[]
}

export const soccerSeasonSchema: Schema = new Schema({
    seasons: [soccerGameSchema]
});

const SoccerSeason: Model<ISoccerSeason> = models.SoccerSeason || model('SoccerSeason', soccerSeasonSchema);

export default SoccerSeason;