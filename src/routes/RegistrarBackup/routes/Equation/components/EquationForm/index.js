import React from 'react'
import PropTypes from 'prop-types'
import Radio from 'components/Form/MaterialRadio'
import Input from 'components/Form/MaterialInput'
import File from 'components/Form/MaterialFile'
// import css
import './style.scss'

const EquationForm = (props) => (<form className='c-reg-equation-form__panel m-t-3' onSubmit={props.onSubmit}>
  <header className='p-a-3'>
    <div className='row'>
      <div className='col-xs-12'>
        <label className='c-reg-equation-form__label' htmlFor='university'>من أين أخذت الشهادة</label>
        <br />
        <Radio value='كلية العلوم الشرعية'
          checked={props.university.value === 'كلية العلوم الشرعية'}
          label='كلية العلوم الشرعية'
          data={props.university} />
        <Radio value='مؤسسة أخرى'
          checked={props.university.value === 'مؤسسة أخرى'}
          label='مؤسسة أخرى'
          data={props.university} />
     {props.university.touched && props.university.error &&
       <div className='c-reg-equation-form__label-danger'>{props.university.error}</div>}
      </div>
      <div className='clearfix m-y-2' />
      <div className='col-xs-7'>
        <label className='c-reg-equation-form__label m-b-1' htmlFor='level' >الدرجة العلمية التي حصلت عليها</label>
        <br />
        <Radio value='dip'
          checked={props.level.value === 'dip'}
          label='دبلوم'
          data={props.level} />
        <Radio value='bac'
          checked={props.level.value === 'bac'}
          label='بكالوريوس'
          data={props.level} />
        <Radio value='maj'
          checked={props.level.value === 'maj'}
          label='ماجستير'
          data={props.level} />
        <Radio value='doc'
          checked={props.level.value === 'doc'}
          label='الدكتوراه'
          data={props.level} />
        <Radio value='other'
          checked={props.level.value === 'other'}
          label='لم أكمل'
          data={props.level} />
    {props.level.touched && props.level.error && <div className='c-reg-equation-form__label-danger'>
    {props.level.error}
    </div>}
      </div>
      <div className='col-xs-5'>
        <label className='c-reg-equation-form__label' htmlFor='level'>المعدل التراكمي / التقدير النهائي</label>
        <br />
        <div className='col-xs-12 col-md-6 col-lg-5 p-x-0'>
          <Input placeholder='0.00' data={props.grade} />
        </div>
      </div>
    </div>
  </header>
  <section className='c-reg-equation-form__gray-container p-y-2'>
    <div className='clearfix'>
      <div className='col-xs-12 col-md-4 col-lg-3'>
        <label className='c-reg-equation-form__label' >الوثائق المطلوبة</label>
      </div>
      <div className='col-xs-12 col-md-4 col-lg-9'>
        {props.files.filter(f => f.type.value === 'diploma').length < 4 &&
          <File label={props.files ? 'إضافة صورة للشهادة' : 'الشهادة'}
            name='diploma'
            icon='diplomat-gray-small'
            onDrop={(files) => props.uploadFile(files, 'diploma')} />
        }
         {props.files.filter(f => f.type.value === 'diploma').map((f, i) => <Thumb key={i} {...f} />)}
        <div className='clearfix p-y-1' />
     {props.files.filter(f => f.type.value === 'transcript').length < 4 &&
       <File label={props.transcripts ? 'إضافة صورة للكشف' : 'كشف الدرجات'}
         name='transcript'
         icon='checklist-gray-small'
         onDrop={(files) => props.uploadFile(files, 'transcript')} />
  }
{props.files.filter(f => f.type.value === 'transcript').map((f, i) => <Thumb key={i} {...f} />)}
      </div>
    </div>
  </section>
  <footer className='p-y-3 text-xs-center c-reg-equation-form__footer'>
    <button disabled={props.invalid} className='btn btn-lg btn-success p-x-3'>
    التالي
    </button>
  </footer>
</form>)

const Thumb = (props) => (<img src={props.attachments.value.thumb} className={` media-object m-a-1 pull-xs-left`} />)

Thumb.propTypes = {
  attachments: PropTypes.object
}

EquationForm.propTypes = {
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func,
  files: PropTypes.array,
  grade: PropTypes.object,
  university: PropTypes.object,
  type: PropTypes.object,
  attachments: PropTypes.object,
  level: PropTypes.object
}
export default EquationForm
