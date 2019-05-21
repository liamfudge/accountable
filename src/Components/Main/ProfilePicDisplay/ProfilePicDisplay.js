import React from 'react';

import { connect } from 'react-redux';
import { Popover } from 'reactstrap';

import ProfileDropDown from './ProfileDropDown';
import { Link } from 'react-router-dom';

class ProfilePicDisplay extends React.Component {
	constructor() {
		super()
		this.state = {
			showMain: false,
			user: []
		}
	}
	componentWillMount = () => {
		fetch('http://localhost:3000/profile', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.props.registeredUser.email
			})
		})
			.then(response => response.json())
			.then(data => {
				this.setState({user: data});
				this.setState({showMain: true});
			})
		// if(this.props.registeredUser.picture) {
			
		// } else {
		// }
	}
	render() {
		if (!this.state.showMain) {
			return null;
		}
		return(
			<div>
		    	<PopoverItem picture={this.state.user.profilepic}
		    			name={this.state.user.firstname}
		    			lastName={this.state.user.surname}
		    			id={this.state.user.id}
		    	/>
		  	</div>
		)
	}
	
}
  


const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(ProfilePicDisplay);


class PopoverItem extends React.Component {
  	constructor(props) {
    	super(props);
    	this.state = {
      		popoverOpen: false,
      		modalStatus: false,
      		showDropDown: false
    	};
  	}

  	showModal = () => {
    	this.setState({showDropDown: !this.state.showDropDown})
	}

	toggleOn = () => {
		this.setState({popoverOpen: true});
	}
	toggleOff = () => {
		this.setState({popoverOpen: false});
	}

	render() {
	    return (
	      	<span>
	        	<img src={require(`../../ProfilePics/${this.props.picture}.png`)} 
		    		className='ppTiny' 
		    		id={'Popover-' + this.props.id} 
		    		alt=''
	              	onMouseOver={this.toggleOn} 
	              	onMouseOut={this.toggleOff}
	              	onClick={this.showModal}
	              	>
	        	</img>
	        	<Popover placement='bottom' isOpen={this.state.popoverOpen} 
						target={'Popover-' + this.props.id} toggle={this.toggle}
						className='popover'>
					<div className='popoverHeader'>{this.props.name} {this.props.lastName}</div>
	        	</Popover>
	        	<ProfileDropDown show={this.state.showDropDown}
	        					onClose={this.showModal}
	        	/>
	      	</span>
	    );
	}
}

