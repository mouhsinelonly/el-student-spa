// @flow
import * as React from 'react'
import './style.scss'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import Icon from 'components/Icon'
import SearchBarFilterForm from 'components/Library/SearchBarFilterForm'

const fields = [
  'query'
]
type SearchBarType = {
  fields: Object,
  categories: Array<Object>,
  filterEnabled: boolean,
  category_id: number,
  handleSubmit: Function,
  guard: string,
  getBooksFilter: Function,
  resetSearch: Function
};

class SearchBar extends React.Component<SearchBarType> {
  render (): React.Element<'div'> {
    const { fields: { query }, handleSubmit, categories, category_id: categoryId,
    getBooksFilter, filterEnabled, guard } = this.props

    return (
      <div className='c-library-search-bar'>
        <form onSubmit={handleSubmit(this._handleSubmit)} className='c-library-search-bar__query p-y-2'>
          <div className='container'>
            <div className='row'>
              <button type='button' className='c-library-search-bar__back' onClick={this._resetSearch}>
                <Icon name='library-back' />
              </button>
              <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-6 col-lg-pull-3 p-r-0-lg p-l-0-lg'>
                <div className='input-group'>
                  <input
                    type='text'
                    autoComplete='off'
                    className='form-control c-library-search-bar__input'
                    {...domOnlyProps(query)} />
                  <span className='input-group-btn'>
                    <button className='btn btn-secondary c-library-search-bar__btn p-x-3'>
                      البحث
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
        <SearchBarFilterForm categories={categories}
          enabled={filterEnabled}
          guard={guard}
          initialValues={{ orderby: 'newest', category_id: categoryId }}
          getBooksFilter={getBooksFilter} />
      </div>
    )
  }
  _resetSearch = () => {
    const { resetSearch } = this.props
    resetSearch()
  }

  _handleSubmit = (values: Object) => {
    const { getBooksFilter, guard } = this.props
    getBooksFilter({ ...values, guard })
  }
}

export default reduxForm({
  form: 'librarysearchbar',
  fields
})(SearchBar)
