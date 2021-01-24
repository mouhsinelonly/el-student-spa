// @flow
import * as React from 'react'
import Home from './Home'

type PropType = {
  getQuranExtends: Function,
  getQuranPages: Function,
  getQuranRecordings: Function,
  getRecordingPlaints: Function,
  getExams: Function,
  children: React.Element<*>
};

class Exams extends React.Component<PropType> {
  static defaultProps = {
    events: [],
    serverdate: '',
    subjects: []
  }
  componentDidMount () {
    const { getExams, getRecordingPlaints } = this.props
    getExams()
    getRecordingPlaints()
  }

  render (): React.Element<*> {
    const { children } = this.props
    return children || <Home {...this.props} />
  }
}

export default Exams
