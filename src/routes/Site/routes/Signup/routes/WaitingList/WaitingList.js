// @flow
import * as React from 'react'
import './WaitingList.scss'
import { reduxForm } from 'redux-form'
import MaterialInput from 'components/Form/MaterialInput'
import validate from './validation'
import { Translate } from 'react-localize-redux'

type PropsType = {
  handleSubmit: Function,
  onSubmit: Function,
  fields: Object
};

export const fields = [
  'name',
  'email',
  'mobile',
  'specialty_id'
]

const WaitingList = (props: Object): React.Element<'div'> => {
  return (
    props.sent ? <div className='container p-WaitingList__container'>
      <div className='row'>
        <div className='col-xs-12 p-t-3 col-md-4 col-md-pull-4 col-lg-6 col-lg-pull-3'>
          <WaitingListSuccess />
        </div>
      </div>
    </div> : <WaitingListForm onSubmit={props.addWaitingList}
      initialValues={{ specialty_id: +props.params.id }} />
  )
}
WaitingList.defaultProps = {
  sent: false
}
const WaitingListForm = reduxForm({
  form: 'signup',
  fields: fields,
  validate,
  destroyOnUnmount: false
})((props: PropsType): React.Element<'form'> => {
  return (<form className='p-WaitingList__container' onSubmit={props.handleSubmit}>
    <Translate>
      {({ translate, activeLanguage }: Object): React.Element<*> => (
        <div>
          <div className='container text-xs-center p-t-3'>
            <h3 className='font-weight-bold'>
              <Translate id='waiting_page.signup_waiting_list' />
            </h3>
            <div className='row'>
              <div className='col-md-4 col-md-pull-4 col-xs-12 p-t-3'>
                <p><Translate id='waiting_page.description' /></p>
                <div className='p-t-3'>
                  <MaterialInput label={translate('waiting_page.name')} data={props.fields.name} />
                </div>
                <div>
                  <MaterialInput label={translate('waiting_page.email')} data={props.fields.email} />
                </div>
                <div>
                  <MaterialInput label={translate('waiting_page.mobile')} data={props.fields.mobile} />
                </div>
                <div className='p-t-2'>
                  <button type='submit' className='btn btn-success p-x-3'>
                    <Translate id='waiting_page.singup' />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <HoTowStudy ltr={activeLanguage && activeLanguage.code !== 'ar'} />
        </div>
    )}
    </Translate>
  </form>)
})

const WaitingListSuccess = (): React.Element<'div'> => <div className='WaitingListSuccess
shadow-1 my-panel-white p-a-3 text-xs-center'>
  <i className='material-icons WaitingListSuccess__icon'>check_circle</i>
  <h6 className='p-t-3 p-b-2 WaitingListSuccess__title'>
    <Translate id='waiting_page.successfull_signup' />
  </h6>
  <p>
    <Translate id='waiting_page.successfull_signup_desc' />
  </p>
</div>

const HoTowStudy = (props: Object): React.Element<'a'> => <a
  className={`p-WaitingList__howto shadow-2 ${props.ltr ? 'is-ltr' : ''}`}
  href='//www.youtube.com/watch?v=8BLUsjGVeT8' target='_blank'>
  <i className='material-icons'>play_circle_filled</i>
  <Translate id='waiting_page.know_how_to' />
</a>
export default WaitingList
