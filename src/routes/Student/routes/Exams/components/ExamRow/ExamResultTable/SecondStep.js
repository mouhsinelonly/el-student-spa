import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReasonBlock from 'components/ReasonBlock'
import Loading from 'components/Loading'

const reasons = [
{title: 'الوقت يمر بسرعة.', desc: ''},
{title: 'الاختبار لا يرتفع.', desc: ''},
{title: 'البرنامج يغلق فجأة.', desc: ''},
{title: 'فتح الاختبار متأخرًا بسبب إجراء تحديث.', desc: ''},
{title: 'ظهور رسالة بتمديد وقت الاختبار.', desc: ''}
]
class SecondStep extends Component {
  constructor (props) {
    super(props)

    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
    this._onSelect = this._onSelect.bind(this)
  }
  static propTypes = {
    // events: PropTypes.array,
    sendExamComplaint: PropTypes.func,
    addExamComplaintReason: PropTypes.func,
    goToComplaintStep: PropTypes.func,
    sendingcomplaint: PropTypes.bool,
    complaintreason: PropTypes.string
  }
  static defaultProps = {
    events: []
  }
  render () {
    const {complaintreason, sendingcomplaint} = this.props

    return (<div>
      <h4 className='p-b-3 text-xs-center'><b>اختر سبب الشكوى</b></h4>
      {reasons.map((t, i) => <div className='col-lg-4' key={i}>
        <ReasonBlock active={t.title === complaintreason} onSubmit={this._onSelect} {...t} />
      </div>)}
      <div className='clearfix' />
      <footer className='text-xs-center p-y-3 c-exam-row-complaint-table__footer m-t-3' >
        <button className='btn btn-gray btn-lg p-x-3' disabled={complaintreason === '' || sendingcomplaint}
          onClick={this._next}>
          <span className={`${sendingcomplaint && 'hidden-xs-up'}`}>إرسال</span>
          <Loading className={`${!sendingcomplaint && 'hidden-xs-up'}`} />
        </button>
        <div onClick={this._prev} className='c-exam-row-complaint-table__prev'>الرجوع للسابق</div>
      </footer>
    </div>)
  }

  _onSelect (reason) {
    const {addExamComplaintReason} = this.props
    addExamComplaintReason(reason)
  }

  _next () {
    const {sendExamComplaint} = this.props
    sendExamComplaint()
  }
  _prev () {
    const {goToComplaintStep} = this.props
    goToComplaintStep(1)
  }
}

export default SecondStep
