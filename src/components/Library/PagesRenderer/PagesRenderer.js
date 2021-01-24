// @flow
import * as React from 'react'
import PageRenderer from 'components/Library/PageRenderer'
import './style.scss'

type PropsType = {
  pages: number,
  loadedPages: Object,
  settings: Object,
  bookId: number
};

class PagesRenderer extends React.Component<PropsType> {
  static defaultProps = {
    settings: { theme: 'light' },
    pages: 0,
    loadedPages: {}
  };
  render (): React.Element<'div'> {
    const { pages, bookId, loadedPages, settings: { theme }, visiblePages, hilightedPage, hilightedText,
    hilightedPopUpVisible } = this.props

    return (
      <div className={`c-pages-renderer is-${theme}`}>
        {Array.from(Array(pages).keys()).map((k: number): React.Element<typeof PageRenderer> => {
          const loadedPage = loadedPages[`${bookId}-${k + 1}`]
          let content = ''
          let loading = true
          if (typeof loadedPage !== 'undefined') {
            content = loadedPage.content
            loading = loadedPage.loading
          }
          return <PageRenderer
            key={k}
            bookId={bookId}
            number={k + 1}
            content={content}
            visiblePages={visiblePages}
            hilightedPage={hilightedPage}
            hilightedText={hilightedText}
            hilightedPopUpVisible={hilightedPopUpVisible}
            loading={loading} />
        })}
      </div>
    )
  }
}

export default PagesRenderer
