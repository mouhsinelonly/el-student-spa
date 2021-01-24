// @flow
import React from 'react'
import '../LoginTabContent/LoginTabContent.scss'
import { reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import { domOnlyProps } from 'utils'

type PropsType = {
  fields: Object,
  handleSubmit: Function
};
const fields = [
  'bank_name',
  'name',
  'bank_country_id',
  'iban'
]

const BankTabContent = (props: PropsType): React.Element<'div'> => {
  const { data: countries } = useSelector((state: Object): Object => state.countries)
  const { fields:
    { bank_name: bankName, iban, bank_country_id: countryId, name },
    handleSubmit } = props
  return (<form
    onSubmit={handleSubmit}
    className='Affiliate-BankTabContent text-xs-center'>
    <p className='Affiliate-LoginTabContent__desc'>
      ستستخدم هذه البيانات لتحويل الأرباح بعد إنتهاء فترة الإنسحاب لدى الطلبة
    </p>
    <input type='text'
      {...domOnlyProps(name)}
      placeholder='الاسم الكامل'
      className='Affiliate-LoginTabContent__form-control m-t-1' />
    <div className='m-t-1 text-xs-right'>
      بيانات البنك
    </div>
    <input type='text'
      {...domOnlyProps(iban)}
      placeholder='رقم حساب البنك IBAN'
      className='Affiliate-LoginTabContent__form-control m-t-1' />
    <input type='text'
      {...domOnlyProps(bankName)}
      placeholder='اسم البنك بالانجليزية'
      className='Affiliate-LoginTabContent__form-control m-t-1' />
    <select type='text'
      placeholder='الدولة'
      {...domOnlyProps(countryId)}
      className='Affiliate-LoginTabContent__form-control m-t-1' >
      <option value=''>الدولة</option>
      {countries && countries.map((c: Object): React.Element<'option'> => <option value={c.value} key={c.value}>
        {c.text}
      </option>)}
    </select>
    <button className='btn btn-success m-t-2 Affiliate-LoginTabContent__cta p-x-2'>
      إعتماد بيانات البنك
    </button>
  </form>)
}

export default reduxForm({
  form: 'affiliate-settings-form-bank',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false     // <------ preserve form data
})(BankTabContent)
