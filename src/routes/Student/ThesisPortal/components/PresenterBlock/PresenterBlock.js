// @flow
import React from 'react'
import './PresenterBlock.scss'

type PropertiesType = {
  name: string,
  degree: string,
  cvFileUrl: string,
  photoUrl: string
};

const PresenterBlock = ({ name, degree, cvFileUrl, photoUrl }: PropertiesType): React.Element<'div'> =>
  <div className='Thesis-PresenterBlock my-panel-white p-a-2 shadow-1'>
    <div className='row'>
      <div className='col-xs-12 col-md-3 col-lg-2 text-xs-center'>
        <img src={photoUrl} alt={name} className='Thesis-PresenterBlock__photo' />
      </div>
      <div className='col-xs-12 col-md-7 col-lg-10'>
        <h6 className='font-weight-bold'>{name}</h6>
        <p className='font-helvetica'>{degree}</p>
        { cvFileUrl ? <a href={cvFileUrl} className='btn btn-white Thesis-PresenterBlock__cv'>
          عرض السيرة الذاتية
        </a> : null }
      </div>
    </div>
  </div>

export default PresenterBlock
