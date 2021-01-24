// @flow
import React, { useEffect } from 'react'
import { BookBlock, Sidebar, DepartmentBooksBlock, Header, ChooseDeliveryDay } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from 'modules/modals'
import { getBooksInvoice } from '../../modules/student'

import './Market.scss'
import { getBooks, setActiveDepartment, getCartItems, getOrders, getDays } from 'routes/Student/modules/market'

type PropertiesType = {
  onPurchase: Function
};

const Market = ({ onPurchase, toggleCart }: PropertiesType): React.Element<'div'> => {
  const { profile: {
    academystructure_department_id: departmentId,
    specialtyId } } = useSelector((state: Object): Object => state.student)
  const { name } = useSelector(state => state.modals)

  useEffect(() => {
    if (name === 'covid') {
      dispatch(closeModal())
    }
  }, [name])
  const {
      specialties,
      books,
      days,
      orders,
      daysLoading,
      departmentId: activeDepId,
      specialtyId: activeSpecId,
      cartItems } = useSelector((state: Object): Object => state.market)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDays())
    dispatch(getBooks())
    dispatch(getOrders())
    dispatch(getCartItems())
    dispatch(getBooksInvoice())
  }, [])
  useEffect(() => {
    const specNew = {
      1:11,
      2:9,
      3: 10
    }
    const newSpecialtyId = [11, 9, 10].includes(specialtyId) ? specialtyId : specNew[specialtyId]
    // const newDepartmentId
    dispatch(setActiveDepartment({ departmentId: 54, specialtyId: 9 }))
  }, [specialties.length])
  const hasChosenDay = Object.keys(days).reduce((chosen, next) => chosen + days[next].chosen, 0)
  const hasOrders = orders.findIndex((order: Object): boolean => !['waiting', 'received'].includes(order.status)) >= 0
  return [<Header toggle={toggleCart} key='header' />,

    (!daysLoading || Object.keys(days).length > 0) && hasOrders ? <ChooseDeliveryDay chosen={hasChosenDay} key='day' /> : null,
    <div key='body'>
      <div className='container p-b-3'>
        <div className='p-b-3'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 p-x-0 m-t-2'>
            <div className='col-xs-12 Market__dep'>
              <DepartmentBooksBlock onPurchase={onPurchase} />
            </div>
            <div className='col-xs-12 col-md-3'>
              <Sidebar />
            </div>
            <div className='col-xs-12 col-md-9'>
              <div className='row'>
                {books.filter((book: Object): React.Element<typeof BookBlock> => book.specialtyId === activeSpecId && book.departmentId === activeDepId)
                .map((book: Object): React.Element<'div'> => {
                  const itemKey = Object.keys(cartItems).find((key: string): boolean => key === `item-${book.subjectId}`)
                  const item = itemKey ? cartItems[itemKey] : {}

                  return <div key={book.key} className='col-xs-12 col-md-4 m-b-2'>
                    <BookBlock
                      name={book.name}
                      id={book.subjectId}
                      onPurchase={onPurchase}
                      inCart={item.total || 0}
                      pageCount={book.pageCount}
                      version={book.version}
                      color={book.color}
                      available={!!book.id}
                      photoUrl={book.photoUrl} />
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>]
}

export default Market
