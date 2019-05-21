import React from 'react';
import { Popover } from 'reactstrap';

import Image from '../../ProfilePics/pp3.png';

class Details extends React.Component {
	constructor() {
		super()
		this.state = {
			show: false
		}
	}

	moreInfo = () => {
		this.setState({show: !this.state.show});
	}
	render() {
		const names = this.props.task.map(name => (
			<div key={name.id}>
				<div className='userBox'>
					<PopoverItem name={name}/>
				</div>
				
			</div>
		))

		return(
			<div className=''>
				<div onClick={this.moreInfo}>{names}</div>
			</div>
		)
	}
}

export default Details;



class PopoverItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      modalStatus: false,
      show: false
    };
  }

  showModal = () => {
    this.setState({show: !this.state.show})
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  faceClick = () => {
    this.setState({modalStatus: true})
  }

  render() {
    return (
      <span>
        <img src={Image} className='tinyPfPic' color="secondary" id={'Popover-' + this.props.name.id} 
              onMouseOver={this.toggle} 
              onMouseOut={this.toggle} onClick={this.showModal}>
          
        </img>
        <Popover placement='right' isOpen={this.state.popoverOpen} 
            target={'Popover-' + this.props.name.id} toggle={this.toggle}
            className='popover'>
          <div className='popoverHeader'>{this.props.name.name}</div>
          <div className='popoverBody'>{this.props.name.task}</div>
        </Popover>
      </span>
    );
  }
}




