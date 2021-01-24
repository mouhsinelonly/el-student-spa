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
            <h1 className='c-library-hero__heading'>متجر الكتب</h1>
          </div>
          <div className='clearfix' />
          <div className='col-xs-12 col-md-4 col-md-pull-4'>
            <p className='c-library-hero__desc p-x-2'>
              المتجر يضم الكتب الدراسية التي تم انتاجها عن طريق المركز
            </p>
            <Link to='/eshop/signup' className='btn btn-block c-library-hero__btn p-a-1'>
              التسجيل في المتجر
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
