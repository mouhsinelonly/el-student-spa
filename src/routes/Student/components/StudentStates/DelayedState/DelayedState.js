// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import classes from './style.scss'
import moment from 'moment'

type PropsType = {
  delays: Array<Object>,
  getDelayOrders: Function
};

class DelayedState extends React.Component<PropsType> {
  componentDidMount () {
    const { getDelayOrders } = this.props
    getDelayOrders()
  }
  render (): React.Element<'div'> {
    const { delays } = this.props

    if (!delays) return <Loading />

    const delay = delays.find((d: Object): boolean => d.state === 'قبول')

    let returnMoment

    if (delay) {
      returnMoment = moment(delay.return_semester.start_at)
    }
    return (<div className={`text-xs-center c-delayed-state__container`}>
      <div className='p-y-3 '>
        <h3 className='c-delayed-state__title'>دراستك مؤجلة للسنة القادمة</h3>
        <p className={`m-b-0 ${classes['description']}`}>
          تم قبول طلبك لتأجيل الدراسة <br />
          على أن تستأنف الدراسة في بداية
          <b>
            {delay && delay.return_semester
            ? ` ${delay.return_semester.name} ${delay.return_semester.year.name}`
            : ''}
          </b>
        </p>
      </div>
      <footer className={`c-delayed-state__footer p-y-1`}>
        {
          returnMoment ? `دراستك ستنطلق يوم
          ${returnMoment.locale('en').format('DD')}
          ${returnMoment.locale('ar-SA').format('MMMM')}
          ${returnMoment.locale('en').format('YYYY')}` : ''
        }
      </footer>
    </div>)
  }
}

export default DelayedState
