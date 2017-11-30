import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';

//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showProfileForm: false,
      nickname: '',
      profileUrl: '',
    };
    this.handleShowProfileForm = this.handleShowProfileForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //toggle showing the update profile form
  handleShowProfileForm(){
    this.state.showProfileForm ? this.setState({showProfileForm: false}) : this.setState({showProfileForm: true});
  }

  //set the state as the input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //update profile from form
  handleSubmit(e){
    e.preventDefault();
    this.handleShowProfileForm();
    //set to current instance to pass in props & state
    let currentUser = this;
    console.log('CU = ', currentUser);
    let {nickname, profileUrl} = currentUser.state;

    //update profile fn
    sb.updateCurrentUserInfo(nickname, profileUrl, (response, error) => {
      console.log('response = ', response);
      console.log('error = ', error);
      if(error) console.error(error);
      //if no error, set user state to app store
      
    });
    // sb.OpenChannel.createChannel(channelName, coverURL, data, function(createdChannel, error){
    //   if(error) console.error(error);
    //   //set channel state to app store through redux
    //   currentChannel.props.createOpenChannel(createdChannel);
    // });
  }

  render(){
    console.log('this.prop profile = ', this.props.user[0]);
    return(
      <div className='profile-container'>
        profile below here
        <h2>{this.props.user[0].nickname}</h2>
        <img src={this.props.user[0].profileUrl} />
        <h3>{this.props.user[0].userId}</h3>
        <button onClick={this.handleShowProfileForm}>
        Edit Profile
        </button>
        {!this.state.showProfileForm ?
          <form onSubmit={this.handleSubmit}>
            <input
              name='nickname'
              type='text'
              placeholder='Nickname'
              onChange={this.handleChange}
              value={this.state.userID}
            />
            <input
              name='profileUrl'
              type='text'
              placeholder='Profile Image Link'
              onChange={this.handleChange}
              value={this.state.userID}
            />
            <button className="edit-profile-button" type="submit">Submit</button>
          </form>
          : undefined
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
