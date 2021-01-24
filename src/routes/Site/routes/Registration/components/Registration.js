// @flow
// import libraries
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Helmet } from 'react-helmet'
import { Translate } from 'react-localize-redux'
// import css
import './Registration.scss'
// import components
import Requirements from 'components/Registration/Requirements'
import MasterRequirements from 'components/Registration/MasterRequirements'
import subjectIllustration from 'static/img/subject-illustration.png'
import sessionsIllustration from 'static/img/sessions-illustration.png'
import examsIllustration from 'static/img/exams-illustration.png'
import Icon from 'components/Icon'
import SpecialtyTabs from 'routes/Site/components/SpecialtyTabs'
import { SpecialtiesOptions } from 'utils'

const Registration = (): React.Element<'div'> => {
  const { activeSpecialtyTab: activeTab } = useSelector((state: Object): Object => state.ui)
  return (<div className='container'>
    <Translate>
      {({ translate }: Object): React.Element<typeof Helmet> => <Helmet>
        <title>{translate('home.navbar_study')}</title>
        <meta name='description' content={translate('description.registration')} />
      </Helmet>}
    </Translate>
    <div className='text-xs-center p-t-3'>
      <h1 className='c-registration-page__heading p-t-3'>
        <Translate id='registration.header' />
      </h1>
      <SpecialtyTabs options={SpecialtiesOptions} className='m-t-3 m-b-3' />
      <p className='p-b-3 hidden-xs-up'>
        <Translate id='registration.subheader' />
      </p>
      {activeTab === 'bac' ? <Requirements /> : <MasterRequirements /> }
    </div>
    <br />
    <h1 id='StudyAnchor' className='c-registration-page__heading text-xs-center p-t-3 p-b-2'>
      <Translate id='registration.study_after_admission' />
    </h1>
    <p className={`text-xs-center p-b-3`}>
      <Translate id='registration.study_after_admission_subheader' />
    </p>
    <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 m-t-3'>
      <div className='col-xs-12 col-md-6 p-x-3'>
        <h3 className='text-purple p-b-2 p-t-2 font-weight-bold'>
          <Translate id='registration.specialty_subjects' />
        </h3>
        <p>
          <Translate id='registration.specialty_subjects_desc' />
        </p>
      </div>
      <div className='col-xs-12 col-md-6 p-x-3'>
        <img className='pull-xs-left img-fluid' src={subjectIllustration} />
      </div>
      <div className='clearfix m-y-3 p-y-3' />
      <div className='col-xs-12 col-md-6 p-x-3'>
        <img className='pull-xs-right img-fluid' src={sessionsIllustration} />
      </div>
      <div className='col-xs-12 col-md-6 text-xs-left p-x-3'>
        <h3 className='text-info p-t-2 font-weight-bold'>
          <Translate id='registration.sessions' />
        </h3>
        <p>
          <Translate id='registration.sessions_desc' />
        </p>
      </div>
      <div className='clearfix m-y-3 p-y-3' />
      <div className='col-xs-12 col-md-6 text-xs-right p-x-3 p-t-3'>
        <h3 className='text-pink font-weight-bold'>
          <Translate id='registration.exams' />
        </h3>
        <p>
          <Translate id='registration.exams_desc' />
        </p>
      </div>
      <div className='col-xs-12 col-md-6 p-x-3'>
        <img className='pull-xs-left img-fluid' src={examsIllustration} />
      </div>
      <div className='clearfix' />
    </div>
    <div className='clearfix' />
    <div className='c-registration-page__more_container m-t-3 text-xs-center'>
      <Link to='/programmes' className='c-registration-page__more-info  btn btn-success btn-lg font-weight-bold'>
        <Translate id='registration.more' /> <Icon name='arrow-long-left' className='m-r-2' />
      </Link>
    </div>
  </div>)
}

export default Registration
