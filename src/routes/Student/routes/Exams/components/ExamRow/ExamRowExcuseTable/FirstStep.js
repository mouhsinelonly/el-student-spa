// @flow
import * as React from 'react'
import ExamRowExcuseTableElement from '../ExamRowExcuseTableElement'
import Icon from 'components/Icon'

type FirstStepType = {
  toggleExamExcuse: Function,
  goToExcuseStep: Function,
  enabled: boolean,
  type: string,
  toggleAllExamExcuses: Function,
  checkedlist: Array<number>,
  exams: Array<Object>
};

class FirstStep extends React.Component<FirstStepType> {
  render (): React.Element<'div'> {
    const { checkedlist, exams, toggleExamExcuse, enabled, type } = this.props
    const hasChecked = checkedlist.length > 0
    const hasWithoutExcuse = exams.findIndex((e: Object): boolean =>
      (e.excuseStatus === null || e.excuseStatus === 'refused') && e.type === type && e.attended === 0) >= 0
    const canSend = exams.filter((e: Object): boolean => {
      return checkedlist.indexOf(e.id) > -1
    }).length
    return (<div>
      <h4 className='p-b-3 text-xs-center font-weight-bold'>{enabled ? 'اختر مواد الإعتذار' : 'متابعة الأعذار'}</h4>
      <button className={`btn btn-lg btn-white pull-left c-exam-row-excuse-table__checkall
        ${(!hasWithoutExcuse || !enabled) ? 'hidden-xs-up' : ''}`} onClick={this._checkAll}>
        <span className={`${hasChecked ? 'hidden-xs-up' : ''}`}>تحديد الكل</span>
        <span className={`${!hasChecked ? 'hidden-xs-up' : ''}`}>إلغاء التحديد</span>
        <Icon name={`checkbox-${canSend ? 'checked' : 'unchecked'}`} className='m-r-2' />
      </button>
      {exams.map((e: Object): React.Element<typeof ExamRowExcuseTableElement> => <ExamRowExcuseTableElement
        onCheckExam={toggleExamExcuse}
        checked={checkedlist.findIndex((c: number): boolean => c === e.id) >= 0}
        enabled={enabled}
        key={e.id}
        exam={e} />)}
      <footer className={`text-xs-center p-y-3 c-exam-row-excuse-table__footer m-t-3
        ${!canSend ? 'hidden-xs-up' : ''}`} >
        <button className='btn btn-gray btn-lg p-x-3' disabled={!canSend} onClick={this._next}>
          التالي
        </button>
      </footer>
    </div>)
  }

  _checkAll = () => {
    const { exams, toggleAllExamExcuses, checkedlist, type } = this.props
    let examsIds = []
    if (!checkedlist.length) {
      examsIds = exams.reduce((p: Array<number>, c: Object): Array<number> =>
        ((c.excuseStatus === 'refused' || c.excuseStatus === null) && !c.attended) && c.type === type
        ? p.concat(c.id) : p, [])
    }
    toggleAllExamExcuses(examsIds)
  }

  _next = () => {
    const { goToExcuseStep } = this.props

    goToExcuseStep(2)
  }
}

export default FirstStep
