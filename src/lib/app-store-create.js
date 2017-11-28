import {createStore} from 'redux';
import reducer from '../reducers';

const appStoreCreate = () => createStore(reducer);

export default appStoreCreate;
