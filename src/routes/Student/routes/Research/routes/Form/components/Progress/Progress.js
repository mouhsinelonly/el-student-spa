import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ProgressItem from './ProgressItem'
import Icon from 'components/Icon'

class Progress extends Component {
  static propTypes = {
    questions: PropTypes.object
  }

  render () {
    const {questions} = this.props

    return (
      <ul className='c-research-progress'>
        {Object.keys(questions).map(q => <ProgressItem isDone={questions[q] !== ''} key={q} />)}
        <li className='c-research-progress__pack'>
          <Icon name='package-gray' />
        </li>
      </ul>
    )
  }
}

export default Progress
