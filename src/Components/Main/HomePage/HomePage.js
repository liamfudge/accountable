import React from 'react';
import { Link } from 'react-router-dom';

import SuccessStories from './SuccessStories/SuccessStories';
import ExpectationsGraph from './SuccessStories/ExpectationsGraph';
import Footer from './Footer';
import ScrollingBar from './ScrollingBar/ScrollingBar';
import ScrollingBar2 from './ScrollingBar/ScrollingBar2';

import './HomepageStyle.css';

const HomoePage = (props) => (
  <div className='homePage'>
    <div className='backingColor'>
    	<div className='spacer30'></div>
      <div className='heading'>Accountable</div>
      <div className='spacer30'></div>
      <div className='subHeading'>
      	Turn your dreams into reality with a comunity of like-minded individuals behind you 
      	to help you achieve your goals!
      </div>
      <div className='spacer30'></div>
      <div className='spacer30'></div>
      <Link to='/register' className='SigninButton'><button className='buttonBlue jumbo'>Register Now</button></Link>
      <Link to='/signin' className='SigninButton'><button className='jumbo'>Sign-in</button></Link>

      <div className='spacer30'></div>
    </div>

    <div className='spacer30'></div>
    <div className='spacer30'></div>
    <ScrollingBar />
    <div className='spacer30'></div>
    <ExpectationsGraph />
    {/*<div className='spacer30'></div>
        <SuccessStories />*/}
    <div className='spacer30'></div>
    <div className='spacer30'></div>
    <Footer />
  </div>

)

export default HomoePage;