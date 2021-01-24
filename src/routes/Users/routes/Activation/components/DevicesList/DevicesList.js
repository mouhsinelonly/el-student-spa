// @flow
import React, { useCallback, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { socketActivateExamAppDevice,
   socketInActivateExamAppDevice, activateDomainDevices } from 'routes/Users/modules/users'
const DevicesList = (): React.Node => {
  const [ selectedDomain, setSelectedDomain ] = useState('')
  const dispatch = useDispatch()
  const { examAppDevices, profile: { id } } = useSelector((state: Object): Array<Object> => state.user_profile)
  const _onActivate = useCallback((e: Object) => {
    dispatch(socketActivateExamAppDevice({
      id: e.target.dataset.id,
      ips: e.target.dataset.ips,
      domain: e.target.dataset.domain,
      machinename: e.target.dataset.machinename,
      username: e.target.dataset.username,
      password: e.target.dataset.password
    }))
  }, [])

  const _onInactivate = useCallback((e: Object) => {
    dispatch(socketInActivateExamAppDevice({
      id: e.target.dataset.id,
      ips: e.target.dataset.ips,
      domain: e.target.dataset.domain,
      machinename: e.target.dataset.machinename,
      username: e.target.dataset.username,
      password: e.target.dataset.password
    }))
  }, [])
  const _activateDomain = useCallback(() => {
    dispatch(activateDomainDevices(selectedDomain))
  }, [selectedDomain])

  const _setDomain = useCallback((e: Object) => {
    setSelectedDomain(e.target.dataset.domain)
  }, [])
  const checkedCount = useMemo((): number => {
    return examAppDevices.reduce((total: number, d: Object): number =>
    d.domain === selectedDomain ? total + 1 : total, 0)
  }, [selectedDomain, examAppDevices])

  if (![1, 30, 20].includes(id)) {
    return <div className='text-xs-center p-a-3'>YOU DO NOT HAVE THE PERMISSION</div>
  }
  return (<div className='container m-t-3'>
    <div className='row='>
      <table className='table ExamActivation__table'>
        <thead>
          <tr>
            <th>الدومين</th>
            <th>كلمة المرور</th>
            <th>اسم الجهاز</th>
            <th>المستخدم</th>
            <th>المعرف</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {examAppDevices.map((d: Object, i: number): React.Node => (<tr
            className={`${selectedDomain !== d.domain ? '' : 'is-active'}`} key={i}>
            <td data-domain={d.domain} className={`${selectedDomain !== d.domain ? 'can-check' : 'is-checked'}`}
              onClick={_setDomain}>
              {d.domain}
              {selectedDomain === d.domain && <i className='material-icons'>check_circle</i>}
            </td>
            <td className='font-weight-bold'>{d.password}</td>
            <td>{d.machinename}</td>
            <td>{d.username}</td>
            <td><span>{d.id}</span></td>
            <td>
              <button
                data-id={d.id}
                data-ips={d.ips}
                data-domain={d.domain}
                data-machinename={d.machinename}
                data-username={d.username}
                data-password={d.password}
                onClick={_onInactivate}
                className={`${selectedDomain === d.domain ? 'hidden-xs-up' : ''} shadow-1 btn btn-dark-gray`}
                style={{ padding:'4px 10px 0' }}>
                <i className='material-icons' style={{ pointerEvents: 'none' }}>close</i>
              </button>
              <button onClick={_onActivate}
                data-id={d.id}
                data-ips={d.ips}
                data-domain={d.domain}
                data-machinename={d.machinename}
                data-username={d.username}
                data-password={d.password}
                className={`${selectedDomain === d.domain ? 'hidden-xs-up' : ''} shadow-1 btn btn-success 
                m-r-1 p-x-2 font-weight-light`}>تفعيل</button>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
    {checkedCount ? <div className='ExamActivation__bulk'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
          تم تحديد {checkedCount} جهاز
            <button className='btn btn-success pull-xs-left p-x-3 m-r-2' onClick={_activateDomain}>تفعيل الكل</button>
            <button className='btn btn-white pull-xs-left p-x-2' onClick={setSelectedDomain}>تراجع</button>
          </div>
        </div>
      </div>
    </div> : null }
  </div>)
}

export default DevicesList
