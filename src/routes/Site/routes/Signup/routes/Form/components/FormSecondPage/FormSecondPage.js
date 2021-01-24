// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
import { scrollToPosition, CONSTANTS } from 'utils'
// import validation rules
import secondValidation from './secondValidation'

// import css
import '../Common.scss'
import './FormSecondPage.scss'
// import components
import MaterialInput from 'components/Form/MaterialInput'
import MaterialDate from 'components/Form/MaterialDate'
import MaterialRadio from 'components/Form/MaterialRadio'
import MaterialFile from 'components/Form/MaterialFile'
// form fields
export const fileName = 'photo'

type PropsType = {
  fields: Object,
  degreeType: string,
  handleSubmit: Function,
  submitFailed: boolean,
  invalid: boolean,
  files: Array<Object>,
  previousPage: Function,
  uploadFile: Function
};

export const fields = [
  'academystructure_specialty_id',
  'degreeType',
  'first_name',
  'affiliate_code',
  'second_name',
  'third_name',
  'fourth_name',
  'last_name',
  'first_name_latin',
  'second_name_latin',
  'third_name_latin',
  'fourth_name_latin',
  'last_name_latin',
  'birthday',
  'registration_type_id',
  'gender']

class FormSecondPage extends React.Component<PropsType> {
  componentDidMount () {
    scrollToPosition(0)
  }
  render (): React.Element<'form'> {
    const {
      fields: { first_name: firstName, degreeType, second_name, third_name, fourth_name, last_name,
        first_name_latin, second_name_latin, third_name_latin, fourth_name_latin, last_name_latin,
      birthday, gender, registration_type_id: typeId },
      handleSubmit,
      invalid,
      submitFailed
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className='p-signup-common__section'>
          <div className={`${degreeType.value === 'maj' ? 'hidden-xs-up' : ''} col-xs-12 col-md-6`}>
            <h6 className='p-signup-common__section__heading'>نوع التسجيل</h6>
            <div className='clearfix' />
            <MaterialRadio value='1' checked={typeId.value === '1'}
              label='دبلوم' data={typeId} />
            <MaterialRadio value='2' checked={typeId.value === '2'}
              label='بكالوريوس' data={typeId} />
            {typeId.touched && typeId.error &&
              <div className='p-signup-common__label-danger'>{typeId.error}</div>}
          </div>
          <div className='clearfix' />
          <div className='col-lg-12'>
            <h6 className='p-signup-common__section__heading'>إسمك بالعربية</h6>
            <ul className='c-signup-second-form__name-block'>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput label='الإسم الشخصي' data={firstName} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput label='الثاني' data={second_name} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput label='الثالث' data={third_name} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput label='الرابع' data={fourth_name} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput label='القبيلة' data={last_name} />
              </li>
            </ul>
          </div>
          <div className='clearfix' />
          <div className='col-lg-12'>
            <h6 className='p-signup-common__section__heading'>إسمك بالإنجليزية</h6>
            <ul className='c-signup-second-form__name-block'>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput lang='en' label='الإسم الشخصي' data={first_name_latin} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput lang='en' label='الثاني' data={second_name_latin} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput lang='en' label='الثالث' data={third_name_latin} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput lang='en' label='الرابع' data={fourth_name_latin} />
              </li>
              <li className='c-signup-second-form__name-block__item'>
                <MaterialInput lang='en' label='القبيلة' data={last_name_latin} />
              </li>
            </ul>
          </div>
          <div className='clearfix' />
          <div className='col-xs-12 col-md-6'>
            <MaterialDate label='تاريخ الميلاد' data={birthday} />
          </div>
          <div className='clearfix' />
          <div className='col-xs-12 col-md-6'>
            <h6 className='p-signup-common__section__heading'>الجنس</h6>
            <MaterialRadio value='m' checked={gender.value === 'm'} label='ذكر' data={gender} />
            <MaterialRadio value='f' checked={gender.value === 'f'} label='أنثى' data={gender} />
            {gender.touched && gender.error && <div className='p-signup-common__label-danger'>{gender.error}</div>}
          </div>
          <div className='clearfix' />
        </div>
        <section className='p-signup-common__section p-signup-common__is-gray'>
          <div className='col-xs-12 col-md-3 p-t-10'>
            <h6 className='m-t-1 p-signup-common__section__heading p-signup-common__is-inline'>
            الوثائق المطلوبة
            </h6>
          </div>
          <div className='col-xs-12 col-md-4'>
            <MaterialFile label='صورتك الشخصية'
              name={fileName}
              icon='upload-photo-small-gray'
              onDrop={this.uploadFile} />
          </div>
          <div className='col-xs-12 col-md-5'>
            {
              this.renderUploadedFiles()
            }
          </div>
        </section>
        <div className='p-signup-common__footer'>
          <div className='col-xs-12 text-xs-center'>
            <a onClick={this._previousPage} className='p-signup-common__goto-previous'>
                الرجوع للسابق
            </a>
            {submitFailed && invalid &&
              <div className='text-danger p-a-3'>
                <i className='material-icons'>warning</i> <br /> يوجد بيانات لم تقم بادخالها
              </div>}
            <button type='submit' className='p-signup-common__cta btn btn-success btn-lg p-x-3'>
                التالي
            </button>
          </div>
        </div>

      </form>
    )
  }
  _previousPage = () => {
    const { previousPage } = this.props
    previousPage()
  }
  uploadFile = (files: Object) => {
    const { uploadFile } = this.props

    uploadFile(files, fileName)
  }

  renderUploadedFiles = (): Array<Object> => {
    let { files } = this.props

    return files.filter((f: Object): boolean => f.type === fileName)
    .map((file: Object, i: number): React.Element<'div'> =>
      <div className='p-signup-common__thumb' key={i}><img src={file.preview} /></div>)
  }
}

export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: secondValidation,
  destroyOnUnmount: false
}, (state: Object): Object => {
  const degreeType = [1, 2, 3, 9, 10, 11].includes(+state.specialities.selectedID) ? 'bac' : 'maj'

  return ({
    initialValues: {
      affiliate_code: localStorage.getItem(CONSTANTS['AFFILIATE_CODE_LOCAL_STORAGE_KEY']),
      affiliate_registration_type: localStorage.getItem(CONSTANTS['AUTH_AFFILIATE_LOCAL_STORAGE_KEY'])
       ? 'manual'
       : 'link',
      academystructure_specialty_id: state.specialities.selectedID,
      degreeType }
  })
})(FormSecondPage)
