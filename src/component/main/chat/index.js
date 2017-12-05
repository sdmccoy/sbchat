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
      updatedMessage: '',
      updatedData: null,
      updatedCustomType: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageDelete = this.handleMessageDelete.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
    this.handleMessageUpdate = this.handleMessageUpdate.bind(this);
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

  handleMessageUpdate(message){

    let channel = this.state.currentChannel;
    let {updatedMessage, updatedData, updatedCustomType} = this.state;
    let updateMessage = this.props.updateMessage;

    channel.updateUserMessage(message.messageId, updatedMessage, updatedData, updatedCustomType, function(userMessage, error) {
      if (error) return console.error(error);
      //update app store state for sender socket
      updateMessage(userMessage);
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
                <h3>{message.message}</h3>
                {user.userId === message.sender.userId ?
                  <div className='message-edit-buttons'>
                    <button onClick= {() => this.handleMessageDelete(message)}>Delete</button>
                    <button onClick={this.showUpdateForm}>
                    Update
                    </button>
                    {this.state.showUpdateForm ?
                      <div>
                        <form >
                          <input
                            name='updatedMessage'
                            type='text'
                            placeholder='Type Update Here'
                            onChange={this.handleChange}
                            value={this.state.updatedMessage}
                          />
                        </form>
                        <button className="update-message-button"
                          onClick={() => this.handleMessageUpdate(message)}>
                        Confirm
                        </button>
                      </div>
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
  updateMessage: message => dispatch(channelMessageActions.updateMessage(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
