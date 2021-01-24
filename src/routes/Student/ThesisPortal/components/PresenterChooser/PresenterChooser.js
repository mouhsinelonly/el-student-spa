// @flow
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from 'routes/Student/modules/thesis'
import Loading from 'components/Loading'
import { showModal } from 'modules/modals'
import './PresenterChooser.scss'
const { getTeachers } = actions

type MainPropertiesType = {
  finishAt: string
};

const PresenterChooser = ({ finishAt }: MainPropertiesType): React.Element<'div'> => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTeachers())
  }, [])
  const { teachers, loadingTeachers } = useSelector((state: Object): Object => state.thesis)

  const onSelect = (id: number) => {
    const teacher = teachers.find((t: Object): boolean => +t.id === +id)
    dispatch(showModal('yesno', {
      tag: 'THESIS_CHOOSE_TEACHER',
      teacherId: id,
      accept: 'نعم تأكيد الاختيار',
      refuse: 'لا٫ تراجع',
      body: <span style={{ lineHeight: '2' }}>
        هل تؤكد اختيار المشرف <b>{teacher.name}</b> ؟ <br /> لن تتمكن من العديل لاحقا
      </span>,
      title: 'تأكيد الاختيار'
    }, true, true))
  }

  return <div className='text-xs-center p-y-3 PresenterChooser'>
    <h5 className='font-weight-bold'>اختيار المشرف على البحث</h5>
    <b className='text-danger'>سيغلق الاختيار بتاريخ {finishAt}</b>
    <div className='text-xs-center'>
      <a target='_blank' download href='https://admin.el-css.edu.om/uploads/Modules/FileManager/Entities/FileManagerFile/files/000/000/083/original/دليل طلاب الدراسات العليا.pdf' className='btn btn-success m-t-2'>
        <i className='material-icons'
        style={{ display: 'inline-block', verticalAlign:'middle' }}>cloud_download</i> تحميل دليل طلاب الدراسات العليا
    </a>
    </div>
    {loadingTeachers
      ? <div style={{ height: '100%', width: '100%', display: 'table' }}
        className='text-xs-center'><Loading centered /></div>
      : null
    }
    <div className='row m-t-3 '>
      {teachers.map((teacher: Object): React.Element<'div'> => <div className='col-xs-12 col-md-6' key={teacher.id}>
        <TeacherBlock
          name={teacher.name}
          id={teacher.id}
          interests={teacher.interests}
          employer={teacher.employer}
          job={teacher.job}
          onClick={onSelect}
          cvFileUrl={teacher.cvFileUrl}
          photoUrl={teacher.photoUrl} />
      </div>)}
    </div>
  </div>
}

type PropertiesType = {
  job: string,
  employer: string,
  name: string,
  interests: string,
  id: number,
  onClick: Function,
  photoUrl: string,
  cvFileUrl: string
};

const TeacherBlock = ({ job, employer, id,
  name, photoUrl, interests, onClick, cvFileUrl }: PropertiesType): React.Element<'div'> => {

  const onSelect = (): Function => onClick(id)

  return <div className='my-panel-white bg-white shadow-1 m-b-3 PresenterChooser__item p-t-2'>
    <img src={photoUrl} alt={name} className='PresenterChooser__item-cover m-b-2' />
    <h6 className='PresenterChooser__item-name text-truncate'>{name}</h6>
    <p className='PresenterChooser__item-job font-helvetica'>{job}{employer ? `٫ ${employer}` : null}</p>
    <div className='PresenterChooser__item-interests text-xs-right p-a-2'>
      <h6>الاهتمامات العلمية</h6>
      <p dangerouslySetInnerHTML={{ __html:interests.replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
    </div>
    <div className='btn-group btn-group-justified' style={{ width: '100%' }} >
      <button onClick={onSelect} className='btn btn-success col-xs-6' style={{ borderRadius: 0 }}>اختيار كمشرف</button>
      <a href={cvFileUrl} target='_blank' rel='noopener noreferrer'
        className='btn btn-white col-xs-6' style={{ borderRadius: 0 }}>عرض السيرة الذاتية</a>
    </div>
    <div className='clearfix' />
  </div>
}

export default PresenterChooser
