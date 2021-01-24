import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookMark extends Component {
  static propTypes = {
    content: PropTypes.string,
    goToPage: PropTypes.func,
    page_number: PropTypes.number
  }

  constructor (props) {
    super(props)

    this._gotoPage = this._gotoPage.bind(this)
  }
  render () {
    const {content, page_number: pageNumber} = this.props

    return (
      <li onClick={this._gotoPage} className='c-book-bookmarks__item p-a-1 m-x-1 p-l-3'>
        ...{content}...
        <span className='c-book-bookmarks__item-number'>{pageNumber}</span>
      </li>
    )
  }

  _gotoPage () {
    const {goToPage, page_number: pageNumber} = this.props
    goToPage(pageNumber)
  }
}

export default BookMark
