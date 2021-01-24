// @flow
import * as React from 'react'
import FaceMatchingBlock from 'components/FaceMatching'

type PropsType = {};

class FaceMatching extends React.Component<PropsType> {
  render (): React.Element<"div"> {
    return (
      <div>
        <div className='p-student-profile__face-block p-t-3'>
          <div className='col-xs-12 col-md-6 col-md-pull-3 text-xs-center p-b-3'>
              <FaceMatchingBlock />
          </div>
          <div className='clearfix' />
        </div>
      </div>
    )
  }
}

export default FaceMatching
