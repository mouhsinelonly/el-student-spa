// @flow
import * as React from 'react'
import { Link } from 'react-router'
import Icon from 'components/Icon'
import ThemeChooser from 'components/Library/ThemeChooser'
import './style.scss'
import Loading from 'components/Loading'

type PropsType = {
  settings: Object,
  toggleBookIndexMenu: Function,
  toggleBookSearchMenu: Function,
  setVisibleIndexTab: Function,
  bookmarks: Array<Object>,
  visiblePages: Array<Object>,
  markingids: Array<number>,
  bookId: number,
  visible: boolean,
  bookMark?: Function,
  unBookMark: Function,
  guard: string
};

type StateType = {
  menuVisible: boolean
};

const goBackLinks = (key: string): Object => ({
  'students': '/student/library',
  'libraryusers': '/library/home'
})[key]

class Menu extends React.Component<PropsType, StateType> {
  state = {
    menuVisible: false
  }
  static defaultProps = {
    visible: false,
    settings: { theme: 'light' },
    visiblePages: [],
    bookmarks: [],
    markingids: [],
    guard: 'students',
    bookMark: () => {}
  }
  render (): React.Element<'div'> {
    const { settings: { theme }, visible, visiblePages, bookmarks, guard, markingids, bookId } = this.props
    const { menuVisible } = this.state
    const isMarking = markingids.findIndex((id: number): boolean => id === bookId) >= 0
    const visiblePage = visiblePages[0]
    const bookmarked = bookmarks.findIndex((b: Object): boolean => b.page_number === visiblePage) >= 0
    let settingIcon = 'setting-black'
    let searchIcon = 'search-tiny-black'
    let bookmarkIcon = 'bookmark-tiny-black'
    switch (theme) {
      case 'black':
        settingIcon = 'setting-caramel'
        bookmarkIcon = 'bookmark-tiny-caramel'
        searchIcon = 'search-tiny-caramel'
        break
    }
    if (bookmarked) {
      bookmarkIcon = 'bookmark-tiny-green'
    }

    return (
      <div className={`c-book-browse-menu__sticky is-${theme} ${visible ? 'is-hidden' : ''} is-sticky`}>
        <div className='row p-t-2'>
          <div className='col-xs-12 col-md-2 col-lg-2 col-lg-pull-1'>
            <Link to={goBackLinks(guard)}>
              <Icon name='arrow-right-small-dark' className='c-book-browse-menu__back-arrow' />
            </Link>
          </div>
          <div className='col-xs-12 col-md-8 col-lg-8'>
            <div className={`c-book-browse-menu__header is-${theme} p-b-1`}>
              <ThemeChooser visible={menuVisible} />
              <ul className='c-book-browse-menu__menu m-a-0 p-a-0'>
                <li className='c-book-browse-menu__menu-item p-x-1'
                  onClick={this._setIndexTabVisible}>الفهرس</li>
                <li className='c-book-browse-menu__menu-item p-x-1'
                  onClick={this._setBookmarkTabVisible}>العلامات المرجعية</li>
                <li className='c-book-browse-menu__menu-item p-x-1'
                  onClick={this._setNoteTabVisible}>الملاحظات</li>
              </ul>
              <ul className='c-book-browse-menu__tools m-a-0 p-a-0'>
                <li className='c-book-browse-menu__tools-item p-x-1' onClick={this._toggleThemeMenu}>
                  <Icon name={settingIcon} />
                </li>
                <li className='c-book-browse-menu__tools-item p-x-1'
                  onClick={this._bookMarkToggle}>
                  <Icon name={bookmarkIcon} className={`${isMarking ? 'hidden-xs-up' : ''}`} />
                  <Loading width={20} height={20} scale={15} className={`${!isMarking ? 'hidden-xs-up' : ''}`} />
                </li>
                <li className='c-book-browse-menu__tools-item p-x-1' onClick={this._toggleBookSearchMenu} >
                  <Icon name={searchIcon} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>)
  }
  _setIndexTabVisible = () => {
    const { setVisibleIndexTab, toggleBookIndexMenu } = this.props
    setVisibleIndexTab('indexes')
    toggleBookIndexMenu()
  }
  _setBookmarkTabVisible = () => {
    const { setVisibleIndexTab, toggleBookIndexMenu } = this.props
    setVisibleIndexTab('bookmarks')
    toggleBookIndexMenu()
  }
  _setNoteTabVisible = () => {
    const { setVisibleIndexTab, toggleBookIndexMenu } = this.props
    setVisibleIndexTab('notes')
    toggleBookIndexMenu()
  }
  _bookMarkToggle = () => {
    const { bookMark, unBookMark, visiblePages, bookId, bookmarks, markingids } = this.props
    const isMarking = markingids.findIndex((id: number): boolean => id === bookId) >= 0
    if (isMarking) return
    const visiblePage = visiblePages[0]

    const bookmarked = bookmarks.findIndex((b: Object): boolean => b.page_number === visiblePage) >= 0
    if (bookmarked) {
      unBookMark(bookId, visiblePage)
    } else if (typeof bookMark !== 'undefined') {
      bookMark(bookId, visiblePage)
    }
  }
  _toggleBookIndexMenu = () => {
    const { toggleBookIndexMenu } = this.props
    toggleBookIndexMenu()
  }
  _toggleBookSearchMenu = () => {
    const { toggleBookSearchMenu } = this.props
    toggleBookSearchMenu()
  }
  _toggleThemeMenu = () => {
    const { menuVisible } = this.state
    this.setState({ menuVisible: !menuVisible })
  }
}

export default Menu
