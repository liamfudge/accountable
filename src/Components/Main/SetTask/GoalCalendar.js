import React from 'react';
import Calendar from 'react-calendar';
import'./animationStyle.css';

class GoalCalendar extends React.Component {
    state = {
        date: new Date(),
        class1: 'animation1',
        class2: 'opacity1',
        class3: 'CalendarOpen1'
  	}
  	componentWillMount = () => {
        document.addEventListener('mousedown', this.handleClick, false);
        setInterval(function() {
            if(this.props.show === true) {
                this.animateCalendar();
            } else {
                this.setState({class2: 'opacity1'});
                this.setState({class1: 'animation1'});
                this.setState({class3: 'CalendarOpen1'});
            }
        }.bind(this), 1)
  	}
    componentWillUnmount() {
        document.removeEventListener('mouseDown', this.handleClick, false);
    }
    handleClick = (e) => {

        if(this.node) {
            if(this.node.contains(e.target)){
            } else {
                this.onClose(e);
            }
        }
    }
    animateCalendar = () => {
        if(this.state.class1 === 'animation1') {
            setTimeout(function() {
                this.setState({class3: 'CalendarOpen2'});
                this.setState({class2: 'opacity2'});
                this.setState({class1: 'animation2'});
            }.bind(this), 1)
        }
    }
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
  	onChange = date => this.setState({ date })
 	dayClicked = (e) => {
        let stringDate = String((String(e)).substring(0, 15).substring(4));
        
        setTimeout(function() {
            this.setState({class3: 'CalendarOpen3'})
            this.setState({class2: 'opacity3'});
            this.setState({class1: 'animation3'});
        }.bind(this), 1)
        
        setTimeout(function(e) {
            this.props.onClose && this.props.onClose(e);
            this.props.receiveDate && this.props.receiveDate(stringDate);
        }.bind(this), 10)
        
 	}
  	render() {
        if (!this.props.show) {
            return null;
        } else {
            return (
                <div className='backdropStyle'>
                    <div className='CalendarOpen2'>
                        <div ref={node => this.node = node}>
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                            onClickDay={this.dayClicked}
                            className='newCalendar'
                            tileClassName={this.state.class1}
                            
                        />
                        </div>
                    </div>
                </div>
            );
        }
    	
  	}
}

export default GoalCalendar;