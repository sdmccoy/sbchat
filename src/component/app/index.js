import React from 'react';
import {Provider} from 'react-redux';
import appStoreCreate from '../../lib/app-store-create.js';
import Signin from '../main/signin';

//invoking the redux store, wrapping the whole app for state mgnt
const store = appStoreCreate();

class App extends React.Component{

  render(){

    return(
      <Provider store={store}>
        <div className='app-container'>
          Hello World APP
          <Signin />
        </div>
      </Provider>
    );
  }
}

export default App;
