import React from 'react';
import CreateChannel from './create-channel';
import OpenChannels from './open-channels';

class Main extends React.Component{
  render(){
    return(
      <div className='main-container'>
        hello Main
        <CreateChannel />
        <OpenChannels />
      </div>
    );
  }
}

export default Main;
