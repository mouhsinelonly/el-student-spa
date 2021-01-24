// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BookMark from './BookMark'

type PropsType = {
  bookmarks: PropTypes.array,
  handleGoto: PropTypes.func
};

class BookMarks extends React.Component<PropsType> {
  render (): React.Element<'ul'> {
    const { bookmarks, handleGoto } = this.props

    return (
      <ul className='c-book-bookmarks p-a-0'>
        {bookmarks.sort((a: Object, b: Object): number => +a.page_number - +b.page_number)
          .map((i: Object, k: Object): React.Element<typeof BookMark> =>
            <BookMark goToPage={handleGoto} {...i} key={k} />)}
      </ul>
    )
  }
}

export default BookMarks
