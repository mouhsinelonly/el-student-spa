// @flow
import React from 'react'
import './Search.scss'

const Search = (): React.Node => (<div>
  <div className='container ExamActivation__search p-b-3'>
    <div className='col-xs-12 p-b-2'>
      <h5>البحث</h5>
    </div>
    <div className='col-xs-12 col-md-3'>
      <input placeholder='الدومين' type='text' className='ExamActivation__form-control' />
    </div>
    <div className='col-xs-12 col-md-3'>
      <input placeholder='كلمة المرور' type='text' className='ExamActivation__form-control' />
    </div>
    <div className='col-xs-12 col-md-6'>
      <button className='btn pull-md-left btn-dark-gray p-x-3'>بحث</button>
    </div>
  </div>
</div>)

export default Search
