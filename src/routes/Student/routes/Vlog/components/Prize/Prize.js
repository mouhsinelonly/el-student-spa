// @flow
import * as React from 'react'
import './style.scss'

type PropsType = {
  title: string,
  amount: number,
  id: number
};

const Prize = ({ title, amount, id }: PropsType): React.Element<'div'> => {
  return (
    <div className={`c-vlog-Prize text-xs-center ${id === 3 ? 'is-third' : ''} ${id === 2 ? 'is-second' : ''}`}>
      <div className={`c-vlog-Prize__header p-y-1`}>
        {title}
      </div>
      <div className='p-y-1'>
        خصم
        <div className='c-vlog-Prize__amount'>
          {amount}
        </div>
        {amount >= 100 ? 'ريال عماني' : 'ريالا عمانيا' }
      </div>
    </div>
  )
}
Prize.defaultProps = {
  title: 'المركز الأول',
  amount: 50
}

export default Prize
