// @flow
import React, { Suspense } from 'react'
import Hero from './Hero'
import News from './News'
import { Helmet } from 'react-helmet'
import { Translate } from 'react-localize-redux'
import Navbar from './Navbar'
import Features from './Features'
import Opinions from './Opinions'
import Footer from 'components/Footer'
import Loading from 'components/Loading'
import features from 'static/data/features.json'
// import SummerCoursesAd from 'components/SummerCoursesAd'
import './style.scss'

export const Homepage = (): React.Element<'div'> => <div className='c-home-page'>
  <Translate>
    {({ translate }: Object): React.Element<typeof Helmet> => <Helmet>
      <title>{translate('home.navbar_elcss')}</title>
      <meta name='description' content={translate('description.home')} />
    </Helmet>}
  </Translate>
  <Navbar />
  <Suspense fallback={<Loading />}>
    <Hero />
  </Suspense>
  <br />
  <br />
  <Features description='home.features_description' features={features} />
  <Opinions />
  {/* <SummerCoursesAd /> */}
  <Suspense fallback={<Loading />}>
    <News />
  </Suspense>
  <Footer />
</div>

export default Homepage
