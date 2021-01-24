// @flow
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './DepartmentBooksBlock.scss'

type PropertiesType = {
  onPurchase: Function
};

let timer = null

const DepartmentBooksBlock = ({ onPurchase = (): Function => {} }: PropertiesType): React.Element<'div'> => {
  const [purchased, setPurchased] = useState(false)
  const { department, books, departmentId: activeDepId, specialtyId: activeSpecId } = useSelector((state: Object): Object => state.market)
  const booksMap = books.filter(book => book.specialtyId === activeSpecId && book.departmentId === activeDepId && book.id)
  const firstBook = booksMap.find(book => book.photoUrl) || booksMap[0]
  const onClick = () => {
    onPurchase({ ids: booksMap.reduce((all: Array, next: Object): Array => [ ...all, next.subjectId ], []) })
    setPurchased(true)
    timer = setTimeout((): Function => setPurchased(false), 2000)
  }

  useEffect((): Function => (): Function => {
    clearTimeout(timer)
  }, [])

  if (booksMap.length === 0) {
    return null
  }
  return <div className='DepartmentBooksBlock m-b-2 p-y-2' style={{ backgroundColor: firstBook && firstBook.color }}>
  <div className='col-xs-12 col-md-3' style={{ position: 'initial' }}>
	  <div className='DepartmentBooksBlock__cover'>
	     <img src={firstBook && firstBook.photoUrl}
         className={`${(firstBook && !firstBook.photoUrl) ? 'is-empty' : ''} mg-fluid MarketBookBlock__img`} />
	  </div>
  </div>
  <div className='col-xs-12 col-md-6'>
  <h2 className='p-b-2 p-t-2'>كتب {department.termName}</h2>
  {booksMap.map((book: Object): React.Element<'div'> =>
    <div key={book.key} className='col-xs-12 col-md-6 m-b-1'>
      {book.name}
    </div>)}
   
  </div>
      <button onClick={onClick} disabled={purchased} className='btn btn-success' type='button'>
        {purchased ? 'تمت الإضافة لعربة التسوق' : 'حجز المجموعة'}
      </button>
     <div className='clearfix' />
  </div>
}

export default DepartmentBooksBlock
