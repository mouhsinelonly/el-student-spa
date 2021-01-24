// @flow
import React from 'react'
import './Footer.scss'
import Menu from './Menu'
import { Link } from 'react-router'
import SupportInfo from './SupportInfo'
import logoSingle from 'static/img/64x64.png'
import { Translate } from 'react-localize-redux'

type PropType = {};

const Footer = (props: PropType): React.Element<'footer'> => (
  <footer>
    <div className='c-footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-5 col-md-2 col-lg-1 text-xs-center'>
            <img src={logoSingle} alt='مركز التعليم عن بعد كلية العلوم الشرعية' />
          </div>
          <div className='col-xs-7 col-md-4'>
            <SupportInfo />
          </div>
          <div className='col-xs-12 col-md-6 col-md-pull-1'>
            <div className='c-footer__list col-xs-12 p-x-0 hidden-sm-up'>
              <div>80099777</div>
              <div>0096824393777</div>
              <div>info@css.edu.om</div>
            </div>
            <Menu />
          </div>
        </div>
      </div>
    </div>
    <div className='text-xs-center p-y-2 c-footer__copyright'>
      <Translate id='global.copyrights' />
    </div>
    <div className='fb-customerchat'
      attribution='setup_tool'
      page_id='1384277671897081'
      theme_color='#13cf13'
      logged_in_greeting='مرحبا ، هل لديك سؤال ؟'
      logged_out_greeting='مرحبا ، هل لديك سؤال ؟' />
    <Link to='/affiliate' className='hidden-xs-up'>affiliate</Link>
  </footer>)

export default Footer
