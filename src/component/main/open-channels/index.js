import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';
import * as userActions from '../../../action/user.js';

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
    };
    this.enterChannel = this.enterChannel.bind(this);
  }

  //user signs in first then make query for channels
  //what if making queries every time this comp gets props?

  componentWillMount(){
    console.log('this', this);
    openChannelListQuery.next((channels, error) => {
      console.log('this props ahahah = ', this.props);
      if(error) return console.error(error);
      console.log('channels on mount= ', channels);
      this.props.fetchOpenChannels(channels);
    });
  }

  enterChannel(channel){
    // console.log('EC chan = ', channel);
    sb.OpenChannel.getChannel(channel.url, (channel, error) => {
      if(error) console.error(error);

      // console.log('found channel =', channel);
      channel.enter((response, error) => {
        if(error) console.error(error);
        // console.log('entered channel =', channel);

        // console.log('chan response =', response);
        let participantListQuery = channel.createParticipantListQuery();
        participantListQuery.next((participantList, error) => {
          if (error) console.error(error);
          // console.log('part list =', participantList);
          this.setState({participantList: participantList});
        });
      });
    });
  }

  render(){
    // console.log('this.props.chan render = ', this.props.openChannels);
    // console.log('this.state = ', this.state);
    return(
      <div className='open-channels-container'>
      hello Open Channels
        {this.props.openChannels.length > 0 ?
          this.props.openChannels.map((channel, i) => {
            return <div className='open-channel' key={i}
              onClick={() => this.enterChannel(channel)}
            >
              <h3>{channel.name}</h3>
              <h5>{channel.data}</h5>
            </div>;
          })
          :
          <h5>No Channels Yet</h5>
        }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenChannels);
