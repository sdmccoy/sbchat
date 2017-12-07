import React from 'react';
import SendBird from 'sendbird';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as userActions from '../../action/user.js';
//tracking
import track from 'react-tracking';
//assets
import bluorbitlogo from '../../assets/bluorbitlogo.png';
//style
import './_signin.scss';

//remove after dev session
import * as openChannelActions from '../../action/open-channel.js';

//importing sb object
import * as client from '../../lib/sb-object.js';
let sb = client.sb;

//decorator tracking
@track({page: 'signin-page'}, {dispatchOnMount: (contextData) => ({event: 'signin-page-mounted'}) })
class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      userID: '',
      errMsg: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //set the state as the input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //connect user from form
  //track sign in button event
  @track({action: 'click-signin'})
  handleSubmit(e){
    e.preventDefault();
    //set to current instance to pass in props & state
    let currentUser = this;

    //change userID back to currentUser.state.userID after dev
    sb.connect(currentUser.state.userID, __API_TOKEN__, (user, error) => {
      if(error) return console.error(error);
      //set user state to app store through redux
      currentUser.props.userSignin(user);
      currentUser.setState({redirect: true, userID: ''});
    });


  }


  render(){
    //delete below after dev session
    if(this.state.redirect){
      const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

      openChannelListQuery.next((channels, error) => {
        if(error) return console.error(error);
        this.props.fetchOpenChannels(channels);
      });
    }
    //uncomment after dev
    // const {redirect} = this.state;
    // if(redirect) {return <Redirect to='/main'/>;}
    return(
      <div className='signin-container'>
        <img src={bluorbitlogo} />
        <h4>Create an account or signin.</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            name='userID'
            type='text'
            placeholder='userID'
            onChange={this.handleChange}
            value={this.state.userID}
          />
          <button className="login-button" type="submit">Signin</button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userSignin: user => dispatch(userActions.userSignin(user)),
  //delete after dev session
  fetchOpenChannels: channels => dispatch(openChannelActions.fetchOpenChannels(channels)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
