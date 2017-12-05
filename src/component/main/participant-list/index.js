import React from 'react';
import {connect} from 'react-redux';

class ParticipantList extends React.Component{

  render(){
    return(
      <div className='participant-list-container'>
        {this.props.participantList.length > 0 ?
          this.props.participantList.map((participant, i) => {
            return <div key={i}>{participant.userId}</div>;
          })
          :
          <h5>No participants yet</h5>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  participantList: state.participantList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
