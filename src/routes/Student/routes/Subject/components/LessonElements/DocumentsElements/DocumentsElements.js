import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import './style.scss'

class DocumentsElements extends Component {
  static propTypes = {
    elements: PropTypes.array
  }
  render () {
    const {elements} = this.props

    if (!elements) return false

    return <div className='c-student-document-element__container'>
      <header className='c-student-document-element__container__header text-xs-center'>
        <h4 className='c-student-document-element__container__title'>تصفح كتيب الدرس كاملا</h4>
      </header>
      <section>
        <ul className='c-student-document-element__list'>
          {elements.map((e, i) => <li className='c-student-document-element__list__item' key={i}>
            <Link to={`/student/element/${e.id}`}>{e.title}
            </Link>
          </li>)}
        </ul>
      </section>
    </div>
  }
}

export default DocumentsElements
