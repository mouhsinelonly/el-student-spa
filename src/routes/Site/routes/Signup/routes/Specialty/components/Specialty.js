// @flow
import * as React from 'react'
// import css
import './Specialty.scss'
// import components
import TermBlock from './TermBlock'
import DotNav from 'components/DotNav'
import Loading from 'components/Loading'
import { Link } from 'react-router'
import { arabicNumberToPosition } from 'utils'
import { Translate } from 'react-localize-redux'

type PropType = {
  period: Object,
  selectedID: number,
  specialty: Object,
  selectRegistrationSpecialty: Function,
  params: Object,
  setActiveDepartment: Function,
  activeDepartment: number
};
class Specialty extends React.Component<PropType> {
  static defaultProps = {
    selectRegistrationSpecialty: () => {},
    selectedID: 0,
    specialty: { name: '', hours: 0, years: 0, terms: 0, description: '', departments: [] }
  }
  componentDidMount () {
    const { selectRegistrationSpecialty, params } = this.props

    selectRegistrationSpecialty(params.specialtyID)
  }

  componentDidUpdate () {
    const { selectedID, selectRegistrationSpecialty, params } = this.props
    if (selectedID !== params.id) {
      selectRegistrationSpecialty(params.specialtyID)
    }
  }

  render (): React.Element<'div'> {
    const { specialty, specialty: { name, years, terms, hours,
      departments,
      description,
      description_eng,
      description_fr,
      name_eng,
      type,
      name_fr,
      id },
    setActiveDepartment, activeDepartment, period } = this.props
    if (!name) return <div className='text-xs-center signup-specialty-page__loading'><Loading /></div>

    const langs = {
      name: { ar: name, en: name_eng, fr: name_fr },
      description: { ar: description, en: description_eng, fr: description_fr }
    }

    return (
      <div className='signup-specialty-page__container'>
        <Translate>
          {({ activeLanguage }: Object): React.Element<'div'> => (
            <div className=' container' >
              <h1 className='signup-specialty-page__heading text-xs-center'>
                {activeLanguage ? langs.name[activeLanguage.code] : name }
              </h1>
              <h6 className='text-xs-center'>
                {years} <Translate id='global.years' /> ~ {terms} <Translate id='global.semesters' />
                ~
                <Translate id='global.n_hours' data={{ hours }} />
              </h6>
              <div className='col-xs-12 col-md-8 col-md-pull-2'>
                <div className='signup-specialty-page__description'
                  dangerouslySetInnerHTML={{ __html:
                    (activeLanguage ? langs.description[activeLanguage.code] : description)
                    .replace(/\n/g, '<br />') }} />
              </div>
            </div>
            )}
        </Translate>
        {/* <DepartmentsSlider2
        activeDepartment={activeDepartment}
        setActiveDepartment={setActiveDepartment} specialty={specialty}/> */}
        <DepartmentsSlider activeDepartment={activeDepartment}
          setActiveDepartment={setActiveDepartment}
          specialty={specialty} />
        <Translate>
          {({ activeLanguage }: Object): React.Element<'div'> => (
            <div className='text-xs-center'>
              <button className={`btn signup-specialty-page__btn-slider-nav`}
                onClick={this._setPreviousDepartment}
                disabled={activeDepartment === 0}>
                <i className={`icon
                  ${activeLanguage && activeLanguage.code === 'ar'
                  ? 'icon-arrow-right-small-gray' : 'icon-arrow-left-small-gray'}`} />
              </button>
              <button className={`btn signup-specialty-page__btn-slider-nav`}
                onClick={this._setNextDepartment}
                disabled={activeDepartment === departments.length - 1}>
                <i className={`icon
                  ${activeLanguage && activeLanguage.code === 'ar'
                  ? 'icon-arrow-left-small-gray' : 'icon-arrow-right-small-gray'}`} />
              </button>
            </div>
          )}
        </Translate>
        <div className={`${type !== 'maj' ? 'hidden-xs-up' : ''}`}>
          <div className='row text-xs-center'>
            <h2 className='hidden-xs-up font-weight-bold p-y-3'>
              إجمالي الرسوم
            </h2>
            <h4 className='signup-specialty-page__price-title m-t-2'>
              <p>
                يضاف لكل فصل <span className='font-weight-bold'>125 ريال</span> رسوم إدارية
              </p>
            </h4>
          </div>
        </div>
        <div className='container hidden-xs-up'>
          <div className='row text-xs-center'>
            <h1 className='font-weight-bold p-y-3'>
              <Translate id='global.study_fees' />
            </h1>
            <h4 className='signup-specialty-page__price-title'>
              <p>
                <Translate id='global.only_15_rials' />
              </p>
            </h4>
            <small><p>ملاحظة : يتم الدفع بداية كل فصل دراسي منفصل، تقريبا 255 ريال</p></small>
            {period && period.id ? <Link to={`programmes/form/${id}`}
              className={`btn p-y-2 p-x-2 btn-success btn-lg signup-specialty-page__cta-button`}>
              قدم طلبك الآن في البرنامج
            </Link> : null}
          </div>
        </div>
      </div>
    )
  }

