import React from 'react';
import CreateChannel from './create-channel';

class Main extends React.Component{
  render(){
    return(
      <div className='main-container'>
        hello Main
        <CreateChannel />
      </div>
    );
  }
}

export default Main;
