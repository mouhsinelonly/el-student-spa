// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
// import validation rules
import { scrollToPosition } from 'utils'
import fifthValidation from './fifthValidation'
// import components
import MaterialInput from 'components/Form/MaterialInput'
import MaterialFile from 'components/Form/MaterialFile'
import MaterialRadio from 'components/Form/MaterialRadio'
import Select from 'components/Form/Select'
// import css
import './FormFifthPage.scss'
import '../Common.scss'
// form fields
export const fileName = 'certificate'
export const fileName2 = 'transcript'

export const highschool = [
  { value: 'ninth_grade', text: 'الصف التاسع/الصف العاشر/الصف الحادي عشر' },
  { value: 'high_school', text: 'الثانوية العامة الدبلوم العام' },
  { value: 'high_school_equal', text: 'شهادة معادلة للثانوية' }
]

export const names = [
  { value: 'graduate', text: 'إجازة / بكالوريوس' },
  { value: 'majester', text: 'ماجستير' },
  { value: 'doctorat', text: 'دكتوراه' }
]

let year = new Date().getFullYear()
export const years = Array.from(Array(80).keys()).map((y: number): Object => ({ value: year - y, text: year - y }))

export const fields = [
  'degrees[].degree_name',
  'degrees[].degree_speciality',
  'degrees[].degree_institution',
  'degrees[].degree_graduation_year',
  'degrees[].degree_score',
  'degrees[].degree_country_id',
  'degreeType',
  'speciality_experience'
]

type PropsType = {
  fields: Object,
  handleSubmit: Function,
  uploadFile: Function,
  countries: Array<Object>,
  files: Array<Object>,
  invalid: boolean,
  submitFailed: boolean,
  previousPage: Function
};

