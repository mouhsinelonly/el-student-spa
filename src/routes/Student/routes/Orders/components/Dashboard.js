// @flow
import * as React from 'react'
import './style.scss'
import OrderItem from './OrderItem'
import DelayOrderRow from './DelayOrderRow'
import WithdrawOrderRow from './WithdrawOrderRow'
import Loading from 'components/Loading'

type PropsType = {
  events: Array<Object>,
  isFetching: boolean,
  serverdate: string,
  delays: Array<Object>,
  withdraws: Array<Object>,
  profile: Object
};

function getActiveEvent (event, types): boolean {
  return types.includes(event.category) && (event.isCurrent || event.isFuture)
}

class Dashboard extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { events, delays, profile, withdraws, isFetching } = this.props
    const canOrderDelay = delays.filter((o: Object): boolean =>
      (o.state !== 'رفض' && o.state !== 'الغاء لعدم الاستكما')).length === 0
    const canOrderWithdraw = withdraws.filter((o: Object): boolean =>
      (o.state !== 'رفض' && o.state !== 'الغاء لعدم الاستكما')).length === 0

    const delayIsAccepted = delays.findIndex((o: Object): boolean => o.state === 'قبول') >= 0
    const withdrawIsAccepted = withdraws.findIndex((o: Object): boolean => o.state === 'قبول') >= 0

    return (<div className='p-student-orders__container'>
      <h1 className='p-student-orders__heading text-xs-center'>طلبات التأجيل و الإنسحاب</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 p-b-2'>
            <Loading hide={!isFetching} text='جاري التحميل...' />
          </div>
          <div className={`col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2
            ${isFetching ? 'hidden-xs-up' : ''}`}>
            <ul className='p-student-orders__orders m-a-0 p-a-0'>
              { delays.map((o: Object, i: number): React.Element<'div'> => {
                return <DelayOrderRow {...o} key={i} />
              }) }
              { withdraws.map((o: Object, i: number): React.Element<typeof WithdrawOrderRow> => {
                return <WithdrawOrderRow {...o} key={i} />
              }) }
            </ul>
            <div className='col-xs-12 col-md-6'>
              <OrderItem
                title='طلب تأجيل الدراسة'
                link='/student/orders/delay'
                actionText='طلب تأجيل'
                enabled={profile.state === 'active' &&
                canOrderDelay && !withdrawIsAccepted && !delayIsAccepted &&
                canOrderWithdraw && !isFetching}
                {...events.find((event: Object): boolean => getActiveEvent(event, ['full_delay', 'zero_delay', 'half_delay']))} />
            </div>
            <div className='col-xs-12 col-md-6'>
              <OrderItem
                title='طلب الإنسحاب من الدراسة'
                enabled={profile.state === 'active' && !delayIsAccepted && !withdrawIsAccepted &&
                canOrderWithdraw && !isFetching}
                link='/student/orders/withdraw'
                actionText='طلب انسحاب'
                {...events.find((event: Object): boolean => getActiveEvent(event, ['full_withdraw', 'zero_withdraw', 'half_withdraw']))} />
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Dashboard
