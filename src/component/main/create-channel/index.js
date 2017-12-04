import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';

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
      data: '',
      //can add feature later, default pic is added by sb
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
    this.handleShowChannelForm();
    //set to current instance to pass in props & state
    let currentChannel = this;
    let {channelName, coverURL, data} = currentChannel.state;

    sb.OpenChannel.createChannel(channelName, coverURL, data, function(createdChannel, error){
      if(error) console.error(error);
      //set channel state to app store through redux
      currentChannel.props.createOpenChannel(createdChannel);
    });
  }

  render(){
    return(
      <div className='create-channel-container'>
      Hello Create channel
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
              name='data'
              type='text'
              placeholder='Description'
              onChange={this.handleChange}
              value={this.state.userID}
            />
            <button className="create-channel-button" type="submit">Create</button>
          </form>
          : undefined
        }

      </div>
    );
  }
}


const mapStateToProps = state => ({
  openChannel: state.openChannel,
});

const mapDispatchToProps = dispatch => ({
  createOpenChannel: channel => dispatch(openChannelActions.createOpenChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
