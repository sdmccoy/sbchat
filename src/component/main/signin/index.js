import React from 'react';
import SendBird from 'sendbird';
import {connect} from 'react-redux';
import * as userActions from '../../../action/user.js';

//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      userID: '',
      errMsg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //set the state as the input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //connect user from form
  handleSubmit(e){
    e.preventDefault();
    //set to current instance to pass in props & state
    let currentUser = this;

    sb.connect(currentUser.state.userID, __API_TOKEN__, function(user, error){
      if(error) console.error(error);
      //set user state to app store
      currentUser.props.userSignin(user);
    });
  }



  render(){
    return(
      <div className='signin-container'>
        <h2>Signin to Chat</h2>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
