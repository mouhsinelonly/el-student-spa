// @flow
import React, { useCallback } from 'react'
import RulesList from 'components/RulesList'

const rules = [
  'أخذ الاستعداد الكامل للتسجيل.',
  'بعد التسجيل يمكنك فحص وضوح الصوت والصورة قبل الرفع.',
  'إذا لم ترضَ عن وضوح الصوت والصورة يمكنك إعادة المحاولة أربع مرات إضافية.',
  'إذا اكتملت لديك خمس محاولات ولم ترفع التسجيل سيغلق عليك نظام المحاولات وعليك مراجعة الإدارة.',
  'رفعك للتسجيل يعبر عن رضاك عنه، وتتحمل بذلك المسؤولية الأكاديمية كاملة'
]

type PropsType = { changeStep: Function };

const AcceptTermsStep = (props: PropsType): React.Node => {
  const _nextStep = useCallback(() => {
    props.changeStep('record')
  })
  const _prevStep = useCallback(() => {
    props.changeStep('test')
  })
  return (
    <div className='container TestRecordingStep TestRecordingStep'>
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-md-pull-2 TestRecordingStep__col'>
          <button onClick={_prevStep} className='btn-block p-quran-pagev2__back'>
            <i className='material-icons m-l-1'>arrow_forward</i> الموافقة على الشروط
          </button>
          <RulesList rules={rules} title='' className='TestRecordingStep__rules' />
          <div className='clearfix' />
          <div className='text-xs-center p-b-3'>
            <button type='button' className='btn 
            TestRecordingStep__good btn-success m-x-auto p-x-3 m-t-3' onClick={_nextStep}>
              موافق الدخول للإختبار
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcceptTermsStep
