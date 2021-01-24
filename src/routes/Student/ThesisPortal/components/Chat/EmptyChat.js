// @flow
import React from 'react'
import Comment from 'components/Svg/Comment'

const EmptyChat = (): React.Element<'div'> => <div className='font-helvetica text-xs-center'
  style={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: '#777d84' }}>
  <div className='text-xs-center'>
    <Comment />
    <h5 className='font-weight-bold p-t-1'>ابدأ مراسلة المشرف</h5>
    <p className='p-x-2' style={{ fontSize: 14 }}>
    التواصل مع المشرف، وإطلاعه على تفاصيل البحث، من العوامل الأساسية في نجاح مشروع بحثك
    </p></div>
</div>

export default EmptyChat
