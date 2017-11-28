import {createStore} from 'redux';
import reducer from '../reducer';

const appStoreCreate = () => createStore(reducer);

export default appStoreCreate;
