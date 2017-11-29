import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';

//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

class OpenChannels extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
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

  render(){
    console.log('this.props.chan render = ', this.props.openChannels);
    return(
      <div className='open-channels-container'>
      hello Open Channels
        {this.props.openChannels.length > 0 ?
          this.props.openChannels.map((channel, i) => {
            return <div className='open-channel' key={i}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenChannels);
