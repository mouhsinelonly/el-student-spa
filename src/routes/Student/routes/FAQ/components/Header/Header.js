// @flow
import React, { useRef, useCallback } from 'react'
import { Link, browserHistory } from 'react-router'
import './style.scss'

type PropsType = {
  subtitle: string,
  query: string,
  setQuery: Function,
  searchHolder: string
};

const Header = (props: PropsType): React.Element<'div'> => {
  const ref = useRef(null)
  const _search = useCallback((e: Object) => {
    if (typeof e.keyCode === 'undefined' || e.keyCode === 13) {
      const query = ref.current.value
      props.setQuery(query)
      browserHistory.push('/support/faq/searchit')
    }
  })
  return (<div className='c-faq-header p-y-3'>
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-10 col-lg-pull-1'>
          <div className='col-xs-12 col-md-6 p-t-1 p-r-0' key='subtitle'>
            <Link to='/support/faq' className='c-faq-header__back'>
              الأسئلة الشائعة
            </Link> <span className='p-x-1'>></span> {props.subtitle}
          </div>
          <div className='col-xs-12 col-md-6 p-l-0' key='search'>
            <div className='input-group'>
              <input
                ref={ref}
                defaultValue={props.query}
                onKeyUp={_search}
                className='form-control form-control-md p-y-1'
                placeholder={props.searchHolder} />
              <span className='input-group-btn'>
                <button onClick={_search}
                  className='btn btn-success btn-md p-y-1 p-x-3'>
                البحث
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

Header.defaultProps = {
  subtitle: '',
  query: '',
  searchHolder: ''
}
export default Header
