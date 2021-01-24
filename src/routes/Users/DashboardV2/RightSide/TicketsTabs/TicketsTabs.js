// @flow
import React, { useCallback } from 'react'
import './style.scss'

type PropsType = {
  total: number,
  answeredTotal: number,
  setActiveTab: Function,
  activeTab: number
};

const TicketsTabs = (props: PropsType): React.Element<'ul'> => {
  const { total, activeTab, answeredTotal, setActiveTab } = props
  const handleSetActiveTab = useCallback((e: Object) => {
    if (e.target.tagName === 'LI') {
      setActiveTab(parseInt(e.target.dataset.index))
    }
  }, [])

  return (
    <ul className='v2-tickets-tabs'>
      <li onClick={handleSetActiveTab}
        data-index={0} className={`v2-tickets-tabs__item text-xs-center p-y-1
          ${activeTab === 0 ? ' is-active' : ''}`}>جديد
        <span className='badge'>{total}</span>
      </li>
      <li onClick={handleSetActiveTab}
        data-index={1} className={`v2-tickets-tabs__item text-xs-center p-y-1
          ${activeTab === 1 ? ' is-active' : ''}`}>
            تم الرد
        <span className='badge'>{answeredTotal}</span>
      </li>
      <li onClick={handleSetActiveTab}
        data-index={2} className={`hidden-xs-up v2-tickets-tabs__item text-xs-center p-y-1
          ${activeTab === 2 ? ' is-active' : ''}`}>محول</li>
      <li onClick={handleSetActiveTab}
        data-index={3} className={`hidden-xs-up v2-tickets-tabs__item text-xs-center p-y-1
          ${activeTab === 3 ? ' is-active' : ''}`}>مغلق</li>
    </ul>
  )
}

export default TicketsTabs
