// @flow
import * as React from 'react'
import './style.scss'

import naif from 'static/img/naif.png'
import saadiya from 'static/img/saadiya.png'
import rashif from 'static/img/rashif.png'
import awqaf from 'static/img/awqaf.png'
import iraqi from 'static/img/iraqi.png'

type PropsType = {};

const resources = [
  { id: 1, name: 'المكتبة العمانية وزارة الأوقاف و الشؤون الدينية', img: awqaf, link: 'http://elibrary.om/' },
  { id: 2, name: 'رشف قاعدة بيانات الكتب تاعربية', img: rashif, link: 'https://rashf.com/' },
  { id: 3, name: 'المكتبة السعيدية', img: saadiya, link: 'https://alsaidia.com/about' },
  { id: 4, name: 'العراقية المجلات الاكاديمية العلمية', img: iraqi, link: 'https://www.iasj.net/iasj?uiLanguage=ar' },
  { id: 5, name: 'جامعة نايف العربية للعلوم الأمنية', img: naif, link: 'https://repository.nauss.edu.sa/' },
]

const LearningResources = (props: PropsType): React.Element<'div'> => {
  return (
    <>
      <h1 className='text-xs-center p-b-3 LearningResources__header'>مصادر التصفح الحرة</h1>
      <div className='container'>
        <div className='row'>
          {resources.map((r: Object): React.Element<'a'> =>
            <a href={r.link}
              key={r.id}
              target='_blank'
              className='col-xs-4 m-b-3'><img src={r.img} alt={r.name} /></a>)}
        </div>
      </div>
    </>
  )
}

export default LearningResources
