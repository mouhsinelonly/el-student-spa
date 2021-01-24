// @flow
import * as React from 'react'
import './style.scss'

type ResultPageType = {
  id: number,
  content_raw: string,
  number: number,
  i: number,
  title: string,
  bookId: number,
  showPage: Function,
  showAll: boolean
};

class ResultPage extends React.Component<ResultPageType> {
  render (): React.Element<'div'> {
    const { id, content_raw, number, title, showAll, i } = this.props

    return (
      <div key={id} className={`${(i >= 1 && !showAll) ? 'hidden-xs-up' : ''}
      c-library-search-result-book__pages`} onClick={this._showPage}>
        <div dangerouslySetInnerHTML={{ __html: content_raw }}
          className='c-library-search-result-book__pages__content p-t-2' />
        <span className='p-l-2 c-library-search-result-book__pages__meta'>كتاب : {title} .</span>
        <span className='c-library-search-result-book__pages__meta'>الصفحة : {number}</span>
        <div className={`c-library-search-result-book__pages-shadow ${showAll ? 'hidden-xs-up' : ''}`} />
      </div>)
  }

  _showPage = () => {
    const { showPage, bookId, number } = this.props
    showPage(bookId, number)
  }
}

export default ResultPage
