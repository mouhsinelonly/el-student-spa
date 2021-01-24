import React, {Component} from 'react'
import RulesList from 'components/RulesList'
import PropTypes from 'prop-types'
class RulesModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    rules: PropTypes.array
  }
  static defaultProps = {
    title: 'قوانين و شروط',
    rules: []
  }
  render () {
    const {title, rules} = this.props
    return (<div className='c-rules-modal shadow-modal'>
      <RulesList
        rules={rules}
        title={title} />
    </div>)
  }
}

export default RulesModal
