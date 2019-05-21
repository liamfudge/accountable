
import React from 'react';

import PopoverExampleMulti from './Popover';
import Details from './Details';
import backImage from './back_arrow.png';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import Image from '../../ProfilePics/pp3.png';

import './animationStyles.css';

class DayInfo extends React.Component {
    constructor() {
        super()
        this.state ={
            className: 'box',
            opacity: 'opacityNone',
            changeRender: false,
            imgClass: 'opacityNone',
            nameClass: 'opacityNone',
            taskClass: 'opacityNone',
            statusClass: 'opacityNone'
        }
    }
    componentWillMount = () => {
        if(this.props.firstOpen === false) {
            this.onClose();
        }
        setTimeout(function() {
            this.setState({imgClass: 'opacityFull'})
        }.bind(this), 10)
        setTimeout(function() {
            this.setState({nameClass: 'opacityFull'})
        }.bind(this), 100)
        setTimeout(function() {
            this.setState({taskClass: 'opacityFull'})
        }.bind(this), 200)
        setTimeout(function() {
            this.setState({statusClass: 'opacityFull'})
        }.bind(this), 300)
        
    }

    timeMath = () => {
        if(this.props.task.length){
            let math = (this.props.task[0].date) - (this.props.today);
            return(
                <div>{math} day's left to complete task</div>
            )
        }
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    testing = () => {
        console.log(this.props.task)
    }

    render() {
        const names = this.props.task.map(name => (
            <div key={name.id}>
                <div className={this.state.imgClass}>
                    <PopoverItem name={name}/>
                </div>
                <div className={this.state.nameClass}>
                    <h3>{name.name}</h3>
                </div>
                <div className={this.state.taskClass}>
                    <p>{name.task}</p>
                </div>
                <div className={this.state.statusClass}>
                    <p className='grey'>{name.status}</p>
                </div>
            </div>
        ))
        if(!this.props.firstOpen){
            return(
                <div>
                    <div className='calendarHeader2'>
                        <div className='backButtonLeft'>
                            <div>
                                <div onClick={(e) => {this.onClose(e)}} className='greyText'
                                style={{cursor: 'pointer'}}
                                >Calendar</div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            )
        } else {
            return(
                <div>
                    <div className='calendarHeader'>
                        <div className='backButtonLeft'>
                            <div>
                                <img src={backImage} onClick={(e) => {this.onClose(e)}} className='backImage'></img>
                            </div>
                        </div>
                    </div>

                    <div className='spacer30'></div>

                    <div className='holdingBox'>
                        <div className='fiftyPercent'>
                            <div className='backButtonLeft '>
                                <div>
                                    <div className='indentLeft1'>
                                        <div className={this.state.imgClass}>TASKLIST</div>
                                    </div>
                                    <div className='spacer30'></div>
                                    <div className='indentLeft2'>
                                        {names}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='fiftyPercent'>
                            <div className='clockSection'>
                            <div>
                                <div className='calendarDayWriting'>
                                    <div className={this.state.nameClass}>
                                        Time to still complete Task
                                    </div>
                                </div>
                                <div className='spacer30'></div>
                                <div className='calendarDayWriting'>
                                    <div className={this.state.taskClass}>
                                        {this.timeMath()}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
  			
		}
}

export default DayInfo;





class PopoverItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false
    };
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
        <img src={Image} className='pending' color="secondary" id={'Popover-' + this.props.name.id} 
              onMouseOver={this.toggleOn} 
              onMouseOut={this.toggleOff}
              onClick={this.clicked} >
          
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







