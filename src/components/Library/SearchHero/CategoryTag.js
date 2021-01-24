// @flow
import * as React from 'react'

type CategoryTagType = {
  name: string,
  id: number,
  totalBooks: number,
  toggle: Function
};

class CategoryTag extends React.PureComponent<CategoryTagType> {
  render (): React.Element<'li'> {
    const { name, totalBooks } = this.props
    return (<li
      onClick={this._stopPropagating}
      className='c-library-research-hero__cats-tag'>
      {name} ({totalBooks === 0 ? 'الكل' : totalBooks})
      <span className='c-library-research-hero__cats-tag-arrow' onClick={this._closeCategory}>&times;</span>
    </li>)
  }

  _closeCategory = () => {
    const { id, toggle } = this.props
    toggle(id)
  }
  _stopPropagating = (e: Object) => {
    e.stopPropagation()
  }
}

export default CategoryTag
