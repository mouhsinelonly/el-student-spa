// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import './style.scss'

export const fields = [
  'orderby',
  'category_id'
]

type PropsType = {
  fields: Object,
  handleSubmit: Function,
  getBooksFilter: Function,
  enabled: boolean,
  guard: string,
  categories: Array<Object>
};

class SearchBarFilterForm extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { fields: { category_id: categoryId, orderby }, handleSubmit, categories, enabled } = this.props

    if (!enabled) {
      return <div />
    }
    // console.log(categoryId)
    return (
      <div className='container p-y-2'>
        <div className='row'>
          <form onSubmit={handleSubmit}>
            <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-4 col-lg-pull-3 p-r-0-lg'>
              <span className='p-l-1 c-library-searchbarfilter__text'>
                رتب حسب
              </span>
              <label className={`c-library-searchbarfilter__radiolabel is-first
                        ${orderby.value === 'title' ? 'is-checked' : ''}`}>
                <input className='c-library-searchbarfilter__radio'
                  type='radio'
                  {...domOnlyProps(orderby)}
                  onChange={(e: Object) => {
                    orderby.onChange(e) && this._onChangeCategory(e)
                  }
                  }
                  value='title' /> العنوان
              </label>
              <label className={`c-library-searchbarfilter__radiolabel
                ${orderby.value === 'author' ? 'is-checked' : ''}`}>
                <input className='c-library-searchbarfilter__radio'
                  type='radio'
                  {...domOnlyProps(orderby)}
                  onChange={(e: Object) => {
                    orderby.onChange(e) && this._onChangeCategory(e)
                  }
                  }
                  value='author' />
                  المؤلف
              </label>
              <label className={`c-library-searchbarfilter__radiolabel
                ${orderby.value === 'newest' ? 'is-checked' : ''}`}>
                <input className='c-library-searchbarfilter__radio'
                  type='radio'
                  {...domOnlyProps(orderby)}
                  onChange={(e: Object) => {
                    orderby.onChange(e) && this._onChangeCategory(e)
                  }
                  }
                  value='newest' /> الأحدث
              </label>
              <label className={`c-library-searchbarfilter__radiolabel
                ${orderby.value === 'oldest' ? 'is-checked' : ''}`}>
                <input className='c-library-searchbarfilter__radio'
                  type='radio'
                  {...domOnlyProps(orderby)}
                  onChange={(e: Object) => {
                    orderby.onChange(e) && this._onChangeCategory(e)
                  }
                  }
                  value='oldest' /> الأقدم
              </label>
            </div>
            <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-2 col-lg-pull-3 p-l-0-lg'>
              <select {...domOnlyProps(categoryId)}
                onChange={(e: Object) => {
                  categoryId.onChange(e) && this._onChangeCategory(e)
                }
                }
                className='c-library-searchbarfilter__select'>
                <option value={0}>كل الأقسام</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </form>
        </div>
      </div>
    )
  }

  _onChangeCategory = (e: Object) => {
    const { getBooksFilter, guard } = this.props
    if (e.target.name === 'category_id') {
      getBooksFilter({ category_id: +e.target.value, guard })
    } else if (e.target.name === 'orderby') {
      getBooksFilter({ orderby: e.target.value, guard })
    }
  }
}

export default reduxForm({
  form: 'filtersearchform',
  fields,
  destroyOnUnmount: false
})(SearchBarFilterForm)
