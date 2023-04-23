import mongoose from 'mongoose';

import {basketballSeasonSchema} from './basketball-season-schema';
import {footballSeasonSchema} from './football-season-schema copy';
import {soccerSeasonSchema} from './soccer-season-schema';
import {hockeySeasonSchema} from './hockey-season-schema';

export const userSchema: mongoose.Schema = new mongoose.Schema({
    
});

const user = mongoose.model('User', userSchema);

export default user;