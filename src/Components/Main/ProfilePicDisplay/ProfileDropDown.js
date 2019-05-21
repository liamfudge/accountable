import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser, usersFriends } from '../../../Actions/PostActions';

import UpdatePassword from './UpdatePassword/UpdatePassword';

class ProfileDropDown extends React.Component {
	componentWillMount() {
    	document.addEventListener('mousedown', this.handleClick, false);
  	}

  	componentWillUnmount() {
    	document.removeEventListener('mouseDown', this.handleClick, false);
  	}
  	handleClick = (e) => {
    	if(this.node) {
      		if(this.node.contains(e.target)){
      		} else {
        		this.onClose(e);
      		}
    	}
  	}
  	onClose = (e) => {
    	this.props.onClose && this.props.onClose(e);
  	}
  	resetUser = () => {
  		this.props.registerUser([]);
  		this.props.usersFriends([]);
  	}
	render() {
		if(!this.props.show) {
			return null;
		} else {
			return(
				<div className='backdropStyle'>
					<div className='modalStyle' ref={node => this.node = node}>
						<UpdatePassword />
						<div onClick={this.resetUser}>
							<Link to='/' className='unLink'><div className='text1'>Logout</div></Link>
						</div>
					</div>
					
				</div>
			)
		}
	}
}

export default connect(null, { registerUser, usersFriends })(ProfileDropDown);