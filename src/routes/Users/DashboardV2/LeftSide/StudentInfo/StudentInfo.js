// @flow
import React, { useCallback } from 'react'
import ImageZoom from 'react-medium-image-zoom'
import { getStudentStateString } from 'utils'
import './style.scss'

type PropsType = {
  student: Object,
  financials: Object,
  toggleEditStudentProfile: Function
};

const StudentInfo = (props: PropsType): React.Element<'div'> => {
  if (typeof props.student.id === 'undefined') return <div />
  const { student: { name, username, mobile, email, photo: { thumb, large },
  term_name: term, state, degree_type: degreeType }, financials, toggleEditStudentProfile } = props
  const { amount, installments, exceptions } = financials
  let stateColor = 'text-danger'
  switch (state) {
    case 'active':
      stateColor = 'text-success'
      break
    case 'graduate':
      stateColor = 'text-info'
      break
    case 'delayed':
      stateColor = 'text-warning'
      break
  }
  const _showForm = useCallback(() => {
    toggleEditStudentProfile()
  })
  const hasInstallment = installments > 0
  const exceptionText = exceptions ? ` . إستثناء ${exceptions.forever ? ' نهائي' : ` من
  ${exceptions.from_date} إلى ${exceptions.to_date}`}` : ''
  return (
    <div className='p-y-2 v2-studentinfo'>
      <div>
        <div className='col-xs-3' style={{ paddingLeft: 0, position: 'relative' }}>
          <ImageZoom
            image={{
              src: thumb,
              alt: name,
              className: 'v2-studentinfo__photo'
            }}
            zoomImage={{
              src: large,
              alt: name,
              className: 'v2-studentinfo__photo'
            }} />
          {degreeType === 'maj' ? <span className='v2-studentinfo__label'>ماجستير</span> : ''}
        </div>
        <div className='col-xs-9'>
          <h1 className='v2-studentinfo__name text-nowrap'>{name}</h1>
          <span className={`${stateColor} v2-studentinfo__extrainfo`}>{getStudentStateString(state)}</span> .
          <span className='v2-studentinfo__extrainfo'>{term}</span>
          <div className='v2-studentinfo__extrainfo'>{username}</div>
        </div>
        <div className='clearfix' />
      </div>
      <div className='v2-studentinfo__contact m-t-2'>
        <div className='col-xs-3 text-xs-center'>
          <div>
            <i className='material-icons v2-studentinfo__extrainfo'>phone</i>
          </div>
          <div>
            <i className='material-icons v2-studentinfo__extrainfo'>email</i>
          </div>
          <div>
            <i className='material-icons v2-studentinfo__extrainfo'>account_balance_wallet</i>
          </div>
        </div>
        <div className='col-xs-9'>
          <div className='v2-studentinfo__extrainfo'>{mobile}</div>
          <div className='v2-studentinfo__extrainfo'>{email}</div>
          <div className={`v2-studentinfo__extrainfo`}>
            <span className={`text-${amount >= 0 ? 'success' : 'danger'}`}>{amount}ريال</span>
            <span>{hasInstallment ? ' . أقساط' : ''}</span>
            <br />
            <small className='text-info'>{exceptionText}</small>
          </div>
          <button className='v2-studentinfo__edit p-a-0 m-t-1' onClick={_showForm}>
            <u>تعديل البيانات</u>
          </button>
        </div>
        <div className='clearfix' />
      </div>
    </div>
  )
}

export default StudentInfo
