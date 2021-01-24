// @flow
import React, { useRef, useState } from 'react'
import { dayNumberToString, APIBASE } from 'utils'
import { useSelector, useDispatch } from 'react-redux'
import WordIcon from 'static/img/wordicon@2.png'
import './UploadDraft.scss'
import { updateDraft } from 'routes/Student/modules/thesis'
import request from 'superagent'

// const defaultObj = {
//   heading: 'تحليل نظام اللقاءات المباشرة تم الاعتماد على استبيانات للمدرسين وللطلبة لمعرفة المشاكل التي تواجههم'
// }

type PropType = {
  fullWidth: boolean,
  deliveryOrder: number,
  uploadTitle: string,
  remainingDays: number,
  title: string
};

const UploadDraft = ({
  uploadTitle = 'خطة البحث',
  fullWidth,
  title = 'رفع الملف',
  deliveryOrder = 0,
  remainingDays = 0 }: PropType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const formReference = useRef()
  const descriptionReference = useRef()
  const [ error, setError ] = useState(false)
  const [ uploading, setUploding ] = useState(false)
  const [ progress, setProgress ] = useState(0)
  const [ draft, setDraft ] = useState(null)
  const { token } = useSelector((state: Object): Object => state.auth)
  const resetAll = () => {
    formReference.current.reset()
    setError(false)
    setUploding(false)
    setProgress(0)
    setDraft(null)
  }
  const onAccept = (event: Object) => {
    dispatch(updateDraft({
      id: draft.id,
      status: event.currentTarget.dataset.status,
      description: descriptionReference.current.value }))
    resetAll()
  }
  const onFileChange = (event: Object) => {
    setUploding(true)
    setError(false)
    request
    .post(`${APIBASE}/api/thesis/draft`)
    .set(`x-access-token`, token)
    .field('deliveryOrder', deliveryOrder)
    .attach('filename', event.currentTarget.files[0])
    .on('progress', (event: Object) => {
      setProgress(parseInt(event.percent, 10))
    })
    .then((response: Object) => {
      setUploding(false)
      if (response.body.success) {
        setDraft(response.body.draft)
      } else {
        setError(response.body.message)
      }
      formReference.current.reset()
    })
  }
  return <form ref={formReference} className='row m-b-3 m-t-2 text-xs-center'>
    <div className={`col-xs-12 col-md-10 ${fullWidth ? 'col-lg-12' : 'col-md-pull-1 col-lg-8 col-md-pull-2'}`}>
      <div className='my-panel-white shadow-1 Thesis-UploadDraft'>
        <h6 className='p-a-1 p-b-0 m-b-0 text-xs-right Thesis-UploadDraft__heading'>
          {title}
          {remainingDays ? <span className='pull-xs-left'> يغلق الرفع بعد {dayNumberToString(remainingDays)}</span> : null }
        </h6>
        {uploading ? <div className='text-xs-right Thesis-UploadDraft__done p-a-1' style={{ display: 'flex', alignItems: 'center' }} >
          <img src={WordIcon} className='Thesis-UploadDraft__done-type m-l-1' alt='word' width='51' />
          <div style={{ flexGrow: 1 }} className='m-l-3' >
            <h6 className='font-weight-bold Thesis-UploadDraft__done-title'>{uploadTitle}</h6>
            <progress max='100' value={progress} />
          </div>
          <i className='material-icons Thesis-UploadDraft__done-delete m-r-2' style={{ position:'relative', top: 0 }} >cancel</i>
        </div> : null}
        {(!draft && !uploading) ? <button type='button' className='btn btn-white btn-block p-y-1'>
          <input accept='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            type='file' onChange={onFileChange} className='Thesis-UploadDraft__input' />
          <div className='font-weight-bold'>انقر لتحديد الملف</div>
          الصيغ المدعومة <span dir='ltr' style={{ color: '#610dd6' }} className='font-weight-bold'>.docx</span>
          <i className='material-icons Thesis-UploadDraft__cloud'>cloud_upload</i>
        </button> : null }
        {(draft && !uploading) ? <div className='text-xs-right'>
          <div className='p-a-1 Thesis-UploadDraft__done'>
            <h6 className='font-weight-bold Thesis-UploadDraft__done-title'>{uploadTitle}</h6>
            <p className='Thesis-UploadDraft__done-heading'>{draft.heading}</p>
            <button type='button' onClick={() => setDraft(false)} className='Thesis-UploadDraft__done-delete'>
              <i className='material-icons'>delete</i>
            </button>
          </div>
        </div> : null}
        {(draft || uploading) ? <textarea ref={descriptionReference} className='Thesis-UploadDraft__done-input' autoFocus placeholder='كتابة وصف (اختياري)' /> : null}
      </div>
    </div>
    <div className='clearfix' />
    {(draft || uploading) ? <div>
      <button type='button' onClick={onAccept} data-status='review' disabled={uploading} className={`btn  btn-purple-dark m-l-2 m-t-1 ${uploading && 'disabled'}`}>
        ارسال تسليم للمراجعة
      </button>
      <button type='button' onClick={onAccept} data-status='approval' disabled={uploading} className={`btn  btn-purple-dark m-t-1 ${uploading && 'disabled'}`}>
        ارسال تسليم للاعتماد
      </button>
    </div> : null }
    {error ? <div className='text-danger p-t-1'>{error}</div> : null}
  </form>
}

export default UploadDraft
