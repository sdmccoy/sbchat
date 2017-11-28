import React from 'react';
import SendBird from 'sendbird';

//connect to the sb client.
const sb = new SendBird({
  appId: __APP_ID__,
});

class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
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
    console.log('event = ', e.target.username);
    let userId = e.target.username.value;
    sb.connect(userId, function(user, error){
      console.log('user = ', user);
      console.log('error = ', error);
    });

  }



  render(){
    console.log('sb =', sb);
    return(
      <div className='signin-container'>
        <h2>Signin to Chat</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name='username'
            type='text'
            placeholder='username'
            onChange={this.handleChange}
            value={this.state.username}
          />
          <button className="login-button" type="submit">Signin</button>
        </form>
      </div>
    );
  }
}

export default Signin;
