// @flow
import * as React from 'react'
import ExamResultRow from './ExamResultRowV2'
import Icon from 'components/Icon'

type PropType = {
  toggleExamComplaint: Function,
  toggleAllExamComplaints: Function,
  videoPlaintEnabled: boolean,
  showModal: Function,
  goToComplaintStep: Function,
  checkedlist: Array<Object>,
  exams: Array<Object>
};

class FirstStep extends React.Component<PropType> {
  render (): React.Element<'div'> {
    const { checkedlist, exams, toggleExamComplaint, showModal, videoPlaintEnabled } = this.props
    const hasChecked = checkedlist.length > 0
    const hasWithoutComplaint = false /* exams.findIndex(e =>
      (e.complaintStatus === null || typeof e.complaintStatus === 'undefined') &&
        e.type === 'final' && (e.grade !== null && typeof e.grade !== 'undefined') &&
        (e.excuseStatus === null || typeof e.excuseStatus === 'undefined') &&
      e.id !== 490) >= 0 */
    const canSend = exams.filter((e: Object): boolean => {
      return checkedlist.indexOf(e.id) > -1
    }).length
    return (<div>
      <h4 className='p-b-3 text-xs-center hidden-xs-up'><b>نتائج الاختبار</b></h4>
      <button className={`btn btn-lg btn-white pull-left c-exam-row-complaint-table__checkall
        ${!hasWithoutComplaint ? 'hidden-xs-up' : ''}`} onClick={this._checkAll}>
        <span className={`${hasChecked ? 'hidden-xs-up' : ''}`}>تحديد الكل</span>
        <span className={`${!hasChecked ? 'hidden-xs-up' : ''}`}>إلغاء التحديد</span>
        <Icon name={`checkbox-${hasChecked ? 'checked' : 'unchecked'}`} className='m-r-2' />
      </button>
      {exams.map((e: Object): React.Element<typeof ExamResultRow> => <ExamResultRow
        showModal={showModal}
        videoPlaintEnabled={videoPlaintEnabled}
        onCheckExam={toggleExamComplaint}
        checked={checkedlist.findIndex((c: Object): boolean => c === e.id) >= 0}
        key={e.id}
        exam={e} />)}
      <footer className={`text-xs-center p-y-3 c-exam-row-complaint-table__footer m-t-3 hidden-xs-up`} >
        <p className='p-x-3 p-b-3'>
          إذا كان لديك شكوى من الدرجة التي تحصلت عليها في مادة ما بسبب مشكلة تقنية واجهتك أثناء
          الاختبار فيرجى التأشير على المادة والضغط على التالي ثم اختيار سبب الشكوى
        </p>
        <button className='btn btn-gray btn-lg p-x-3' disabled={!canSend} onClick={this._next}>
          التالي
        </button>
      </footer>
    </div>)
  }

  _checkAll = () => {
    const { exams, toggleAllExamComplaints, checkedlist } = this.props
    let examsIds = []
    if (!checkedlist.length) {
      examsIds = exams.reduce((p: Array<number>, c: Object): Array<number> =>
        (c.complaintStatus === null || typeof c.complaintStatus === 'undefined') &&
        c.type === 'final' && (c.grade !== null && typeof c.grade !== 'undefined') &&
        (c.excuseStatus === null || typeof c.excuseStatus === 'undefined') ? p.concat(c.id) : p, [])
    }
    toggleAllExamComplaints(examsIds)
  }

  _next = () => {
    const { goToComplaintStep } = this.props
    goToComplaintStep(2)
  }
}

export default FirstStep
