// @flow
import React from 'react'
import Hero from './components/Hero'
import Navbar from '../Home/components/Navbar/'
import { Link, IndexLink } from 'react-router'
import { Translate } from 'react-localize-redux'
import Whatsapp from 'components/Svg/Whatsapp'
import Footer from 'components/Footer/'
import AffiliateRuleRow from './components/AffiliateRuleRow'
import FAQButton from './components/FAQButton'
import { useSelector } from 'react-redux'
import './Landing.scss'

const rules = [
  `يمكن أن يكون الوكيل من داخل سلطنة عمان أو من خارجها، على ألا يكون الطلاب المستهدفين عمانيين، 
وأيضا ألا يكونوا من غير العمانيين المقيمين داخل سلطنة عمان.`,
  `يقوم الوكيل بما يأتي: <br />
أ.    عمال التسويق والدعاية اللازمة لإيجاد طلاب لصالح المركز. <br />
ب.  تقديم المساعدة الكافية للطلاب المتوقع تسجيلهم فيما يتعلق بتعريفهم بالمركز وبرامجه 
الدراسية والرسوم الدراسية والوثائق المطلوبة، وأسلوب الدراسة، وأية معلومات أخرى عن المركز يطلبها 
الطالب المتوقع تسجيله.`,
  `تقديم المساعدة اللازمة للطلاب المتوقع تسجيلهم لتقديم طلبات 
  الالتحاق بالمركز، وتحميل الوثائق بحسب متطلبات الدراسة في المركز.`,
  `يحصل الوكيل على عمولة مقابل كل طالب يتم تسجيله وفق الاتفاقية التي 
  يتم توقيعها بين المركز والوكيل بعد الموافقة على طلبه.`
]

const Landing = (props: PropsType): React.Element<'div'> => {
  const { isAffiliateAuthenticated } = useSelector((state: Object): Object => state.auth)
  const pathname = isAffiliateAuthenticated ? { pathname: '/affiliate/home' }
  : { pathname: '/auth', query: { guard: 'affiliate' } }

  return (<div className='affiliate-landing'>
    <Navbar key='navbar' className='is-affiliate'>
      <li className='nav-item' key='4'>
        <IndexLink activeClassName='is-active'
          className='c-navbar__nav-link' to='/'>
          <Translate id='home.navbar_center_home' />
        </IndexLink>
      </li>
      <li className='nav-item' key='5'>
        <Link activeClassName='is-active'
          className='c-navbar__nav-link' to='/support/faq'>
          <Translate id='global.faq' />
        </Link>
      </li>
      <li className='nav-item' key='6'>
        <a className='c-navbar__nav-link' href='https://wa.me/96879239982' style={{ direction: 'ltr' }}>
          <Whatsapp style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: -4 }} />
          +96879239982
        </a>
      </li>
      <li className='nav-item' key='7'>
        <Link className={`btn c-navbar__login-btn btn-white`}
          to={pathname}>
          { isAffiliateAuthenticated
            ? <Translate id='home.my_account' />
            : <Translate id='home.referral_login' /> }
        </Link>
      </li>
    </Navbar>
    <Hero />
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1'>
          <p className='affiliate-landing__section'>
    يسر مركز التعليم عن بعد بكلية العلوم الشرعية أن يعلن عن فتح باب التقديم لكل من لديه الرغبة في التعاون مع المركز كوكيل 
    تسويق طلابي معتمد، فردًا كان أو شركة، وذلك وفقًا لما يأتي
          </p>
        </div>
        <div className='col-xs-12 col-md-9 col-md-pull-2'>
          <ol className='affiliate-landing__list'>
            {rules.map((s: string, i: number): React.Element<'div'> =>
              <AffiliateRuleRow key={i} text={s} />)}
          </ol>
          <FAQButton />
        </div>
      </div>
    </div>
    <Footer key='footer' />
  </div>)
}

export default Landing
