// @flow
import React, { useCallback, useState, useEffect } from 'react'
import PointerClick from 'components/Svg/PointerClick'
import Assignment from 'components/Svg/Assignment'
import { setRegistrationQuery, resetRegistrations, getRegistrations } from 'routes/Affiliate/modules/affiliates'
import { useSelector, useDispatch } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { domOnlyProps } from 'utils'
import './SearchBar.scss'

const radioActive = (value: string = '', current: string = ''): string => value === current ? 'is-active' : ''
const formName = 'affiliate-filters'
type PropsType = {
  fields: Object,
  handleSubmit: Function
};
const fields = [
  'query',
  'registration_step_id',
  'nationality_country_id',
  'nationality_city_id',
  'created_from',
  'created_to',
  'signup_type']

const SearchBar = (props: PropsType): React.Element<'div'> => {
  const { fields: { query, signup_type: signupType,
    created_from: createdFrom,
    created_to: createdTo,
    registration_step_id: stepId,
    nationality_country_id: countryId },
    handleSubmit } = props

  const dispatch = useDispatch()
  const onSubmit = useCallback((values: Object) => {
    dispatch(resetRegistrations())
    dispatch(setRegistrationQuery({ ...values, page: 1, per_page: 10 }))
  })
  const [filtersVisible, setFiltersVisibility] = useState(false)
  const { data: countries } = useSelector((state: Object): Object => state.countries)
  const { registrations: { data, query: searchQuery }, steps: { data: stepsData } } =
    useSelector((state: Object): Object => state.affiliates)

  useEffect(() => {
    dispatch(getRegistrations())
  }, [searchQuery])

  const onFiltersClick = useCallback(() => {
    setFiltersVisibility(!filtersVisible)
    if (filtersVisible) {
      Object.keys(props.fields).filter((name: string): boolean => name !== 'query')
      .map((name: string) => {
        if (name === 'signup_type') {
          props.fields[name].onChange('all')
        } else {
          props.fields[name].onChange('')
        }
      })
    }
  })
  const totalFilters = Object.keys(props.fields).reduce((total: 0, field: Object): number =>
    total + (!['', 'all'].includes(props.fields[field].value) && field !== 'query' ? 1 : 0), 0)

  return (<form className='container m-t-3 Affiliate-SearchBar' onSubmit={handleSubmit(onSubmit)}>
    <div className={`row Affiliate-SearchBar__query`}>
      <div className='col-xs-12 m-b-2'>
        <h1 className='Affiliate-SearchBar__subscribers'>المسجلين ({!data || data.total})</h1>
      </div>
      <div className='col-xs-12 col-md-3'>
        <input type='text' className='Affiliate-SearchBar__form-control'
          placeholder='البحث عن طالب' {...domOnlyProps(query)} />
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2'>
        <div className='Affiliate-SearchBar__form-control is-action' onClick={onFiltersClick}>
          الفلاتر {totalFilters ? `(${totalFilters})` : ''}
        </div>
        <i className='material-icons'>{!filtersVisible ? 'filter_list' : 'cancel'}</i>
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2'>
        <button className='btn Affiliate-SearchBar__cta p-x-2'>بحث</button>
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2 pull-xs-left'>
        <Link to='/programmes' className='btn Affiliate-SearchBar__cta is-green p-x-2 btn-block'>
          تسجيل طالب جديد
        </Link>
      </div>
      <div className='clearfix' />
    </div>

    <div className={`row Affiliate-SearchBar__filters ${filtersVisible ? 'is-visible' : 'is-hidden'}`}>
      <div className='col-xs-12 col-md-3 col-lg-2'>
        <select className='Affiliate-SearchBar__form-control' {...domOnlyProps(stepId)}>
          <option value=''>المرحلة</option>
          { stepsData && stepsData.map((s: Object): React.Element<'option'> => <option value={s.id} key={s.id}>
            {s.name}
          </option>)
        }</select>
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2'>
        <select placeholder='الدولة' {...domOnlyProps(countryId)}
          className='Affiliate-SearchBar__form-control'>
          <option value=''>الدولة</option>
          {countries && countries.map((c: Object): React.Element<'option'> => <option value={c.value} key={c.value}>
            {c.text}
          </option>)}
        </select>
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2'>
        <select className='Affiliate-SearchBar__form-control hidden-xs-up'></select>
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2 text-xs-left'>
        <span className='Affiliate-SearchBar__label'>
          تاريخ التسجيل
        </span>
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2'>
        <input placeholder='من' className='Affiliate-SearchBar__form-control'
          {...domOnlyProps(createdFrom)} type='date' />
        <i className='material-icons'>calendar_today</i>
      </div>
      <div className='col-xs-12 col-md-3 col-lg-2'>
        <input placeholder='إلى' className='Affiliate-SearchBar__form-control'
          {...domOnlyProps(createdTo)} type='date' />
        <i className='material-icons'>calendar_today</i>
      </div>
      <div className='col-xs-12'>
        <span className='Affiliate-SearchBar__label'>
          نوع التسجيل
        </span>
      </div>
      <div className='col-xs-12 m-t-2'>
        <label htmlFor='all-affiliate' className={`Affiliate-SearchBar__radio 
          ${radioActive(signupType.value, 'all')}`}>
          <input type='radio' {...domOnlyProps(signupType)} id='all-affiliate' value='all' />
        الكل
        </label>
        <label htmlFor='link-affiliate' className={`Affiliate-SearchBar__radio 
           ${radioActive(signupType.value, 'link')} has-icon m-r-1`}>
          <input type='radio' {...domOnlyProps(signupType)} id='link-affiliate' value='link' />
          <PointerClick /> من الرابط
        </label>
        <label htmlFor='manual-affiliate' className={`Affiliate-SearchBar__radio 
           ${radioActive(signupType.value, 'manual')} has-icon m-r-1`}>
          <input type='radio' {...domOnlyProps(signupType)} id='manual-affiliate' value='manual' />
          <Assignment /> إدخال مباشر
        </label>
      </div>
    </div>
  </form>)
}

export default reduxForm({
  form: formName,              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false     // <------ preserve form data
})(SearchBar)
