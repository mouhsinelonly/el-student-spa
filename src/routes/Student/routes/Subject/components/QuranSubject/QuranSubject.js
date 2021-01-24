// @flow
import * as React from 'react'
import './style.scss'
import Icon from 'components/Icon'
import { Link } from 'react-router'
type PropType = {
  quranPageEnd: number,
  partTitle: string,
  tilawa_grade_old: number,
  quranPageStart: number,
  showMoreDetails: Function,
  hideMoreDetails: Function,
  showmore: boolean,
  start_ayah: string,
  id: number,
  stusubold: Array<Object>,
  end_ayah: string
};

const details = [
  // {
  //   title: 'ما المطلوب مني ؟',
  //   desc: `في هذه المادة ينبغي عليك حفظ هذا الجزء و إتقان تلاوته، حيث ستختبر في كليهما - حفظ و تلاوة -.
  //   و الإختبارات محددة بمدة زمنية محددة و تواريخ محددة.`
  // },
  {
    title: 'كيف أجتاز إختبار الحفظ ؟',
    desc: `يتم إختبار حفظك للجزء في الإختبار النهائي على شكل أسئلة منها ما يتم طلب منك كتابة بعض الآيات من هذا الجزء.`
  },
  {
    title: 'كيف أجتاز إختبار التلاوة ؟',
    desc: `يتم إختبار تلاوتك عن طريق إختبار القرآن حيث يتم في هذا الإختبار
    إظهار صفحة من الجزء بعد ضغطك على زر التسجيل حيث تقوم بتسجيل فيديو و صوت لتلاوتك لهذه الصفحة.
    الإختبار متاح طيلة مدة الفصل.`
  }
]

class QuranSubject extends React.Component<PropType> {
  static defaultProps = {
    quranPageEnd: 0,
    quranPageStart: 0,
    partTitle: ''
  }

  render (): React.Element<'div'> {
    const { partTitle, showmore,
      tilawa_grade_old: oldGrade, start_ayah: startAyah, end_ayah: endAyah, stusubold, id } = this.props
    let headerText = 'ينبغي عليك حفظ و تلاوة:'
    let descText = 'يمكنك تحميل تطبيق آيات لمساعدتك في الحفظ و التلاوة'
    const filteredDetails = []
    if (oldGrade === 'examessay') {
      filteredDetails.push(details[1])
      headerText = 'ينبغي عليك تلاوة:'
      descText = 'يمكنك تحميل تطبيق آيات لمساعدتك في التلاوة'
    } else if (oldGrade === 'quran_recordings') {
      filteredDetails.push(details[0])
      headerText = 'ينبغي عليك حفظ:'
      descText = 'يمكنك تحميل تطبيق آيات لمساعدتك في الحفظ'
    } else {
      filteredDetails.push(details[0])
      filteredDetails.push(details[1])
    }

    return (<div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-md-pull-2'>
          <div className='p-quran-subject__panel shadow-1 m-t-3'>
            <div className='p-a-3 text-xs-center'>
              {headerText}
              <h1 className='p-quran-subject__part m-b-2 m-t-2'><b>
                {!stusubold ? partTitle : ''}</b>
              </h1>
              <p className={`p-quran-subject__range ${!stusubold ? 'hidden-xs-up' : ''}`}>
                الآيات التي كانت مقررة عليك سابقًا عند الرسوب في المادة
              </p>
              <p className={`p-quran-subject__range ${stusubold ? 'hidden-xs-up' : ''}`}>
                <b>من</b> {startAyah} <b>إلى</b> {endAyah}
              </p>
              <div className={`text-xs-right p-quran-subject__details m-t-3 ${!showmore ? 'hidden-xs-up' : ''}`}>
                {filteredDetails.map((d: Object, k: number): React.Element<typeof InfoItem> => <InfoItem {...d} key={k} />)}
              </div>
              <a className='p-quran-subject__more'
                onClick={showmore ? this._handleHideMoreClicked : this._handleShowMoreClicked}>
                {!showmore ? 'تفاصيل أكثر' : 'إخفاء التفاصيل'}
              </a>
            </div>
            <div className={`p-y-2 p-x-1 p-quran-subject__footer ${showmore ? 'hidden-xs-up' : ''}`}>
              <i className='p-quran-subject__ayat m-l-2' />
              {descText}
              <a href='https://itunes.apple.com/us/app/id634325420'
                target='_blank'
                className='btn btn-gray m-l-2 m-r-2'><i className='p-quran-subject__app-store' /></a>
              <a href='https://play.google.com/store/apps/details?id=sa.edu.ksu.Ayat'
                target='_blank'
                className='btn btn-gray'><i className='p-quran-subject__play-store' /></a>
            </div>
          </div>
        </div>
        <div className='clearfix' />
        <div className='col-xs-12 col-md-4 col-md-pull-4'>
          <div className='text-xs-center p-y-2 m-t-2'>يمكنك الإطلاع على</div>
          <Link to={{ pathname: `/student/subject/${id}`, query: { v: 'd' } }}
            className='shadow-1 my-panel-white text-xs-center p-quran-subject__course p-b-2'>
            <div className='p-quran-subject__course-cover'>
              <i className='material-icons'>play_circle_filled</i>
            </div>
            <h6 className='m-t-2'>دورة التجويد المبسطة مع التطبيقات</h6>
            <small>7 مقاطع فيديو قصيرة</small>
          </Link>
          <div className='alert alert-info m-t-2 text-xs-center shadow-1'>الدورة اختيارية بدون درجات</div>
        </div>
      </div>
    </div>)
  }

  _handleShowMoreClicked = () => {
    const { showMoreDetails } = this.props
    showMoreDetails()
  }

  _handleHideMoreClicked = () => {
    const { hideMoreDetails } = this.props
    hideMoreDetails()
  }
}
type InfoItemType = {
  title: string,
  desc: string
};

const InfoItem = (props: InfoItemType): React.Element<'li'> => (<li>
  <h6 className='m-b-2'><b>{props.title}</b></h6>
  <p className='m-b-2'>{props.desc}</p>
</li>)

export default QuranSubject
