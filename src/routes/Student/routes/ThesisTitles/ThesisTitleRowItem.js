// @flow
import React from 'react'

type PropertiesType = {
  title: string,
  id: number,
  onChoose: Function,
  enabled: boolean,
  isChosen: number,
  onCopy: Function,
  onUnchoose: Function
};

const ThesisTitleRowItem = ({ onUnchoose, title, id, onCopy, onChoose, isChosen, enabled }: PropertiesType): React.Node => 
  <div className={`col-xs-12 col-md-6 ThesisTitles__title-container ${!enabled ? 'is-disabled' : ''}`}>
    <div onClick={onCopy}
      role='presentation'
      data-content={title}
      className={`ThesisTitles__title font-helvetica p-y-1 ${isChosen && 'is-chosen'}`} key={id}>
      <i className='material-icons'>content_copy</i> {title}
    </div>
    { (enabled && !isChosen) ? <button className='m-r-2 ThesisTitles__cta' onClick={onChoose} data-id={id}>
      حجز العنوان
    </button> : null }
    { (isChosen) ? <button className='m-r-2 hidden-xs-up ThesisTitles__cta is-cancel' onClick={onUnchoose} data-id={id}>
      إلغاء الحجز
    </button> : null }
    { isChosen ? <button style={{ pointerEvents: 'none' }} className={`m-r-2 ThesisTitles__cta ${isChosen ? 'is-chosen' : ''}`}>
      تم الحجز
    </button> : null }
  </div>

export default ThesisTitleRowItem
