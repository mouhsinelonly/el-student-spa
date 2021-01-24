// @flow
import * as React from 'react'
import ResearchResultForm from 'components/Library/ResearchResultForm'
import VisibilitySensor from 'react-visibility-sensor'
import Loading from 'components/Loading'
import { showModal } from 'modules/modals'
import { loadMore } from 'routes/Student/modules/library'
import { useDispatch } from 'react-redux'

import './style.scss'

type PropsType = {
  guard: string,
  books: Array<Object>,
  pagination: Object,
  booksloading: false,
  showModal: Function
};

const ResearcherResult = ({ guard, books, pagination, booksloading, showModal }: PropsType): Array<React.Node> => {
  const dispatch = useDispatch()
  const loadMoreCallback = React.useCallback(() => {
    dispatch(loadMore())
  })
  return [
    <ResearchResultForm guard={guard} key='form' />,
    <div className='container' key='result'>
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-md-pull-2'>
          {booksloading && !books.length ? <Loading /> : null}
          { books.map((b: Object, index: number): React.Element<typeof BookResultRow> =>
            <BookResultRow
              guard={guard}
              key={b.id * index}
              {...b} />) }
        </div>
      </div>
    </div>,
    pagination.currentPage < pagination.totalPages
    ? <VisibilitySensor key='visibility' delayedCall partialVisibility delay={500} onChange={loadMoreCallback}>
      <button className='btn btn-success btn-lg m-x-auto m-y-3'
        disabled={booksloading}
        style={{ width: 200, display: 'block' }}
        onClick={loadMoreCallback}>
        {booksloading ? 'جاري التحميل...' : 'المزيد'}
      </button>
    </VisibilitySensor> : null
  ]
}

type BooksResultPropsType = {
  title: string,
  guard: string,
  bpages: Array<Object>,
  id: number
};

const BookResultRow = ({ guard, title, bpages: pages, id }: BooksResultPropsType): React.Element<'div'> => <div>
  {pages ? pages.map((p: Object): React.Element<typeof BookPageRow> =>
    <BookPageRow key={p.id} {...p} guard={guard} bookid={id} bookTitle={title} />) : null}
</div>

type BookPagePropType = {
  bookTitle: string,
  content: string,
  guard: string,
  number: number,
  id: number,
  bookid: number
};

const BookPageRow = ({ bookTitle, number,
  content, bookid, guard, id }: BookPagePropType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const handleClick = React.useCallback((e: Object) => {
    dispatch(showModal('researchbookpage', { id, guard, bookId: bookid, page: number, showAdd: true }))
  }, [])
  return <div>
    <p
      dangerouslySetInnerHTML={{ __html: content }} className='ResearcherResult__page' onClick={handleClick} />
    <div className='ResearcherResult__meta'> كتاب : {bookTitle} . الصفحة : {number}</div>
    <hr />
  </div>
}

ResearcherResult.defaultProps = {
  words: []
}
export default ResearcherResult
