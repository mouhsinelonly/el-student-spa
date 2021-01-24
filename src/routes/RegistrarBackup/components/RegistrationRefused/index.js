import React from 'react'
// import css
import './style.scss'

export const RegistrationRefused = (props) => (<div className='c-registration-refused__container p-y-3'>
  <div className='container'>
    <div className='row'>
      <div className='col-xs-12 col-md-10 col-md-pull-1'>
        <div className='c-registration-refused__panel'>
          <header className='c-registration-refused__panel__header p-a-2 text-xs-center'>
        {`تأسف إدارة التعليم عن بعد بكلية العلوم الشرعية أن تشعركم بأنه قد
          تم إلغاء طلبكم للإلتحاق بالدراسة للعام الدراسي الحالي.`}
          </header>
          <footer className='c-registration-refused__panel__footer p-a-2 p-x-3 text-xs-center'>
            {`إذا كان لديكم الرغبة في الإلتحاق بالتعليم عن بعد للعام الدراسي
              القادم ،فسيتم اشعارك عبر البريد الإلكتروني و رسالة نصية عند بداية التسجيل.`}
          </footer>
        </div>
      </div>
    </div>
  </div>
</div>)

export default RegistrationRefused
