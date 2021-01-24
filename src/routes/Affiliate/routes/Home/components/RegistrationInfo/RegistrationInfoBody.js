// @flow
import React from 'react'
import moment from 'moment'
import useGetCountryName from 'hooks/useGetCountryName'

type PropsType = {
  specialty_type: string,
  specialty_name: string,
  first_name: string,
  second_name: string,
  third_name: string,
  last_name: string,
  fourth_name: string,
  first_name_latin: string,
  second_name_latin: string,
  third_name_latin: string,
  fourth_name_latin: string,
  last_name_latin: string,
  gender: string,
  birthday: string,
  birth_country_id: number,
  nationality_country_id: number
};

const RegistrationInfoBody = (props: PropsType): React.Element<'div'> => {
  const nationalityCountryName = useGetCountryName(props.nationality_country_id)
  const birthCountryName = useGetCountryName(props.birth_country_id)

  return (<div className='Affiliate-RegistrationInfo__body'>
    <h6 className='m-t-3'>البرنامج الدراسي</h6>
    <div className='row m-t-3'>
      <div className='col-xs-12 col-md-6'>
       البرنامج : <b>{ ((): string => {
         switch (props.specialty_type) {
           case 'dep':
             return 'دبلوم'
           case 'bac':
             return 'بكالوريوس'
           case 'maj':
             return 'ماجستير'
         }
       })() }</b>
      </div>
      <div className='col-xs-12 col-md-6'>
       التخصص : <b>{ props.specialty_name }</b>
      </div>
    </div>
    <hr className='m-y-2' />
    <h6>البيانات الشخصية (الاسم)</h6>
    <div className='row m-t-2'>
      <div className='col-xs-12 col-md-3'>
        <span>الأول :</span> <b>{props.first_name}</b>
      </div>
      <div className='col-xs-12 col-md-3'>
        <span>الثاني :</span> <b>{props.second_name}</b>
      </div>
      <div className='col-xs-12 col-md-3'>
        <span>الثالث :</span> <b>{props.third_name}</b>
      </div>
      <div className='col-xs-12 col-md-3'>
        <span>الرابع :</span> <b>{props.fourth_name}</b>
      </div>
      <div className='col-xs-12 col-md-3 m-t-2'>
        <span>القبيلة :</span> <b>{props.last_name}</b>
      </div>
    </div>
    <hr className='m-y-2' />
    <div className='row m-t-2' style={{ direction: 'ltr' }}>
      <div className='col-xs-12 col-md-3' style={{ float: 'left' }}>
        <span>First :</span> <b>{props.first_name_latin}</b>
      </div>
      <div className='col-xs-12 col-md-3' style={{ float: 'left' }}>
        <span>Second :</span> <b>{props.second_name_latin}</b>
      </div>
      <div className='col-xs-12 col-md-3' style={{ float: 'left' }}>
        <span>Third :</span> <b>{props.third_name_latin}</b>
      </div>
      <div className='col-xs-12 col-md-3' style={{ float: 'left' }}>
        <span>Fourth :</span> <b>{props.fourth_name_latin}</b>
      </div>
      <div className='col-xs-12 col-md-3 m-t-2' style={{ float: 'left' }}>
        <span>Tribe :</span> <b>{props.last_name_latin}</b>
      </div>
    </div>
    <hr className='m-y-2' />
    <div className='row m-t-2'>
      <div className='col-xs-12 col-md-3'>
        <span>الجنس :</span> <b>{props.gender === 'f' ? 'أنثى' : 'ذكر'}</b>
      </div>
      <div className='col-xs-12 col-md-6'>
        <span>تاريخ الميلاد :</span> <b>{moment(props.birthday).locale('en').format('YYYY-MM-DD')}</b>
      </div>
    </div>
    <hr className='m-y-2' />
    <div className='row m-t-2'>
      <div className='col-xs-12 col-md-3'>
        <span>الجنسية :</span> <b>{nationalityCountryName}</b>
      </div>
      <div className='col-xs-12 col-md-6'>
        <span>دولة الميلاد :</span> <b>{birthCountryName}</b>
      </div>
    </div>
    <hr className='m-y-2' />
  </div>)
}

export default RegistrationInfoBody
