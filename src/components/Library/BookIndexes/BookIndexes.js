// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BookIndex from './BookIndex'
type PropsType = {
  indexes: PropTypes.array,
  handleGoto: PropTypes.func
};

class BookIndexes extends React.Component<PropsType> {
  render (): React.Element<'ul'> {
    const { indexes, handleGoto } = this.props

    return (
      <ul className='c-book-indexes p-a-0'>
        {indexes.map((i: Object): React.Element<typeof BookIndex> =>
          <BookIndex goToPage={handleGoto} {...i} key={i.id} />)}
      </ul>
    )
  }
}

export default BookIndexes
