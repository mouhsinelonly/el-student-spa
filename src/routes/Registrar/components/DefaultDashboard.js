// @flow
import * as React from 'react'
// import css
import './DefaultDashboard.scss'
// import components
import FirstStepBlock from './StepBlock/FirstStepBlock'
import SecondStepBlock from './StepBlock/SecondStepBlock'
import ThirdStepBlock from './StepBlock/ThirdStepBlock'
import FourthStepBlock from './StepBlock/FourthStepBlock'

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

    const documentsDone = histories.findIndex((h: Object): boolean => h.step.documents_processed)

    const equationDone = histories.findIndex((h: Object): boolean => h.step.equation_done)

    const equationActive = step.equation_input || step.equation_processing

    const totalsubjects = profile.equations.reduce((total: number, e: Object): number => total +
      e.subjects.filter((s: Object): boolean => s.status === 'accepted').length, 0)

    const uncompleteDocuments = histories.filter((h: Object): boolean => h.step.equation_input === 1).length > 1

    const paymentDone = profile.transaction_uuid !== ''

    const canPay = step.make_payment

    let hasEquation = false

    if (profile.type && profile.type.code === 'C') {
      hasEquation = true
    }

    return (
      <div className='registrar-dashboard__container container text-xs-center clearfix'>
        <h1 className='p-t-3 registrar-dashboard__heading p-b-3'>
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
            title='مطابقة الوثائق'
            showModal={showModal}
            histories={histories}
            done={documentsDone > -1}
            step={step}
            order={2}
            active={profile.step && profile.step.documents_processing && (documentsDone === -1) && filesDone} />

          {hasEquation ? <ThirdStepBlock order={3}
            step={step}
            done={equationDone > -1}
            uncomplete={uncompleteDocuments}
            totalsubjects={totalsubjects}
            title='معادلة المواد'
            active={equationActive && !!documentsDone && filesDone} /> : null}
          <FourthStepBlock
            order={hasEquation ? 4 : 3}
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
