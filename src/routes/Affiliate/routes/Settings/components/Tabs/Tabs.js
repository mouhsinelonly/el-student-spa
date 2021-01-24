// @flow
import React, { useCallback } from 'react'
import './Tabs.scss'

type PropsType = {
  activeId: string,
  onTabChange: Function
};

const ITEMS = [
  {
    text: 'بيانات الدخول',
    id: 'login'
  },
  {
    text: 'إعدادات الإحصائيات',
    id: 'analytics'
  },
  {
    text: 'البنك والدفع',
    id: 'bank'
  },
]
const Tabs = (props: PropsType): React.Element<'div'> => {
  const onClick = useCallback((e: Object) => {
    props.onTabChange(e.target.dataset.id)
  })
  return <div className='container'>
    <div className='row'>
      <div
        className='col-xs-12 col-md-8 col-lg-6 col-md-pull-4 col-lg-pull-3'>
        <ul className='Affiliate-Settings-Tabs text-xs-center'>
          { ITEMS.map((i: Object): React.Element<'li'> => <li data-id={i.id} onClick={onClick}
            className={`Affiliate-Settings-Tabs__item 
            ${props.activeId === i.id && 'is-active'}`}
            key={i.id}>{i.text}</li>) }
        </ul>
      </div>
    </div>
  </div>
}

export default Tabs
