// @flow
import * as React from 'react'
import SearchResultBook from 'components/Library/SearchResultBook'
import MyLibraryEmpty from 'components/Library/MyLibraryEmpty'
import Loading from 'components/Loading'
import './style.scss'

type PropsType = {
  loading: boolean,
  books: Array<Object>,
  getMyBooks: Function,
  guard: string,
  addBookToShelf: Function,
  singleBookLink: string,
  isSubscribed: boolean,
  removeBookFromShelf: Function
};

class MyProfile extends React.Component<PropsType> {
  static defaultProps = {
    books: [],
    isSubscribed: true,
    loading: false,
    guard: 'student',
    singleBookLink: '/library/browse',
    getMyBooks: () => {},
    addBookToShelf: () => {},
    removeBookFromShelf: () => {}
  }
  componentDidMount () {
    const { getMyBooks, guard } = this.props
    getMyBooks({ guard })
  }
  render (): React.Element<'div'> {
    const { books, loading, removeBookFromShelf, addBookToShelf, guard, singleBookLink, isSubscribed } = this.props
    if (loading) {
      return <Loading />
    }

    if (books.length === 0) {
      return (<div className='container m-t-3 text-xs-center'>
        <div className='row'>
          <div className='col-xs-12 col-md-4 col-md-pull-4'>
            <MyLibraryEmpty />
          </div>
        </div>
      </div>)
    }
    return (<div className='p-my-library'>
      <div className='p-my-library__hero'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 p-x-0'>
              <div className='p-library-searchresult__content'>
                {books.filter((b: Object, i: number): boolean => i === 0)
                  .map((b: Object): React.Element<typeof SearchResultBook> =>
                    <SearchResultBook
                      singleBookLink={singleBookLink}
                      isSubscribed={isSubscribed}
                      removeBookFromShelf={removeBookFromShelf}
                      addBookToShelf={addBookToShelf}
                      {...b}
                      guard={guard}
                      key={b.id} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2 p-x-0'>
            <div className='p-library-searchresult__content'>
              {books.filter((b: Object, i: number): boolean => i > 0)
                .map((b: Object): React.Element<typeof SearchResultBook> =>
                  <SearchResultBook
                    isSubscribed={isSubscribed}
                    singleBookLink={singleBookLink}
                    removeBookFromShelf={removeBookFromShelf}
                    addBookToShelf={addBookToShelf}
                    {...b}
                    guard={guard}
                    key={b.id} />)}
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default MyProfile
