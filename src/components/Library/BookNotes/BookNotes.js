// @flow
import * as React from 'react'
import './style.scss'
import BookNote from './BookNote'

type PropsType = {
  notes: Array<Object>,
  handleGoto: Function
};

class BookNotes extends React.Component<PropsType> {
  render (): React.Element<'ul'> {
    const { notes, handleGoto } = this.props

    return (
      <ul className='c-book-notes p-a-0'>
        {notes.sort((a: Object, b: Object): number => +a.page_number - +b.page_number)
          .map((i: Object, k: number): React.Element<typeof BookNote> =>
            <BookNote goToPage={handleGoto} {...i} key={k} />)}
      </ul>
    )
  }
}

export default BookNotes
