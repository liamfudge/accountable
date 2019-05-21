import React from 'react';
import { Popover } from 'reactstrap';
import Image from '../../ProfilePics/pp3.png';

import { connect } from 'react-redux';

// import Modal from './Modal';

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
        <img src={Image} alt='' className='pending' color="secondary" id={'Popover-' + this.props.id} 
              onMouseOver={this.toggle} 
              onMouseOut={this.toggle} onClick={this.showModal}>
          
        </img>
        <Popover placement='right' isOpen={this.state.popoverOpen} 
            target={'Popover-' + this.props.id} toggle={this.toggle}
            className='popover'>
          <div className='popoverHeader'>Harry Potter</div>
          <div className='popoverBody'>{this.props.task}</div>
        </Popover>
        
      </span>
    );
  }
}

class PopoverExampleMulti extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popovers: [
        {
          date: 1,
          task: 'ride bike'
        }
      ],
      task: []
    };
  }
  componentWillMount = () => {
    this.setState({task: this.props.task})
    // console.log('this is the console.log ', this.props.task);
  }
  render() {
    return (
      <div>
        { this.state.popovers.map((popover, i) => {
          return <PopoverItem key={i} item={popover} id={i} task={this.props.task}/>;
        })}

      </div>
    );
  }
}
const mapStateToProps = state => ({
    userGoals: state.posts.userGoals
})
export default connect(mapStateToProps, {})(PopoverExampleMulti);



// <Modal show={this.state.show}
//           onClose={this.showModal}
//           modalRoute={this.state.modal}>
//           this message is from Modal!
//         </Modal>