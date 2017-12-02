import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';

//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: '',
      data: '',
      customType: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.activeChannel = this.activeChannel.bind(this);
  }

  //set state as input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();

  }

  activeChannel(channel){
    console.log('chat channel = ', channel);
  }

  render(){
    console.log('chat props = ', this.props);
    return(
      <div className='chat-container'>
      hello CHAT

      </div>
    );
  }
}

const mapStateToProps = state => ({
  enteredChannels: state.enteredChannels,
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
