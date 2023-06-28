import {Schema, model, Model, Document, models, Types, ObjectId} from 'mongoose';

import {IBasketballSeason, basketballSeasonSchema} from './basketball-season-schema';
import {IFootballSeason, footballSeasonSchema} from './football-season-schema';
import {ISoccerSeason, soccerSeasonSchema} from './soccer-season-schema';
import {IHockeySeason, hockeySeasonSchema} from './hockey-season-schema';

export interface IUserData extends Document {
    _id: ObjectId,
    userId: ObjectId,
    teamName: string,
    selectedSport: 'basketball' | 'football' | 'soccer' | 'hockey' | null | undefined,
    basketballSeasons: IBasketballSeason[],
    footballSeasons: IFootballSeason[],
    soccerSeasons: ISoccerSeason[],
    hockeySeasons: IHockeySeason[];
}


export const userDataSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'field "userId" is undefined'],
    },
    selectedSport: {
        type: String,
        enum: ['basketball', 'football', 'soccer', 'hockey']
    },
    teamName: {
        type: String,
        default: 'My Team'
    },
    basketballSeasons: [basketballSeasonSchema],
    footballSeasons: [footballSeasonSchema],
    soccerSeasons: [soccerSeasonSchema],
    hockeySeasons: [hockeySeasonSchema]
});

const UserData: Model<IUserData> = models.UserData || model('UserData', userDataSchema);

export default UserData;