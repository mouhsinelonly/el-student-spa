// @flow
import * as React from 'react'
import { Link } from 'react-router'
import './style.scss'
type PropsType = {
  total: number
};

const UpradeHidden = (props: PropsType): React.Element<typeof Link> => {
  return (
    <Link className='UpgradeHidden p-t-3 p-b-2 text-xs-center' to='/library/plans' {...props}>
      <h1 className='UpgradeHidden__title'>
        هناك {props.total} نتيجة مخفية
      </h1>
      <span className='UpgradeHidden__desc'>
        للحصول على كل النتائج ينبغي عليك الترقية للخطة المدفوعة
      </span>
      <button className='btn btn-purple btn-lg m-t-2 p-x-2'>
        عرض خطط الترقية
      </button>
    </Link>
  )
}

UpradeHidden.defaultProps = {
  total: 0
}

export default UpradeHidden
