// @flow
import * as React from 'react'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import './style.scss'
import jwtDecode from 'jwt-decode'

type CenterChooserPropsType = {
  settings: Array<Object>,
  centers: Array<Object>,
  getExamCenters: Function,
  chooseExamCenter: Function,
  rechooseCenter: Function,
  toggleExamCenters: Function,
  centersvisible: boolean,
  loading: boolean,
  token: string,
  rechoosecenter: boolean
};

class CenterChooser extends React.Component<CenterChooserPropsType> {
  static defaultProps = {
    centers: []
  }
  componentDidMount () {
    const { getExamCenters } = this.props
    getExamCenters()
  }
  render (): React.Element<'div'> {
    const { centers, chooseExamCenter, centersvisible, rechoosecenter, loading, token, settings } = this.props

    const decoded = jwtDecode(token)

    let rechooseEnabled = false
    const rechooseCenterSetting = settings.find((s: Object): boolean => s.slug === 'exams_rechoose_centers')
    if (rechooseCenterSetting) {
      rechooseEnabled = Number(rechooseCenterSetting.value) === 1
    }

    if (!decoded.yearid) return <div />

    if (loading || !centers.length) return <Loading />
    const chosenCenter = centers.find((c: Object): boolean => c.isChosen)

    let langtitude = ''
    let latitude = ''
    if (chosenCenter && chosenCenter.classroom_lang && chosenCenter.classroom_lat) {
      langtitude = chosenCenter.classroom_lang
      latitude = chosenCenter.classroom_lat
    } else if (chosenCenter && chosenCenter.lang && chosenCenter.lat) {
      langtitude = chosenCenter.lang
      latitude = chosenCenter.lat
    }
    // console.log(langtitude, latitude)
    return (<div className='my-panel-white shadow-1 clearfix c-general-exam-row m-b-2'>
      <div className='col-xs-12 col-md-2 col-lg-1 center-chooser__icon c-general-exam-row__hc text-xs-center'>
        <Icon name='exam-final-medium' />
      </div>
      <div className='col-xs-12 col-md-6 col-lg-7 p-y-2 c-general-exam-row__hc'>
        <h5 className='p-t-2'>مركز امتحان نهاية الفصل الدراسي</h5>
      </div>
      <div className={`col-xs-12 col-md-4 col-lg-4 p-t-2 c-general-exam-row__hc
        ${(!chosenCenter || rechoosecenter) ? 'hidden-xs-up' : ''}`}>
        <div className='c-general-exam-row__l '>
        معلومات الاختبار
        </div>
        <div>
          <b>{chosenCenter && chosenCenter.lang && chosenCenter.name}</b>
          <div>{chosenCenter && chosenCenter.building_name &&
            <span>المبنى : <b>{chosenCenter.building_name}</b></span>}</div>
          <div>{chosenCenter && chosenCenter.classroom_name &&
            <span>القاعة : <b>{chosenCenter.classroom_name}</b></span>}</div>
        </div>
        <button onClick={this._toggleCentersVisibility}
          className='btn btn-light'>
          {rechooseEnabled ? 'عرض و تغيير' : 'عرض'}
        </button>
        <div style={{ fontSize: 11, paddingTop: 5 }}>
        <span className='text-danger' style={{ paddingLeft: 2 }}>تنبيه : </span>الموقع المبين على الخريطة هو موقع المركز و ليس موقع قاعة الاختبار
        </div>
      </div>
      <div className={`col-xs-12  col-md-4 col-lg-4 p-y-2 c-general-exam-row__hc
        ${(chosenCenter && !rechoosecenter) ? 'hidden-xs-up' : ''}`}>
        <div className='c-general-exam-row__l p-b-1'>
        المطلوب منك
        </div>
        <button onClick={this._toggleCentersVisibility}
          className='btn btn-success btn-block'>
          اختيار مركز الامتحان المناسب لك
        </button>
      </div>
      <div className='clearfix' />
      <div className={`${(!centersvisible || (chosenCenter && !rechoosecenter))
        ? 'hidden-xs-up' : ''} center-chooser__centers text-xs-center p-a-3`}>
        <h4 className='p-b-2'>اختر أحد المراكز</h4>
        {centers.filter((c: Object): boolean => c.visible).map((c: Object, i: number): React.Element<typeof CenterRow> =>
          <CenterRow chooseExamCenter={chooseExamCenter} {...c} key={i} />)}
        <div className='clearfix' />
      </div>
      <div className={`${(!chosenCenter || rechoosecenter || !centersvisible) ? 'hidden-xs-up' : ''}
      center-chooser__chosen`}>
        <div className='col-xs-12 col-md-6'>
          <div className='p-a-2'>
            <h5 className='p-t-3 p-b-2'>لقد إخترت</h5>
            <div className='my-panel-white shadow-1 p-a-2 '>
              <div><b>{chosenCenter && chosenCenter.name}</b></div>
              <div>{chosenCenter && chosenCenter.building_name &&
                <span>المبنى : <b>{chosenCenter.building_name}</b></span>}</div>
              <div>{chosenCenter && chosenCenter.classroom_name &&
                <span>القاعة : <b>{chosenCenter.classroom_name}</b></span>}</div>
            </div>
            <button
              onClick={this._rechooseCenter}
              disabled={!rechooseEnabled}
              className='btn btn-success shadow-1 btn-block m-t-2 p-y-1 center-chooser__edit'>
                اختيار مركز آخر
            </button>
          </div>
        </div>
        <div className={`col-xs-12 col-md-6 p-l-0`} style={{ lineHeight: 0 }}>
          {(langtitude && latitude) &&
          <iframe style={{ width: '100%', height: '400px', border: 0 }}
            src={`https://maps.google.com/maps?q=loc:${langtitude},${latitude}&z=14&output=embed&hl=ar`} />}
          {(!chosenCenter || !chosenCenter.lang)
            ? <div className='p-y-3'>سيتم اتاحة خريطة لموقع المركز خلال هذا الاسبوع.</div>
          : null}
        </div>
        <div className='clearfix' />
      </div>
    </div>)
  }
  _toggleCentersVisibility = () => {
    const { toggleExamCenters } = this.props
    toggleExamCenters()
  }
  _rechooseCenter = () => {
    const { rechooseCenter } = this.props
    rechooseCenter()
  }
}

