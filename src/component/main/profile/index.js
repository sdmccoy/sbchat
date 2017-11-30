import React from 'react';
import {connect} from 'react-redux';

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.stat = {

    };
  }

  render(){
    console.log('this.prop profile = ', this.props.user[0]);
    console.log('this.prop.user.nick = ', this.props.user.nickname);
    console.log('this.prop.user.id = ', this.props.user.userId);
    return(
      <div className='profile-container'>
        profile below here
        <h2>{this.props.user[0].nickname}</h2>
        <img src={this.props.user[0].profileUrl} />
        <h3>{this.props.user[0].userId}</h3>
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
