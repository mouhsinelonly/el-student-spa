import React from 'react';
import HourGlass from './assets/hourglass.gif'

export const HourGlassLoading = (props) => <img style={{width:props.width, height:props.height}} src={HourGlass} />;

HourGlassLoading.defaultProps = {
	width:100,
	height:100
};

export default HourGlassLoading;