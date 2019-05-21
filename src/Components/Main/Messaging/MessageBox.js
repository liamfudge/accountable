import React from 'react';

import EnterMessage from './EnterMessage';

import './MessagingStyle.css';

class MessageBox extends React.Component {
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
                this.outsideClick(e);
            }
        }
  	}

  	outsideClick = (e) => {
        this.props.clickOutside && this.props.clickOutside(e);
    }

    messageExists = (e) => {
        this.props.messageExists && this.props.messageExists(e);
    }


	render() {
		return (
				<div className='hunderedPercent'
					ref={node => this.node = node}>

					<div className='messageHeading'>{this.props.task.task} comments</div>
          <div className='padding10px'>
            <EnterMessage task={this.props.task}
                        messageExists={this.messageExists}/>
          </div>
					
				</div>
		)
	}
}

export default MessageBox;