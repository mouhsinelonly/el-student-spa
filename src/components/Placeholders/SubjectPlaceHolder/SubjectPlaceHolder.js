import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const SubjectPlaceHolder = ({ className, count, enabled }) =>
  enabled
    ? Array(count)
        .fill()
        .map((n, i) => (
          <div className='col-md-4' key={i}>
            <div className={`col-xs-12 card m-b-1 c-subject-placeholder ${className}`}>
              <div className='c-subject-placeholder__container m-t-2'>
                <div className='c-subject-placeholder__white is-title-bottom' />
                <div className='c-subject-placeholder__white is-title-left' />
                <div className='c-subject-placeholder__white is-title-top' />
                <div className='c-subject-placeholder__white is-title-right' />
                <div className='c-subject-placeholder__white is-subtitle-top' />
                <div className='c-subject-placeholder__white is-subtitle-bottom' />
                <div className='c-subject-placeholder__white is-subtitle-right' />
                <div className='c-subject-placeholder__white is-subtitle-left' />
                <div className='c-subject-placeholder__white is-footer' />
              </div>
            </div>
          </div>
        ))
    : null

SubjectPlaceHolder.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number
}

SubjectPlaceHolder.defaultProps = {
  count: 1,
  className: ''
}

export default SubjectPlaceHolder
