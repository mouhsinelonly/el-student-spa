import React, {Component} from 'react'
import './style.scss'

class MyLibraryEmpty extends Component {

  render () {
    return (
      <div className='c-my-library-empty'>
        <h1>لا يوجد كتب</h1>
        <p className='c-my-library-empty__text'>
        بامكانك اضافة كتب لمكتبتك الخاصة للوصول اليها بشكل اسرع.
        </p>
      </div>)
  }
}

export default MyLibraryEmpty
