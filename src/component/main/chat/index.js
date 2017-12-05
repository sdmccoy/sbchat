import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as channelMessageActions from '../../../action/message.js';

//importing sb object
import * as client from '../../../lib/sb-object.js';
let sb = client.sb;


class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: '',
      data: null,
      customType: null,
      currentChannel: this.props.enteredChannel,
      showUpdateForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageDelete = this.handleMessageDelete.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
  }

  //once user enters, set chat state to current channel instance
  componentWillReceiveProps(props){
    this.setState({currentChannel: props.enteredChannel});
  }

  //set state as input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();

    let {message, data, customType} = this.state;

    let channel = this.state.currentChannel;

    console.log('channel instance = ', channel);
    console.log('sb object = ', sb);

    let addNewMessage = this.props.addNewMessage;
    channel.sendUserMessage(message, data, customType, function(message, error){
      if (error) {
        console.error(error);
        return;
      }

      console.log('success msg = ', message);
      //add new messages to current message list app store
      addNewMessage(message);

      let ChannelHandler = new sb.ChannelHandler();

      ChannelHandler.onMessageReceived = function(channel, message){
        console.log('handler channel = ', channel);
        console.log('handler message = ', message);
        // console.log(channel, message);
      };

      // ChannelHandler.onMessageReceived(channel, message);

      sb.addChannelHandler('received message', ChannelHandler);
      //set channel handler for async concerns
      // let channelHandler = new sb.ChannelHandler();
      // sb.addChannelHandler('received message', channelHandler);
      // channelHandler.onMessageReceived(channel, message);
      // console.log('handler = ', channelHandler);
      // console.log('handler msg rec = ', channelHandler.onMessageReceived);

      //remove handler after event
      // sb.removeChannelHandler('received message');
    });

  }

  handleMessageDelete(message){

    let channel = this.state.currentChannel;
    let deleteMessage = this.props.deleteMessage;

    channel.deleteMessage(message, function(response, error){

      if (error) return console.error(error);
      deleteMessage(message);
    });
  }

  //toggle update form
  showUpdateForm(){
    this.state.showUpdateForm ? this.setState({showUpdateForm: false}) : this.setState({showUpdateForm: true});
  }

  handleMessageUpdate(e){
    e.preventDefault();
    console.log('this.state = ', this.state);
    let channel = this.state.currentChannel;
    let updateMessage = this.props.updateMessage;
    // let {messageId, data, customType} = message;
    //
    // channel.updateUserMessage(messageId, message, data, customType, function(userMessage, error) {
    //   if (error) return console.error(error);
    //
    //   console.log('user message =', userMessage);
    //   //update app store state
    //   // updateMessage(message);
    // });
  }

  render(){
    let {messageList, user} = this.props;
    return(
      <div className='chat-container'>
      hello CHAT component
        <div className='message-board'>
        hello Message board within chat component
          {messageList.length > 0 ?
            messageList.map((message, i) => {
              return <div className='message' key={i}>
                <h3>{message.message}</h3>
                {user.userId === message.sender.userId ?
                  <div className='message-edit-buttons'>
                    <button onClick= {() => this.handleMessageDelete(message)}>Delete</button>
                    <button onClick={this.showUpdateForm}>
                    Update
                    </button>
                    {this.state.showUpdateForm ?
                      <form onSubmit={this.handleMessageUpdate}>
                        <input
                          name='message'
                          type='text'
                          placeholder='Type Message Here'
                          onChange={this.handleChange}
                          value={this.state.message}
                        />
                        <button className="send-message-button" type="submit">
                        Send
                        </button>
                      </form>
                      :
                      undefined
                    }
                  </div>
                  :
                  undefined
                }
              </div>;
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
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addNewMessage: message => dispatch(channelMessageActions.addNewMessage(message)),
  deleteMessage: message => dispatch(channelMessageActions.deleteMessage(message)),
  // updateMessage: message => dispatch(channelMessageActions.updateMessage(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
