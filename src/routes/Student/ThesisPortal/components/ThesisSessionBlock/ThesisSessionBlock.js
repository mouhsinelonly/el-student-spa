// @flow
import React from 'react'
import './ThesisSessionBlock.scss'

type PropertiesType = {
  teacherName: string,
  link: string,
  recording: string,
  status: string,
  photoUrl: string,
  startAt: string
};

const btnClass = (status: string): string => ({
  'past': 'white',
  'live': 'success',
  'future': 'info',
})[status]

const ThesisSessionBlock = ({ teacherName, startAt, link, recording, photoUrl, status }: PropertiesType): React.Node => <div
  className='my-panel-white m-b-3 p-a-2 shadow-1 ThesisSessionBlock'>
  <i style={{ fontSize: 34 }} className='material-icons m-l-2 text-info'>videocam</i>
  <div className='ThesisSessionBlock__info'>
    <img src={photoUrl} className='ThesisSessionBlock__img m-l-1' alt={teacherName} />
    <div>
      <h6>{teacherName}</h6>
      <span>المشرف</span>
    </div>
  </div>
  <a href={status === 'past' ? recording : link}
    target='_blank' className={`btn btn-${btnClass(status)}-light is-${status} ThesisSessionBlock__cta`}>
    {startAt}
  </a>
</div>

export default ThesisSessionBlock
