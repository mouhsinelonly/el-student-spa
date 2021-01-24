// @flow
import * as React from 'react'

type PropsType = {
  content: string,
  goToPage: Function,
  page_number: number
};

class BookMark extends React.Component<PropsType> {
  render (): React.Element<'li'> {
    const { content, page_number: pageNumber } = this.props

    return (
      <li onClick={this._gotoPage} className='c-book-bookmarks__item p-a-1 m-x-1 p-l-3'>
        ...{content}...
        <span className='c-book-bookmarks__item-number'>{pageNumber}</span>
      </li>
    )
  }

  _gotoPage = () => {
    const { goToPage, page_number: pageNumber } = this.props
    goToPage(pageNumber)
  }
}

export default BookMark
