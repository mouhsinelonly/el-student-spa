// @flow
import * as React from 'react'
import { Translate } from 'react-localize-redux'

// components
import Features from 'components/Features'
import features from 'static/data/registration_features_1.json'
import features2 from 'static/data/registration_features_2.json'
import Icon from 'components/Icon'

export const Requirements = (): React.Element<'div'> => (<div>
  <Features features={features} />
  <Features features={features2} />
  <div className='container'>
    <div className='row m-t-3 text-xs-right c-registration-page__experience m-t-3 p-t-3'>
      {/* <div className='col-xs-12 col-md-3 pull-md-1 text-xs-center'>
        <Icon name='experience' />
        <h4 className='c-registration-page__experience-header p-y-2'>
          <Translate id='registration.experience_header' />
        </h4>
        <p>
          <Translate id='registration.experience_content' />
        </p>
      </div>
      <div className='col-xs-12 col-md-8 p-t-3 c-registration-page__experience-rules'>
        <Translate id='registration.experience_rules' />
      </div>*/}
    </div>
  </div> 
</div>)

export default Requirements
