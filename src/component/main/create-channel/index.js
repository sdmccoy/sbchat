import React from 'react';
import SendBird from 'sendbird';
//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

class CreateChannel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showChannelForm: false,
      channelName: '',
      description: '',
      coverURL: null,
    };
    this.handleShowChannelForm = this.handleShowChannelForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //toggle showing the create new channel form
  handleShowChannelForm(){
    this.state.showChannelForm ? this.setState({showChannelForm: false}) : this.setState({showChannelForm: true});
  }
  //set the state as the input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //create channel from form
  handleSubmit(e){
    e.preventDefault();
    //set to current instance to pass in props & state
    let currentChannel = this;
    currentChannel.state.data = currentChannel.state.description;
    delete currentChannel.state.description;
    console.log('this channel state= ', currentChannel.state);

    sb.OpenChannel.createChannel(currentChannel.state.channelName, currentChannel.state.coverURL, currentChannel.state.data, function(createdChannel, error){
      if(error) console.error(error);
      console.log('createChannel = ', createdChannel);
      //set channel state to app store through redux
      // currentChannel.props.userSignin(user);
    });
  }

  render(){
    return(
      <div className='create-channel-container'>
        <button onClick={this.handleShowChannelForm}>
          + Channel
        </button>
        {!this.state.showChannelForm ?
          <form onSubmit={this.handleSubmit}>
            <input
              name='channelName'
              type='text'
              placeholder='Channel Name'
              onChange={this.handleChange}
              value={this.state.userID}
            />
            <input
              name='description'
              type='text'
              placeholder='Description'
              onChange={this.handleChange}
              value={this.state.userID}
            />
            <button className="create-channel-button" type="submit">Create</button>
          </form>
          : undefined
        }

      Hello Create channel
      </div>
    );
  }
}

export default CreateChannel;
