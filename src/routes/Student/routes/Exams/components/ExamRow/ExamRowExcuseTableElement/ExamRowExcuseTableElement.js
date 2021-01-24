// @flow
import * as React from 'react'
import moment from 'moment'
import Icon from 'components/Icon'
import './style.scss'
import { degreeNumberToString } from 'utils'

const excuseTexts = {
  waiting: 'جاري المُراجعة',
  accepted: 'تَم قَبول العُذر',
  refused: 'تَم رفض العُذر',
  uncomplete: 'غير مُكتمل',
  complete: 'مُكتمل'
}

type PropsType = {
  exam: Object,
  onCheckExam: Function,
  checked: boolean,
  enabled: boolean
};

class ExamRowExcuseTableElement extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { exam: { id, name, start_at, finish_at, excuseStatus,
      attended, type, excuseGrade, excuseComment }, checked, enabled } = this.props
    let customExcuseComment = excuseComment
    const startAt = moment(start_at)
    const finishAt = moment(finish_at)
    const hasExcuse = excuseStatus !== null && excuseStatus !== 'refused'
    // const finalGrade = isQuran ? 60 : 65
    let buttonClass = ''
    switch (excuseStatus) {
      case 'waiting':
        buttonClass = 'info'
        break
      case 'accepted':
        buttonClass = 'success'
        break
      case 'refused':
        buttonClass = 'danger'
        break
      case 'uncomplete':
        buttonClass = 'warning'
        break
    }
    const canChoose = enabled && !hasExcuse && !attended
    if (excuseStatus === 'accepted' && type !== 'final' && excuseGrade) {
      customExcuseComment = `تم ترحيل ${degreeNumberToString(excuseGrade)} إلى الامتحان النهائي`
    } else if (excuseStatus === 'accepted' && type === 'final' && excuseGrade >= 0) {
      // excuseTexts.accepted = excuseComment
    }

    return (<div className={`c-exam-row-excuse-element text-xs-center p-y-2 m-x-3
      ${canChoose ? 'can-checked' : ''}
      ${checked ? 'is-checked' : ''}`}
      onClick={(!hasExcuse && !attended && canChoose) ? this._check : this._doNothing}>
      <div className={`col-xs-12 col-md-3 col-lg-2`}>
        <strong>{name}</strong>
      </div>
      <div className='col-xs-12 col-md-3'>
        {`${startAt.format('dddd')} ${startAt.locale('en').format('DD')} ${startAt.locale('ar-SA').format('MMMM')}`}
      </div>
      <div className='col-xs-12 col-md-2'>
        من {startAt.locale('en-us').format('hh:mm')} {startAt.format('a') === 'am' ? 'صباحا' : 'مساء'}
      </div>
      <div className='col-xs-12 col-md-2'>
        إلى {finishAt.locale('en-us').format('hh:mm')} {finishAt.format('a') === 'am' ? 'صباحا' : 'مساء'}
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3 text-xs-right
        ${(!excuseComment && excuseStatus === null) ? 'hidden-xs-up' : ''}`}>
        <span className={`btn btn-${buttonClass}-light btn-block c-exam-row-excuse-element__status`}
          onClick={excuseComment ? this._toggleComment : this._doNothing}>
          {excuseTexts[excuseStatus]} {excuseComment
          ? <span ref={`excusecommentplus${id}`} className='c-exam-row-excuse-element__plus'>+</span> : ''}
        </span>
        <span ref={`excusecomment${id}`}
          className={`c-exam-row-excuse-element__tip ${!excuseComment ? 'hidden-xs-up' : ''}`}>
          {excuseComment}
        </span>
      </div>
      <div className={`col-xs-12 col-md-2 col-lg-3 text-xs-center
        ${!canChoose ? 'hidden-xs-up' : ''}`}>
        <Icon name={`checkbox-${checked ? 'checked' : 'unchecked'}`} />
        {excuseStatus === 'refused' ? <div className='text text-danger'>رُفِضَ عُذرك</div> : ''}
      </div>
      <div className='clearfix' />
    </div>)
  }

  _check = () => {
    const { onCheckExam, exam: { id } } = this.props
    onCheckExam(id)
  }

  _doNothing = () => {}

  _toggleComment = (e: Object) => {
    e.stopPropagation()
    const { exam: { id } } = this.props
    const commentStyle = this.refs[`excusecomment${id}`].style
    const commentPlus = this.refs[`excusecommentplus${id}`]
    commentStyle.display = commentStyle.display === 'block' ? 'none' : 'block'
    commentPlus.innerHTML = commentPlus.innerHTML === '+' ? '-' : '+'
  }
}

export default ExamRowExcuseTableElement
