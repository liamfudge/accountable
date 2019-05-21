import React from 'react';

import { connect } from 'react-redux';

import Signin from './Signin';
import ForgotPassword from './ForgotPassword';

class SigninHome extends React.Component{

	render(){
		if(this.props.forgotPassword === false){
			return(
				<div>
					<Signin />
				</div>
			)
		} else {
			return(
				<div>
					<ForgotPassword />
				</div>
			)
		}
		
	}
}

const mapStateToProps = state => ({
  forgotPassword: state.posts.forgotPassword
})

export default connect(mapStateToProps, {})(SigninHome);