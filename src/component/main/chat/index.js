import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';

//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

class Chat extends React.Component{

  render(){
    return(
      <div className='chat-container'>
      hello CHAT
      </div>
    );
  }
}

const mapStateToProps = state => ({
  openChannels: state.openChannels,
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
