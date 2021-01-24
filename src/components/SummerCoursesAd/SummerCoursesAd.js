// @flow
import * as React from 'react'
import './style.scss'
import PlayBlue from 'components/Svg/PlayBlue'
type PropsType = {};

const SummerCoursesAd = (props: PropsType): React.Element<'div'> => <div className='container'>
  <div className='row m-y-3'>
    <div className='col-xs-12 col-md-6 SummerCoursesAd__cont'>
      <a rel='noopener' className='SummerCoursesAd' href='https://ecourse.el-css.edu.om/' target='_blank'>
        <h6>سجل الآن في</h6>
        <h2 className='font-weight-bold'>الدورات الصيفية</h2>
        <h5>في مختلف مواد العلوم الشرعية</h5>
        <div className='SummerCoursesAd__icon'>
          <PlayBlue className='SummerCoursesAd__play' />
          <div className='SummerCoursesAd__box__1' />
          <div className='SummerCoursesAd__box__2' />
          <div className='SummerCoursesAd__box__3' />
        </div>
      </a>
    </div>
  </div>
</div>

export default SummerCoursesAd
