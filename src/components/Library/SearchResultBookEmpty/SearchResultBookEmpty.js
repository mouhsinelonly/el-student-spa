// @flow
import * as React from 'react'
import './style.scss'
import Loading from 'components/Loading'
import './style.scss'

type PropsType = {
  state: string,
  query: string,
  handleSuggest: Function
};

class SearchResultBookEmpty extends React.Component<PropsType> {
  static defaultProps = {
    state: 'waiting',
    query: ''
  }
  render (): Object {
    const { state, query } = this.props

    return (
      <div className='c-library-search-result-empty'>
        <h1>عذرا، لا توجد نتائج</h1>
        <p className='c-library-search-result-empty__text'>
        للأسف لم يتم العثور على كتاب يطابق بحثك، نرجو التأكد من سلامة كتابتك للعنوان
              إذا كان العنوان سليما يمكنك إقتراح الكتاب لإضافته
        </p>
        <button className={`btn btn-library m-t-2 c-library-search-result-empty__btn
          ${(state !== 'waiting' || query === '') ? 'hidden-xs-up' : ''}`} onClick={this._suggestBook}>
          إقترح الكتاب للإضافة
        </button>
        <Loading className={state !== 'suggesting' ? 'hidden-xs-up' : ''} />
        <p className={state === 'suggested' ? 'text-success' : 'hidden-xs-up'}>
          شكرا لك على إقتراح الكتاب
        </p>
      </div>)
  }

  _suggestBook = () => {
    const { handleSuggest } = this.props
    handleSuggest()
  }
}

export default SearchResultBookEmpty
