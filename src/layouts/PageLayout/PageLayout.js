// @flow
import React, { useEffect } from 'react'
import './PageLayout.scss'
import 'react-hint/css/index.css'
import NetWorkErrorContainer from 'components/NetWorkError'
import Modals from 'components/Modals'
import PaymentView from 'components/PaymentView'
import ReactHintFactory from 'react-hint'
import { withLocalize } from 'react-localize-redux'
import useDefaultLocale from 'hooks/useDefaultLocale'
const ReactHint = ReactHintFactory(React)

type PropsType = {
  children: React.Element<*>,
  initialize: Function,
  location: Object
};

const PageLayout = withLocalize((props: PropsType): React.Element<'div'> => {
  const [ defaultLanguage ] = useDefaultLocale()
  const { children } = props
  useEffect(() => {
    if (defaultLanguage !== 'ar' && document.body) {
      document.body.style.direction = 'ltr'
    } else if (document.body) {
      document.body.style.direction = 'rtl'
    }
  }, [defaultLanguage])

  return <div className='main-container'>
    {children}
    <NetWorkErrorContainer />
    <Modals />
    <PaymentView />
    <div className='clearfix' />
    <ReactHint events delay={100} />
  </div>
})

export default PageLayout
