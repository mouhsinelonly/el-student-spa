// @flow
import React from 'react'
import Icon from 'components/Icon'
import { Link } from 'react-router'
import './ElementHeader.scss'

type PropsType = {
  alternateId: number,
  menuVisible: boolean,
  subjectName: string,
  onClick: Function,
  lessonOrder: number,
  lessonName: string,
  elementType: string,
  lessonOrder: string
};

const ElementHeader = (props: PropsType): React.Node => (<div className='row StudentElementHeader'>
  <div className='col-xs-12 col-md-10 col-md-pull-1 p-a-0'>
    <div className='col-xs-3 col-md-3'>
      <button
        className={`btn btn-curved btn-block StudentElementHeader__button
    ${props.menuVisible && 'is-active'}`}
        onClick={props.onClick}
      >
        <Icon name='burger-light' className='m-l-2' /> <span className='hidden-xs-down'>قائمة دروس المادة</span>
      </button>
    </div>
    <div className='col-xs-6 col-md-6  text-xs-center'>
      <h1 className='StudentElementHeader__subject-title'>{props.subjectName}</h1>
      <h1 className='StudentElementHeader__title'>
        الدرس {props.lessonOrder}
        <span> {props.lessonName}</span>
      </h1>
    </div>
    <div className='col-xs-3 col-md-3'>
      {props.alternateId ? (
        <Link
          to={`/student/element/${props.alternateId}`}
          className={`btn btn-curved btn-block StudentElementHeader__button`}
        >
          <Icon name={props.elementType === 'PDF' ? 'play-single-light' : 'doc-light-small'} className='m-l-2' />
          <span className='hidden-xs-down'>
          {props.elementType === 'PDF' ? 'مشاهدة فيديو الدرس' : 'تصفح كتيب الدرس'}</span>
        </Link>
      ) : null}
    </div>
  </div>
</div>)

export default ElementHeader
