// @flow
import * as React from 'react'
import Header from './components/Header'
import Prize from './components/Prize'
import { Link } from 'react-router'
import JOYRIDES from 'utils/joyrides'
import './style.scss'

type PropsType = {
  period: Object,
  joyrides: Array<Object>
};

const prizes = [
  { title: 'المركز الأول', amount: 100, id: 1 },
  { title: 'المركز الثاني', amount: 75, id: 2 },
  { title: 'المركز الثالث', amount: 50, id: 3 }
]

const Home = ({ period, joyrides }: PropsType): Array<React.Element<'div'>> => {
  const hasPeriod = period !== null && typeof period.id !== 'undefined'

  const hasVlog = period !== null && typeof period.id !== 'undefined' && period.vlog !== null

  const firstTimeVisit = joyrides.findIndex((j: Object): boolean =>
            j.slug === JOYRIDES['redirect_to_community_vlog'] && j.first_time === true) > 0
  // console.log(firstTimeVisit)
  if (!hasPeriod) return [<div />]
  return [<div className='c-vlog-Home' key='vlog-home'>
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-md-pull-2 p-t-3'>
          <Header total={period.total} remaining={period.remaining_days} />
          <h6 className='font-weight-bold c-vlog-Home__listhead m-t-3'>ما الذي نريده منك في هذه المسابقة؟</h6>
          <p>
            تعبر بشكل مبدع حول أثر التعليم عن بعد في حياتك اليومية وهذه بعض الأفكار التي يمكنك الانطلاق منها
          </p>
          <ul className='m-a-0  c-vlog-Home__list m-t-3'>
            <li>لماذا قررت الدراسة عن بعد ؟</li>
            <li>كيف أثر هذا في حياتك اليومية؟ وكيف كانت حياتك اليومية قبل وبعد الدراسة؟</li>
            <li>ما المشاكل التي واجهتك مع الدراسة وكيف حللت هذه المشاكل بعد الدراسة معنا؟</li>
            <li>ما روتينك اليومي الخاص بالدراسة عن بعد ؟</li>
            <li>هل غيرت من مسارك الوظيفي أثناء دراستك في التعليم عن بعد؟</li>
            <li>ما هي أهدافك بعد التخرج؟ وكيف ستساعدك شهادتك في تحقيق هذه الأهداف؟</li>
          </ul>
          <h6 className='font-weight-bold c-vlog-Home__listhead m-t-3'>ملحوظات</h6>
          <ul className=' c-vlog-Home__list'>
            <li>لا يتطلب المشاركة في المسابقة دراية بالتصوير والمونتاج، لا تحتاج استخدام معدات احترافية، بل يكفي أن تسجل الفيديو بهاتفك الشخصي</li>
            <li>لا نبحث في هذه المسابقة عن الفيديو الأكثر احترافية بقدر ما نبحث عن مدى الإبداع والمصداقية في التعبير حول  تأثير التعليم عن بعد على حياتك اليومية</li>
          </ul>
          <h6 className='font-weight-bold c-vlog-Home__listhead m-t-3'>كيفية المشاركة</h6>
          <ul className=' c-vlog-Home__list'>
            <li>قم بتسجيل فيديو من 5 إلى 15 دقيقة</li>
            <li>قم برفعه على موقع يوتيوب، <a target='_blank' style={{ color: '#777d84', textDecoration: 'underline' }} href={period.howto_video}>شرح طريقة الرفع</a></li>
            <li>انسخ الرابط و قم بإرساله في صفحة المشاركة بالمجتمع</li>
          </ul>
          <h6 className='font-weight-bold c-vlog-Home__listhead m-t-3'>كيف ستجري المسابقة؟</h6>
          <ul className=' c-vlog-Home__list'>
            <li>سنقوم باختيار أفضل عشرة فيديوهات ونقوم بنشرها في صفحتنا على اليوتيوب</li>
            <li>
              الفيديوهات الثلاثة التي ستحصل على أعلى عدد من الإعجابات والتعليقات ستحصل على <b>خصم من رسوم الدراسة</b> في الفصل القادم كالتالي
            </li>
          </ul>
          <div className='m-t-3' />
          {prizes.map((p: Object): React.Element<'div'> => <div className='col-xs-12 col-md-4 m-b-2' key={p.id} >
            <Prize {...p} /></div>)}
        </div>
      </div>
    </div>
    </div>,
    <div className='c-vlog-Home__action text-xs-center' key='vlog-action'>
      <Link to='/student/vlog/submit' className='btn btn-lg btn-purple c-vlog-Home__action-btn'>
        {!hasVlog ? 'أرسل مشاركتك' : 'تعديل مشاركتك'}
      </Link>
      <Link to='/student/community' className={`btn btn-lg btn-purple c-vlog-Home__action-btn
        ${!firstTimeVisit ? 'hidden-xs-up' : ''} is-filled`}>
        حسنا، خروج
      </Link>
    </div>]
}

Home.defaultProps = {
  joyrides: []
}

export default Home
