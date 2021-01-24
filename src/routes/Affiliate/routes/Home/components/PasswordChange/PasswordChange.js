// @flow
import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from 'routes/Affiliate/modules/affiliates'
import './PasswordChange.scss'

const PasswordChange = (): React.Element<'div'> => {
  const [ password, setPassword ] = useState(null)
  const { data } = useSelector((state: Object): Object => state.affiliates.profile)
  const onPasswordChange = useCallback((e: Object) => {
    setPassword(e.target.value)
  })
  const dispatch = useDispatch()
  const onSubmit = useCallback(() => {
    dispatch(updateProfile({ password }))
  })

  if (!data || (data && data.force_password_change === 0)) return null

  return <div className='container'>
    <div className='row'>
      <div className='col-xs-12 col-md-4 col-md-pull-4'>
        <div className='text-xs-center'>
          <h1 className='Affiliate-PasswordChange__title'>يرجى تغيير كلمة مرورك</h1>
          <p className='Affiliate-PasswordChange__desc'>يرجى تغيير كلمة المرور لزيادة الآمان لحسابك</p>
          <input placeholder='كلمة المرور الجديدة'
            onChange={onPasswordChange}
            type='password' className='form-control Affiliate-PasswordChange__input' />
          <button onClick={onSubmit} disabled={!password || password.length < 6}
            className='btn btn-success p-x-2 Affiliate-PasswordChange__cta'>حفظ كلمة المرور</button>
        </div>
      </div>
    </div>
  </div>
}

export default PasswordChange
