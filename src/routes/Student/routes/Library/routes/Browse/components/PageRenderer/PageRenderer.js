// @flow
import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
// import Loading from 'components/Loading'
// import AddNote from '../AddNote'
// import { getSelectedParagraphText } from 'utils'
// import { PinchView } from 'react-pinch-zoom-pan'
import './style.scss'

type PropType = {
  number: number,
  bookId: number,
  hilightedPage: number,
  getBookPage: Function,
  visiblePages: Array<number>,
  settings: Object,
  setInvisiblePage: Function,
  setHilightedText: Function,
  hilightedText: string,
  setVisiblePage: Function,
  loadedPages: Object,
  loading: boolean,
  hilightedPopUpVisible: boolean,
  query: string,
  content: string
};

class PageRenderer extends React.Component<PropType> {
  // componentDidMount () {
  //   if (typeof this.refs['page'] !== 'undefined') {
  //     this.refs['page'].addEventListener('mouseup', this._onMouseUp)
  //   } else {
  //   }
  // }
  // componentWillUnmount () {
  //   if (typeof this.refs['page'] !== 'undefined') {
  //     this.refs['page'].removeEventListener('mouseup', this._onMouseUp)
  //   } else {
  //   }
  // }
  render () {
    const {
      content,
      loadedPages,
      loading,
      settings: { fontSize, theme },
      number,
      query,
      visiblePages,
      hilightedPage,
      bookId,
      hilightedText
    } = this.props
    let strokeColor = '#a0a0a0'
    switch (theme) {
      case 'black':
        strokeColor = '#a0a0a0'
        break
      case 'caramel':
        strokeColor = '#344142'
        break
      case 'white':
        strokeColor = '#3c3c3c'
        break
    }

    // console.log(Object.assign({}, fontSize, {minHeight: '200px'}))
    let newContent = content
    if (query !== '' && content) {
      newContent = content.replace(query, `<span class="c-page-renderer__highlight">${query}</span>`)
    }
    const loadedPage = loadedPages[`${bookId}-${number}`]
    // console.log(visiblePages)
    const maxPage = visiblePages[visiblePages.length - 1] + 4
    const imageShouldLoad = (typeof loadedPage !== 'undefined') || number <= maxPage
    // console.log(imageShouldLoad, maxPage)
    return (
      <div
        ref='page'
        className={`c-page-renderer__container p-y-1 is-${theme}`}
        style={{ fontSize, minHeight: '600px' }}
        id={`pageRenderer${number}`}
      >
        {/* number === hilightedPage ? (
          <AddNote initialValues={{ page_number: number, book_id: bookId, highlight: hilightedText }} />
        ) : null */}
        <VisibilitySensor onChange={this._onVisible} >
        <img src={imageShouldLoad ? `https://el-css.com/cdn/bookspng/book_${bookId}_${number}.png` : null}
          alt={number} className='img-fluid' />
        {/* <PinchView backgroundColor='#fff' maxScale={4} initalScale={1} containerRatio={1394 / 891 * 100}>
          <img
            src={!loading ? `https://el-css-cdn.com/cache/book_${bookId}_${number}.png` : null}
            style={{
              margin: 'auto',
              width: '100%',
              height: 'auto'
            }}
          />
        </PinchView> */}
        </VisibilitySensor>
        <div className='c-page-renderer__overlay' />
      </div>
    )
  }

  _createMarkup = (markup: string) => {
    return { __html: markup }
  }
  _onMouseUp = (e: Object) => {
    // const { setHilightedText, number, hilightedPopUpVisible } = this.props
    // setTimeout(function () {
    //   const text = getSelectedParagraphText()
    //   const bounds = e.target.getBoundingClientRect()
    //   if (text !== '') {
    //     setHilightedText(text, number, e.clientX - bounds.left, e.clientY - bounds.top)
    //   } else if (!hilightedPopUpVisible) {
    //     setHilightedText('', 0, 0, 0)
    //   }
    // }, 100)
  }
  _onVisible = (isVisible: number) => {
    const { number, getBookPage, bookId, loadedPages, visiblePages, setVisiblePage, setInvisiblePage } = this.props
    const loadedPage = loadedPages[`${bookId}-${number}`]

    const canLoad =
      typeof loadedPage === 'undefined' ||
      (typeof loadedPage !== 'undefined' && typeof loadedPage.content === 'undefined' && loadedPage.loading !== true)

    if (isVisible && canLoad) {
      getBookPage(bookId, number)
    }
    if (isVisible && visiblePages.findIndex(i => i === number) < 0) {
      setVisiblePage(number)
    } else if (!isVisible && visiblePages.findIndex(i => i === number) >= 0 && visiblePages.length > 1) {
      setInvisiblePage(number)
    }
  }
}

export default PageRenderer
