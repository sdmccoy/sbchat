import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import reporter from './redux-reporter.js';
const appStoreCreate = () => createStore(reducer, applyMiddleware(reporter));

export default appStoreCreate;