type CenterRowPropsType = {
  chooseExamCenter: Function,
  id: number,
  isChosen: number,
  totalChosed: number,
  name: string,
  studentsLimit: number
};

class CenterRow extends React.Component<CenterRowPropsType> {
  render (): React.Element<'div'> {
    const { isChosen, totalChosed, name, studentsLimit } = this.props
    const availableSeats = studentsLimit - totalChosed
    const enabled = availableSeats > 0
    return (<div className='col-xs-12 col-md-6 col-lg-4'>
      <div className='shadow-2 my-panel-white m-b-2 center-chooser__item'>
        <div className={`center-chooser__item-text p-a-2 ${isChosen && 'is-active'}`}>
          <h5 className='center-chooser__item-title'>{name}</h5>
          <span className={`center-chooser__item-meta ${!enabled ? 'hidden-xs-up' : ''}`}>
            متاح {availableSeats} مقعد
          </span>
          <span className={`center-chooser__item-meta ${enabled ? 'hidden-xs-up' : ''}`}>
            حجزت جميع المقاعد
          </span>
        </div>
        <button disabled={!enabled || isChosen} onClick={this._onChoose}
          className={`btn btn-block ${isChosen ? 'btn-success' : 'btn-gray'} center-chooser__item-button`}>
          اختيار
        </button>
      </div>
    </div>)
  }

  _onChoose = () => {
    const { chooseExamCenter, id } = this.props
    chooseExamCenter(id)
  }
}

export default CenterChooser
