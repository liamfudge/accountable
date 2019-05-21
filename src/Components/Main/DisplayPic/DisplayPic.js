import React from 'react';

import { connect } from 'react-redux';
import { Popover } from 'reactstrap';

import { Link } from 'react-router-dom';

class DisplayPic extends React.Component {
	constructor(){
		super()
		this.state = {
			randomNumber: (Math.floor(Math.random()*10000)),
			dbUser: [],
			showPic: false
		}
	}
	componentWillMount = () => {
		// console.log('hello my friends');
		// console.log(this.props.user);
		fetch('http://localhost:3000/userData', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            for(let i = 0; i < data.length; i++){
            	if(this.props.user === data[i].firstname){
            		this.setState({dbUser: data[i]});
            	}
            }
            // console.log(this.state.dbUser);
            this.setState({showPic: true});
            
        })
	}

	render() {
		if(this.state.showPic === false){
			return null;
		} else {
			return(
				<div>
					<PopoverItem picture={this.state.dbUser.profilepic}
			    			name={this.state.dbUser.firstname}
			    			lastName={this.state.dbUser.surname}
			    			id={this.state.randomNumber}
			    			className={this.props.class}
			    	/>	
			  	</div>
			)
		}
		
	}
	
}
  


const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(DisplayPic);


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
		    		className={this.props.className} 
		    		id={'Popover-' + this.props.id} 
		    		alt=''
	              	onMouseOver={this.toggleOn} 
	              	onMouseOut={this.toggleOff}
	              	onClick={this.showModal}
	              	>
	        	</img>
	        	<Popover placement='right' isOpen={this.state.popoverOpen} 
						target={'Popover-' + this.props.id} toggle={this.toggle}
						className='popover'>
					<div className='popoverHeader'>{this.props.name} {this.props.lastName}</div>
	        	</Popover>
	      	</span>
	    );
	}
}



