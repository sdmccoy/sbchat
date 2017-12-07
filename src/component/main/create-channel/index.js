import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';
import './_create-channel.scss';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';

//importing sb object
import * as client from '../../../lib/sb-object.js';
let sb = client.sb;

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
    this.setState({showChannelForm: !this.state.showChannelForm});
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

    sb.OpenChannel.createChannel(channelName, coverURL, data, (createdChannel, error) => {
      if(error) console.error(error);
      //set channel state to app store through redux
      currentChannel.props.createOpenChannel(createdChannel);
    });
  }

  render(){
    return(
      <div className='create-channel-container'>
        <div className='title'>
          <h5>CREATE A CHANNEL</h5>
        </div>
        <RaisedButton
          className='add-channel-button'
          onClick={this.handleShowChannelForm}
        >
        + Channel
        </RaisedButton>
        {this.state.showChannelForm ?
          <Drawer>
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
              <RaisedButton className="create-channel-button" type="submit">
                Create
              </RaisedButton>
              <RaisedButton className="cancel-channel-button" onClick={this.handleShowChannelForm}>
                Cancel
              </RaisedButton>
            </form>
          </Drawer>
          : undefined
        }

      </div>
    );
  }
}


const mapStateToProps = state => ({
  openChannel: state.openChannel,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createOpenChannel: channel => dispatch(openChannelActions.createOpenChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
