// @flow
import * as React from 'react'
import { Link } from 'react-router'
import { Helmet } from 'react-helmet'
type PropsType = {};

const NotFound = (props: PropsType): React.Element<'div'> => {
  return (
    <div className='text-xs-center p-t-3 container'>
      <Helmet>
        <title>404</title>
        <meta name='description' content='404' />
      </Helmet>
      <div className='row'>
        <div className='col-xs-12 col-md-4 col-md-pull-4 p-t-2'>
          <h3>الصفحة غير موجودة</h3>
          <p className='p-t-3'>ربما اتبعت رابط خاطئ او تحاول الدخول لصفحة لم تعد موجودة في النظام</p>
          <br />
          <Link to='/' className='m-t-3 btn btn btn-light'>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
