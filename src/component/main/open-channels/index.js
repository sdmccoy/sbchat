import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';
import * as userActions from '../../../action/user.js';
import * as enteredChannelActions from '../../../action/entered-channel.js';

//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

class OpenChannels extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      participantList: [],
      enteredChannels: [],
    };
    this.enterChannel = this.enterChannel.bind(this);
    this.handleChannelDelete = this.handleChannelDelete.bind(this);
  }

  //user signs in first then make query for channels
  // uncomment back in after dev session
  // componentWillMount(){
  //   openChannelListQuery.next((channels, error) => {
  //     if(error) return console.error(error);
  //     this.props.fetchOpenChannels(channels);
  //   });
  // }

  enterChannel(channel){

    sb.OpenChannel.getChannel(channel.url, (channel, error) => {
      if(error) console.error(error);

      channel.enter((response, error) => {
        if(error) console.error(error);
        console.log('entered channel =', channel);
        // console.log('active channel = ', Chat.activeChannel);
        this.props.setEnteredChannel(channel);
        // this.setState({enteredChannels: [channel, ...this.state.enteredChannels]});

        let participantListQuery = channel.createParticipantListQuery();
        participantListQuery.next((participantList, error) => {
          if (error) console.error(error);
          // console.log('part list =', participantList);
          this.setState({participantList: participantList});
        });
      });
    });
  }

  handleChannelDelete(channel){

    let {url} = channel;
    this.props.deleteChannelRequest(url);

    //create handler
    // let ChannelHandler = new sb.ChannelHandler();
    // //add unique handler ID to sb object
    // sb.addChannelHandler('deleteChannel', ChannelHandler);
    // ChannelHandler.onChannelDeleted = (url, channelType) => {
    //   console.log('url = ', url);
    //   console.log('channelType = ', channelType);
    // };
    // //remove handler after activity
    // sb.removeChannelHandler('deleteChannel');
  }

  render(){
    return(
      <div className='channels-container'>
        <div className='open-channels-container'>
        hello Open Channels
          {this.props.openChannels.length > 0 ?
            this.props.openChannels.map((channel, i) => {
              return <div className='open-channel' key={i}>
                <h3>{channel.name}</h3>
                <h5>{channel.data}</h5>
                <button onClick={() => this.enterChannel(channel)}>
                Enter
                </button>
                <button onClick={() => this.handleChannelDelete(channel)}>
                Delete
                </button>
              </div>;
            })
            :
            <h5>No Channels Yet</h5>
          }
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  user: state.user,
  openChannels: state.openChannels,
});

const mapDispatchToProps = dispatch => ({
  fetchOpenChannels: channels => dispatch(openChannelActions.fetchOpenChannels(channels)),
  setParticipantList: channel => dispatch(userActions.setParticipantList(channel)),
  deleteChannelRequest: channel => dispatch(openChannelActions.deleteChannelRequest(channel)),
  setEnteredChannel: channel => dispatch(enteredChannelActions.setEnteredChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenChannels);
