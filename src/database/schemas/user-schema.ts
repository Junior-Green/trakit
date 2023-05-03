import mongoose from 'mongoose';

import {basketballSeasonSchema} from './basketball-season-schema';
import {footballSeasonSchema} from './football-season-schema copy';
import {soccerSeasonSchema} from './soccer-season-schema';
import {hockeySeasonSchema} from './hockey-season-schema';

export const userDataSchema: mongoose.Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'field "userId" is undefined'],
    },
    basketballSeasons: [basketballSeasonSchema],
    footballSeasons: [footballSeasonSchema],
    soccerSeasons: [soccerSeasonSchema],
    hockeySeasons: [hockeySeasonSchema]
});

const userData = mongoose.model('User', userDataSchema);

export default userData;