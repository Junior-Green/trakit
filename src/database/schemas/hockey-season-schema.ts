import { Schema, model, Model, Document, models } from 'mongoose';
import { hockeyGameSchema, IHockeyGame } from './hockey-game-schema';

export interface IHockeySeason extends Document {
    seasons: IHockeyGame[]
}

export const hockeySeasonSchema: Schema = new Schema({
    seasons: [hockeyGameSchema]
});

const HockeySeason: Model<IHockeySeason> = models.HockeySeason || model('HockeySeason', hockeySeasonSchema);

export default HockeySeason;