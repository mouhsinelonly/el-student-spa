import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class TabMenu extends Component {
  static propTypes = {
    active: PropTypes.number,
    setActive: PropTypes.func
  }
  constructor (props) {
    super(props)

    this._setActive = this._setActive.bind(this)
  }
  render () {
    const {active} = this.props

    return (<div className='c-student-tabmenu'>
      <div className='container col-xs-12 col-md-8 col-md-pull-2'>
        <div className='row'>
          <ul className='m-a-0 p-a-0 c-student-tabmenu__list'>
            <li data-index={1} className={`c-student-tabmenu__list__item ${active === 1 && 'is-active'} m-x-2`}
              onClick={this._setActive}>
              اللقائات المباشرة
            </li>
            <li data-index={2} className={`c-student-tabmenu__list__item m-x-2 ${active === 2 && 'is-active'}`}
              onClick={this._setActive}>
              التقويم الأكاديمي
            </li>
          </ul>
        </div>
      </div>
      <div className='clearfix' />
    </div>)
  }

  _setActive (e) {
    const {setActive} = this.props
    const index = parseInt(e.target.getAttribute('data-index'))
    setActive(index)
  }
}

export default TabMenu
