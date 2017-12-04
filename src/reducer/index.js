import {combineReducers} from 'redux';
import user from './user.js';
import openChannels from './open-channel.js';
import enteredChannel from './entered-channel.js';
import participantList from './participant-list.js';

export default combineReducers({user, openChannels, enteredChannel, participantList});
