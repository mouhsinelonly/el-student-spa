// @flow
import * as React from 'react'
import Covid from 'static/img/covid.jpg'
import { Link } from 'react-router'
//  import css
import './style.scss'

type PropertiesType = {
  accept: string,
  refuse: string,
  title: string,
  children: React.Node,
  body: string,
  closeModal: Function,
  onAnswerYes: Function
};

const CovidModal = ({ accept, refuse, title, body, closeModal, onAnswerYes, children }: PropertiesType): React.Component<Props> =>
(<div className='modal-body shadow-modal c-yes-modal p-a-0 text-xs-center'>
    <img src={Covid} style={{ maxWidth: '100%' }} />
    <h5 className='font-weight-bold p-t-3 p-b-2'>فتح اختيار يوم استلام الكتب</h5>
    <p className='p-x-3' style={{ color: '#777d84', fontSize: 15, lineHeight: '2' }}>
      تجاوبا مع الظروف التي تمر بها البلاد وتنظيما لحركة استلام الكتب فقد تقرر تقسيم الطلاب لمجموعات وفق أيام الأسبوع المتاحة لاستلام كتبهم بدءا من يوم <b style={{ color: '#50555a' }}>الأحد 29 مارس</b> . لذا يرجى اختيار اليوم المناسب علما أن الأولوية ستكون وفق المبادرة ثم الانتقال لليوم المتاح وهكذا .
    </p>
    <Link className='btn btn-success m-b-2' to='/student/market'>اختيار يوم الاستلام</Link>
</div>)

export default CovidModal
