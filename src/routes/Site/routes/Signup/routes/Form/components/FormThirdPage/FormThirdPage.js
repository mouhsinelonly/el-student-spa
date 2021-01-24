import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
// import validation rules
import { scrollToPosition } from 'utils'
import thirdValidation from './thirdValidation'
// import css
import '../Common.scss'
// import components
import MaterialInput from 'components/Form/MaterialInput'
import MaterialDate from 'components/Form/MaterialDate'
import MaterialRadio from 'components/Form/MaterialRadio'
import MaterialFile from 'components/Form/MaterialFile'
import Select from 'components/Form/Select'
// form fields
export const fileName = 'nid'
export const stayTypes = [
  { text: 'عمل', value: 'work' },
  { text: 'مرافق', value: 'companion' },
  { text: 'ساحة', value: 'tourism' },
  { text: 'غير مقيم', value: 'non_resident' }
]

export const fields = [
  'nationality_type',
  'nationality_country_id',
  'birth_country_id',
  'nationality_state_id',
  'nationality_city_id',
  'national_id',
  'stay_type',
  'passeport_number',
  'passeport_issued',
  'passeport_expire',
  'passeport_country_id',
  'stay_expire'
]

class FormThirdPage extends React.Component {
  constructor (props) {
    super(props)

    this.handleNationalityCountryChanged = this.handleNationalityCountryChanged.bind(this)
    this.handleNationalityStateChanged = this.handleNationalityStateChanged.bind(this)
    this.resetPasseport = this.resetPasseport.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

  componentDidMount () {
    scrollToPosition(0)
  }

  resetPasseport () {
    this.props.fields.passeport_number.onChange('')
    this.props.fields.passeport_issued.onChange('')
    this.props.fields.passeport_expire.onChange('')
    this.props.fields.passeport_country_id.onChange('')
    this.props.fields.stay_expire.onChange('')
  }

  render () {
    const {
      fields: { nationality_type, birth_country_id, nationality_country_id, nationality_state_id,
      nationality_city_id, national_id, stay_type,
passeport_number,
passeport_issued,
passeport_expire,
passeport_country_id,
stay_expire },
      handleSubmit,
      submitFailed,
      files,
      countries,
      errors,
      invalid,
      countries2,
      previousPage,
      nationalityCities,
      nationalityStates
    } = this.props
    // console.log(countries2)
    return (
      <form onSubmit={handleSubmit} >
        <div className='p-signup-common__section'>
          <div className='row'>
            <div className='col-lg-12  m-b-3'>
              <MaterialRadio value='O' checked={nationality_type.value === 'O'}
                isChanged={() => this.resetPasseport()}
                label='عماني'
                data={nationality_type} />
              <MaterialRadio value='E' checked={nationality_type.value === 'E'} label='غير عماني' data={nationality_type} />
              {nationality_type.touched && nationality_type.error && <div className='p-signup-common__label-danger'>{nationality_type.error}</div>}
            </div>
          </div>

          {/* expat fields */}
          {nationality_type.value === 'E' &&
            (<div className='row'>
              <div className='col-xs-12 col-md-4 col-lg-3'>
                <Select options={countries}
                  data={nationality_country_id}
                  label='الجنسية' />
              </div>
              <div className='col-xs-12 col-md-4 col-lg-3'>
                <Select options={stayTypes}
                  data={stay_type}
                  label='نوع الإقامة بسلطنة عمان' />
              </div>
              {stay_type.value !== 'non_resident' && <div>
                <div className='col-xs-12 col-md-4 col-lg-3'>
                  <MaterialInput label='رقم جواز السفر' data={passeport_number} />
                </div>
                <div className='col-xs-12 col-md-4 col-lg-3'>
                  <MaterialDate label='تاريخ صدور جواز السفر' data={passeport_issued} />
                </div>
                <div className='clearfix' />
                <div className='col-xs-12 col-md-4 col-lg-3'>
                  <MaterialDate label='تاريخ انتهاء جواز السفر' data={passeport_expire} />
                </div>
                <div className='col-xs-12 col-md-4 col-lg-3'>
                  <MaterialDate label='انتهاء الإقامة (بسلطنة عمان)' data={stay_expire} />
                </div>
                <div className='col-xs-12 col-md-4 col-lg-3'>
                  <Select label='جهة الصدور' options={countries} data={passeport_country_id} />
                </div>
              </div>}
            </div>

          )}
          {/* expat fields */}
          <div className='clearfix' />
          <div className='row'>
            <div className='col-xs-12 col-md-4 col-lg-3'>
              <Select isChanged={this.handleNationalityCountryChanged}
                options={countries}
                data={birth_country_id}
                label='حدد دولة الميلاد' />
            </div>
            {nationality_type.value === 'O' && (<div><div className='col-xs-12 col-md-4 col-lg-3'>
              <Select options={nationalityCities}
                isChanged={this.handleNationalityStateChanged}
                data={nationality_city_id}
                label='حدد المحافظة' />
            </div>
              <div className='col-xs-12 col-md-4 col-lg-3'>
                <Select
                  options={nationalityStates}
                  data={nationality_state_id}
                  label='حدد الولاية' />
              </div>
            </div>)}
          </div>
          <div className='row p-t-2'>
            <div className='col-xs-12 col-md-4'>
              <h6 className='p-signup-common__section__heading'>رقم البطاقة المدنية</h6>
              <MaterialInput placeholder='00000000' data={national_id} />
            </div>
          </div>
        </div>
        <div className='p-signup-common__section is-gray'>
          <div className='col-xs-12 col-md-3 p-t-10'>
            <h6 className='m-t-1 p-signup-common__section__heading is-inline'>الوثائق المطلوبة</h6>
          </div>
          <div className='col-xs-12 col-md-4'>
            <MaterialFile label='البطاقة المدنية (من وجهين) أو جواز السفر'
              name={fileName}
              icon='certificat-gray-small'
              className='is-big'
              onDrop={this.uploadFile} />
          </div>
          <div className='col-xs-12 col-md-5'>
            {
              this.renderUploadedFiles()
             }
          </div>
        </div>
        <div className='p-signup-common__footer'>
          <div className='col-xs-12 text-xs-center'>
            <a onClick={() => previousPage()} className='p-signup-common__goto-previous'>
              الرجوع للسابق
            </a>
            {submitFailed && invalid &&
            <div className='text-danger p-a-3'>
              <i className='material-icons'>warning</i> <br />
              يوجد بيانات لم تقم بادخالها</div>}
            <button type='submit' className='p-signup-common__cta  btn btn-success btn-lg p-x-3'>
              التالي
            </button>
          </div>
        </div>

      </form>
    )
  }

  handleNationalityCountryChanged (e) {
    this.props.getNationalityCities(e.target.value)
  }

  handleNationalityStateChanged (e) {
    this.props.getNationalityStates(e.target.value)
  }

  uploadFile (files) {
    const { uploadFile } = this.props

    uploadFile(files, fileName)
  }

  renderUploadedFiles () {
    let { files } = this.props

    return files.filter(f => f.type === fileName).map((file, i) => <div className='p-signup-common__thumb' key={i}><img src={file.preview} /></div>)
  }
}

FormThirdPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'signup',
  fields: fields,
  validate: thirdValidation,
  destroyOnUnmount: false
})(FormThirdPage)
