// @flow
import * as React from 'react'
import YoutubeModal from './YoutubeModal'
// for registrar
import ChooseSummerSubjects from './ChooseSummerSubjects'
import ChooseFailSubjects from './ChooseFailSubjects'
import RegistrarActivateEmail from './RegistrarActivateEmail'
import DocumentsModal from './DocumentsModal'
import YesNoModal from './YesNoModal'
import YesModal from './YesModal'
import PaymentModal from './PaymentModal'
import EditProfileModal from './EditProfileModal'
import MajExamRules from './MajExamRules'
// for student
import LiveSessionModal from './LiveSessionModal'
import CovidModal from './CovidModal'
import StudentPaymentModal from './StudentPaymentModal'
import RegistrationFees from './RegistrationFees'
import TypeForm from './TypeForm'
import PlayRecordingsModal from './PlayRecordingsModal'
import ChooseClassroomModal from './ChooseClassroomModal'
import QuranRecordingModal from './QuranRecordingModal'
import RulesModal from './RulesModal'
import LibraryPageModal from './LibraryPageModal'

import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

import './style.scss'

type PropType = {
  data: Object,
  name: string,
  closeModal: Function,
  size: string,
  closable: boolean,
  visible: boolean,
  answerYes: Function,
  answerNo: Function
};
type StateType = {
  open: boolean
};
class Modals extends React.Component<PropType, StateType> {
  static defaultProps = {
    name: '',
    data: {},
    closeModal: () => {}
  }
  state = {
    open: false,
  }

  onOpenModal = () => {
    this.setState((): Object => ({ open: true }))
  }

  onCloseModal = () => {
    const { closeModal } = this.props
    closeModal()
    this.setState((): Object => ({ open: false }))
  }
  render (): React.Element<typeof Modal> {
    const { open } = this.state
    const {
      name,
      data,
      size,
      closable,
      visible,
      answerYes,
      answerNo,
      closeModal } = this.props
    let width = '50%'
    if (size === 'small') {
      width = '30%'
    } if (size === 'medium') {
      width = '60%'
    } else if (size === 'full') {
      width = '100%'
    }

    // console.log(size)

    const isOpen = !(!visible || (name === 'paymentmodal' && Object.keys(data).length === 0)) || open

    return (
      <Modal
        open={isOpen}
        center
        styles={{ modal: {
          minWidth: width,
          ...(name === 'covid' ? { maxWidth: '100%', width: 472 } : {}),
          padding: 0,
          borderRadius: 5,
          boxShadow: 'none',
          backgroundColor: 'transparent' } }}
        onClose={this.onCloseModal}
        closeOnOverlayClick={closable}
        showCloseIcon={closable}
        closeOnEsc={closable}>
        {name === 'youtube' && <YoutubeModal closeModal={closeModal} {...data} />}
        {name === 'rules' && <RulesModal closeModal={closeModal} {...data} />}
        {name === 'documents' ? <DocumentsModal {...data} /> : null}
        {name === 'payment' ? <PaymentModal /> : null}
        {name === 'researchbookpage' ? <LibraryPageModal {...data} /> : null}
        {name === 'profile_edit' ? <EditProfileModal /> : null}
        {name === 'playrecordings' ? <PlayRecordingsModal {...data} /> : null}
        {name === 'livesession' && data ? <LiveSessionModal {...data} /> : null}
        {name === 'paymentmodal' && data ? <StudentPaymentModal {...data} closable={closable} /> : null}
        {name === 'yesno' && data ? <YesNoModal {...data}
          onAnswerYes={answerYes}
          onAnswerNo={answerNo}
          closeModal={closeModal} /> : null}
        {name === 'yes' && data ? <YesModal {...data} onAnswerYes={answerYes} closeModal={closeModal} /> : null}
        {name === 'covid' && data ? <CovidModal {...data} onAnswerYes={answerYes} closeModal={closeModal} /> : null}
        {name === 'choose_classroom' && data ? <ChooseClassroomModal /> : null}
        {name === 'registrar_activate_email' && data ? <RegistrarActivateEmail /> : null}
        {name === 'quran_recording' && data ? <QuranRecordingModal {...data} /> : null}
        {name === 'RegistrationFees' ? <RegistrationFees {...data} /> : null}
        {name === 'ChooseSummerSubjects' ? <ChooseSummerSubjects /> : null}
        {name === 'ChooseFailSubjects' ? <ChooseFailSubjects closable={closable} /> : null}
        {name === 'MajExamRules' ? <MajExamRules /> : null}
        {name === 'typeform' ? <TypeForm {...data} /> : null}
      </Modal>
    )
  }
  _close = (e: Object) => {
    const { closeModal } = this.props
    closeModal()
  }
}

export default Modals
