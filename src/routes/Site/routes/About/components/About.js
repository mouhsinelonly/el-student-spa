// @flow
// import libraries
import * as React from 'react'
import { Link } from 'react-router'
import { Helmet } from 'react-helmet'

// import css
import './About.scss'
import features from 'static/data/about_features.json'
// import components
import Features from 'components/Features/'
// import JoinUs from './JoinUs/'
// import shikh
import shikh from 'static/img/shikh.jpg'
// import students_cover from 'static/img/students_cover.jpg'
import { Translate } from 'react-localize-redux'
import Icon from 'components/Icon'
type PropsType = {};

class About extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    return (
      <div>
        <Translate>
          {({ translate }: Object): React.Element<typeof Helmet> => <Helmet>
            <title>{translate('home.navbar_about')}</title>
            <meta name='description' content={translate('description.about')} />
          </Helmet>}
        </Translate>

        <div className='container'>
          <h1 className='about-page__heading text-xs-center'>
            <Translate id='about.header' />
          </h1>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
              <p className='about-page__body'>
                <Translate id='about.paragraph_one' />
                <br />
                <br />
                <Translate id='about.paragraph_two' />
                <br />
                <br />
                <Translate id='about.paragraph_three' />
                <br />
                <br />
                <Translate id='about.paragraph_four' />
                <br />
                <br />
                <Translate id='about.paragraph_five' />
                <br />
                <br />
                <Translate id='about.paragraph_six' />
              </p>
            </div>
          </div>
          <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 about-page__director m-y-3 p-x-0'>
            <div className='col-xs-12 col-md-3 col-lg-2'>
              <img src={shikh} className='about-page__director__avatar' />
            </div>
            <div className='col-xs-12 col-md-9 col-lg-10 p-t-1'>
              <h6 className='text-decoration-bold'>
                <Translate id='about.shikh_name' />
              </h6>
              <p>
                <Translate id='about.shikh_position_one' />
              </p>
              <p>
                <Translate id='about.shikh_position_two' />
              </p>
            </div>
          </div>
        </div>
        <div className='about-page__banner_1'>
          {/* <img src={students_cover} className={`img-fluid`} style={{width: '100%'}} /> */}
        </div>
        <Features features={features} />
        <div className='text-xs-center m-t-3'>
          <Link to='/info' className={'m-b-3 btn btn-success btn-lg about-page__more'}>
            <Translate id='about.more' /> <Icon className='m-r-2' name='arrow-long-left' />
          </Link>
        </div>
      </div>
    )
  }
}

export default About
