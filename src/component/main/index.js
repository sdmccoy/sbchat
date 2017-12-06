import React from 'react';
import CreateChannel from './create-channel';
import OpenChannels from './open-channels';
import Profile from './profile';
import Chat from './chat';
import ParticipantList from './participant-list';
import './_main-comp.scss';

class Main extends React.Component{
  render(){
    //move to end bottom after dev session
    // <Profile />
    return(
      <div className='main-container'>
        hello Main Component
        <CreateChannel />
        <OpenChannels />
        <Chat />
        <ParticipantList />
      </div>
    );
  }
}

export default Main;
