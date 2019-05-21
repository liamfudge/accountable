import React from 'react';
import moment from 'moment';
import './Calendar.css';

import PopoverExampleMulti from './Popover';
import DayInfo from './DayInfo';
import Details from './Details';

import { connect } from 'react-redux';
import backImage from './back_arrow.png';
import frontImage from './front_arrow.png';

let i = 0;
let DB = [];

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.width = props.width || "650px";
        this.style = props.style || {};
        this.style.width = this.width; // add this
        this.state = {
            testDate: 12,
            tasks: [
                {
                    date: 1,
                    task: 'ride bike'
                },
                {
                    date: 12,
                    task: 'make website'
                },
                {
                    date: 21,
                    task: 'go to work'
                },
                {
                    date: 24,
                    task: 'set up algorithm'
                },
            ],
            dateContext: moment(),
            today: moment(),
            showMonthPopup: false,
            showYearPopup: false,
            selectedDay: null,
            dayInfo: true,
            daySelection: '',
            taskSelector: '',
            taskList: DB,
            dayEvents: [],
            classStyle: 'calendarBoxAnimation1',
            firstOpen: false
        };
    }

    componentWillMount() {
        fetch('http://localhost:3000/taskList', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data => {
            for(i = 0; i < data.length; i++){
                DB.push(data[i]);
            }
        })

        this.setState({dayInfo: true});
        setInterval(function() {
            if(this.state.dayInfo === false) {
                this.setStateAnimation();
                this.setState({dayEvents: []})

            } else {
                this.setState({classStyle: 'calendarBoxAnimation1'})
            }
        }.bind(this), 10);
        // setTimeout(function() {
        //     this.setState({classStyle: 'calendarBoxAnimation2'})
        // }.bind(this), 500)

    }
    componentWillUnmount() {
        DB = [];
    }
    

    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }

    setStateAnimation = () => {
        setTimeout(function() {
            this.setState({classStyle: 'calendarBoxAnimation2'});
        }.bind(this), 300)
        
    }

    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }
    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }
    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }
    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }
    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }
    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data} className='monthDropdown'>
                    <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}} className='monthNameDropdown'>
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }
    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }
    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
                }
            </span>
        );
    }
    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }
    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }
    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }
    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                defaultValue = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"/>
            :
            <span
                className="label-year"
                onDoubleClick={(e)=> { this.showYearEditor()}}>
                {this.year()}
            </span>
        );
    }
    onDayClick = (e, day, b) => {
        this.setState({firstOpen: true});
        this.setState({
            selectedDay: day
        }, () => {
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
        this.setState({dayInfo: true});
        if(b){
            this.setState({dayEvents: b.dayEvents});
        } else {

        }
        
    }

    showModal = () => {
        this.setState({dayInfo: !this.state.dayInfo});
    }
    closeModal = () => {
        this.setState({dayInfo: !this.state.dayInfo});
        this.setState({dayEvents: []});
    }



    render() {
        // Map the weekdays i.e Sun, Mon, Tue etc as <td>
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }

        let daysInMonth = [];

        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "day current-day": "day");
            let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")

            let dayEvents = [];
            for(i = 0; i < this.state.taskList.length; i++) {
                if(d === this.state.taskList[i].date){
                    
                    dayEvents.push(
                        this.state.taskList[i]
                    )
                    // console.log(dayEvents);
                }
            }

            if(dayEvents.length === 0){
                daysInMonth.push(
                    <td key={d} className={className + selectedClass} onClick={(e)=>{this.onDayClick(e, d)}} >
                    <div className={this.state.classStyle}>
                        <span className='dayPlacement'>{d}
                        
                        </span>
                    </div>
                    </td>
                    
                )
            } else {
                daysInMonth.push(
                    <td key={d} className={className + selectedClass} id={dayEvents} onClick={(e)=>{this.onDayClick(e, d, {dayEvents})}} >
                    <div className={this.state.classStyle}>
                        <span className='dayPlacement'>{d}
                            {/*<PopoverExampleMulti task={dayEvents} />*/}
                            {/*<Details task={dayEvents} />*/}
                            <div className='flexEnd' data-text={String(dayEvents[0].task)}>
                            <div className='dayIndicator'></div>
                            </div>
                        </span>
                    </div>
                    </td>
                )
            }
            
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*100}>
                    {d}
                </tr>
            );
        })
        let infoArray = this.state.selectedDay;
        if(!this.state.dayInfo){
            return (
                <div className='center'>
                    <div className="calendar-container" style={this.style}>

                    
                        <div className='calendarHeader2'>
                            <div className='height45'></div>
                            <img src={backImage} alt='img' className='backImage'
                                onClick={(e)=> {this.prevMonth()}}>
                            </img>
                            <this.MonthNav />
                            <this.YearNav />
                            <img  src={frontImage} alt='img' className='nextImage'
                                onClick={(e)=> {this.nextMonth()}}>
                                
                            </img>
                        </div>

                        <div className='spacer30'></div>

                    <div className={this.state.classStyle}>
                        <table className="calendar">
                            <thead>

                                

                            </thead>
                            <tbody>
                                <tr>
                                    {weekdays}
                                </tr>
                                {trElems}
                            </tbody>

                        </table>
                    </div>

                    <div className='spacer30'></div>

                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="calendar-container" style={this.style}>
                        {/*<div className='calendarDayWriting'>
                                                    <img src={backImage} onClick={this.closeModal} className='backImage'></img>
                                                </div>*/}
                        
                        <DayInfo show={this.state.dayInfo} selection={this.state.selectedDay} onClose={this.showModal} 
                                className='dayInfoBox'
                                taskSelector={'hello'}
                                task={this.state.dayEvents}
                                show={this.state.dayInfo}
                                today={this.state.dateContext.format("D")}
                                closeModal={this.closeModal}
                                firstOpen={this.state.firstOpen} />
                    </div>
                </div>
            );
            
        }
    }
}



const mapStateToProps = state => ({
    userGoals: state.posts.userGoals
})
export default connect(mapStateToProps, {})(Calendar);



