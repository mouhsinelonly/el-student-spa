import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookNote extends Component {
  static propTypes = {
    content: PropTypes.string,
    highlight: PropTypes.string,
    goToPage: PropTypes.func,
    page_number: PropTypes.number
  }

  constructor (props) {
    super(props)

    this._gotoPage = this._gotoPage.bind(this)
  }
  render () {
    const {content, page_number: pageNumber, highlight} = this.props

    return (
      <li onClick={this._gotoPage} className='c-book-notes__item p-a-1 m-x-1 p-l-3'>
        <span className='c-book-notes__item-highlight p-x-1'>{highlight}</span>
        <div>{content}</div>
        <span className='c-book-notes__item-number'>{pageNumber}</span>
      </li>
    )
  }

  _gotoPage () {
    const { goToPage, page_number: pageNumber } = this.props
    goToPage(pageNumber)
  }
}

export default BookNote
