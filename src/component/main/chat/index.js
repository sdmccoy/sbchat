import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import UpdateMessageForm from '../update-message-form';
import * as channelMessageActions from '../../../action/message.js';
//style
import './_chat.scss';
import FloatingActionButton from 'material-ui/FloatingActionButton';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageDelete = this.handleMessageDelete.bind(this);
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
    let addNewMessage = this.props.addNewMessage;

    channel.sendUserMessage(message, data, customType, function(message, error){
      if (error) return console.error(error);

      //set app store for sending user socket to see their msgs
      addNewMessage(message);
    });
    //clear input after send
    this.setState({message: ''});
  }

  handleMessageDelete(message){

    let channel = this.state.currentChannel;
    let deleteMessage = this.props.deleteMessage;

    channel.deleteMessage(message, function(response, error){

      if (error) return console.error(error);
      deleteMessage(message);
    });
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
                {user.userId === message.sender.userId ?
                  <div className='message-buttons'>
                    <h5>You said: {message.message}</h5>
                    <button onClick= {() => this.handleMessageDelete(message)}>Delete</button>
                    <UpdateMessageForm
                      message={message}
                      channel={this.state.currentChannel}
                    />
                  </div>
                  :
                  <h5>{message.sender.userId} said: {message.message}</h5>
                }
              </div>;
            })
            :
            <h5>No previous messages, start a conversation!</h5>
          }
        </div>
        <div className='chat-submit'>
          <form onSubmit={this.handleSubmit}>
            <input
              name='message'
              type='text'
              placeholder='Type Message Here ...'
              onChange={this.handleChange}
              value={this.state.message}
            />
            <FloatingActionButton className="send-message-button" type="submit"
              mini={true}
              zDepth={0}
            >
              <i className="material-icons">send</i>
            </FloatingActionButton>
          </form>
        </div>
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
  updateMessage: message => dispatch(channelMessageActions.updateMessage(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
