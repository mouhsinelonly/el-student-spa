import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class GraduateState extends Component {
  static propTypes = {
    documents: PropTypes.array,
    token: PropTypes.string.isRequired,
    terms: PropTypes.array,
    gpas: PropTypes.array
  }
  static defaultProps = {
    documents: [],
    terms: [],
    gpas: []
  }
  render () {
    const { documents, token, gpas } = this.props
    const transcript = documents.find(d => d.slug === 'transcript')
    const lastGpa = gpas[gpas.length - 1]

    return (
      <div>
        <div className='p-y-3 text-xs-center'>
          <div className='rows p-y-1'>
            <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-6 col-lg-pull-3'>
              <h3>مبارك عليك التخرج</h3>
              <p>
                هنيئا لك نجاحك في الفصل الأخير و تخرجك حيث تحصلت على
              </p>
              <div className='clearfix m-t-3' />
              <div className='col-xs-12 col-md-6'>
                <p>معدلك التراكمي</p>
                <h2 className='text-success'>
                  <b>{lastGpa ? lastGpa.gpa : null}</b>
                </h2>
              </div>
              <div className='col-xs-12 col-md-6'>
                <p>بتقدير</p>
                <h2 className='text-success'>
                  <b>{lastGpa ? lastGpa.gpa_text : null}</b>
                </h2>
              </div>
              <div className='clearfix' />
              <div className='col-xs-12 col-md-6  m-t-3'>
                {
                transcript
                ? <a href={`${transcript.url}?token=${token}`}
                  target='_blank'
                  className='btn btn-block btn-success-outline btn-lg'>
                  تحميل كشف الدرجات
                </a>
                : null
              }
              </div>
              <div className='col-xs-12 col-md-6  m-t-3' />
            </div>
            <div className='clearfix' />
          </div>
        </div>
        <div className={`text-xs-center graduate-form shadow-1 hidden-xs-up`}>
          <div className='p-y-3'>
            <h1 className='graduate-form__title m-b-3'>
              هل يمكنك مساعدتنا في معرفة رآيك حول تجربتك في التعليم عن بعد ؟
            </h1>
            <a href='' className='btn btn-success p-x-3 p-y-1'>
              نعم إبدأ الآن
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default GraduateState
