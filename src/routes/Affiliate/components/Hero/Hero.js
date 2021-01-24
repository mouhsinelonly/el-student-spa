// @flow
import React from 'react'
import './Hero.scss'

type PropsType = {};

const Hero = (props: PropsType): React.Element<'div'> => (<div className='affiliate-hero text-xs-center'>
  <h1 className='affiliate-hero__title'>
   انضم إلى وكلائنا
  </h1>
  <p className='affiliate-hero__desc'>
   نسعى لنشر تجربتنا لتدريس العلوم الشرعية عن بعد إلى باقي دول العالم، كن أحد شركائنا في النجاح
  </p>
  <a className='affiliate-hero__cta btn p-x-3 btn-lg'
    target='_blank'
    href='https://css-edu.typeform.com/to/AOAk29'>
   طلب الانضمام
  </a>
</div>)

export default Hero
