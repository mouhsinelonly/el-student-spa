// @flow
import * as React from 'react'
// import css
import './DefaultDashboard.scss'
// import components
import FirstStepBlock from './MajesteerStepBlock/FirstStepBlock'
import SecondStepBlock from './MajesteerStepBlock/SecondStepBlock'
import ThirdStepBlock from './MajesteerStepBlock/ThirdStepBlock'
import FourthStepBlock from './MajesteerStepBlock/FourthStepBlock'
import FifthStepBlock from './MajesteerStepBlock/FifthStepBlock'

type PropsType = {
  days: number,
  files: Array<Object>,
  step: Object,
  histories: Array<Object>,
  showModal: Function,
  profile: Object
};

class DefaultDashboard extends React.PureComponent<PropsType> {
  static defaultProps = {
    histories: []
  }
  render (): React.Element<'div'> {
    const { files, step, histories, showModal, profile } = this.props

    if (!step) return <div />

    const married = profile.social_job_status === 'employed'

    const hasjob = profile.social_status === 'married'

    const filesDone = histories.findIndex((h: Object): boolean => h.step.files_done) > -1

    const secondExamPassed = histories.findIndex((h: Object): boolean => h.step.second_exam_done &&
      profile.registration_step_id !== h.step.id) > -1

    const documentsDone = histories.findIndex((h: Object): boolean => h.step.documents_processed)

    const paymentDone = profile.transaction_uuid !== ''

    const canPay = step.make_payment

    const firstExamRequired = step.first_exam_required

    const firstExamDone = step.first_exam_done

    const secondExamRequired = step.second_exam_required

    const secondExamDone = step.second_exam_done

    const showSecondExamResult = 0

    return (
      <div className='registrar-dashboard__container container-fluid text-xs-center clearfix'>
        <h1 className='p-t-3 registrar-dashboard__heading p-y-2'>
          <b>متابعة الطلب</b>
        </h1>
        <div className='m-t-3'>
          <FirstStepBlock histories={histories}
            step={step}
            files={files}
            hasjob={hasjob}
            married={married}
            gender={profile.gender}
            done={filesDone}
            order={1}
            title='طلب التسجيل'
            active={!filesDone} />
          <SecondStepBlock
            title='اختبار التصفية الأولي'
            showModal={showModal}
            done={secondExamRequired || secondExamDone || secondExamPassed}
            step={step}
            order={2}
            active={firstExamRequired || firstExamDone}
            showResult={firstExamDone}
            examAppDownloaded={profile.examAppLogged} />
          <ThirdStepBlock
            title='اختبار المفاضلة النهائي'
            showModal={showModal}
            done={secondExamPassed}
            step={step}
            order={3}
            showResult={secondExamDone}
            active={secondExamRequired || secondExamDone}
            show_result={showSecondExamResult} />
          <FourthStepBlock
            order={4}
            title='مطابقة الوثائق'
            showModal={showModal}
            histories={histories}
            done={documentsDone > -1}
            step={step}
            active={profile.step && profile.step.documents_processing && (documentsDone === -1) && filesDone} />
          <FifthStepBlock
            order={5}
            title='دفع الرسوم'
            showModal={showModal}
            step={step}
            done={paymentDone}
            active={canPay} />
        </div>
      </div>
    )
  }
}

export default DefaultDashboard
