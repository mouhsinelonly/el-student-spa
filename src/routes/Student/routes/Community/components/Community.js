// @flow
import * as React from 'react'
import Home from './Home'
import './style.scss'

type PropsType = {
  children: React.Node,
  reasearchActivities: Array<Object>,
  toggleSupportFloatingButton: Function,
  getCommunityPosts: Function
};

const Community = (props: PropsType): React.Element<'div'> => {
  React.useEffect((): Function => {
    props.toggleSupportFloatingButton(false)
    props.getCommunityPosts()

    return () => {
      props.toggleSupportFloatingButton(true)
    }
  })
  const { children } = props
  return <div className='student-community-home__container'>
    {children || <Home {...props} />}
  </div>
}

export default Community
