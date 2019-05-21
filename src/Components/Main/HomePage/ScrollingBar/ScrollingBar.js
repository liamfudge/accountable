import React from 'react';

import data from './Data/Data';

import './ScrollingStyle.css';

import health1 from './images/health1.png';
import gamble1 from './images/gamble1.png';
import team1 from './images/team1.png';
import focus1 from './images/focus1.png';
import rock1 from './images/rock1.png';

let windowWidth = window.innerWidth;

class ScrollingBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			className1: 'scrollingContent',
			divisionWidth: windowWidth/5,
			leftMovement: '',
			properties: data.properties,
			property: data.properties[1],
			direction: true
		}
	}
	componentWillMount = () => {
		setInterval(() => {
			windowWidth = window.innerWidth;
			this.setState({divisionWidth: windowWidth/5});
		}, 500)
		setInterval(() => {
			this.nextProperty();
		}, 5000)
	}
	nextProperty = () => {
		if(this.state.property.index === this.state.properties.length - 3){
			this.setState({direction: false});
		}
		if(this.state.property.index === this.state.properties.length - 28) {
			this.setState({direction: true});
		}
		if(this.state.direction === true){
			const newIndex = this.state.property.index+1;
    		this.setState({
      			property: data.properties[newIndex]
    		})
		} else {
			const newIndex = this.state.property.index-1;
    		this.setState({
      			property: data.properties[newIndex]
    		})
		}
  	}
	render() {
		return(
			<div>
			<div style={{ height: '300px' }} className='scrollingContainerWidth'>
				<div className={`cards-slider`}>
					<div className='cards-slider-wrapper' style={{
						transform: `translateX(-${this.state.property.index*(100/this.state.properties.length)}%)`
					}}>
						{
							this.state.properties.map(property => 
								<div key={property._id} property={property}
									className={this.state.className1} 
									style={{ width: (this.state.divisionWidth), 
											height: (this.state.divisionWidth)/1.5,
											marginLeft: this.state.leftMovement}}>
									<div className='scrollContentBox'>
										<img src={require(`./images/${property.picture}.png`)} 
											alt='picture' 
											className='imageScroll'
											>
										</img>
										<div className='boxContent' data-text="">{property.address}</div>
									</div>
								</div>)
						}	
						
					</div>
				</div>
			</div>

			</div>
		)
	}
}

export default ScrollingBar;










