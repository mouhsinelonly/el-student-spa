// @flow
import * as React from 'react'
import { Link } from 'react-router'
import './style.scss'

type PropsType = {};

const Hero = (props: PropsType): React.Element<'div'> => {
  return (
    <div className='c-library-hero text-xs-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-6 col-md-pull-3'>
            <h1 className='c-library-hero__heading'>مكتبة إلكترونية شاملة للباحثين</h1>
          </div>
          <div className='clearfix' />
          <div className='col-xs-12 col-md-4 col-md-pull-4'>
            <p className='c-library-hero__desc p-x-2'>
              مكتبة تضم آلاف الكتب الإلكترونية في مختلف المجالات مع أدوات بحثية متقدمة
            </p>
            <Link to='/library/signup' className='btn btn-block c-library-hero__btn p-a-1'>
              التسجيل في المكتبة
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