  _setNextDepartment = () => {
    const { activeDepartment, setActiveDepartment } = this.props
    setActiveDepartment(activeDepartment + 1)
  }
  _setPreviousDepartment = () => {
    const { activeDepartment, setActiveDepartment } = this.props
    setActiveDepartment(activeDepartment - 1)
  }
}

type SliderType = {
  specialty: Object,
  setActiveDepartment: Function,
  activeDepartment: number
};

class DepartmentsSlider extends React.Component<SliderType> {
  componentDidMount () {
    let { setActiveDepartment } = this.props
    setActiveDepartment(0)
  }

  render (): React.Element<'div'> {
    const { activeDepartment, specialty: { departments }, setActiveDepartment } = this.props

    if (!departments) return <Loading />

    return (<div style={{ overflow: 'hidden' }}>
      <div className='container' >
        <p className='text-xs-center'>
          <Translate id='global.study_plan' />
        </p>
        <h1 className={'text-xs-center'}>
          <b>
            <Translate>
              { ({ activeLanguage, translate }: Object): Function =>
              translate('global.the_n_semester', {
                number: arabicNumberToPosition(activeDepartment + 1, activeLanguage ? activeLanguage.code : 'ar') }) }
            </Translate>
          </b>
        </h1>
        <DotNav circular total={departments.length} active={activeDepartment} setActive={setActiveDepartment} />
        <div className='p-y-3 col-xs-12 col-md-10 col-md-pull-1 text-xs-center' style={{ position: 'relative' }}>
          <div className='col-xs-12 col-md-2 text-xs-left hidden-sm-down'>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 5000 }}>
              {
                this.renderRightDepartments()
              }
            </div>
          </div>
          <div className='col-xs-12 col-md-8 signup-specialty-page__slide__center' >
            {this.renderActiveDepartments()}
          </div>
          <div className='col-xs-12 col-md-2 text-xs-right hidden-sm-down'>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 5000 }}>
              {
                this.renderLeftDepartments()
              }
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

  renderRightDepartments (): Array<*> {
    const { specialty: { departments }, activeDepartment } = this.props
    if (!departments) return []
    return departments.map((dep: Object, i: number): React.Element<*> =>
      i < activeDepartment ? <TermBlock right key={i} {...dep} /> : null)
  }

  renderLeftDepartments () {
    const { specialty: { departments }, activeDepartment } = this.props
    if (!departments) return null
    return departments.map((dep, i) => i > activeDepartment ? <TermBlock left key={i} {...dep} /> : null)
  }

  renderActiveDepartments () {
    const { specialty: { departments }, activeDepartment } = this.props
    if (!departments) return null
    return departments.map((dep, i) => i === activeDepartment ? <TermBlock centered key={i} {...dep} /> : null)
  }

  renderDepartments () {
    const { specialty: { departments } } = this.props
    if (!departments) return null
    return departments.map((dep, i) => i < 3
      ? <div className='col-xs-12 col-md-4' key={i} ><TermBlock {...dep} /></div>
      : null)
  }
}

export default Specialty
