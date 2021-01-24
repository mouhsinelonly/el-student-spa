// @flow
import React from 'react'

type PropType = {
  position: number,
  title: string,
  isDone: boolean,
  isDelivered: boolean,
  isFuture: boolean,
  isPast: boolean,
  startDateFormat1: string,
  isActive: boolean
};

const ThesisWorkStep = ({ position, title, isDone, isActive, isDelivered, startDateFormat1, isFuture, isPast }: PropType): React.Element<'div'> => <div
  className={`col-xs-12 col-md-3 ThesisWorkSteps__item ${isActive ? 'is-active' : null} 
  ${isDone ? 'is-done' : null}`}>
  <div className='ThesisWorkSteps__position'>
    {!isPast ? position : null}
    {isPast && isDelivered ? <i className='material-icons'>check</i> : null }
  </div>
  <div>
    <div>{title}</div>
    {isFuture && !isDelivered ? <div className='ThesisWorkSteps__subtitle'>{startDateFormat1}</div> : null }
    {isDelivered ? <div className='ThesisWorkSteps__subtitle'>تم تسليمه</div> : null }
  </div>
</div>

export default ThesisWorkStep
