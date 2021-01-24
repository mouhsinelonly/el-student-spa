// @flow
import React, { useEffect } from 'react'
import Navbar from 'routes/Home/components/Navbar'
import Hero from './components/Hero'
import Footer from 'components/Footer'
import { Helmet } from 'react-helmet'
import { Translate } from 'react-localize-redux'
// import { getBooks } from 'modules/market'
import { getBooks } from 'modules/market'
import { BookBlock } from './components'
import { useDispatch, useSelector } from 'react-redux'
type PropsType = {
  children: React.Element<*>
};

const Landing = (props: PropsType): React.Element<'div'> => {
  const {
      books
   } = useSelector((state: Object): Object => state.market)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
  }, [])
  return (
    props.children || <>
      <Translate>
        {({ translate }: Object): React.Element<typeof Helmet> => <Helmet>
          <title>{translate('home.navbar_library')}</title>
        </Helmet>}
      </Translate>
      <Navbar market />
      <Hero />
      <div className='col-xs-12 col-md-12 p-y-2 p-x-3'>
            <div className='row'>
              {books.map((book: Object): React.Element<'div'> => {
                return <div key={book.key} className='col-xs-12 col-md-4 m-b-2'>
                  <BookBlock
                    name={book.name}
                    id={book.subjectId}
                    pageCount={book.pageCount}
                    color={book.color}
                    available={!!book.id}
                    photoUrl={book.photoUrl}/>
                </div>
              })}
            </div>
          </div>
      <Footer />
    </>
  )
}

export default Landing
