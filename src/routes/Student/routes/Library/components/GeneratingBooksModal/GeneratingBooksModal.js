import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'

class GeneratingBooksModal extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool
  }
  render () {
    const { enabled } = this.props
    if (!enabled) {
      return false
    }
    return (
      <div className='c-generatingbooks-modal shadow-1'>
        <Loading className='c-generatingbooks-modal__loading m-l-2' scale={16} stroke={2} width={30} height={30} />
          جاري إعداد الملف ...
      </div>
    )
  }
}

export default GeneratingBooksModal