class FormFifthPage extends React.Component<PropsType> {
  static defaultProps = {
    countries: []
  }
  componentDidMount () {
    const { fields: { degrees } } = this.props
    if (!degrees.length) {
      degrees.addField()
    }
    scrollToPosition(0)
  }
  render (): React.Element<'form'> {
    const {
      fields: { degrees, speciality_experience: experience, degreeType },
      handleSubmit,
      countries,
      invalid,
      submitFailed,
      previousPage
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div className='p-signup-common__section'>
          <div className='row text-xs-center'>
            <h6 className='p-signup-common__section__heading'>هل سبق لك أن درست و أنهيت بعض فصول هذا التخصص</h6>
            <MaterialRadio value='0' checked={experience.value === '0'}
              label='لا أول مرة أدرسه' data={experience} />
            <MaterialRadio value='1' checked={experience.value === '1'}
              label='نعم، درست و أنهيت بعضا منه' data={experience} />
            {experience.touched && experience.error && <div className='p-signup-common__label-danger'>
              {experience.error}
            </div>}
          </div>
        </div>
        {degrees.map((degree: Object, index: number): React.Element<'div'> =>
                (<div key={index}>
                  <div className='p-signup-common__section'>
                    <div className={`row`} >
                      <div className='c-form-fifth-page__degrees-container p-t-2 m-t-2'>
                        <h6 className='p-signup-common__section__heading'>
                          {index === 0 ? (degreeType.value === 'bac')
                          ? 'بيانات الشهادة الثانوية أو ما يعادلها'
                          : 'بيانات شهادة البكالوريوس' : 'شهادة أخرى'}
                        </h6>
                        <div className='col-xs-12 col-md-4 col-lg-3'>
                          <Select label='نوع الشهادة'
                            data={degree.degree_name}
                            options={(index === 0 && degreeType.value !== 'maj') ? highschool : names} />
                        </div>
                        <div className='col-xs-12 col-md-4 col-lg-3'>
                          <Select label='الدولة التي أخذت منها' data={degree.degree_country_id} options={countries} />
                        </div>

                        <div className='col-xs-12 col-md-4 col-lg-3'>
                          <MaterialInput label='التخصص الدراسي' data={degree.degree_speciality} />
                        </div>
                        <div className='clearfix' />
                        <div className='col-xs-12 col-md-4 col-lg-3'>
                          <MaterialInput label='إسم المؤسسة' data={degree.degree_institution} />
                        </div>
                        <div className='col-xs-12 col-md-4 col-lg-3'>
                          <Select label='سنة التخرج' data={degree.degree_graduation_year} options={years} />
                        </div>
                        <div className='col-xs-12 col-md-4 col-lg-3'>
                          <MaterialInput label={index === 0 ? 'النسبة المئوية' : 'المعدل'}
                            index
                            data={degree.degree_score} />
                        </div>
                        {index > 0 && <button className='c-form-fifth-page__degrees-container__remove'
                          onClick={(): Function => degrees.removeField(index)}>&times; حذف</button> }
                      </div>
                    </div>
                  </div>
                  <section className='p-signup-common__section is-gray'>
                    <div className='col-xs-12 col-md-3 p-t-10'>
                      <h6 className='m-t-1 p-signup-common__section__heading is-inline'>
                      الوثائق المطلوبة
                      </h6>
                    </div>
                    <div className='col-xs-12 col-md-4'>
                      <MaterialFile icon='diplomat-gray-small'
                        label={index === 0 ? (degreeType.value === 'bac')
                          ? 'شهادة الثانوية'
                          : 'صورة الشهادة' : 'صورة الشهادة'}
                        name={fileName}
                        onDrop={(files: Array<Object>) => this.uploadFile(files, index)} />
                    </div>
                    <div className='col-xs-12 col-md-4'>
                      <MaterialFile icon='checklist-gray-small'
                        label='كشف الدرجات'
                        name={fileName2}
                        onDrop={(files: Array<Object>) => this.uploadFile2(files, index)} />
                    </div>
                    <div className='col-xs-12 col-md-9 col-md-pull-3 p-t-2'>
                      { this.renderUploadedFiles(index) }
                    </div>
                  </section>
                </div>))}

        <div className='container p-b-3'>
          <div className='row'>
            <div className='col-xs-12'>
              {degrees.length < 5 && (<button type='button'
                onClick={(): Function => degrees.addField()}
                className='btn btn-success btn-lg btn-round m-t-3 p-r-3 p-l-1 p-signup-common__add-degree'>
                <span className='p-signup-common__add-degree__icon'>+</span> إضافة شهادة أخرى
                </button>)}
            </div>
          </div>
        </div>

        <footer className='p-signup-common__footer'>
          <div className='col-xs-12 text-xs-center'>
            <a onClick={(): Function => previousPage()} className='p-signup-common__goto-previous'>
                الرجوع للسابق
            </a>
            { submitFailed && invalid &&
              <div className='text-danger p-a-3'>
                <i className='material-icons'>warning</i> <br />
                يوجد بيانات لم تقم بادخالها</div>}
            <button type='submit' className='p-signup-common__cta btn btn-success btn-lg p-x-3'>
                التالي
            </button>
          </div>
        </footer>
      </form>
    )
  }

  uploadFile = (files: Array<Object>, index: number = 0) => {
    const { uploadFile } = this.props

    uploadFile(files, fileName, index)
  }

  uploadFile2 = (files: Array<Object>, index: number = 0) => {
    const { uploadFile } = this.props

    uploadFile(files, fileName2, index)
  }

  renderUploadedFiles (index: number = 0): Array<Object> {
    const { files } = this.props

    return files.filter((f: Object): boolean => (f.type === fileName || f.type === fileName2) && f.index === index)
    .map((file: Object, i: number): React.Element<'div'> =>
      <div className='p-signup-common__thumb' key={i}><img src={file.preview} /></div>)
  }
}

export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: fifthValidation,
  destroyOnUnmount: false
})(FormFifthPage)
