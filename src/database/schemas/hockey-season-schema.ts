import { Schema, model, Model, Document, models } from 'mongoose';
import { hockeyGameSchema, IHockeyGame } from './hockey-game-schema';

export interface IHockeySeason extends Document {
    games: IHockeyGame[]
}

export const hockeySeasonSchema: Schema = new Schema({
    games: [hockeyGameSchema]
});

const HockeySeason: Model<IHockeySeason> = models.HockeySeason || model('HockeySeason', hockeySeasonSchema);

export default HockeySeason;