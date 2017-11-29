import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';

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
    this.fetchOpenChannels = this.fetchOpenChannels.bind(this);
  }

  fetchOpenChannels(channels){

  }
  //user signs in first then make query for channels
  //what if making queries every time this comp gets props?

  componentWillMount(){
    // console.log('this', this);
    // openChannelListQuery.next((channels, error) => {
    // console.log('this props ahahah = ', this.props);
    // if(error) return console.error(error);
    // });
  }
  componentWillReceiveProps(props){
    // console.log('break');
    console.log('CWR props = ', props);
    // props.user.length > 0 ?
    // openChannelListQuery.next((channels, error) => {
    // console.log('error = ', error);
    // console.log('props inside = ', props);
    // if(error) reject(console.error(error));
    // console.log('channels = ', channels);
    // return channels;
    // });
    // :
    // undefined;
  }

  render(){
    console.log('this.props render = ', this.props.openChannels);
    console.log('new looooooog');
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OpenChannels);
