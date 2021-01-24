// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import requireGuest from 'components/GuestComponent'
import { browserHistory } from 'react-router'

// import pages components
import FormFirstPage from './FirstPage'
import FormSecondPage from './FormSecondPage/'
import FormThirdPage from './FormThirdPage'
import FormFourthPage from './FormFourthPage'
import FormFifthPage from './FormFifthPage'
import FormSixthPage from './FormSixthPage'
import FormSeventhPage from './FormSeventhPage'
import FormEighthPage from './FormEighthPage'
import FormFinalPage from './FormFinalPage'
import Loading from 'components/Loading'
// import css
import './Common.scss'
// import components
import DotNav from 'components/DotNav'

const requirements: Array<string> = [
  'بياناتك الشخصية',
  'الجنسية',
  'الإقامة و التواصل',
  'المؤهلات الدراسية',
  'المعلومات الإجتماعية',
  'الحالة الصحية',
  'المهارات']

type PropsType = {
  getRegistrationPeriod: Function,
  sendRegistrationForm: Function,
  setActivePage: Function,
  active: number,
  selectedID: number,
  loading: boolean,
  errors: Object,
  periods: Array<Object>,
  files: Array<Object>
};

class Form extends React.PureComponent<PropsType> {
  componentDidMount () {
    const { getRegistrationPeriod, selectedID } = this.props
    getRegistrationPeriod()
    if (!selectedID) {
      browserHistory.push({ pathname: '/programmes' })
    }
  }

  nextPage = () => {
    this.props.setActivePage(this.props.active + 1)
    this._scrollToPosition()
  }

  previousPage = () => {
    this.props.setActivePage(this.props.active - 1)
    this._scrollToPosition()
  }
  _scrollToPosition = () => {
    // $('html, body').animate({ scrollTop: $(this.refs['formParent']).offset().top - 100 }, 200)
  }
  render (): React.Element<'div'> {
    const { periods, active, loading, errors } = this.props
    const period = periods[0]

    if (typeof period === 'undefined') return <div />

    return (
      <div className='p-signup-common__container' >
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1'>
              <FormHeader active={active} />
              {!loading ? <div className='p-signup-common__panel' ref='formParent'>
                {active === 1 && <FormFirstPage onSubmit={this.nextPage} />}

                {active === 2 && <FormSecondPage previousPage={this.previousPage}
                  onSubmit={this.nextPage} />}
                {active === 3 && <FormThirdPage previousPage={this.previousPage}
                  onSubmit={this.nextPage} />}
                {active === 4 && <FormFourthPage previousPage={this.previousPage}
                  onSubmit={this.nextPage} />}
                {active === 5 && <FormFifthPage previousPage={this.previousPage}
                  onSubmit={this.nextPage} />}
                {active === 6 && <FormSixthPage previousPage={this.previousPage}
                  onSubmit={this.nextPage} />}
                {active === 7 && <FormSeventhPage previousPage={this.previousPage}
                  onSubmit={this.nextPage} />}
                {active === 8 && <FormEighthPage previousPage={this.previousPage}
                  onSubmit={this.nextPage} />}
                {active === 9 && <FormFinalPage reserrors={errors} previousPage={this.previousPage}
                  onSubmit={this.handleSubmit} />}
              </div> : <Loading />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSubmit = (fields: Object) => {
    const { files, sendRegistrationForm } = this.props
    sendRegistrationForm(fields, files)
  }
}

export const FormHeader = (props: Object): Object => (
  <div >
    {props.active > 1 && <h1 className='text-xs-center p-b-0 m-b-0 p-signup-common__heading'>
      {props.active === 9 ? 'أحسنت ! خطوة أخيرة' : 'طلب التسجيل'}
    </h1>}
    {props.active > 1 && <DotNav steps total={7} active={props.active - 2} />}
    {props.active > 1 && <ul className='p-signup-common__form-headings'>
      {requirements.map((t: string, i: number): React.Element<'li'> =>
        <li key={i}
          className={`p-signup-common__form-headings__item text-xs-center ${(i === 6 || i === 1)
            ? 'p-signup-common__small-width' : ''} ${(props.active - 2) > i ? 'p-signup-common__is-done' : ''}
          ${(props.active - 2) === i ? 'p-signup-common__is-active' : ''}`}>
          {(props.active - 2) > i
        ? <i className='icon icon-checkmark-outline-medium-green' />
        : <button className='p-signup-common__form-headings__item__next-check'>{i + 1}</button>}
          <h2>{t}</h2>
        </li>)}
    </ul>}
  </div>
  )

FormHeader.propTypes = {
  active: PropTypes.number
}

export default requireGuest(Form)
