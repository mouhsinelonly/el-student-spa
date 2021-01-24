import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
// impor css
import './pagination.scss'
import './panel.scss'
// import components
import Icon from 'components/Icon'
import FileInput from 'components/Form/MaterialFile'

export const types = [
  {label: 'الهوية', text: 'رفع البطاقة المدنية (من وجهين)', type: 'nid', icon: 'upload-photo-small-gray'},
  {label: 'الصورة الشخصية', text: 'رفع الصورة الشخصية', type: 'photo', icon: 'upload-photo-small-gray'},
  {label: 'الشهادة', text: 'رفع الشهاة', type: 'certificate', icon: 'certificat-gray-small'},
  {label: 'كشف الدرجات', text: 'رفع كشف الدرجات', type: 'transcript', icon: 'checklist-gray-small'},
  {label: 'شهادة العمل', text: 'رفع شهادة العمل', type: 'job', icon: 'job-gray-small'},
  {label: 'وثيقة الزواج', text: 'رفع عقد الزواج', type: 'marriage', icon: 'ring-gray-small'}
]

class FilesUploader extends Component {
  static propTypes = {
    page: PropTypes.number,
    files: PropTypes.array,
    setPage: PropTypes.func,
    uploadFile: PropTypes.func,
    gender: PropTypes.string,
    job: PropTypes.string
  }
  render () {
    const {page, files, setPage, uploadFile, gender, job} = this.props
    const type = types.find((t, i) => i === page - 1)
    const uploadMarriageDocs = (gender === 'f' && job !== 'employed')
    return (<div className={'container p-files-uploader clearfix'}>
      <h1 className={'p-t-3 text-xs-center'}>
        <b>رفع الملفات الناقصة</b>
      </h1>
      <Link to='/registrar' className='btn p-x-3 btn-success p-files-uploader__exit pull-sm-left'>
      حفظ و خروج
      </Link>
      <Header
        files={files}
        page={page}
        types={types.filter(t => (t.type !== 'marriage') || (uploadMarriageDocs && t.type === 'marriage'))} />
      <div className='clearfix' />
      <Panel page={page}
        type={type}
        marriage={uploadMarriageDocs}
        uploadFile={uploadFile}
        setPage={setPage}
        files={files.filter(f => f.type === type.type)} />
    </div>)
  }
}

export const Header = (props) => (<ul className={`c-reg-files-up__pagination m-t-3`}>
  {
  props.types.map((t, i) => <li key={t.type}
    className={`text-xs-center col-xs-6 col-md-3 col-lg-2 c-reg-files-up__pagination__item`}>
    {(props.files.findIndex(f => f.type === t.type) === -1)
   ? <span className={`m-b-2 c-reg-files-up__pagination__number`}>{i + 1}</span>
   : <Icon className='m-b-2' name='checkmark-outline-medium-green' />}
    <h5 className={(i + 1) > props.page && 'text-gray'}>{t.label}</h5>
  </li>)
 }
</ul>)

Header.propTypes = {
  types: PropTypes.array,
  files: PropTypes.array,
  page: PropTypes.number
}

export const Panel = (props) => (<div className={`row c-reg-files-up-panel__container m-t-3`}>
  <section className={`c-reg-files-up-panel__content p-y-3`}>
    <div className='col-xs-12 col-md-4 p-t-1'>
      <h5 className='m-r-2'>
       الوثائق المطلوبة
      </h5>
      <p><span className='text-success'>ملاحظة : </span>بامكانك رفع أكثر من ملف من نفس الخانة.</p>
    </div>
    <div className='col-xs-12 col-md-8'>
      <FileInput files={[]}
        className='is-big'
        name={props.type.type}
        onDrop={(files) => props.uploadFile(files, props.type.type)} >
        <Icon className={'m-l-2'} name={props.type.icon} /> {props.type.text}
      </FileInput>
    </div>
    <div className='col-xs-12 col-md-8 col-md-pull-4 m-t-2'>
      {
        props.files.map((f, i) => <div key={i}>
          <img src={f.attachments.thumb} alt='image' className='pull-xs-right m-x-2 m-b-2' />
        </div>)
      }
    </div>
    <div className='clearfix' />
  </section>
  <footer className={`c-reg-files-up-panel__footer p-y-3 text-xs-center`}>
    <button disabled={props.page <= 1}
      onClick={() => props.setPage(props.page - 1)}
      className='btn btn-success btn-lg p-x-3 m-l-2'>
      السابق
    </button>
    <button disabled={props.page === (props.marriage ? 6 : 5)}
      onClick={() => props.setPage(props.page + 1)}
      className='btn btn-success btn-lg p-x-3'>
     التالي
    </button>
  </footer>
</div>)

Panel.propTypes = {
  type: PropTypes.object,
  page: PropTypes.number,
  setPage: PropTypes.func,
  marriage: PropTypes.bool,
  files: PropTypes.array
}

FilesUploader.defaultProps = {
  files: [],
  page: 1
}
export default FilesUploader
