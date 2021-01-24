// @flow
import * as React from 'react'
import './style.scss'
import YellowDone from 'components/Svg/YellowDone'
import { Link } from 'react-router'
import { getYoutubeId } from 'utils'

type PropsType = {
  storeVlog: Function,
  period: Object,
  firstTime: boolean,
  profile: Object
};

const Home = ({ firstTime, period, profile: { name }, storeVlog }: PropsType): Array<React.Element<'div'>> => {
  const hasVlog = period !== null && period.vlog !== null
  if (!hasVlog) return []
  return [<div className='c-vlog-Edit' key='home'>
    <div className='container c-vlog-Edit__content'>
      <div className='row p-t-3'>
        <div className='col-xs-12 col-md-8 col-lg-6 col-lg-pull-3 col-md-pull-2 p-t-3 text-xs-center'>
          <YellowDone animate={firstTime} width={90} height={90} />
          <h1 className='c-vlog-Edit__title p-y-2'>تم تسجيل مشاركتك بنجاح</h1>
          <p className='c-vlog-Edit__desc'>رائع، لقد تم تسجيلك فيديو مشاركتك في مسابقة الآراء المرئية يمكنك تعديل مشاركتك قبل انتهاء فترة المسابقة</p>
          <VideoPreview {...period.vlog} />
          <BadgeInfo {...period.vlog} name={name} onToggle={storeVlog} />
        </div>
      </div>
    </div>
  </div>,
    <div className='c-vlog-Edit__action text-xs-center' key='action'>
      <Link to='/student/vlog/submit' className='btn btn-lg p-x-3 is-first
      btn-purple-outline c-vlog-Edit__btn-outline c-vlog-Edit__btn' >
          تغيير المشاركة
      </Link>
      <Link to='/student/community'
        className={`${firstTime ? '' : 'hidden-xs-up'} btn btn-lg p-x-3 btn-purple c-vlog-Edit__btn is-full`} >
          حسنا خروج
      </Link>
    </div>]
}

type VideoPreviewType = {
  link: string,
  title: string,
  duration: string
};

const VideoPreview = ({ link, duration, title }: VideoPreviewType): React.Element<'a'> =>
  <a href={link} target='_blank' className='c-vlog-VideoPreview m-t-3 text-xs-right'>
    <div className='col-xs-4 p-a-0'>
      { link
    ? <img src={`//img.youtube.com/vi/${getYoutubeId(link)}/hqdefault.jpg`}
      className='img-fluid c-vlog-VideoPreview__img' />
    : '' }
    </div>
    <div className='col-xs-8 c-vlog-VideoPreview__title-cont'>
      <div className='c-vlog-VideoPreview__title'>{title}</div>
      <span className='c-vlog-VideoPreview__duration'>{duration}</span>
    </div>
  </a>

type BadgeInfoType = {
  badge: boolean,
  name: string,
  onToggle: Function
};

const BadgeInfo = ({ badge, name, onToggle }: BadgeInfoType): React.Element<'div'> =>
  <div className='c-vlog-BadgeInfo m-t-3 text-xs-right p-a-2'>
    <h5 className='c-vlog-BadgeInfo__title'>{ name }
      {badge ? <YellowDone width='22' height='22'
        className='c-vlog-BadgeInfo__badge m-r-1' /> : null} </h5>
    <p className='c-vlog-BadgeInfo__desc'>
      لقد حصلت على وسم المشاركة٫ عند اختيار اظهاره سيتم عرضه بجانب اسمك في مشاركاتك بالمجتمع
    </p>
    <label className={`${badge ? 'is-active' : ''} c-vlog-BadgeInfo__toggle`}
      onClick={(): Function => onToggle({ badge: !badge })} >الوسم {!badge ? 'مخفي' : 'ظاهر'}</label>
  </div>

export default Home
