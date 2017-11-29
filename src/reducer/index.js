import {combineReducers} from 'redux';
import user from './user.js';
import openChannel from './open-channel.js';

export default combineReducers({user, openChannel});
