import React from 'react'
import './JoinUs.scss'
import {Link} from 'react-router'

export const JoinUs = () =>
  (<div className='join-us__container text-xs-center m-t-3'>
    <h1 className='join-us__title'>
    هل تَوَدُّ الانضِمَام لنا؟
    </h1>
    <p className='join-us__description'>
      في مركز التعليم عن بعد نحرص في مركز «التعليم عن بُعد» على توفير الكوادر البشرية المتميِّزَة لتقديم الأفضل،
      <br /> وتطوير «التعليم عن بُعد» والارتقاء به إلى أعلى المستويات.
    </p>
    <Link to='/' className='join-us__more'>
      <b>إطلع على الوظائف الشاغرة لدينا</b>
    </Link>
  </div>)

export default JoinUs
