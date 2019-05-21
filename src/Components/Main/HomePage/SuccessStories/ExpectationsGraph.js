import React from 'react';

import image from './expectationsGraph.png';

const ExpectationsGraph = () => {
	return(
		<div className='backgroundGrey'>
			<div className='spacer30'></div>
			<div className='heading2'>We all have high expectations ...</div>
			<div className='subHeading'>
			But sometimes our reality doesn't match.
			Use a network of friends and like-minded people
			<br /> to help you stick to your tasks and acheive your goals!</div>
			<div className='spacer30'></div>
			<img src={image} alt='' className='expectaionsImage'>
			</img>
			<div className='spacer30'></div>
			<div className='spacer30'></div>
		</div>
	)
}

export default ExpectationsGraph;