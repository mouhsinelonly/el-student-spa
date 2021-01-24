// @flow
import * as React from 'react'
import './style.scss'

type ModalPageType = {
  searchSinglePage: Object,
  handleHide: Function
};

class ModalPage extends React.Component<ModalPageType> {
  static defaultProps = {
    searchSinglePage: { bookId: 0, pageNumber: 0 }
  }
  render (): React.Element<'div'> {
    const { searchSinglePage: { bookId, pageNumber } } = this.props
    if (!bookId || !pageNumber) return <div />
    return (
      <div className='c-library-modal-page text-xs-center'>
        <div onClick={this._hide} className='c-library-modal-page__overlay' />
        <button onClick={this._hide} className='c-library-modal-page__close' >
          &times;
        </button>
        <img src={`https://el-css.com/cdn/bookspng/book_${bookId}_${pageNumber}.png`} alt={pageNumber} />
      </div>
    )
  }

  _hide = () => {
    const { handleHide } = this.props
    handleHide(0, 0)
  }
}

export default ModalPage
