// @flow
import * as React from 'react'
import NavBar from '../Home/components/NavBar'
import SubscriptionCard from 'components/Library/SubscriptionCard'
import './style.scss'

type PropsType = {
  profile: Object
};

const Invoices = (props: PropsType): React.Element<'div'> => {
  const { subscription, id } = props.profile
  if (typeof id === 'undefined') {
    return <div />
  }
  return (
    <>
    <div className='container h-100'>
      <div className='row col-xs-12' style={{ paddingTop: 67 }} >
        <NavBar name={props.profile ? props.profile.name : ''}
          smallPhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg'
          largePhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg' />
      </div>
    </div>
    <div className='library-invoices__hero p-y-3'>
      <div className='container p-y-3'>
        <div className='row'>
          <div className='col-xs-12 col-md-6 col-md-pull-3'>
            <SubscriptionCard subscription={subscription} />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Invoices
