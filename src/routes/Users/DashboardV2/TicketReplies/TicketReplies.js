// @flow
import React, { useCallback, useEffect, useRef } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import TicketForm from './TicketForm'
import TicketRepliesItem from './TicketRepliesItem'
import Header from './Header'
import Loading from 'components/Loading'
// import RTCVoip from 'components/RTCVoip'
import { storeTicket } from 'routes/Users/modules/tickets'
const congrats = [
  `(الله لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ)`,
  `أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَهـا ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلةِ وَشَرِّ ما بَعْـدَهـا ، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر.`,
  `اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي. لا إله إلّا أنت سبحانك إنّي كنت من الظّالمين.`,
  `اللّهم اغفر لي خطيئتي وجهلي وإسرافي في أمري وما أنت أعلم به منّي، اللّهم اغفر لي جَدِّي وهزلي وخطئي وعمدي وكلّ ذلك عندي، اللّهم اغفر لي ما قدّمت وما أخّرت وما أسررت وما أعلنت وما أنت أعلم به منّي، أنت المُقدّم وأنت المُؤخّر وأنت على كلّ شيء قدير.`, `اللهم آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار اللهم إني أعوذ بك من الفقر ، والقلة والذلة وأعوذ بك من أن أَظلِم أو أُظلَم يا مقلب القلوب ثبت قلبي على دينك`,
  `اللهم إني أعوذ بك من شر ما عملت ومن شر ما لم أعمل اللهم إني أعوذ بك من يوم السوء ، ومن ليلة السوء ومن ساعة السوء ، ومن صاحب السوء ، ومن جار السوء في دار المقامة`,
  `اللهم إني أسألك من خير ما سألك منه نبيك محمد صلى الله عليه وسلم ونعوذ بك من شر ما استعاذ منه نبيك محمد صلى الله عليه وسلم وأنت المستعان وعليك البلاغ ولا حول ولا قوة إلا بالله اللهم إني أسألك علماً نافعاً وأعوذ بك من علم لا ينفع`,
  `رب أعني ولا تعن عليّ ، وانصرني ولا تنصر عليّ وامكر لي ولا تمكر عليّ وأهدني ويسر الهدي إليّ ، وانصرني على من بغى عليّ رب اجعلني لك شاكرا لك ذكاراً ، لك رهَاباَ ، لك مطواعاً إليك مخبتاَ أوّاهاً منيباَ ، رب تقبل توبتي ، واغسل حوبتي ، وأجب دعوتي وثبت حُجتي وأهد قلبي ، وسدد لساني ، وأسْلُلْ سخيمة قلبي`
]

type PropsType = {};

const TicketReplies = (props: PropsType): React.Element<'div'> => {
  const repliesRef = useRef()
  const { activeTicket: { replies, id, open, student_id: studentId, next_id: nextId,
      prev_id: prevId, department_id: departmentId, category },
    loading, total, studentsTickets, tickets } = useSelector((state: Object): Object => state.user_tickets)

  const { id: userId } = useSelector((state: Object): Object => state.user_profile.profile)

  const dispatch = useDispatch()

  const _storeTicket = useCallback((values: Object) => {
    dispatch(storeTicket(values))
  })

  useEffect(() => {
    if (typeof repliesRef.current !== 'undefined' && repliesRef.current !== null) {
      repliesRef.current.scrollTop = repliesRef.current.scrollHeight
    }
  }, [replies, studentsTickets])

  if (!replies || typeof id !== 'number') return null

  const studentTicketsIds = studentsTickets[`tickets-${studentId}`]

  const studentTickets = typeof studentTicketsIds !== 'undefined'
    ? studentTicketsIds.reduce((total: Array<Object>, current: number): Array<Object> =>
      +current !== +id && typeof tickets[`ticket-${current}`] !== 'undefined'
      ? total.concat(tickets[`ticket-${current}`])
      : total, [])
    : []
  const previousReplies = studentTickets.reduce((total: Array<>, ticket: Object): Array<> =>
    total.concat(ticket.replies.reduce((total: Array<>, reply: Object): Array<> =>
      total.concat({ ...reply, closed: !ticket.open }), [])), [])

  // const _changeTicket = useCallback((e: Object) => {
  //   const { value } = e.target
  //   const { setActiveTicket } = this.props
  //   setActiveTicket(value)
  // })

  // const _closeTicket = useCallback(() => {
  //   const { activeTicket: { id, open }, closeTicket, openTicket } = this.props
  //   if (open) {
  //     closeTicket(id)
  //   } else {
  //     openTicket(id)
  //   }
  // })

  // const _onCallEnded = useCallback(() => {
  //   dispatch(setStudentCallId(0))
  // })

  if (!id && loading) {
    return (<div style={{ display: 'table', width: '100%', height: '100%' }} >
      <Loading centered strokeColor='#3d4d71' />
    </div>)
  }
  if (total === 0 && !id) {
    return <div className='text-xs-center'>
      <div className='text-xs-center font-weight-bold v2-ticket-empty p-t-1'>
        <i className='material-icons'
          style={{ display: 'inline-block', width: 30, fontSize: 30, color: '#eaac15' }}>star_rate</i>
        <i className='material-icons'
          style={{ display: 'inline-block', width: 60, fontSize: 60 }}>star_rate</i>
        <i className='material-icons'
          style={{ display: 'inline-block', width: 30, fontSize: 30, color: '#eaac15' }}>star_rate</i>
        <br />
      </div>
      <h5 style={{ lineHeight: 2 }} className='p-x-3'>{congrats[Math.floor(Math.random() * (3 - 0 + 0) + 0)]}</h5>
    </div>
  }
  return <div className='v2-ticket-replies'>
    <Header ticketId={id} isOpen={open === 1} studentId={studentId} departmentId={departmentId} />
    <div className={`v2-ticket-replies__container ${!open ? 'is-closed' : ''}`} ref={repliesRef}>
      <ul className={`v2-ticket-replies__list p-a-1 ${!open ? 'is-closed' : ''}`}>
        {previousReplies ? previousReplies
          .sort((a: Object, b: Object): boolean => a.id > b.id ? 1 : -1)
          .map((r: Object): React.Element<typeof TicketRepliesItem> => <TicketRepliesItem
            userId={userId}
            departmentId={category ? category.id : 0}
            {...r}
            key={r.id} />) : null}
        {previousReplies && previousReplies.length
          ? <li className='v2-ticket-replies__item is-separator'><hr /> <span>رسائل جديدة</span></li>
          : null }
        {replies ? replies.map((r: Object): React.Element<typeof TicketRepliesItem> => <TicketRepliesItem
          userId={userId}
          departmentId={category ? category.id : 0}
          {...r}
          key={r.id} />) : null}
      </ul>
    </div>
    {/* studentCallId === 0 ? null
      : <RTCVoip
        onCallEnd={_onCallEnded}
        autoConnect
        openUrl={studentCallUrl}
        remoteUserId={studentCallId}
        localUserId={userId} /> */}
    <TicketForm enabled={open}
      id={id}
      nextId={nextId}
      prevId={prevId}
      studentId={studentId}
      onSubmit={_storeTicket}
      initialValues={{ ticket_id: id }} />
  </div>
}

export default TicketReplies
