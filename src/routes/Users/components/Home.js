// @flow
import * as React from 'react'
import requireAuthentication from 'components/AuthenticatedComponent'
import './style.scss'
// import Loading from 'components/Loading'
// import Dashboard from './Dashboard'
import DashboardV2 from '../DashboardV2'
import PropsType from 'prop-types'
// import RightMenu from './RightMenu'

type HomeType = {
  getProfile: Function,
  getStatistics: Function,
  getSemesterEvents: Function,
  getAnsweredTickets: Function,
  getTickets: Function,
  // profileLoading: boolean,
  profile: Object,
  children: React.Element<'*'>
};

class Home extends React.PureComponent<HomeType> {
  static contextTypes = {
    router: PropsType.object
  }
  componentDidMount () {
    const { getProfile, getTickets, getStatistics, profile: { id },
    getAnsweredTickets, getSemesterEvents } = this.props
    if (typeof id === 'undefined') {
      getProfile()
    }
    getTickets(0, { open: 1, answered: 0 })
    getAnsweredTickets(0, { open: 1, answered: 1 })
    getStatistics()
    getSemesterEvents()
  }
  render (): React.Element<*> {
    const { children } = this.props
    return children || <DashboardV2 />
    // const { router } = this.context
    // const isSubActive = !router.isActive('user', true)

    // if ((profileLoading && typeof id === 'undefined') || typeof id === 'undefined') return <Loading />

    // return (<div className='p-users-dashboard-app'>
    //   <div className='p-users-dashboard'>
    //     <RightMenu hidden={isSubActive} />
    //     <div className='col-xs-12 col-md-9 col-lg-10 p-a-0'>
    //       {children || <Dashboard />}
    //     </div>
    //   </div>
    // </div>)
  }
}

export default requireAuthentication(Home, 'users')
