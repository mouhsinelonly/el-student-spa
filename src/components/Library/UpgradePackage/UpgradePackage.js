// @flow
import * as React from 'react'
import './style.scss'
import { Link } from 'react-router'
type PropsType = {};

const UpgradePackage = (props: PropsType): React.Element<'a'> => {
  return (
    <Link className='c-library-upgrade-package p-l-3 p-t-2' to='/library/plans'>
      <h1 className='c-library-upgrade-package__title'>الترقية للخطة المدفوعة</h1>
      <span className='c-library-upgrade-package__desc'>لتصل لكل كتب المكتبة٫ قم بالترقية الآن</span>
    </Link>
  )
}

export default UpgradePackage
