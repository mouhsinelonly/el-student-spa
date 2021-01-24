// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
import { scrollToPosition } from 'utils'
// import validation rules
import seventhValidation from './seventhValidation'
// form fields
// import css
import '../Common.scss'
// import components
import MaterialRadio from 'components/Form/MaterialRadio'

export const fields = [
  'health_status',
  'health_disabled_type',
  'health_disabled_size'
]

type PropsType = {
  fields: Object,
  handleSubmit: Function,
  invalid: boolean,
  submitFailed: Function,
  previousPage: Function
};

class FormSeventhPage extends React.Component<PropsType> {
  componentDidUpdate (props: Object) {
    if (
      props.fields.health_status.value !==
        props.fields.health_status.value &&
      props.fields.health_status.value === 1
    ) {
      props.fields.health_disabled_type.onChange('')
      props.fields.health_disabled_size.onChange('')
    }
  }
  componentDidMount () {
    scrollToPosition(0)
  }
  render (): React.Element<'form'> {
    const {
      fields: { health_status: healthStatus, health_disabled_type: healthDisabledType,
        health_disabled_size: healthDisabledSize },
      handleSubmit,
      invalid,
      submitFailed
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className='p-signup-common__section'>
          <div className='row'>
            <div className='col-xs-12 col-md-5'>
              <h6 className='p-signup-common__section__heading'>
                الحالة الصحية
              </h6>
              <MaterialRadio
                value='1'
                checked={healthStatus.value === '1'}
                label='سليم صحيا و بدنيا'
                data={healthStatus}
              />
              <MaterialRadio
                value='0'
                checked={healthStatus.value === '0'}
                label='أعاني من إعاقة'
                data={healthStatus}
              />
              {healthStatus.touched &&
                healthStatus.error && (
                  <div className='p-signup-common__label-danger'>
                    {healthStatus.error}
                  </div>
                )}
            </div>

            {healthStatus.value === '0' && (
              <div className='col-xs-12 col-md-4'>
                <h6 className='p-signup-common__section__heading'>
                  نوع الإعاقة
                </h6>
                <MaterialRadio
                  value='mouvement'
                  checked={healthDisabledType.value === 'mouvement'}
                  label='حركية'
                  data={healthDisabledType}
                />
                <MaterialRadio
                  value='hearing'
                  checked={healthDisabledType.value === 'hearing'}
                  label='سمعية'
                  data={healthDisabledType}
                />
                <MaterialRadio
                  value='visual'
                  checked={healthDisabledType.value === 'visual'}
                  label='بصرية'
                  data={healthDisabledType}
                />
                {healthDisabledType.touched &&
                  healthDisabledType.error && (
                    <div className='p-signup-common__label-danger'>
                      {healthDisabledType.error}
                    </div>
                  )}
              </div>
            )}
            {healthStatus.value === '0' && (
              <div className='col-xs-12 col-md-3'>
                <h6 className='p-signup-common__section__heading'>
                  درجة الإعاقة
                </h6>
                <MaterialRadio
                  value='partial'
                  checked={healthDisabledSize.value === 'partial'}
                  label='جزئية'
                  data={healthDisabledSize}
                />
                <MaterialRadio
                  value='full'
                  checked={healthDisabledSize.value === 'full'}
                  label='كلية'
                  data={healthDisabledSize}
                />
                {healthDisabledSize.touched &&
                  healthDisabledSize.error && (
                    <div className='p-signup-common__label-danger'>
                      {healthDisabledSize.error}
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>

        <footer className='p-signup-common__footer'>
          <div className='col-xs-12 text-xs-center'>
            <a
              onClick={this._handlePreviousPage}
              className='p-signup-common__goto-previous'
            >
              الرجوع للسابق
            </a>
            {submitFailed &&
              invalid && (
                <div className='text-danger p-a-3'>
                  <i className='material-icons'>warning</i> <br />
                  يوجد بيانات لم تقم بادخالها
                </div>
              )}
            <button
              type='submit'
              className='p-signup-common__cta btn btn-success btn-lg p-x-3'
            >
              التالي
            </button>
          </div>
        </footer>
      </form>
    )
  }
  _handlePreviousPage = () => {
    const { previousPage } = this.props
    previousPage()
  }
}

export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: seventhValidation,
  destroyOnUnmount: false
})(FormSeventhPage)
