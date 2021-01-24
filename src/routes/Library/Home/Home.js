// @flow
import * as React from 'react'
import Navbar from 'routes/Home/components/Navbar'
import Hero from '../components/Hero'
import LearningResources from '../components/LearningResources'
import Features from '../components/Features'
import Footer from 'components/Footer'
import { Helmet } from 'react-helmet'
import { Translate } from 'react-localize-redux'

type PropsType = {
  children: React.Element<*>
};

const Home = (props: PropsType): React.Element<'div'> => {
  return (
    props.children || <>
      <Translate>
        {({ translate }: Object): React.Element<typeof Helmet> => <Helmet>
          <title>{translate('home.navbar_library')}</title>
        </Helmet>}
      </Translate>
      <Navbar library />
      <Hero />
      <Features />
      <LearningResources />
      <Footer />
    </>
  )
}

export default Home
