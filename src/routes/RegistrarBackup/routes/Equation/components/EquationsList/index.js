import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class EquationsList extends Component {
  static propTypes = {
    degrees: PropTypes.array
  }
  render () {
    const {degrees} = this.props
    return (<div >
      <h1 className='text-xs-center m-y-3'>
        <b>معلومات الدراسة</b>
      </h1>
      {degrees.map((d, i) => <EquationsListItem key={i} {...d} />)}
    </div>)
  }
}

export const EquationsListItem = (props) => (<li className='c-reg-eqution-list__list-item m-b-2 p-a-2'>
  شهادة {(() => {
    switch (props.level) {
      case 'dip': return 'دبلوم'
      case 'bac': return 'بكالوريوس'
      case 'maj': return 'ماجستير'
      case 'doc': return 'دكتوراه'
      case 'other': return 'لم أكمل'
    }
  })()} من {props.university} بمعدل {props.grade}
</li>)

EquationsListItem.propTypes = {
  level: PropTypes.object,
  university: PropTypes.object,
  grade: PropTypes.object
}

export default EquationsList
