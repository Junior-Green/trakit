import { Schema, model, Model, Document, models } from 'mongoose';
import { ISoccerGame, soccerGameSchema } from './soccer-game-schema'

export interface ISoccerSeason extends Document {
    games: ISoccerGame[]
}

export const soccerSeasonSchema: Schema = new Schema({
    games: [soccerGameSchema]
});

const SoccerSeason: Model<ISoccerSeason> = models.SoccerSeason || model('SoccerSeason', soccerSeasonSchema);

export default SoccerSeason;