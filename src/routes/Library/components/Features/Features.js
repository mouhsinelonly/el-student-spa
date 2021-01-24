// @flow
import * as React from 'react'
import Search from 'components/Svg/Search'
import Book from 'components/Svg/Book'
import BookmarkClock from 'components/Svg/BookmarkClock'
import Star from 'components/Svg/Star'
import './Features.scss'

type PropsType = {};

const features = [
  {
    id: 0,
    title: 'أدوات بحثية',
    desc: 'محرك بحث متقدم للكتب و للقرآن الكريم يضمن لك الوصول  السهل و السريع للمعلومة',
    icon: <Search />
  },
  {
    id: 1,
    title: 'استعارة',
    desc: 'توفر المكتبة خدمة استعارة الكتب و التحميل المباشر',
    icon: <BookmarkClock />
  },
  {
    id: 2,
    title: 'إعداد البحوث',
    desc: 'توفر للباحثين تجميع و تعديل و تصدير البحوث المجمعة من خلال تصفح كتب المكتبة إلكترونيا',
    icon: <Book />
  },
  {
    id: 3,
    title: 'تحديث مستمر',
    desc: 'تحديثات و تحسينات في الخدمات المقدمة، بالإضافة إلى مئات الكتب تضاف شهريا',
    icon: <Star />
  }
]

const Features = (props: PropsType): React.Element<'div'> => {
  return (
    <div className='c-library-description container p-y-3 text-xs-center'>
      {features.map((f: Object): React.Element<'div'> => <div key={f.id} className='col-xs-12 col-md-3 p-y-3'>
        {f.icon}
        <h4 className={`${f.id % 2 ? 'is-odd' : ''} c-library-description__title p-y-1`}>{f.title}</h4>
        <p className='c-library-description__desc'>{f.desc}</p>
      </div>)}
    </div>
  )
}

export default Features
