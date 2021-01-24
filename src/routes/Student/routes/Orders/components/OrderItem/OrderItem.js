// @flow
import * as React from 'react'
import './style.scss'
import moment from 'moment'
import { Link } from 'react-router'

type PropsType = {
  start_at: string,
  finish_at: string,
  title: string,
  description: string,
  enabled: boolean,
  actionText: string,
  link: string,
  time_start_at: string,
  time_finish_at: string
};

class OrderItem extends React.Component<PropsType> {
  static defaultProps = {
    enabled: true
  }
  render (): React.Element<'div'> {
    const { title, description, start_at: startAt, finish_at: finishAt, link,
      enabled, actionText, time_start_at: startAtTime, time_finish_at: finishAtTime,
      isFuture, isCurrent } = this.props
    const startAtMoment = startAt ? moment(`${startAt} ${startAtTime}`) : false
    const finishAtMoment = finishAt ? moment(`${finishAt} ${finishAtTime}`) : false

    return (<div className='c-student-order-item text-xs-center shadow-1'>
      <div className='c-student-order-item__title p-t-3 p-b-2'>{title}</div>
      <section className='c-student-order-item__meta p-x-1 p-y-1'>
        {isCurrent && enabled ? 'متاح حاليا' : 'غير متاح حاليا'}
        {(isFuture || isCurrent) && enabled ? <span className='p-x-1'>|</span> : null}
        {isFuture ? `يفتح بتاريخ ${startAtMoment.format('DD MMMM YYYY')}` : null}
        {isCurrent && enabled ? `يغلق بتاريخ ${finishAtMoment.locale('en').format('DD')}
        ${finishAtMoment.locale('ar-SA').format('MMMM')}
        ${finishAtMoment.locale('en').format('YYYY')}` : null}
      </section>
      <section>
        {description}
      </section>
      {isCurrent && enabled ? <Link to={link} className='btn btn-success m-y-2'>
        {actionText}
      </Link>
      : <button className='btn btn-gray m-y-2' disabled>
        {actionText}
      </button>
      }
    </div>)
  }
}

export default OrderItem
