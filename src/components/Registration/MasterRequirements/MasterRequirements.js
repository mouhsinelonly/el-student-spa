// @flow
import * as React from 'react'
import './MasterRequirements.scss'
import Icon from 'components/Icon'

type PropsType = {};

const specialties = [
  {
    id: 1,
    icon: 'maj-diploma',
    odd: 1,
    title: 'حاصل على البكالوريوس',
    content: `أن يكون المتقدم حاصلاً على الشهادة الجامعية الأولى «البكالوريوس» أو ما يعادلها من أي
    مؤسسة أكاديمية معترف بها في التخصصات الشرعية.`
  },
  {
    id: 2,
    icon: 'maj-gpa',
    odd: 0,
    title: 'المعدل التراكمي',
    content: `ألا يقل معدله التراكمي عن (2,75) من نظام يتكون من " 4,00".`
  },
  {
    id: 3,
    icon: 'maj-test',
    odd: 1,
    title: 'اجتياز اختبارات القبول',
    content: `اجتياز اختبارات القبول التي يعقدها مجلس الدراسات العليا  للمفاضلة بين المتقدمين الذين ينطبق عليهم شروط القبول وحصلوا على إشعار القبول المبدئي، وتحدد طبيعتها وكيفية أداءها للمتقدم من خلال إشعار القبول المبدئي.`
  },
  {
    id: 4,
    icon: 'maj-failed',
    odd: 0,
    title: 'أن لا يكون مفصولا',
    content: `أن لا يكون مفصولا من البرنامج الذي يتقدم إليه بالمركز.`
  },
  {
    id: 5,
    icon: 'maj-level',
    odd: 1,
    title: 'المكانة العلمية و الخبرات',
    content: `تعد المكانة العلمية والخبرات مرجحا في القبول.`
  }
]

const MasterRequirements = (props: PropsType): React.Element<'div'> => {
  return <>
    <div className='row p-t-3' key='cols'>
      {specialties.map((s: Object): React.Element<'div'> => <div key={s.id} className='col-xs-12 col-md-4'>
        <div className='MasterRequirements__item'>
          <Icon name={s.icon} />
          <h4 className={`MasterRequirements__item-title p-y-2 ${s.odd ? 'is-odd' : ''}`}>{s.title}</h4>
          <p className='MasterRequirements__item-desc'>
            {s.content}
          </p>
        </div>
      </div>)}
    </div>
    <div className='row' key='note'>
      <div className='col-xs-12 col-md-8 col-md-pull-2'>
        <p className='MasterRequirements__note p-y-1'>
        لمجلس المركز أن يضيف إلى هذه الشروط العامة ما يراه ضروريا على حسب مستجدات الواقع و تطوراته
        </p>
      </div>
    </div>
  </>
}

export default MasterRequirements
