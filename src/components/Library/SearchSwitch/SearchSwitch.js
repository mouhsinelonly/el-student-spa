// @flow
import * as React from 'react'
import './style.scss'

type SearchSwicthType = {
  searchType: string,
  onChange: Function
};

const SearchSwicth = (props: SearchSwicthType): React.Element<'div'> =>
  <div className='c-library-search-switch p-t-3 text-xs-center '>
  البحث في <label
    className={`c-library-search-switch__radiolabel m-b-1 ${props.searchType === 'normal' ? 'is-checked' : ''}`}>
    <input className='c-library-search-switch__radio'
      type='radio'
      onChange={props.onChange}
      name='type'
      value='normal' />
    الكتب و الأقسام
  </label>
    <label className={`c-library-search-switch__radiolabel m-b-1 ${props.searchType === 'quran' ? 'is-checked' : ''}`}>
      <input className='c-library-search-switch__radio'
        type='radio'
        disabled
        onChange={props.onChange}
        name='type'
        value='quran' />
    القرآن الكريم
    </label>
  </div>

export default SearchSwicth
