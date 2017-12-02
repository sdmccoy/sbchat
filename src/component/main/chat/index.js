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
    console.log('props EC =', this.props.enteredChannel);

    channel.sendUserMessage(message, data, customType, function(message, error){
      if (error) {
        console.error(error);
        return;
      }

      // onSent
      console.log('success msg = ', message);
    });

  }

  render(){
    console.log('chat props = ', this.props);
    return(
      <div className='chat-container'>
      hello CHAT
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
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
