import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RulesList from 'components/RulesList'

class Rules extends Component {
  static propTypes = {
    rules: PropTypes.object,
    events: PropTypes.array,
    params: PropTypes.object,
    getExamsRules: PropTypes.func
  }
  static defaultProps = {
    rules: {}
  }
  componentDidMount () {
    const { getExamsRules } = this.props
    getExamsRules()
  }
  render () {
    const { rules, params: { type }, events } = this.props
    const quranEvent = events.find(e => e.category === 'quran_test')
    const finalEvent = events.find(e => e.category === 'final_term_test')
    let rulesFiltered

    // if (!rules.final) return false

    let headingText = ''

    switch (type) {
      case 'midterm':
        headingText = 'اختبار المنتصف'
        break
      case 'activity':
        headingText = 'الاختبار القصير'
        break
      case 'final':
        headingText = 'الاختبار النهائي'
        break
      case 'quran':
        headingText = 'اختبار التلاوة'
    }
    if (type === 'tilawa' && quranEvent) {
      rulesFiltered = quranEvent.instructions
    } else {
      rulesFiltered = rules[type] && rules[type].map(r => r.content)
    }
    return (<div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 p-b-3'>
          <h3 className='p-y-3 text-xs-center'><b>{headingText}</b></h3>
          <RulesList
            rules={rulesFiltered}
            title='تعليمات الاختبار' />
        </div>
      </div>
    </div>)
  }
}

export default Rules
