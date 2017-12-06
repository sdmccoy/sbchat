import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import appStoreCreate from '../../lib/app-store-create.js';
import Signin from '../signin/index.js';
import Main from '../main';
import '../../style/_main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//invoking the redux store, wrapping the whole app for state mgnt
const store = appStoreCreate();

class App extends React.Component{

  render(){
    //change Main path to /main after dev session
    return(
      <Provider store={store}>
        <MuiThemeProvider>
          <div className='app-container'>
            Hello World APP
            <Route exact path='/' component={Signin} />
            <Route exact path='/' component={Main} />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
