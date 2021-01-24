// @flow
import React from 'react'
import LocationBanner from 'static/img/college_location.png'

const CollegeLocation = (): React.Element => <a href="https://www.google.com/maps/place/College+of+Shari'a+Sciences/@23.5774101,58.4329296,15z/data=!4m2!3m1!1s0x0:0x70553b75db9f7e83?sa=X&ved=2ahUKEwj1o4q33djrAhVD6aQKHaTABJYQ_BIwEXoECBEQCA" target='_blank'
  className='m-t-2 c-step-block__location'>
	<img className='img-fluid' src={LocationBanner} alt="موقع الكلية" />
</a>

export default CollegeLocation