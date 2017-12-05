import React from 'react';
import {connect} from 'react-redux';
import * as channelMessageActions from '../../../action/message.js';

class UpdateMessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      updatedMessage: '',
      updatedData: null,
      updatedCustomType: null,
      showUpdateForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMessageUpdate = this.handleMessageUpdate.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
  }

  //toggle update form
  showUpdateForm(){
    this.setState({showUpdateForm: !this.state.showUpdateForm});
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }


  handleMessageUpdate(message){

    let channel = this.props.channel;
    let {updatedMessage, updatedData, updatedCustomType} = this.state;
    let updateMessage = this.props.updateMessage;

    channel.updateUserMessage(message.messageId, updatedMessage, updatedData, updatedCustomType, function(userMessage, error) {
      if (error) return console.error(error);
      //update app store state for sender socket
      updateMessage(userMessage);
    });
  }


  render(){
    return(
      <div>
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
              onClick={() => this.handleMessageUpdate(this.props.message)}>
              Confirm
            </button>
          </div>
          :
          undefined
        }
      </div>

    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateMessage: message => dispatch(channelMessageActions.updateMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMessageForm);
