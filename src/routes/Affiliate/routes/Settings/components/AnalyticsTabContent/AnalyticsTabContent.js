// @flow
import React from 'react'
import '../LoginTabContent/LoginTabContent.scss'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import validate from './validation'

type PropsType = {
  fields: Object,
  handleSubmit: Function
};
const fields = [
  'ga_id'
]
const AnalyticsTabContent = (props: PropsType): React.Element<'div'> => {
  const { fields: { ga_id: gaId }, handleSubmit } = props

  return (<form
    onSubmit={handleSubmit}
    className='Affiliate-AnalyticsTabContent text-xs-center'>
    <h5>google analytics</h5>
    <p className='Affiliate-LoginTabContent__desc'>
      إذا كنت بحاجة إلى بيانات أكثر عن زوار رابطك الخاص يمكنك إضافة الرمز الخاص بحسابك على خدمة google analytics
    </p>
    <input type='text'
      {...domOnlyProps(gaId)}
      placeholder={gaId.value.length ? 'تعديل الرمز' : 'أدخل الرمز'}
      className='Affiliate-LoginTabContent__form-control m-t-1' />
    <button type='submit' className='btn btn-success m-t-2 Affiliate-LoginTabContent__cta p-x-2'>
      {gaId.value.length ? 'تعديل الرمز' : 'أدخل الرمز'}
    </button>
  </form>)
}

export default reduxForm({
  form: 'affiliate-settings-form-analytics',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,    // <------ preserve form data
  validate
})(AnalyticsTabContent)
