import {combineReducers} from 'redux';
import user from './user.js';
import openChannels from './open-channel.js';

export default combineReducers({user, openChannels});
