// @flow
import PropTypes from 'prop-types'
import * as React from 'react'
import ImageZoom from 'react-medium-image-zoom'
import { reduxForm } from 'redux-form'
import MaterialInput from 'components/Form/MaterialInput'
import MaterialDate from 'components/Form/MaterialDate'
import MaterialFile from 'components/Form/MaterialFile'
import DropDown from 'components/Form/DropDown'
import Icon from 'components/Icon'
import moment from 'moment'
import './style.scss'
import validation from './validation'

type StateType = {
  files: Array<Object>
};

type PropsType = {
  fields: Object,
  uploadingFiles: boolean,
  files: Array<Object>,
  handleSubmit: Function,
  storeStatement: Function,
  toggleStatementNotification: Function,
  storeFiles: Function,
  countries: Array<Object>,
  invalid: boolean
};

const fields = [
  'id',
  'first_name',
  'type',
  'second_name',
  'third_name',
  'last_name',
  'first_name_latin',
  'second_name_latin',
  'third_name_latin',
  'last_name_latin',
  'nationality_country_id',
  'birthday'
]

class Form extends React.Component<PropsType, StateType> {
  state = { files: [] }
  static contextTypes = {
    router: PropTypes.object
  }
  static defaultProps = {
    files: []
  }
  render (): React.Element<'form'> {
    const { fields: {
      birthday,
      type,
      first_name: firstNameAr,
      second_name: secondNameAr,
      third_name: thirdNameAr,
      last_name: fourthNameAr,
      first_name_latin: firstNameEn,
      second_name_latin: secondNameEn,
      third_name_latin: thirdNameEn,
      last_name_latin: fourthNameEn,
      nationality_country_id: countryId
    },
    handleSubmit,
    invalid,
    uploadingFiles,
    files: registrationFiles,
    countries } = this.props
    const { files } = this.state
    // console.log(files)
    return (
      <form className='container c-statement-request'
        onSubmit={handleSubmit(this._handleSubmit)} style={{ paddingBottom: 300 }}>
        <div className='row'>
          <div className='col-xs-12 p-y-3'>
            <h2 className='text-xs-center font-weight-bold'>
              {type.value !== 'grades' ? 'طلب إفادة التخرج' : 'طلب كشف الدرجات' }
            </h2>
            <div className='text-xs-center p-y-1' style={{ color: '#777d84' }} >
              المعلومات الآتية طبقًا لما هو في البطاقة المدنية أو جواز السفر
            </div>
            <div className='card shadow-2 m-t-3'>
              <div className='card-body'>
                <div className='row p-a-3'>
                  <div className='col-xs-12 m-b-2'>
                    <h5>الاسم باللغة العربية</h5>
                  </div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='الإسم الشخصي' data={firstNameAr} /></div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='الإسم الثاني' data={secondNameAr} /></div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='الإسم الثالث' data={thirdNameAr} /></div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='الإسم الرابع' data={fourthNameAr} /></div>
                  <div className='col-xs-12 m-y-2'>
                    <h5>الاسم باللغة الإنجليزية</h5>
                  </div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='4th name' data={fourthNameEn} /></div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='3rd name' data={thirdNameEn} /></div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='2nd name' data={secondNameEn} /></div>
                  <div className='col-xs-12 col-md-3'><MaterialInput label='1st name' data={firstNameEn} /></div>
                  <div className='col-xs-6 m-y-2'>
                    <h5>تاريخ الميلاد</h5>
                  </div>
                  <div className='col-xs-6 m-y-2'>
                    <h5>الجنسية</h5>
                  </div>
                  <div className='col-xs-12 col-md-4'>
                    <MaterialDate label='تاريخ الميلاد' data={birthday} />
                  </div>
                  <div className='col-xs-12 col-md-6 col-md-pull-2'>
                    <label className={`c-statement-request__label m-l-2
                        ${parseInt(countryId.value) === 613 ? 'is-selected' : ''}`}
                      onClick={this._setOman}>عماني</label>
                    <DropDown options={countries} ignoreValue={613} data={countryId} />
                  </div>
                </div>
                <div className='c-statement-request__files p-a-3'>
                  <div className='row'>
                    <div className='col-xs-12 col-md-3 p-t-1'>
                      البطاقة (من جانبين) أو جواز السفر
                      {files.length ? <Icon name='small-check-green' className='m-r-1' /> : null}
                    </div>
                    <div className='col-xs-12 col-md-9'>
                      {
                        files.map((f: Object, i: number): React.Element<'img'> =>
                          <ImageZoom
                            key={i}
                            image={{
                              src: f.preview,
                              alt: f.name,
                              className: 'img',
                              style: { width: 120,
                                backgroundColor: '#fff',
                                height: 80,
                                display: 'inline-block',
                                margin: 20,
                                borderRadius: 5 }
                            }}
                            zoomImage={{
                              src: f.preview,
                              alt: f.name
                            }} />)
                      }
                      {
                        registrationFiles.filter((f: Object): boolean => f.type === 'nid')
                        .map((f: Object, i: number): React.Element<'img'> => <ImageZoom
                          key={f.id}
                          image={{
                            src: f.file_url,
                            alt: f.file_url,
                            className: 'img',
                            style: { width: 120,
                              backgroundColor: '#fff',
                              height: 80,
                              display: 'inline-block',
                              margin: 20,
                              borderRadius: 5 }
                          }}
                          zoomImage={{
                            src: f.file_url,
                            alt: f.file_url
                          }} />)
                      }
                      {files.length < 2
                        ? <MaterialFile
                          onDrop={this._uploadFiles}
                          name='document'
                          multiple
                          label='رفع ملفات اخرى' />
                        : null }
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-footer text-xs-center p-y-3' style={{ backgroundColor: '#fff' }}>
                <button className='btn btn-success btn-lg font-weight-bold'
                  disabled={invalid || (!files.length && !registrationFiles) || uploadingFiles} >
                  {uploadingFiles ? 'جاري الارسال' : 'اعتمد٫ و أرسل الطلب'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }

  _setOman = () => {
    const { fields: { nationality_country_id: countryId } } = this.props
    countryId.onChange(613)
  }

  _uploadFiles = (dropedFiles: Array<Object>, rejectedFiles: Array<Object>) => {
    const { files } = this.state

    dropedFiles.map((d: Object) => {
      files.push(d)
    })

    this.setState((): Object => ({ files }))
  }

  _handleSubmit = (values: Object) => {
    const { files } = this.state
    const { storeStatement, storeFiles, toggleStatementNotification } = this.props
    const { router } = this.context
    storeStatement(values, files)
    storeFiles(files, 'nid')
    toggleStatementNotification(true)
    router.push('/student/docs')
  }
}

export default reduxForm({
  fields,
  form: 'sessionexcuseform',
  destroyOnUnmount: true,
  validate: validation
}, (state: Object): Object => ({ // mapStateToProps
  initialValues: {
    birthday: moment(state.student.profile.birthday).locale('en').format('DD-MM-YYYY'),
    first_name: state.student.profile.first_name,
    type: state.location.query.type,
    second_name: state.student.profile.second_name,
    third_name: state.student.profile.third_name,
    last_name: state.student.profile.last_name,
    first_name_latin: state.student.profile.first_name_latin,
    second_name_latin: state.student.profile.second_name_latin,
    third_name_latin: state.student.profile.third_name_latin,
    nationality_country_id: state.student.profile.nationality_country_id,
    id: state.location.query.id,
    last_name_latin: state.student.profile.last_name_latin
  }
}))(Form)
