import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import css
import messages from './messages'
import './style.scss'
import Icon from 'components/Icon'
import Loading from 'components/Loading'
import { subjectNumberToString } from 'utils'
// let cyberSourceLink
// if (__DEV__) {
//   cyberSourceLink = 'https://testsecureacceptance.cybersource.com/pay'
// } else {
//   cyberSourceLink = 'https://secureacceptance.cybersource.com/pay'
// }

class ChooseSummerSubjects extends Component {
  render () {
    const { sendingChoices, checkedsubjects, termId, logoutAndRedirect, departmentId } = this.props
    const maxSubjects = (+termId === 8 || [15, 67].includes(+departmentId)) ? 5 : 3
    if (sendingChoices) {
      return <div className='m-a-3'>
        <Loading />
        <p className='text-xs-center'>جاري الحفظ لا تغلق النافذة...</p>
      </div>
    }

    return (<div className='shadow-modal'>
      <header className={`c-choose-summer-modal__header modal-header text-xs-center p-y-3`}>
        <h4 className='modal-title text-decoration-bold'>
         اختر مواد الصيفي
        </h4>
        <small>يمكنك إختيار على أقل {subjectNumberToString(1)} إلى {subjectNumberToString(maxSubjects)} كحد أقصى</small>
      </header>
      <div className='p-x-2' style={{ lineHeight: 2 }}>{this._getMessage()}</div>
      <div className={`modal-body c-choose-summer-modal__body`}>
        <div className='p-x-3 p-y-1'>
          <table className={`table m-a-0 c-choose-summer-modal__table`}>
            <thead>
              <tr>
                <th>المادة</th>
                <th>الإختيار</th>
              </tr>
            </thead>
            <tbody className='p-x-2'>
              {this.renderSubjects()}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`c-choose-summer-modal__footer modal-footer text-xs-center`}>
        <button onClick={this._submitForm}
          disabled={checkedsubjects.length === 0}
          className='btn btn-success  m-y-2  p-y-1 p-x-3'>
          تسجيل المواد المختارة
        </button>
        <button onClick={logoutAndRedirect} className='btn m-r-1 btn-info m-y-2 p-y-1 p-x-3'>
          الخروج و الاختيار لاحقا
        </button>
      </div>
    </div>)
  }
  _submitForm = () => {
    const { submitChoices } = this.props
    const confirm = window.confirm('هل أنت متاكد من اختيارك لا يمكنك التراجع عن هذه العملية  !!!!!')
    if (confirm) {
      submitChoices()
    }
  }
  renderSubjects = () => {
    const { subjects, checkedsubjects, termId, departmentId } = this.props
    if (!subjects) return false

    return subjects.filter(s => s.state !== 'uncomplete' && s.chosen_summer === 0).map(s => <Item
      key={s.id} {...s}
      canCheckMore={((+termId === 8 || [15, 67].includes(+departmentId)) && checkedsubjects.length < 5) || checkedsubjects.length < 3}
      checkedsubjects={checkedsubjects}
      checkSubject={this._checkSubject} />)
  }

  _checkSubject = (id) => {
    const { toggleChoice } = this.props
    toggleChoice(id)
  }

  _getMessage = () => {

    const { departmentId, subjects } = this.props
    if ([15, 67].includes(+departmentId)) {
      return messages.diploma.split('\n').map((item, key) => {
        return <div key={key} dangerouslySetInnerHTML={{ __html: item }} />
      })
    } else if (departmentId === 20 || departmentId === 21) {
      return messages.bac.split('\n').map((item, key) => {
        return <div key={key} dangerouslySetInnerHTML={{ __html: item }} />
      })
    } else if (subjects.length >= 4) {
      return messages.fourSubjects.split('\n').map((item, key) => {
        return <div key={key} dangerouslySetInnerHTML={{ __html: item }} />
      })
    } else if (subjects.length <= 3) {
      return messages.threeSubjects.split('\n').map((item, key) => {
        return <div key={key} dangerouslySetInnerHTML={{ __html: item }} />
      })
    } else {
      return 'no'
    }
  }
}

export class Item extends Component {
  render () {
    const { id, name, checkedsubjects, canCheckMore } = this.props

    const checked = checkedsubjects.findIndex(c => c === id) >= 0

    return (<tr key={id}>
      <td>{name}</td>
      <td width='150px'>
        <button
          disabled={!checked && !canCheckMore}
          onClick={this._checkSubject}
          className='c-choose-summer-modal__checkbox'>
          <Icon name={`checkbox-${checked ? 'checked' : 'unchecked'}`} />
        </button>
      </td>
    </tr>)
  }

  _checkSubject = () => {
    const { id, checkSubject } = this.props
    checkSubject(id)
  }
}

Item.propTypes = {
  checkSubject: PropTypes.func,
  canCheckMore: PropTypes.bool,
  name: PropTypes.string,
  checkedsubjects: PropTypes.array,
  id: PropTypes.number
}

ChooseSummerSubjects.propTypes = {
  termId: PropTypes.number.isRequired,
  departmentId: PropTypes.number.isRequired,
  submitChoices: PropTypes.func.isRequired,
  checkedsubjects: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  toggleChoice: PropTypes.func.isRequired,
  sendingChoices: PropTypes.bool.isRequired,
}
export default ChooseSummerSubjects
