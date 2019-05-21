import React from 'react';

import { SocialIcon } from 'react-social-icons';

class Footer extends React.Component {
	render() {
		return(
			<div className='footerBack'>
				<div className='heading2 fadedWriting'>Accountable</div>
				<div className='spacer30'></div>
				<div className='horizontalLine'></div>
				<div className='spacer30'></div>
				<div className='footerBox'>
					
					<div className='oneThird'>
						<div className='links'>{'\u00A9'} 2019 Accountable</div>
						<div className='spacer30'></div>
						<div>
							
						</div>
					</div>

					<div className='oneThird'>
						<div className='subHeading'>Information</div>
						<div className='spacer30'></div>
						<div className='links'>
							About us
						</div>
						<div className='links'>
							Contact us
						</div>
						<div className='links'>
							Help
						</div>
						<div className='links'>
							FAQs
						</div>
					</div>

					<div className='oneThird'>
						<div className='subHeading'>Social media</div>
						<div className='spacer30'></div>
						<div>
							<SocialIcon className='socialIcon' network="facebook" bgColor="black"
							style={{ height: 35, width: 35 }} 
							url="https://www.facebook.com/Itsaccountable-384380512411320/" target='_blank' />
							<SocialIcon className='socialIcon' network="instagram" bgColor="black" 
							style={{ height: 35, width: 35 }} 
							url="https://www.instagram.com/itsaccountable/" target='_blank' />
						</div>
					</div>

				</div>
				<div className='spacer30'></div>

			</div>
		)
	}
}

export default Footer;