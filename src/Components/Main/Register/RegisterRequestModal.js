import React from 'react';

import { connect } from 'react-redux';

var count = 0;

class RegisterReqModal extends React.Component {
  constructor(){
    super()
    this.state = {
      userData: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/userData')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        this.setState({userData: data});
        // lengthOfData = data.length
      })
    setInterval(() => {
      // this.checkingDatabase();
    }, 10);
  }

  closePopup = (e) => {
    this.props.closePopup && this.props.closePopup(e);
  }
  addedFriend = () => {
    this.props.closePopup && this.props.closePopup();
    this.addFriend();
  }
  addFriend = () => {
    fetch('http://localhost:3000/friendRequest', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email1: this.props.registeredUser.email,
        email2: this.props.email
      })
    })

    // if(this.state.friend === ''){

    // } else {
    //   this.state.friendsInGroup.push({
    //     name: this.state.friend,
    //     id: count
    //   })
    //   count = count + 1;
    //   this.setState({friend: []});
    //   this.setState({addClass: 'invisibleButton'});
    // }
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
                  Would you like to add {this.props.friend} as an accountabilty buddy?
                </div>

              </div>
              <div className='footerStyleFriend'>
                <button onClick={this.addedFriend} className='buttonBlue'>Add {this.props.friend}</button>
                <button onClick={(e) => {this.closePopup(e)}} className='cancelButton'>Cancel</button>
              </div>

            </div>
          </div>
        )
    }

  }
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(RegisterReqModal);




