import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BookNote from './BookNote'

class BookNotes extends Component {
  static propTypes = {
    notes: PropTypes.array,
    goToPage: PropTypes.func
  }
  render () {
    const { notes, goToPage } = this.props

    return (
      <ul className='c-book-notes p-a-0'>
        {notes.sort((a, b) => parseInt(a.page_number, 10) - parseInt(b.page_number, 10)).map((i, k) =>
          <BookNote goToPage={goToPage} {...i} key={k} />)}
      </ul>
    )
  }
}

export default BookNotes
