// @flow
import * as React from 'react'
import Icon from 'components/Icon'

type CategoryBookType = {
  title: string,
  toggle: Function,
  id: number,
  active: boolean,
  category_id: number
};

class CategoryBook extends React.PureComponent<CategoryBookType> {
  render (): React.Element<'li'> {
    const { title, active } = this.props
    return <li className={`p-a-2 c-library-research-hero__books-item ${active ? 'is-active' : ''}`}
      onClick={this._toggle}>
      <Icon name={`${active ? 'checkbox-brown-active' : 'checkbox-brown'}`} className='m-l-1' /> {title}
    </li>
  }

  _toggle = () => {
    const { toggle, id, category_id : catId } = this.props
    toggle(id, catId)
  }
}

export default CategoryBook
