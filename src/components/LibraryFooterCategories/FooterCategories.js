// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import FooterCategoryRow from './FooterCategoryRow'

type PropsType = {
  categories: PropTypes.array,
  getBooks: PropTypes.func,
  guard: string
};

class FooterCategories extends React.Component<PropsType> {
  static defaultProps = {
    categories: []
  }
  render (): React.Element<'div'> {
    const { categories, getBooks, guard } = this.props
    return (
      <div className={`${!categories.length ? 'hidden-xs-up' : ''}`}>
        <div className='col-xs-12 col-md-10 col-md-pull-1'>
          <div className='col-xs-12'>
            <h3 className='p-y-3 c-library-footer-categories__header'>تصفح الأقسام</h3>
          </div>
          <ul className='c-library-footer-categories__items'>
            {categories.map((c: Object): Object => <FooterCategoryRow
              getBooks={getBooks}
              guard={guard}
              key={c.id} {...c} />)}
          </ul>
        </div>
      </div>
    )
  }
}

export default FooterCategories
