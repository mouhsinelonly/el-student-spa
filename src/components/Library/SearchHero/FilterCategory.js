// @flow
import * as React from 'react'
import Icon from 'components/Icon'

type FilterCategoryType = {
  name: string,
  id: number,
  toggle: Function,
  show: Function,
  active: boolean
};

class FilterCategory extends React.PureComponent<FilterCategoryType> {
  render = (): React.Element<'li'> => {
    const { active, name } = this.props

    return (<li
      onClick={this._showCategory}
      className={`c-library-research-hero__cats-item text-nowrap ${active ? 'is-active' : ''}`}>
      <Icon handleClick={this._toggleCategory} name={`${active ? 'checkbox-brown-active' : 'checkbox-brown'}`}
        className={`${active ? 'is-active' : ''} m-l-1`} />
      {name}
      <span className='c-library-research-hero__cats-item-arrow'>&gt;</span>
    </li>)
  }

  _showCategory = (e: Object) => {
    e.stopPropagation()
    const { id, show } = this.props
    show(id)
  }
  _toggleCategory = () => {
    const { id, toggle } = this.props
    toggle(id)
  }
}

export default FilterCategory
