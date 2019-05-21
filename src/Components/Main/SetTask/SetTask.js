import React from 'react';

import TaskSetting from './TaskSetting';

class SetTask extends React.Component {
	render() {
		return(
			<div>
				<div className='spacer30'></div>
				<div className='subHeading'>Set a Task</div>
				<div className='spacer30'></div>
				<TaskSetting />
			</div>
		)
	}
}

export default SetTask;