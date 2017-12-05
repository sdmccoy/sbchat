import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';
import * as userActions from '../../../action/user.js';
import * as enteredChannelActions from '../../../action/entered-channel.js';
import * as channelParticipantActions from '../../../action/participant-list.js';
import * as channelMessageActions from '../../../action/message.js';

//importing sb object
import * as client from '../../../lib/sb-object.js';
let sb = client.sb;

const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

class OpenChannels extends React.Component{
  constructor(props){
    super(props);
    this.channel = null;

    this.enterChannel = this.enterChannel.bind(this);
    this.handleChannelDelete = this.handleChannelDelete.bind(this);
    this.fetchParticipantList = this.fetchParticipantList.bind(this);
    this.fetchPreviousMessageList = this.fetchPreviousMessageList.bind(this);
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
        let ChannelHandler = new sb.ChannelHandler();

        ChannelHandler.onMessageReceived = function(channel, message){
          console.log('handler channel = ', channel);
          console.log('handler message = ', message);
          // console.log(channel, message);
        };

        sb.addChannelHandler('received message', ChannelHandler);
        console.log('entered channel =', channel);

        //set state to current channel, this context
        this.channel = channel;
        console.log('thischannel = ', this.channel);
        //set app store to entered channel
        this.props.setEnteredChannel(channel);
        //fetch the current participantList to append later
        this.fetchParticipantList(channel);
        this.fetchPreviousMessageList(channel);
      });
    });
  }

  fetchParticipantList(channel){
    let participantListQuery = channel.createParticipantListQuery();
    participantListQuery.next((participantList, error) => {
      if (error) return console.error(error);
      this.props.setParticipantList(participantList);
    });
  }

  fetchPreviousMessageList(channel){
    var messageListQuery = channel.createPreviousMessageListQuery();

    messageListQuery.load(30, true, (messageList, error) => {
      if (error) return console.error(error);
      console.log('success msg list = ', messageList);
      this.props.setPreviousMessageList(messageList);
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
  setParticipantList: participantList => dispatch(channelParticipantActions.setParticipantList(participantList)),
  setPreviousMessageList: previousMessages => dispatch(channelMessageActions.setPreviousMessageList(previousMessages)),
  deleteChannelRequest: channel => dispatch(openChannelActions.deleteChannelRequest(channel)),
  setEnteredChannel: channel => dispatch(enteredChannelActions.setEnteredChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenChannels);
