// @flow
import * as React from 'react'
import './style.scss'
import { domOnlyProps } from 'utils'
import Loading from 'components/Loading'
import { reduxForm } from 'redux-form'

type PropsType = {
  visible?: boolean,
  handleSubmit: Function,
  goToPage: Function,
  fields: Object,
  settings: Object,
  windowHeight: number,
  toggleBookSearchMenu: Function,
  singleSearchLoading: boolean,
  singleSearchResult: Array<Object>
};

const fields = [
  'query',
  'book_id'
]
class BookSearchMenu extends React.Component<PropsType> {
  static defaultProps = {
    visible: false,
    settings: { theme: 'light' },
    singleSearchResult: [],
    windowHeight: 600
  }
  render (): React.Element<'form'> {
    const { visible, fields: { query, book_id: bookId }, settings: { theme }, handleSubmit, singleSearchResult,
  singleSearchLoading, windowHeight } = this.props

    return (
      <form onSubmit={handleSubmit} className={`c-book-search-menu is-${theme} ${visible ? 'is-visible' : ''}`}>
        <input type='hidden' {...domOnlyProps(bookId)} />
        <div className='head p-a-2' ref={(head) => { this.headContainer = head }}>
          <button type='button' className='c-book-search-menu__close' onClick={this._close}>
          &times;
          </button>
          <h1 className='c-book-search-menu__header '>
            البحث
          </h1>
          <div className='input-group m-t-3'>
            <input type='text' autoComplete='off'
              placeholder='البحث في الكتاب'
              {...domOnlyProps(query)}
              className='form-control c-library-search-bar__input' />
            <span className='input-group-btn'>
              <button className='btn btn-secondary c-book-search-menu__btn p-x-2 p-l-3' disabled={singleSearchLoading}>
                البحث
                <Loading strokeColor='#fff'
                  width={20}
                  height={20}
                  scale={10}
                  className={`${!singleSearchLoading ? 'hidden-xs-up' : ''} c-book-search-menu__btn-loading`} />
              </button>
            </span>
          </div>
          <div className='clearfix' />
        </div>

        <ul className={`m-a-0 p-a-0 c-book-search-menu__content ${singleSearchLoading ? 'hidden-xs-up' : ''}`}
          style={{ height: (windowHeight - (this.headContainer ? this.headContainer.clientHeight : 125)) }}>
          {singleSearchResult.map((p: Object): React.Element<'li'> => <li
            onClick={this._goToPage}
            data-page={p.number}
            className='p-a-2 c-book-search-menu__item p-l-3' key={p.id}>
            <div data-page={p.number} dangerouslySetInnerHTML={this._createMarkup(p.content)} />
            <div data-page={p.number} className='c-book-search-menu__item-number'>
              {p.number}
            </div>
          </li>)}
        </ul>
      </form>
    )
  }

  _createMarkup = (markup: string): Object => {
    return { __html: markup }
  }

  _goToPage = (e: Object) => {
    const { goToPage } = this.props
    goToPage(e.target.dataset.page)
  }
  _close = () => {
    const { toggleBookSearchMenu } = this.props
    toggleBookSearchMenu()
  }
}

export default reduxForm({
  form: 'librarysearchsinglebook',
  fields
})(BookSearchMenu)
