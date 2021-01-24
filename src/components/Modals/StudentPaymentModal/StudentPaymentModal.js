// @flow
import * as React from 'react'
// import css
import './style.scss'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import { Link } from 'react-router'

type PropsType = {
  logout: Function,
  closeModal: Function,
  showPaymentView: Function,
  startStudentPayment: Function,
  data: Object,
  loading: boolean,
  closable: boolean,
  waiting: boolean
};

type StateType = {
  subjectsVisible: boolean
};

class StudentPaymentModal extends React.Component<PropsType, StateType> {
  state = { subjectsVisible: false }
  render (): React.Element<'div'> {
    const { subjectsVisible } = this.state
    const { data: { subjects, fields, credit, debit, is_installment: isInstallment, isBooks, isMarketUser },
    loading, waiting, closable } = this.props

    if (loading || !subjects) {
      return (
        <div className='m-a-3'>
          <Loading />
        </div>
      )
    }

    if (waiting) {
      return (
        <div className='m-a-3'>
          <Loading />
          <div className='m-y-2 text-xs-center'>في انتظار استكمال عملية الدفع</div>
        </div>
      )
    }
    const total = subjects && subjects.length ? subjects.reduce((t: number, s: Object): number => t + s.fee, 0) : 0
    let data = <div />

    if (typeof fields !== 'undefined') {
      data = [
        <div className='shadow-modal' style={{ borderRadius: 5 }} key='first'>
          <header className='c-student-payment-modal__header modal-header text-xs-center p-y-3'>
            <h4 className='modal-title'>
              {!isBooks ? <b>{!subjects.length ? 'عليك مبالغ مستحقة للمركز' : 'سارع بالدفع قبل إنتهاء الوقت'}</b> : null}
              <b>{isBooks ? 'دفع مبالغ الكتب' : null}</b>
            </h4>
          </header>
          <div className='modal-body c-student-payment-modal__body'>
            <div className='p-l-2 p-r-2 p-t-2' onClick={this._toggleSubjects}>
              تفاصيل {isBooks ? 'الكتب' : 'مواد الفصل'} <button
                style={{ borderRadius: 25,
                  fontSize: 28,
                  padding: '9px 15px 0',
                  lineHeight: 1 }}
                className='btn btn-white'>{!subjectsVisible ? '+' : '-'}</button>
            </div>
            <div className={`p-x-3 p-y-1  ${!subjects.length && !credit && !debit ? 'hidden-xs-up' : ''}`}>
              <table className={`table m-a-0 c-student-payment-modal__table ${subjectsVisible ? '' : 'hidden-xs-up'}`}>
                <thead>
                  <tr>
                    <th>{isBooks ? 'الكتاب' : 'المادة'}</th>
                    <th>{isBooks ? 'السعر' : 'الرسوم'} بالريال</th>
                  </tr>
                </thead>
                <tbody className='p-x-2'>
                  {this.renderSubjects()}
                  {!isBooks ? <tr className={(fields.amount - total) > 0 ? 'text-danger' : 'hidden-xs-up'}>
                    <td>مبلغ مستحق للكلية</td>
                    <td width='150px'>{fields.amount - total}</td>
                  </tr> : null }
                  {!isBooks ? <tr className={!credit ? 'hidden-xs-up' : 'text-success'}>
                    <td>مبلغ مستحق للطالب</td>
                    <td width='150px'>{credit}</td>
                  </tr> : null }
                </tbody>
              </table>
            </div>
            <footer className='c-student-payment-modal__tfoot p-x-1 p-y-2'>
              <table className='table m-a-0 c-student-payment-modal__table'>
                <tfoot>
                  <tr className='hidden-xs-up'>
                    <td>المجموع</td>
                    <td width='150px'>
                      <h4 className='m-a-0'>
                        <b className='text-success'>{debit} ريال</b>
                      </h4>
                    </td>
                  </tr>
                  <tr className='hidden-xs-up'>
                    <td>مبلغ مستحق للطالب</td>
                    <td className='text-info'>
                      <h4 className='font-weight-bold'>{credit} ريال</h4>
                    </td>
                  </tr>
                  <tr className='hidden-xs-up'>
                    <td>مبلغ مستحق للكلية</td>
                    <td className='text-danger'>
                      <h4 className='font-weight-bold'>{fields.amount - total} ريال</h4>
                    </td>
                  </tr>
                  <tr className={(!credit && !debit) ? 'hidden-xs-up' : ''}>
                    <td className='p-t-1'>
                      <b>{isInstallment ? 'القسط' : 'المبلغ'} الذي يجب دفعه</b>
                    </td>
                    <td className='p-t-1'>
                      <h4 className='m-a-0'>
                        <b className='text-success'>{fields.amount} ريال</b>
                      </h4>
                    </td>
                    <td>
                      <button onClick={this._submitForm} type='submit' className='btn btn-success p-x-2 btn-block'>
                        ادفع الآن
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </footer>
          </div>

          <div className={`c-student-payment-modal__footer modal-footer text-xs-center`}>
            <a
              href='https://youtu.be/pFw93sJR0dc'
              onClick={this._openVideo}
              className='btn btn-white' style={{ display:'inline-block', borderRadius: 5, borderWidth: 0 }}>
              <Icon name='play-black-tiny' className='m-l-1' /> تعرف على كيفية الدفع
            </a>
            {isBooks ? <Link
              to={isMarketUser ? '/eshop/orders' : '/student/market/orders'}
              className='text-danger pull-xs-left btn btn-white' style={{ display:'inline-block', borderRadius: 5, borderWidth: 0 }}>
              <i className='material-icons m-l-1' style={{ display:'inline-block', verticalAlign: 'middle' }} >delete</i> إلغاء الطلب
            </Link> : null }
          </div>
        </div>,
        <div className='shadow-modal p-t-1 p-b-1 m-t-1 text-xs-center' style={{ borderRadius: 5 }} key='second'>
          <Link to='/student/orders' className={`${closable ? 'hidden-xs-up' : ''}
          c-student-payment-modal__bottom-btn btn btn-white m-l-1`}>
            <b>طلب الإنسحاب</b>
          </Link>
          <Link to='/student/orders' className={`text-wrap ${closable ? 'hidden-xs-up' : ''}
          c-student-payment-modal__bottom-btn btn btn-white m-l-1`}>
            <b>طلب تأجيل الدراسة</b>
          </Link>
          <button onClick={this._logout} className='c-student-payment-modal__bottom-btn btn btn-white'>
           تسجيل الخروج
          </button>
        </div>]
    } else {
      data = (
        <div>
          <div className={`c-student-payment-modal__success-modal-body modal-body text-xs-center`}>
            <p>
              <Icon name='checkmark-success-leaf-medium' />
            </p>
            <h1 className='m-t-3 m-b-1'>
              <b>لقد أصبحت طالبا معنا</b>
            </h1>
            <p className={`c-student-payment-modal__success-p`}>
              لقد أصبحت طالب معتمد لدينا <br /> سنقودك في جولة للتعرف على برنامج التعليم عن بعد.
              <br />
              ستتعرف على مختلف العناصر التي ستتعامل معها <br />طيلة دراستك
            </p>
            <button onClick={this.closeModal} className='btn btn-lg btn-success p-x-3'>
              حسنا ابدأ الآن
            </button>
          </div>
        </div>
      )
    }

    return <div>{data}</div>
  }
  _openVideo = (e: Object) => {
    e.preventDefault()
    window.open(e.target.href, '_blank')
  }
  _logout = (l: Object) => {
    const { logout } = this.props
    logout()
  }
  _submitForm = () => {
    console.log('button clicked')
    const { startStudentPayment, data: { fields, omanneturl }, showPaymentView } = this.props
    showPaymentView(fields, omanneturl)
    startStudentPayment()
  }
  renderSubjects = (): Array<'tr'> => {
    const { data: { subjects } } = this.props

    if (!subjects) return []

    return subjects.map((s: Object): React.Element<'tr'> => (
      <tr key={s.id}>
        <td>{s.name}</td>
        <td width='150px'>{s.fee}</td>
      </tr>
    ))
  }
  closeModal = () => {
    const { closeModal } = this.props
    closeModal('documents')
  }

  _toggleSubjects = () => {
    this.setState((): Object => ({ subjectsVisible: !this.state.subjectsVisible }))
  }
}

export default StudentPaymentModal
