// @flow
import * as React from 'react'
import SubNav from 'routes/Student/components/SubNav'
import ActivitiesBlock from '../ActivitiesBlock'
import moment from 'moment'
type PropType = {
  activities: Array<Object>,
  serverdate: string
};
class Home extends React.Component<PropType> {
  render (): React.Element<'div'> {
    const { activities, serverdate } = this.props
    const serverTime = moment(serverdate)
    return (
      <div>
        <SubNav cols={3} active={4} />
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1'>
              <ActivitiesBlock activities={activities.filter((a: Object): string =>
                moment(a.start_at).isAfter(serverTime))}
                title='المهام المقبلة' />
              <ActivitiesBlock activities={activities.filter((a: Object): string =>
                moment(a.start_at).isBefore(serverTime) &&
              moment(`${a.finish_at} 23:59:59`).isAfter(serverTime))}
                title='المهام المتاحة'
                available />
              <ActivitiesBlock activities={activities.filter((a: Object): string =>
                moment(`${a.finish_at} 23:59:59`).isBefore(serverTime))}
                title='المهام المنقضية' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
