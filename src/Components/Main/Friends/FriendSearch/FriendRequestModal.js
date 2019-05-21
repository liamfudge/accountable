import React from 'react';

// import { connect } from 'react-redux';
// import { friendRequest } from '../../actions/postActions';

class FriendReqModal extends React.Component {

  closePopup = (e) => {
    this.props.closePopup && this.props.closePopup(e);
  }

  addBuddy = () => {
    this.closePopup();
    this.props.friendRequest({
        from: this.props.userInfo.name,
        fromId: this.props.userInfo.id,
        to: this.props.friend.name,
        toId: this.props.friend.id,
        status: 'pending'
    })
  }

  render() {
    if (!this.props.showPopup){
      return null;
    } else {
        return(
          <div className='backdropStyleFriend'>
            <div className='modalStyleFriend' ref={node => this.node = node}>
              <div className='boxSizeFriend'>
                <div className='center'>
                  Would you like to add {this.props.friend.name} as an accountabilty buddy?
                </div>

              </div>
              <div className='footerStyleFriend'>
                <button onClick={this.addBuddy} className='buttonBlue'>Add {this.props.friend.name}</button>
                <button onClick={(e) => {this.closePopup(e)}} className='cancelButton'>Cancel</button>
              </div>

            </div>
          </div>
        )
    }

  }
}

// const mapStateToProps = state => ({
//   userInfo: state.posts.userInfo
// })

export default FriendReqModal;




