// @flow
import * as React from 'react'
import MyProfileFull from 'components/Library/MyProfile'
import NavBar from '../Home/components/NavBar'
import SubNav from '../Home/components/SubNav'
import requireAuthentication from 'components/AuthenticatedComponent'

type PropsType = {
  profile: Object
};

const MyProfile = (props: PropsType): React.Element<typeof React.Fragment> => {
  return (<>
    <div className='container h-100'>
      <div className='row col-xs-12' style={{ paddingTop: 67 }} >
        <NavBar name={props.profile ? props.profile.name : ''}
          smallPhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg'
          largePhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg' />
      </div>
    </div>
    <SubNav active={2} />
    <MyProfileFull {...props} singleBookLink='/library/browse'
      isSubscribed={typeof props.profile.activeSubscription !== 'undefined' ? props.profile.activeSubscription : false} />
  </>)
}

export default requireAuthentication(MyProfile, 'libraryusers')
