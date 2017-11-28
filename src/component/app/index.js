import React from 'react';
import {Provider} from 'react-redux';
import appStoreCreate from '../../lib/app-store-create.js';

//envoking the redux store, wrapping the whole app for state mgnt
const store = appStoreCreate();

class App extends React.Component{

  render(){
    return(
      <Provider src={store}>
        <div className='app'>
          Hello World
        </div>
      </Provider>
    );
  }
}

export default App;
