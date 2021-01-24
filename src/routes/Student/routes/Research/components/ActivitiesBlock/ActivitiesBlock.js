import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ActivityBlock from '../ActivityBlock'
import ResearchBlock from '../ResearchBlock'

class ActivitiesBlock extends Component {
  static propTypes = {
    activities: PropTypes.array,
    title: PropTypes.string,
    available: PropTypes.bool
  }
  render () {
    const { activities, title, available } = this.props

    if (!activities.length) return false

    return (
      <div className='c-activities-block'>
        <h1 className='c-activities-block__title p-t-2'>{title}</h1>
        {activities.map(a => a.type === 'activity' ? <ActivityBlock available={available} {...a} key={a.id} />
          : <ResearchBlock available={available} {...a} key={a.id} />)}
      </div>
    )
  }
}

export default ActivitiesBlock
