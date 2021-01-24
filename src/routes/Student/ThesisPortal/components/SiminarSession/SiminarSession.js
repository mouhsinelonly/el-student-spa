// @flow
import React from 'react'
import './SiminarSession.scss'
import { dayNumberToString } from 'utils'

type PropertiesType = {
  startAt: string,
  status: string,
  recording: string,
  link: string,
  days: string
};

const SiminarSession = ({ startAt, status, days, recording, link }: PropertiesType): React.Element<'div'> =>
  <div className={`SiminarSession is-${status} my-panel-white m-b-3 p-t-2 
  shadow-1 SiminarSession text-xs-center`}>
    <i className={`material-icons m-l-2 
      ${status === 'future' ? 'text-info' : null} 
      ${status === 'live' ? 'text-success' : null} 
     SiminarSession__icon`}>videocam</i>
    <h5 className='SiminarSession__heading'>تأريخ السمينار لقاء مباشر</h5>
    <h2 className={`SiminarSession__time p-y-3 font-weight-bold 
      ${status === 'future' ? 'text-info' : null} 
      ${status === 'live' ? 'text-success' : null} 
      p-b-2`}>{startAt}</h2>
    <a target='_blank' href={status === 'past' ? recording : link} className='SiminarSession__footer p-a-1'>
      {status === 'future' ? `باقي على السيمينار ${dayNumberToString(days)}` : `السيمينار بدأ، أدخل الآن` }
    </a>
  </div>

export default SiminarSession
