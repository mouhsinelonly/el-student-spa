// @flow
// import libraries
import * as React from 'react'
import { Translate } from 'react-localize-redux'

// import {Link} from 'react-router'
// import css
import './Privacy.scss'

type PropsType = {};

class About extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    return (
      <div>
        <div className='container'>
          <h1 className='privacy-page__heading text-xs-center'>
            <Translate id='privacy.header' />
          </h1>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
              <p className='privacy-page__body p-b-3'>
                <h5 className='font-weight-bold m-t-3 m-b-3'>
                  <Translate id='privacy.website' />
                </h5>
                <Translate id='privacy.website_content' />
                <h5 className='font-weight-bold m-t-3 m-b-3'>
                  <Translate id='privacy.gathering_information' />
                </h5>
                <Translate id='privacy.gathering_information_content' />
                <h5 className='font-weight-bold m-b-3 m-t-3'>
                  <Translate id='privacy.information_usage' />
                </h5>
                <Translate id='privacy.information_usage_content' />
                <h5 className='font-weight-bold m-t-3 m-b-3'>
                  <Translate id='global.cookies' />
                </h5>
                <Translate id='privacy.cookies_content' />
                <h5 className='font-weight-bold m-t-3 m-b-3'>
                  <Translate id='privacy.security' />
                </h5>
                <Translate id='privacy.security_content' />
                <h5 className='font-weight-bold m-t-3 m-b-3'>
                  <Translate id='privacy.other_links' />
                </h5>
                <Translate id='privacy.other_links_content' />
              </p>
            </div>
          </div>
        </div>
      </div>)
  }
}

export default About
