// @flow
import * as React from 'react'
import './TrialChooser.scss'
import { Link } from 'react-router'
type PropsType = {};

const TrialChooser = (props: PropsType): React.Element<typeof Link> => {
  return (
    <Link className='TrialChooser m-t-3 m-x-3 p-a-1 m-b-3' to='/library/home'>
      <h3 className='TrialChooser__header'>الخطة التجريبية المجانية</h3>
      <span>تتيح لك الوصول لـ 80 كتاب فقط</span>
      <i className='material-icons TrialChooser__angle'>keyboard_arrow_left</i>
    </Link>
  )
}

export default TrialChooser
