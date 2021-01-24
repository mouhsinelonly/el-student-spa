// @flow
import React from 'react'
import { Link } from 'react-router'
import WordIcon from 'static/img/wordicon@2.png'
import { noteNumberToString } from 'utils'
import './DraftBlock.scss'

type DraftType = {
  heading: string,
  filetype: string,
  stepType: string,
  last: boolean,
  isSiminar: boolean,
  id: number,
  approved: boolean,
  totalNotes: number,
  status: string,
  description: string,
  createdAt: string,
  filePath: string
};

const DraftBlock = ({
  heading,
  filetype,
  filePath,
  createdAt,
  totalNotes,
  stepType,
  description,
  approved,
  id,
  isSiminar,
  last,
  status
 }: DraftType): React.Element<'div'> =>
   <div className='ThesisPortal__draft my-panel-white shadow-1 m-b-1'>
     {typeof status !== 'undefined' && (last || status.includes('none') || totalNotes > 0) && !isSiminar
     ? <div className={`${(last && !approved) && 'is-last'} ${(status === 'none' || approved) && 'is-success'} 
     p-a-1 ThesisPortal__draft-notification ${approved ? 'text-xs-center' : null}`}>
       { (status === 'none' && totalNotes === 0) ? 'لا ملحوظات لدى المشرف على الملف' : null }
       {(totalNotes > 0 && !approved) ? `قام المشرف بوضع ${noteNumberToString(totalNotes)} على الملف` : null}
       {approved ? <span><i
         className='material-icons'
         style={{ display: 'inline-block', verticalAlign: 'middle' }} >check_circle</i> وافق المشرف على {stepType === 'upload' ? 'خطة' : ''} البحث</span> : ''}
       {totalNotes > 0 && !approved
      ? <Link to={`/student/thesis_draft/${id}`} className={`ThesisPortal__draft-button ${last && 'is-last'}`}>عرض الملحوظات</Link>
      : null }
     </div> : null }
     <section className='p-a-1 ThesisPortal__draft-header'>
       <a href={filePath} download className='ThesisPortal__draft-word'>
         <img src={WordIcon} alt='work' width='76' />
       </a>
       <div>
         <h6 className='font-weight-bold p-r-1' style={{ marginTop: 4 }}>
           {stepType === 'upload' ? 'خطة' : ''} البحث
           {['none', 'review'].includes(status)
           ? <div className='ThesisPortal__draft-label m-r-1 font-helvetica'>تسليم للمراجعة</div>
           : <div className='ThesisPortal__draft-label m-r-1 font-helvetica is-approval'>
             {isSiminar ? 'الخطة المعتمدة' : 'تسليم للاعتماد'}
           </div>}
         </h6>
         <div className='p-r-1 ThesisPortal__draft-labels'>
           <div><b>بداية نص الملف :</b> {heading}</div>
           <div><b>بتاريخ :</b> {createdAt}</div>
         </div>
       </div>
     </section>
     {description ? <footer className='p-a-1 ThesisPortal__draft-footer'>
       <h6 className=' font-weight-bold' style={{ fontSize: 14 }}>وصف الملف</h6>
       {description}
     </footer> : null}
   </div>

export default DraftBlock
