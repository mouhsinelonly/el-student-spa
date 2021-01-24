// @flow
import React from 'react'
type PropsType = {
  handleSearch: Function
};
// $FlowFixMe
const SearchStudent = React.memo(({ handleSearch }: PropsType): React.Element<'div'> => {
  return (
    <div className='right-side__search'>
      <input type='text'
        placeholder='بحث عن طالب'
        className='right-side__username'
        onKeyUp={handleSearch}
        autoFocus='autoFocus' />
      <i className='material-icons' onClick={handleSearch} >search</i>
    </div>)
})

export default SearchStudent
