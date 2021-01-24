// @flow
import * as React from 'react'
import Loading from 'components/Loading'
import moment from 'moment'
import { dayNumberToString } from 'utils'
import './style.scss'

const specialtiesDepartments = [
  { specialty_id: 9, department_id: 50 },
  { specialty_id: 10, department_id: 58 },
  { specialty_id: 11, department_id: 66 }
]

type PropsType = {
  code: string,
  getSpecialties: Function,
  setSpecialty: Function,
  toggleEdit: Function,
  toggleChooseSpecialty: Function,
  specialties: Array<Object>,
  events: Array<Object>,
  loading: boolean,
  serverdate: string,
  chosenSpecialtyID: number,
  chooseSpecialtyVisible: boolean,
  editSpecialtyVisible: boolean,
  id: number
};

class ChooseSpecialty extends React.Component<PropsType> {
  componentDidMount () {
    const { getSpecialties } = this.props
    getSpecialties()
  }
  render (): React.Element<*> {
    const { specialties, loading, chosenSpecialtyID: chosenId, chooseSpecialtyVisible,
        toggleChooseSpecialty, editSpecialtyVisible, toggleEdit, events, serverdate } = this.props
    const momentServerTime = moment(serverdate)

    let changeSpecialtyEnabled = false

    const event = events.find((event: Object): boolean => event.category === 'specialty_change')

    if (event && moment(event.start_at).isBefore(momentServerTime) &&
        moment(event.finish_at).isAfter(momentServerTime)) {
      changeSpecialtyEnabled = true
    }
    if (!changeSpecialtyEnabled) {
      return <div />
    }
    let remainingDays = 0
    if (event) {
      remainingDays = moment(event.finish_at).diff(momentServerTime, 'days')
    }
    if (chosenId && !chooseSpecialtyVisible && editSpecialtyVisible) {
      return <ChooseSpecialtyMinimized
        loading={loading}
        remaining={remainingDays}
        name={specialties.reduce((name: string, s: Object): string => s.id === chosenId ? s.name : name, '')}
        toggle={toggleChooseSpecialty} />
    }

    if (!editSpecialtyVisible && chosenId) {
      return <ChooseSpecialtyDone onEdit={toggleEdit}
        loading={loading}
        remaining={remainingDays}
        name={specialties.reduce((name: string, s: Object): string => s.id === chosenId ? s.name : name, '')}
        code={specialties.reduce((code: string, s: Object): string => s.id === chosenId ? s.code : code, '')}
         />
    }

    return (
      <div className='choose-spcialty p-t-3 text-xs-center'>
        <div className='container'>
          <Loading hide={!loading} />
          <div className={`row choose-spcialty ${loading ? 'hidden-xs-up' : ''}`}>
            <div className='col-xs-12 col-md-8 col-md-pull-2'>
              <h1 className='choose-spcialty__title'>تأكيد المسار الدراسي</h1>
              <p className='m-y-3'>
                مع اقتراب اجتيازك بنهاية هذا الفصل للمواد الدراسية المشتركة بين التخصصات الثلاث،
                يتوجب عليك تأكيد مسارك الأكاديمي للفصول الدراسية القادمة
              </p>
              {specialties.map((s: Object): React.Element<typeof Specialty> => <Specialty
                key={s.id}
                onChoose={this._onChoose}
                chosenID={chosenId}
                {...s} />)}
            </div>
          </div>
        </div>
        <RemainingFooter remaining={remainingDays} />
      </div>
    )
  }
  _onChoose= (e: Object) => {
    const { setSpecialty } = this.props
    const specialtyId = parseInt(e.target.getAttribute('data-id'))
    const departmentId = specialtiesDepartments.reduce((id: number, s: Object): number =>
      s.specialty_id === specialtyId ? s.department_id : id, 0)
    setSpecialty(specialtyId, departmentId)
  }
}

type ChosenPropsType = {
  name: string,
  remaining: number,
  loading: boolean,
  toggle: Function
};

const ChooseSpecialtyMinimized = (props: ChosenPropsType): React.Element<'div'> => {
  return <div className='choose-spcialty p-y-2'>
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-md-pull-1 choose-spcialty__minimized'>
          اخترت <b className='text-white'> {props.name} </b>
          كمسار دراسي، باقي على انتهاء فترة الاختيار
          <b className='text-white'> {dayNumberToString(props.remaining)}</b>
        </div>
        <div className='col-xs-12 col-md-2 col-md-pull-1'>
          <button disabled={props.loading} onClick={props.toggle}
            className='btn btn-grey-outline pull-md-left border-radius-md'>اظهار</button>
        </div>
      </div>
    </div>
  </div>
}

type ChooseSpecialtyDoneType = {
  onEdit: Function,
  remaining: number,
  name: string,
  code: string
};

const ChooseSpecialtyDone = (props: ChooseSpecialtyDoneType): React.Element<'div'> => {
  return <div className='choose-spcialty p-t-3 text-xs-center'>
    <div className='container'>
      <div className='row choose-spcialty'>
        <div className='col-xs-12 col-md-8 col-md-pull-2'>
          <h1 className='choose-spcialty__title m-b-2'>تم اختيار المسار بنجاح</h1>
          <button className='btn btn-success m-x-1' style={{ width: 210 }}>{props.name}</button>
          <a className='btn btn-grey-outline m-x-1' style={{ width: 210 }}
            target='_blank'
            href={`https://admin.el-css.edu.om/uploads/${props.code}.pdf`}>اطلع على الخطة الدراسية</a>
          <p className='m-t-2'>
            يمكنك تعديل اختيارك قبل نهاية الوقت المخصص
          </p>
          <a className='choose-spcialty__sublink' onClick={props.onEdit}>
            <u>تعديل اختيارك</u>
          </a>
        </div>
      </div>
    </div>
    <RemainingFooter remaining={props.remaining} />
  </div>
}

type RemainingType = {
  remaining: number
};

const RemainingFooter = (props: RemainingType): React.Element<'div'> => {
  return <div style={{ borderTop: 'solid #344142 1px' }} className='m-t-2 p-y-1'>
    <div className='container'>
      <div className='row col-xs-12 text-xs-center'>
        <p className='m-b-0' style={{ color: '#899d9e' }}>باقي على انتهاء فترة الاختيار {dayNumberToString(props.remaining)}</p>
      </div>
    </div>
  </div>
}

type SpecialtyPropsType = {
  code: string,
  name: string,
  onChoose: Function,
  chosenID: number,
  id: number
};

const Specialty = (props: SpecialtyPropsType): React.Element<'div'> => {
  return <div className='col-xs-12 col-md-4'>
    <button
      data-id={props.id}
      onClick={props.onChoose}
      className={`btn ${props.chosenID === props.id ? 'btn-success' : 'btn-success-outline'}
        p-x-3 btn-md m-l-1 m-r-1 m-b-1`}>
      {props.name}
    </button>
    <a className='choose-spcialty__sublink'
      target='_blank'
      href={`https://admin.el-css.edu.om/uploads/${props.code}.pdf`}>الخطة الدراسية</a>
  </div>
}
export default ChooseSpecialty
