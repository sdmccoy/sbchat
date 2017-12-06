import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';
import * as userActions from '../../../action/user.js';
import * as enteredChannelActions from '../../../action/entered-channel.js';
import * as channelParticipantActions from '../../../action/participant-list.js';
import * as channelMessageActions from '../../../action/message.js';
//styles
import './_open-channels.scss';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

//importing sb object
import * as client from '../../../lib/sb-object.js';
let sb = client.sb;

const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

class OpenChannels extends React.Component{
  constructor(props){
    super(props);
    this.channel = null;
    this.state = {
      showChannelDelete: false,
    };

    this.enterChannel = this.enterChannel.bind(this);
    this.handleChannelDelete = this.handleChannelDelete.bind(this);
    this.fetchParticipantList = this.fetchParticipantList.bind(this);
    this.fetchPreviousMessageList = this.fetchPreviousMessageList.bind(this);
    this.showChannelDelete = this.showChannelDelete.bind(this);
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
    //set state to current channel, this context
    this.channel = channel;

    let addNewMessage = this.props.addNewMessage;
    let updateMessage = this.props.updateMessage;

    sb.OpenChannel.getChannel(channel.url, (channel, error) => {
      if(error) return console.error(error);

      channel.enter((response, error) => {
        if(error) return console.error(error);

        let ChannelHandler = new sb.ChannelHandler();

        //sending message to recieving socket handler
        ChannelHandler.onMessageReceived = function(channel, message){
          //set app store for receiving user socket to see sent msg
          addNewMessage(message);
        };

        sb.addChannelHandler('received message', ChannelHandler);

        ChannelHandler.onMessageUpdated = function(channel, message){
          console.log('handler message enter update= ', message);
          //set app store for receiving user socket to see sent msg
          updateMessage(message);
        };

        sb.addChannelHandler('received message', ChannelHandler);

        //remove handler after event
        // sb.removeChannelHandler('received message');


        console.log('entered channel =', channel);

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

  showChannelDelete(){
    this.setState({showChannelDelete: !this.state.showChannelDelete});
  }

  handleChannelDelete(channel){
    let {url} = channel;
    this.props.deleteChannelRequest(url);
  }

  render(){

    return(
      <List className='open-channels-container'>
        <div className='clear-float'></div>
        <div className='title'>
          <h5>Open Chat Channels</h5>
          <i className="material-icons"
            onClick={this.showChannelDelete}>
            delete
          </i>
        </div>

        {this.props.openChannels.length > 0 ?
          this.props.openChannels.map((channel, i) => {
            return <div className='open-channel' key={i}>
              <ListItem
                primaryText={channel.name}
                leftAvatar={<Avatar src={channel.coverUrl} />}
                rightIcon={<i className="material-icons">
                  chat
                </i>}
                secondaryText={channel.data}
                onClick={() => this.enterChannel(channel)}
              >
              </ListItem>
              {this.state.showChannelDelete ?
                <RaisedButton onClick={() => this.handleChannelDelete(channel)}>
                  <h6>Delete {channel.name}</h6>
                </RaisedButton>
                :
                undefined
              }
            </div>;
          })
          :
          <h6>No channels yet, create one above.</h6>
        }
      </List>
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
  addNewMessage: message => dispatch(channelMessageActions.addNewMessage(message)),
  updateMessage: message => dispatch(channelMessageActions.updateMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenChannels);
