import React from 'react';

import Card from './Card';
import data from './Data/Data';

import './Scrolling.css';

class ScrollingBar2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			properties: data.properties,
			property: data.properties[3],
			direction: true
		}
	}
	componentWillMount = () => {
		setInterval(() => {
			this.nextProperty();
		}, 3000)
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
  	prevProperty = () => {
    	const newIndex = this.state.property.index-1;
    	this.setState({
      		property: data.properties[newIndex]
    	})
  	}

	render() {
		return(
			<div style={{ height: '500px' }}>
				<button 
          			onClick={() => this.nextProperty()} 
         		 	disabled={this.state.property.index === data.properties.length-1}
        		>Next</button>
        		<button 
          			onClick={() => this.prevProperty()} 
          			disabled={this.state.property.index === 0}
        		>Prev</button>


				<div className={`cards-slider active-slide-${this.state.property.index}`}>
					<div className='cards-slider-wrapper' style={{
						transform: `translateX(-${this.state.property.index*(100/this.state.properties.length)}%)`
					}}>
						{
							this.state.properties.map(property => <Card key={property._id} property={property} />)
						}
					</div>
				</div>
			</div>
		)
	}
}

export default ScrollingBar2;