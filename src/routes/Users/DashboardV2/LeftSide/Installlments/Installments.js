// @flow
import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postInstallment, deleteInstallment } from 'routes/Users/modules/financials'

type PropertiesType = {
  degreeType: string,
  id: number,
  username: string
};

const Installlments = ({ degreeType, username, id }: PropertiesType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const selectReference = useRef()
  const { activeStudentInstallments, loadingInstallments, loading } =
  useSelector((state: Object): Object => state.user_financials)
  const { installments } = useSelector((state: Object): Object => state.user_profile)
  const onSubmit = () => {
    dispatch(postInstallment({ id, username, roleId: selectReference.current.value }))
  }
  const onDelete = () => {
    dispatch(deleteInstallment({ id }))
  }
  if (activeStudentInstallments.length === 0 && !loadingInstallments && installments.length > 0 && !loading) {
    return <div className='v2-ticket-student-subjects p-a-2'>
      <h6 className='v2-ticket-student-subjects__title is-active'>تقسيط الدفع</h6>
      <select ref={selectReference} className='form-control' style={{ height: 36 }}>
        {installments.filter((installment: Object): boolean =>
          installment.degree_type === degreeType).map((installment: Object): React.Element<'option'> =>
            <option key={installment.id} value={installment.id}>{installment.name}</option>)}
      </select>
      <button type='button' onClick={onSubmit} className='btn btn-success m-t-1'>حفظ</button>
    </div>
  }
  if (activeStudentInstallments.length === 0) {
    return null
  }
  const canDelete = activeStudentInstallments.findIndex((installment: Object): boolean => installment.paid === 1) < 0
  return <div className='v2-ticket-student-subjects p-y-2'>
    <h6 className='v2-ticket-student-subjects__title is-active p-x-1'>الاقساط</h6>
    <div className='col-xs-6 v2-ticket-student-subjects__item'>مبلغ القسط</div>
    <div className='col-xs-6 v2-ticket-student-subjects__item'>تاريخ الاستحقاق</div>
    <div className='clearfix m-b-1' />
    {activeStudentInstallments.map((installment: Object): React.Element<'div'> => <div
      key={installment.id} className='v2-ticket-student-subjects__item p-b-1 text-nowrap' >
      <div className='col-xs-6'>
        { !installment.amount ? 'المبلغ المتبقي' : installment.amount }
      </div>
      <div className='col-xs-6'>
        { installment.date }
        {installment.paid ? <i className='material-icons m-r-1 text-success'
          style={{ verticalAlign: 'middle', display: 'inline-block', fontSize: 14 }}>check_circle</i>
          : <i className='material-icons m-r-1 text-danger'
            style={{ verticalAlign: 'middle', display: 'inline-block', fontSize: 14 }}>watch_later</i>}
      </div>
    </div>)}
    {canDelete
      ? <button onClick={onDelete} className='btn btn-danger m-r-2 m-t-2 btn-sm'>الغاء التقسيط</button>
      : null }
    <div className='clearfix' />
  </div>
}

export default Installlments
