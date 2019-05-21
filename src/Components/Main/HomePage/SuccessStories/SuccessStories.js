import React from 'react';

import { Link, Element, Events, scroll, scrollSpy, scroller } from 'react-scroll';

import './successStyle.css';

class SuccessStories extends React.Component {
	constructor() {
		super()
		this.state = {
			moreInfo: false,
			friendList: []
		}
	}
	componentWillMount = () => {
		fetch('http://localhost:3000/friendList')
			.then(response => response.json())
			.then(data => {
				this.setState({friendList: data})
			});

		document.addEventListener('mousedown', this.handleClick, false);
	}
	componentWillUnmount() {
    	document.removeEventListener('mouseDown', this.handleClick, false);
  	}
  	handleClick = (e) => {
    	if(this.node) {
      		if(this.node.contains(e.target)){
      		} else {
        		this.setState({moreInfo: false});
      		}
    	}
  	}
	moreInfo = () => {
		this.setState({moreInfo: !this.state.moreInfo});
	}
	previewSuccess = () => {
		var friendPreview = this.state.friendList;
		var amount = 0;
		return friendPreview.map((friend) => {
			if(amount < 3) {
				amount = amount + 1;
				return(
					<div key={friend.id} className='notSelected'>
						<div className='userAchievementLine'>
							<img src={require(`../../../ProfilePics/${friend.picture}.png`)} 
				    		className='ppTiny' alt=''></img>
							<div>
								{friend.name} {friend.lastName}: {friend.name} has acheived their goal of....
							</div>
						</div>
					</div>
				)
			}
		})
		
	}
	render () {
		const friendMapping = this.state.friendList.map(friend => {
			return(
				<div key={friend.id}>
					<div className='userAchievementLine'>
						<img src={require(`../../../ProfilePics/${friend.picture}.png`)} 
			    		className='ppTiny' alt=''></img>
						<div>
							{friend.name} {friend.lastName}: {friend.name} has acheived their goal of....
						</div>
					</div>
				</div>
			)
		})
		if(this.state.moreInfo === true){
			return(
				<div onClick={this.moreInfo} className='userSuccessOuterBox2' ref={node => this.node = node} >
					<div className='borderBox'>
						<div className='subHeading userSuccessHeading'>Here are this weeks customers success stories!</div>
					</div>

					<Element name="test7" className="element" id="containerElement" style={{
			            position: 'relative',
			            height: '200px',
			            overflow: 'scroll',
			            marginBottom: '100px'
			        }}>
			            <Element name="firstInsideContainer" style={{
			              // marginBottom: '120px'
			            }}>
			              <div>{friendMapping}</div>
			          	</Element>
			        </Element>
				</div>
			)
		} else {
			return(
				<div onClick={this.moreInfo} className='userSuccessOuterBox' ref={node => this.node = node} >
					<div className='borderBox'>
						<div className='subHeading userSuccessHeading'>Find out about our users success stories for this week.....
						</div>
						<Element name="test7" className="element" id="containerElement" style={{
				            position: 'relative',
				            height: '200px',
				            overflow: 'scroll',
				            marginBottom: '100px'
				        }}>
				            <Element name="firstInsideContainer" style={{
				              // marginBottom: '120px'
				            }}>
				              
				              {this.previewSuccess()}
				          	</Element>
				        </Element>
					</div>
				</div>
			)
		}
	}
}

export default SuccessStories;