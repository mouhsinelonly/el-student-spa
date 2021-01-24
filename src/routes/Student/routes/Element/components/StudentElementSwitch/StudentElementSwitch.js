// @flow
import React, { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import './StudentElementSwitch.scss'

type PropsType = {
  nextDisabled: boolean,
  prevDisabled: boolean,
  elementType: string,
  downloadable: boolean,
  selectedTitle: string,
  fileUrl: string,
  commentActive: boolean,
  toggleComment: Function,
  onPrevClick: Function,
  onNextClick: Function,
  elements: Array<Object>
};

const StudentElementSwitch = memo((props: PropsType): React.Element<'div'> => {
  const { isMobile } = useSelector((state: Object): Object => state.ui)
  const _goToPage = useCallback((e: Object) => {
    browserHistory.push(`/student/element/${e.target.value}`)
  }, [])
  return (<div className={`row ${props.commentActive && 'StudentElementSwitch__is-active'}`}>
    <div className='col-xs-12 col-md-10 col-md-pull-1 StudentElementSwitch text-xs-center'>
      <div className='col-xs-2 col-md-3 StudentElementSwitch__columns'>
        <button
          onClick={props.onPrevClick}
          disabled={props.prevDisabled}
          className='StudentElementSwitch__control btn btn-block btn-sm is-full btn-curved btn-secondary'
        >
          <span className='hidden-xs-down'>{props.elementType === 'PDF' ? ' تصفح' : 'مشاهدة'} الدرس السابق</span>
          <span className='hidden-sm-up'><i className='material-icons'>keyboard_arrow_right</i></span>
        </button>
      </div>
      <div className='col-xs-8 col-md-6 StudentElementSwitch__columns'>

        {props.elementType !== 'فيديو' &&
          <div className='StudentElementSwitch__select-cont'>
            <select onChange={_goToPage} className={`btn btn-sm btn-curved btn-secondary StudentElementSwitch__select ${isMobile && 'is-mobile'}`}>
              {props.elementType !== 'فيديو'
                ? props.elements.filter((l: Object): string => l.type === 'PDF')
                .map((l: Object): React.Element<'li'> => (
                  <option selected={l.title === props.selectedTitle} value={l.id} key={l.id}>{l.title}</option>))
                : null}
            </select>
            <i className='material-icons'>arrow_drop_down</i>
          </div> }
        { isMobile && <button
          onClick={props.toggleComment}
          className={`StudentElementSwitch__control btn btn-sm btn-curved btn-secondary ${props.commentActive && 'is-active'}`}
          >
          <i className='material-icons'>{props.commentActive ? 'close' : 'comment'}</i>
          </button>}
        { (props.fileUrl && props.elementType === 'PDF' && props.downloadable) ? <a download='download' href={props.fileUrl}
          className='btn btn-sm btn-curved btn-secondary StudentElementSwitch__control'>
          <i className='material-icons' style={{ display: 'inline-block', verticalAlign: 'middle' }}>save_alt</i>
          <span className='hidden-xs-down'>تحميل</span>
        </a> : null }
      </div>
      <div className='col-xs-2 col-md-3 StudentElementSwitch__columns'>
        <button
          onClick={props.onNextClick}
          disabled={props.nextDisabled}
          className='StudentElementSwitch__control is-full btn btn-block btn-sm btn-curved btn-secondary'
        >
          <span className='hidden-xs-down'>{props.elementType === 'PDF' ? ' تصفح' : 'مشاهدة'} الدرس التالي</span>
          <span className='hidden-sm-up'><i className='material-icons'>keyboard_arrow_left</i></span>
        </button>
      </div>
      <div className='clearfix' />
    </div>
  </div>)
})

export default StudentElementSwitch
