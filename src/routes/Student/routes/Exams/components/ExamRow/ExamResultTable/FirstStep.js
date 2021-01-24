import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ExamResultRow from './ExamResultRow'
import Icon from 'components/Icon'

class FirstStep extends Component {

  constructor (props) {
    super(props)

    this._checkAll = this._checkAll.bind(this)
    this._next = this._next.bind(this)
  }
  static propTypes = {
    toggleExamComplaint: PropTypes.func,
    toggleAllExamComplaints: PropTypes.func,
    showModal: PropTypes.func,
    goToComplaintStep: PropTypes.func,
    checkedlist: PropTypes.array,
    exams: PropTypes.array
  }
  render () {
    const { checkedlist, exams, toggleExamComplaint, showModal } = this.props
    const hasChecked = checkedlist.length > 0
    const hasWithoutComplaint = false /* exams.findIndex(e =>
      (e.complaintStatus === null || typeof e.complaintStatus === 'undefined') &&
        e.type === 'final' && (e.grade !== null && typeof e.grade !== 'undefined') &&
        (e.excuseStatus === null || typeof e.excuseStatus === 'undefined') &&
      e.id !== 490) >= 0 */
    const canSend = exams.filter(e => {
      return checkedlist.indexOf(e.id) > -1
    }).length

    return (<div>
      <h4 className='p-b-3 text-xs-center'><b>نتائج الاختبار</b></h4>
      <button className={`btn btn-lg btn-white pull-left c-exam-row-complaint-table__checkall
        ${!hasWithoutComplaint && 'hidden-xs-up'}`} onClick={this._checkAll}>
        <span className={`${hasChecked && 'hidden-xs-up'}`}>تحديد الكل</span>
        <span className={`${!hasChecked && 'hidden-xs-up'}`}>إلغاء التحديد</span>
        <Icon name={`checkbox-${hasChecked ? 'checked' : 'unchecked'}`} className='m-r-2' />
      </button>
      <div className='row text-xs-center'>
        <div className={`col-xs-12 col-md-3 col-lg-4`}>
        الإختبار
        </div>
        <div className='col-xs-12 col-md-2 col-lg-1' style={{ borderLeft: 'solid #dfdfdf 1px', height: 86, fontSize: 14 }}>
          الدرجة قبل الخصم
        </div>
        <div className='col-xs-12 col-md-2 col-lg-1' style={{ borderLeft: 'solid #dfdfdf 1px', height: 86, fontSize: 14 }}>
          الدرجة المخصومة
        </div>
        <div className='col-xs-12 col-md-2 col-lg-1' style={{ borderLeft: 'solid #dfdfdf 1px', height: 86, fontSize: 14 }}>
          الدرجة المعتمدة بعد الخصم
        </div>
        <div className='col-xs-12 col-md-2 col-lg-5'>
        ملاحظات
        </div>
      </div>
      {exams.map(e => <ExamResultRow
        showModal={showModal}
        onCheckExam={toggleExamComplaint}
        checked={checkedlist.findIndex(c => c === e.id) >= 0}
        key={e.id}
        exam={e} />)}
      <footer className={`text-xs-center p-y-3 c-exam-row-complaint-table__footer m-t-3 ${e.type !== 'midterm' ? ' hidden-xs-up' : ''}`} >
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

  _checkAll () {
    const {exams, toggleAllExamComplaints, checkedlist} = this.props
    let examsIds = []
    if (!checkedlist.length) {
      examsIds = exams.reduce((p, c) =>
        (c.complaintStatus === null || typeof c.complaintStatus === 'undefined') &&
        c.type === 'final' && (c.grade !== null && typeof c.grade !== 'undefined') &&
        (c.excuseStatus === null || typeof c.excuseStatus === 'undefined') ? p.concat(c.id) : p, [])
    }
    toggleAllExamComplaints(examsIds)
  }

  _next () {
    const {goToComplaintStep} = this.props
    goToComplaintStep(2)
  }
}

export default FirstStep
