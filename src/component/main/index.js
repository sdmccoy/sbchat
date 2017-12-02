import React from 'react';
import CreateChannel from './create-channel';
import OpenChannels from './open-channels';
import Profile from './profile';
import Chat from './chat';

class Main extends React.Component{
  render(){
    //move to end bottom after dev session
    // <Profile />
    return(
      <div className='main-container'>
        hello Main testing
        <CreateChannel />
        <OpenChannels />
        <Chat />
      </div>
    );
  }
}

export default Main;
