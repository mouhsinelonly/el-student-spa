// @flow
import * as React from 'react'
import DemoFormRedux from './components/DemoFormRedux'
import CountDownHeader from 'components/Exams/CountDownHeader'
import TestDone from './components/TestDone'
import moment from 'moment'
import './style.scss'

type PropsType = {
  serverdate: string,
  index: number,
  poll: Object,
  sendSessionPollAnswer: Function,
  resetSessionPoll: Function,
  setCurrentTestQuestionIndex: Function
};

class SessionTest extends React.Component<PropsType> {
  componentDidMount () {
    const { poll } = this.props
    if (typeof poll !== 'undefined' && typeof poll.id !== 'undefined') {
      if (document.body) {
        document.body.style.overflow = 'hidden'
      }
    }
  }
  componentWillUnmount () {
    if (document.body) {
      document.body.style.overflow = 'scroll'
    }
  }
  render (): React.Element<'div'> {
    const { serverdate, index, poll, resetSessionPoll } = this.props

    if (typeof poll === 'undefined') return <div />

    if (typeof poll.id === 'undefined') return <div />

    const momentServerTime = typeof serverdate === 'undefined' ? moment() : moment(serverdate)
    const startAtMoment = moment(poll.start_at)
    const finishAtMoment = startAtMoment.add(poll.duration, 'minutes')
    const fields = poll.questions.reduce((choices: Array<Object>, next: Object): Array<Object> => {
      return choices.concat(...next.choices)
    }, []).map((c: Object): string => {
      switch (c.type) {
        case 'radio':
          return `question_${c.question_id}`
        default:
          return `question_${c.question_id}.${c.id}`
      }
    })

    const initialValues = { poll_id: poll.id }

    fields.map((name: string) => {
      initialValues[name] = ''
    })

    fields.push('poll_id')

    if (momentServerTime.isAfter(finishAtMoment) || poll.uploaded === true) {
      return <TestDone onSubmit={this._sendAnswers}
        fields={fields} link={poll.link} handleHidePoll={resetSessionPoll} />
    }

    return (
      <div className='c-session-test' >
        <CountDownHeader
          serverdate={serverdate}
          title='أسئلة الحصة'
          startAt={poll.start_at}
          duration={poll.duration} />
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-md-pull-2'>
              { poll.questions.map((q: Object, i: number): React.Element<*> => {
                if (index === i) {
                  return <DemoFormRedux
                    order={i + 1}
                    total={poll.questions.length}
                    index={index}
                    next={this._next}
                    initialValues={initialValues}
                    previous={this._previous}
                    onSubmit={this._sendAnswers}
                    question={q.content}
                    key={q.id}
                    choices={q.choices}
                    fields={fields}
                    type={q.type}
                    fieldName={`question_${q.id}`} />
                } else {
                  return <span key={q.id} />
                }
              })
            }
            </div>
          </div>
        </div>
      </div>
    )
  }

  _sendAnswers = (values: Object) => {
    const { sendSessionPollAnswer, poll } = this.props
    sendSessionPollAnswer(values)
  }

  _next = () => {
    const { setCurrentTestQuestionIndex: setIndex, index, poll } = this.props
    if (index < poll.questions.length - 1) {
      setIndex(index + 1)
    }
  }

  _previous = () => {
    const { setCurrentTestQuestionIndex: setIndex, index } = this.props
    if (index > 0) {
      setIndex(index - 1)
    }
  }
}

export default SessionTest
