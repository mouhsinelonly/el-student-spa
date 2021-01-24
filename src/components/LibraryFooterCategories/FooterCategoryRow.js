// @flow
import * as React from 'react'

type PropsType = {
  getBooks: Function,
  id: number,
  guard: string,
  name: string
};
class FooterCategoryRow extends React.Component<PropsType> {
  render (): React.Element<'li'> {
    const { name } = this.props
    return (
      <li onClick={this._searchCategory}
        className='c-library-footer-categories__item col-xs-12 col-md-4 col-lg-3 p-b-1'>
        {name}
      </li>
    )
  }

  _searchCategory = () => {
    const { getBooks, id, guard } = this.props
    getBooks({ category_id: id, guard })
  }
}

export default FooterCategoryRow
