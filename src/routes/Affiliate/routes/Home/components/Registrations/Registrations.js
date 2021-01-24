// @flow
import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRegistrationQuery } from 'routes/Affiliate/modules/affiliates'
import RegistrationRowPlaceHolder from 'components/Placeholders/RegistrationRow'
import RegistrationRow from '../RegistrationRow'
import RegistrationInfo from '../RegistrationInfo'
import useKeyPress from 'hooks/useKeyPress'
import './Registrations.scss'
import ReactPaginate from 'react-paginate'
const RegistrationPlaceholders = new Array(5).fill(1)
type PropsType = {};

const Registrations = (props: PropsType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const [page, setPage] = useState({ selected: 0 })
  const [keyboardDirection, setKeyboardDirection] = useState(false)

  const { registrations: { data, loading }, activeRegistrationId } =
  useSelector((state: Object): Object => state.affiliates)
  useEffect(() => {
    dispatch(setRegistrationQuery({ page: +(page.selected + 1) }))
  }, [page])

  useEffect(() => {
    if (keyboardDirection === 'left' && page.selected < (data !== null ? data.last_page - 1 : 0) && !loading) {
      setPage({ selected: page.selected + 1 })
      setKeyboardDirection(false)
    }
    if (keyboardDirection === 'right' && page.selected > 0 && !loading) {
      setPage({ selected: page.selected - 1 })
      setKeyboardDirection(false)
    }
  }, [keyboardDirection, page, loading])

  const OnLeftPressUp = useCallback(() => {
    setKeyboardDirection('left')
  }, [])

  const OnRightPressUp = useCallback(() => {
    setKeyboardDirection('right')
  }, [])

  useKeyPress('ArrowLeft', OnLeftPressUp)
  useKeyPress('ArrowRight', OnRightPressUp)

  return (<div>
    <RegistrationInfo />
    <div className='container m-y-2'>
      <div className={`Affiliate-Registrations__rows ${data !== null && data.total ? 'has-rows' : ''}`}>
        <div className='row'>
          <div className='col-xs-12'>
            {loading ? RegistrationPlaceholders.map((value: string, i: number): React.Element<typeof RegistrationRow> =>
              <RegistrationRowPlaceHolder key={i} className={i % 2 === 0 ? 'is-odd' : ''} />
          ) : null }
            { !loading && data !== null ? Object.keys(data.rows[`page-${data.current_page}`])
              .map((key: string, i: number): React.Element<typeof RegistrationRow> =>
                <RegistrationRow odd={i % 2 === 0} key={key} {...data.rows[`page-${data.current_page}`][key]} />) : null }
          </div>
        </div>
      </div>
      <ReactPaginate
        pageCount={data !== null ? data.last_page : 0}
        onPageChange={setPage}
        disableInitialCallback
        pageRangeDisplayed={3}
        forcePage={data !== null ? data.current_page - 1 : 0}
        initialPage={data !== null ? data.current_page - 1 : 0}
        previousLabel='السابق'
        activeLinkClassName='is-active'
        containerClassName='Affiliate-Registrations__pagination m-t-3'
        previousLinkClassName='Affiliate-Registrations__pagination-link'
        nextLinkClassName='Affiliate-Registrations__pagination-link'
        breakLinkClassName='Affiliate-Registrations__pagination-link'
        pageLinkClassName='Affiliate-Registrations__pagination-link is-number'
        pageClassName='Affiliate-Registrations__pagination-page'
        breakClassName='Affiliate-Registrations__pagination-break'
        previousClassName='Affiliate-Registrations__pagination-forward'
        nextClassName='Affiliate-Registrations__pagination-forward'
        nextLabel='التالي' />
    </div>
  </div>)
}

export default Registrations
