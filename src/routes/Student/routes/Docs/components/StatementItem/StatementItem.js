// @flow
import * as React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import { inArray } from 'utils'
type PropsType = {
  status: string,
  loading: boolean,
  created_at: string,
  type: string,
  comment: string,
  id: number,
  title: string
};

const StatementItem = (props: PropsType): React.Element<'div'> => {
  const { title, status, created_at: createdAt, id, comment, type, loading } = props
  let actionButtonClass = 'success'
  let actionButtonText = 'تقديم طلب'
  let createdText = ''
  if (createdAt !== '') {
    const createdAtMoment = moment(createdAt)
    createdText = `${createdAtMoment.locale('en').format('DD')}
    ${createdAtMoment.locale('ar').format('MMMM')} ${createdAtMoment.locale('en').format('YYYY')}`
  }
  const delivered = status === 'delivered'
  const firstOrder = typeof id === 'undefined'
  const current = !inArray(status, ['normal', 'delivered'])
  if (status !== 'delivered') {
    switch (status) {
      case 'waiting':
        actionButtonClass = 'info-outline disabled'
        actionButtonText = 'تقديم'
        break
      case 'reviewed':
        actionButtonClass = 'info-outline disabled'
        actionButtonText = 'تم المراجعة'
        break
      case 'uncomplete':
        actionButtonClass = 'warning'
        actionButtonText = 'غير مكتمل'
        break
      case 'printed':
        actionButtonClass = 'info-outline disabled'
        actionButtonText = 'تم الطباعة'
        break
      case 'ungraduate':
        actionButtonClass = 'danger'
        actionButtonText = 'غير متخرج'
        break
      case 'approved':
        actionButtonClass = 'success-outline disabled'
        actionButtonText = 'الإفادة جاهزة للاستلام'
        break
      case 'delivered':
        actionButtonClass = 'info-outline disabled'
        actionButtonText = 'تم التسليم'
        break
    }
  }
  return (
    <div className='c-statements-request shadow-1 m-b-2 p-a-2'>
      <div className='row'>
        <div className='col-xs-12 col-md-8'>
          <h5 className='c-statements-request__title'>{title}</h5>
          <div className={`c-statements-request__date ${firstOrder ? 'hidden-xs-up' : ''}`}>
            {delivered ? `طلبت مسبقا بتاريخ ${createdText}`
          : `بتاريخ ${createdText}`}
          </div>
        </div>
        <div className='col-xs-12 col-md-4'>
          {(status !== 'delivered' && status !== 'normal' && status !== 'uncomplete')
          ? <button disabled={loading}
            className={`btn btn-default btn-block btn-${actionButtonClass}`}>
            {actionButtonText}
          </button> : <Link disabled={loading} to={{ pathname: '/student/orders/statement',
            query: { id: current ? id : undefined, type } }}
            className={`btn btn-default btn-block ${loading && 'disabled'} btn-${actionButtonClass}`}>
            {actionButtonText}
          </Link>}
          <span className='c-statements-request__comment'>
            {comment}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatementItem
