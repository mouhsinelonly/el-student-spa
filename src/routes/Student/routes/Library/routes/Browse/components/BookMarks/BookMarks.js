import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BookMark from './BookMark'

class BookMarks extends Component {
  static propTypes = {
    bookmarks: PropTypes.array,
    goToPage: PropTypes.func
  }
  render () {
    const { bookmarks, goToPage } = this.props

    return (
      <ul className='c-book-bookmarks p-a-0'>
        {bookmarks.sort((a, b) => parseInt(a.page_number, 10) - parseInt(b.page_number, 10)).map((i, k) =>
          <BookMark goToPage={goToPage} {...i} key={k} />)}
      </ul>
    )
  }
}

export default BookMarks
