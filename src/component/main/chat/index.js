import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as channelMessageActions from '../../../action/message.js';
//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: '',
      data: null,
      customType: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //set state as input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();

    let {message, data, customType} = this.state;

    let channel = this.props.enteredChannel;
    let addNewMessage = this.props.addNewMessage;
    channel.sendUserMessage(message, data, customType, function(message, error){
      if (error) {
        console.error(error);
        return;
      }

      console.log('success msg = ', message);
      //add new messages to current message list app store
      addNewMessage(message);

      var ChannelHandler = new sb.ChannelHandler();

      ChannelHandler.onMessageReceived = function(channel, message){
        console.log('handler channel = ', channel);
        console.log('handler message = ', message);
        // console.log(channel, message);
      };

      ChannelHandler.onMessageReceived(channel, message);

      sb.addChannelHandler('received message', ChannelHandler);
      //set channel handler for async concerns
      // let channelHandler = new sb.ChannelHandler();
      // sb.addChannelHandler('received message', channelHandler);
      // channelHandler.onMessageReceived(channel, message);
      // console.log('handler = ', channelHandler);
      // console.log('handler msg rec = ', channelHandler.onMessageReceived);

      //remove handler after event
      sb.removeChannelHandler('received message');
    });

  }

  render(){
    return(
      <div className='chat-container'>
      hello CHAT
        <div className='message-board'>
        hello Message board
          {this.props.messageList.length > 0 ?
            this.props.messageList.map((message, i) => {
              return <div key={i}>{message.message}</div>;
            })
            :
            <h5>No previous messages, start a conversation!</h5>
          }
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            name='message'
            type='text'
            placeholder='Type Message Here'
            onChange={this.handleChange}
            value={this.state.message}
          />
          <button className="send-message-button" type="submit">Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  enteredChannel: state.enteredChannel,
  messageList: state.messages,
});

const mapDispatchToProps = dispatch => ({
  addNewMessage: message => dispatch(channelMessageActions.addNewMessage(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
