import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
// import validation rules
import sixthValidation from './sixthValidation'
import { scrollToPosition } from 'utils'

// form fields
export const fileName = 'job'
export const fileName2 = 'marriage'

export const jobType = [
{value: 'private', text: 'خاص'},{value: 'freelance', text: 'حر'},{value: 'government', text: 'حكومي'}
]

export const fields = [
  'social_status',
  'social_job_status',
  'social_job',
  'social_job_start',
  'social_experience',
  'social_job_employer',
  'social_job_type',
  'social_job_country_id',
  'social_job_city_id',
  'gender'
]

// import css
import '../Common.scss'
// import components
import MaterialInput from 'components/Form/MaterialInput'
import MaterialDate from 'components/Form/MaterialDate'
import MaterialRadio from 'components/Form/MaterialRadio'
import MaterialFile from 'components/Form/MaterialFile'
import Select from 'components/Form/Select'

class FormSixthPage extends React.Component {
  constructor (props) {
    super(props)

    this.uploadFile = this.uploadFile.bind(this)
    this.uploadFile2 = this.uploadFile2.bind(this)
    this.handleContactCountryChanged = this.handleContactCountryChanged.bind(this)
  }
  componentDidMount () {
    scrollToPosition(0)
  }
  render () {
    const {
      fields: {gender, social_status, social_job_status, social_job, social_job_start,
        social_experience, social_job_employer,
        social_job_type, social_job_country_id, social_job_city_id
      },
      handleSubmit,
      countries,
      invalid,
      submitFailed,
      previousPage,
      socialCities
    } = this.props
     let socialJoblabel = 'شهادة العمل'

      if (social_job_status.value === 'retired') {
        socialJoblabel = 'خطاب أو بطاقة التقاعد'
      }
    return (
       <form onSubmit={handleSubmit}>
      	<div className='p-signup-common__section'>
            <div className='row'>
              <div className='col-xs-12 col-md-6'>
                <h6 className='p-signup-common__section__heading'>الحالة الإجتماعية</h6>
                <MaterialRadio value='single' checked={social_status.value === 'single'} label='أعزب' data={social_status} />
                <MaterialRadio value='married' checked={social_status.value === 'married'} label='متزوج(ة)' data={social_status} />
                <MaterialRadio value='divorced' checked={social_status.value === 'divorced'} label='مطلق(ة)' data={social_status} />
                <MaterialRadio value='widow' checked={social_status.value === 'widow'} label='أرمل(ة)' data={social_status} />
                {social_status.touched && social_status.error && <div className='p-signup-common__label-danger'>{social_status.error}</div>}
              </div>
              <div className='col-xs-12 col-md-6'>
                <h6 className='p-signup-common__section__heading'>الحالة الوظيفية</h6>
                <MaterialRadio value='employed' checked={social_job_status.value === 'employed'} label='أعمل' data={social_job_status} />
                <MaterialRadio value='retired' checked={social_job_status.value === 'retired'} label='متقاعد' data={social_job_status} />
                <MaterialRadio value='unemployed' checked={social_job_status.value === 'unemployed'} label='بدون عمل' data={social_job_status} />
                {social_job_status.touched && social_job_status.error && <div className='p-signup-common__label-danger'>{social_job_status.error}</div>}
              </div>
            </div>
            {social_job_status.value === 'employed' && (<div className='row p-t-2'>
              <div className='col-xs-12'>
                <h6 className='p-signup-common__section__heading'>معلومات الوظيفة</h6>
              </div>
              <div className='col-xs-12'>
                <MaterialDate label='تاريخ البدأ' data={social_job_start} />
              </div>
              <div className='col-xs-12 col-md-3'>
                <MaterialInput label='الوظيفة' data={social_job} />
              </div>
              
              <div className='col-xs-12 col-md-3'>
                <MaterialInput label='عدد سنوات الخبرة' data={social_experience} />
              </div>
              <div className='col-xs-12 col-md-3'>
                <MaterialInput label='إسم جهة العمل' data={social_job_employer} />
              </div>
              <div className='clearfix'></div>
              <div className='col-xs-12 col-md-3'>
                <Select label='القطاع' options={jobType} data={social_job_type} />
              </div>
              <div className='col-xs-12 col-md-3'>
                <Select label='الدولة'
                        options={countries}
                        data={social_job_country_id}
                        isChanged={this.handleContactCountryChanged} />
              </div>
              <div className='col-xs-12 col-md-3'>
                <Select label='المحافظة'
                        options={socialCities}
                        data={social_job_city_id} />
              </div>
              <div className='col-xs-12 col-md-3' />
            </div>)
          }
        </div>
         <section className='p-signup-common__section is-gray'>
           <div className='col-xs-12 col-md-3 p-t-10'>
             <h6 className='m-t-1 p-signup-common__section__heading is-inline'>الوثائق المطلوبة</h6>
           </div>
           <div className='col-xs-12 col-md-4'>
             <MaterialFile icon='job-gray-small'
               label={socialJoblabel}
               name={fileName}
               onDrop={this.uploadFile} />
           </div>
           {gender.value === 'f' && (social_job_status.value !== 'employed' &&
            social_status.value === 'married') && <div className='col-xs-12 col-md-4'>
              <MaterialFile label='وثيقة الزواج/شهادة ميلاد ابن'
                name={fileName2}
                icon={'ring-gray-small'}
                onDrop={this.uploadFile2} />
           </div>
           }
           <div className='col-xs-12 col-md-9 col-md-pull-3 p-t-2'>
            {
              this.renderUploadedFiles()
            }
           </div>
        </section>

         <footer className='p-signup-common__footer'>
           <div className='col-xs-12 text-xs-center'>
              <a onClick={() => previousPage()} className='p-signup-common__goto-previous'>
                الرجوع للسابق
              </a>
              {submitFailed && invalid &&
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

  handleContactCountryChanged (e) {
    this.props.getSocialCities(e.target.value)
  }

  uploadFile(files) {
    const {uploadFile} = this.props

    uploadFile(files, fileName)
  }

  uploadFile2(files) {
    const {uploadFile} = this.props

    uploadFile(files, fileName2)
  }

  renderUploadedFiles() {
    let {files} = this.props

    return files.filter(f => f.type === fileName || f.type === fileName2).map((file, i)=><div className='p-signup-common__thumb'
        key={i}><img src={file.preview} /></div>)
  }
}

FormSixthPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  countries: PropTypes.array,
  socialCities:PropTypes.array
}

FormSixthPage.defaultProps = {
  countries:[],
  socialCities:[]
}


export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: sixthValidation,
  destroyOnUnmount: false
})(FormSixthPage)
