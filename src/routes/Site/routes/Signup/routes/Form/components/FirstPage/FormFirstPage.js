// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { scrollToPosition } from 'utils'
// import css
import './Common.scss'
import './FormFirstPage.scss'
import Icon from 'components/Icon'

export const requirements = [
  { icon: 'photo', text: 'الصورة الشخصية' },
  { icon: 'id', text: 'البطاقة المدنية' },
  { icon: 'certificat', text: 'شهادة العمل' },
  { icon: 'diplomat', text: 'شهادة الدراسة' },
  { icon: 'checklist', text: 'كشف الدرجات' },
  { icon: 'ring', text: 'عقد الزواج أو شهادة ميلاد الإبن', 'hint': 'لربات البيوت' }
]

type RequirementType = {
  icon: string,
  text: string,
  hint: string
};

const RequirementBox = (props: RequirementType): React.Element<'div'> =>
  (<div className='p-signup-form__requirement-box m-b-2'>
    <Icon name={`${props.icon}-gray`} />
    <h4 className='p-signup-form__requirement-box__title'>{props.text}</h4>
    <p className='p-signup-form__requirement-box__hint'>{props.hint}</p>
  </div>)

type FormType = {
  handleSubmit: Function
};
class FormFirstPage extends React.Component<FormType> {
  componentDidMount () {
    scrollToPosition(0)
  }
  render (): React.Element<'form'> {
    const {
      handleSubmit
    } = this.props

    return (
      <form onSubmit={handleSubmit} className=' text-xs-center'>
        <h1 className='p-signup-form__heading'>
        أولا  قبل البدأ
        </h1>
        <p className='p-signup-form__hint'>
        ينبغي توفير الوثائق التالية، حيث ستقوم بكتابة المعلومات منها بدقة. و رفعها لنا إلكترونيا
        </p>
        <section className={'p-signup-common__section' + ' m-t-3 ' + 'is-gray'}>
          <div className='col-xs-12 col-md-10 col-md-pull-1'>
            {requirements.map((r: Object): React.Element<typeof RequirementBox> =>
              <RequirementBox key={r.icon} {...r} />)}
          </div>
          <div className='clearfix' />
        </section>
        <footer className='p-signup-form__footer'>
          <button type='submit' className={'p-signup-common__cta' + ' btn btn-success btn-lg'}>
          إستمرار
          </button>
        </footer>
      </form>)
  }
}

FormFirstPage.propTypes = {
  // fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'signup',              // <------ same form name
  fields: [],                      // <------ only fields on this page
  destroyOnUnmount: false     // <------ preserve form data
})(FormFirstPage)
