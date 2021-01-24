// @flow
import React, { useEffect } from 'react'
import './style.scss'
import Navbar from './Navbar'
import TicketReplies from './TicketReplies'
import Loading from 'components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getTicketTemplates, getTicketVideos, getDepartments } from 'routes/Users/modules/tickets'
import { getFavoriteReplies, getInstallments } from 'routes/Users/modules/users'

// $FlowFixMe
const LeftSide = React.lazy((): Function => import('./LeftSide'))
// $FlowFixMe
const RightSide = React.lazy((): Function => import('./RightSide'))

const Home = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  useEffect((): Function => {
    dispatch(getInstallments())
    dispatch(getFavoriteReplies())
    dispatch(getTicketTemplates())
    dispatch(getDepartments())
    dispatch(getTicketVideos())
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'hidden'
    }
  }, [])
  const { showFullGrade } = useSelector((state: Object): Object => state.user_ui)
  const loading = (<div className='col-xs-12 col-md-3 p-a-0 user2-dashboard__side is-border-right is-table'>
    <Loading strokeColor='#3d4d71' className='user2-dashboard__loading' />
  </div>)
  return (
    <div style={{ height: '100%' }}>
      <Navbar />
      <div className='container-fluid user2-dashboard'>
        <div className='row' style={{ height: showFullGrade ? '60%' : '100%', position: 'relative' }}>
          <React.Suspense fallback={loading}>
            <RightSide />
          </React.Suspense>
          <div className='col-xs-12 col-md-6 p-a-0 user2-dashboard__middle'>
            <TicketReplies />
          </div>
          <React.Suspense fallback={loading}>
            <LeftSide />
          </React.Suspense>
        </div>
        <div id='gradesPortal' className='row' style={{ height: showFullGrade ? '40%' : 0 }} />
      </div>
    </div>
  )
}

export default Home
