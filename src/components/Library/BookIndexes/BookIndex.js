// @flow
import * as React from 'react'

type PropsType = {
  title: string,
  goToPage: Function,
  page_number: number
};

class BookIndex extends React.Component<PropsType> {
  render (): React.Element<'li'> {
    const { title, page_number: pageNumber } = this.props

    return (
      <li onClick={this._gotoPage} className='c-book-indexes__item p-a-1 m-x-1'>
        {title}
        <span className='c-book-indexes__item-number'>{pageNumber}</span>
      </li>
    )
  }

  _gotoPage () {
    const { goToPage, page_number: pageNumber } = this.props
    goToPage(pageNumber)
  }
}

export default BookIndex
