import React from 'react';
import {connect} from 'react-redux';
import * as channelMessageActions from '../../../action/message.js';

//style
import './_update-message-form.scss';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {CardActions} from 'material-ui/Card';

class UpdateMessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      updatedMessage: '',
      updatedData: null,
      updatedCustomType: null,
      showUpdateForm: this.props.showUpdateForm,
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
    const style = {
      fab: {
        width: '2px',
      },
    };
    return(
      <div className='update-message-form-container'>

        <i className="material-icons"
          onClick={this.showUpdateForm}
        >
        mode_edit
        </i>
        {this.state.showUpdateForm ?
          <div className='update-form'>
            <form >
              <input
                name='updatedMessage'
                type='text'
                placeholder='Type Update Here ...'
                onChange={this.handleChange}
                value={this.state.updatedMessage}
              />
            </form>
            <FloatingActionButton   className="send-message-button" type="submit"
              mini={true}
              zDepth={0}
              onClick={() => this.handleMessageUpdate(this.props.message)}
            >
              <i id='update-send' className="material-icons">send</i>
            </FloatingActionButton>
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
