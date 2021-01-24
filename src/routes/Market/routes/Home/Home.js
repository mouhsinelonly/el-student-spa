// @flow
import React, { useEffect } from 'react'
import Navbar from 'routes/Home/components/Navbar'
import Hero from '../../components/Hero'
import LearningResources from 'routes/Library/components/LearningResources'
import Features from 'routes/Library/components/Features'
import Footer from 'components/Footer'
import { Helmet } from 'react-helmet'
import { Translate } from 'react-localize-redux'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getCartItems, getOrders, getDays } from 'modules/market'
import { BookBlock, DepartmentBooksBlock, Header, Soon, ChooseDeliveryDay } from '../../components'

type PropsType = {
  children: React.Element<*>
};

const Home = (props: PropsType): React.Element<'div'> => {
  const {
      books,
      cartItems
   } = useSelector((state: Object): Object => state.market)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks()),
    dispatch(getCartItems())
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
              {books.map((book : Object) : React.Element < 'div' > => {
                const itemKey = Object
                  .keys(cartItems)
                  .find((key : string) : boolean => key === `item-${book.subjectId}`)
                const item = itemKey
                  ? cartItems[itemKey]
                  : {}

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

export default Home
