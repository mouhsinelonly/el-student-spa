// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
import { domOnlyProps } from 'utils'
import './style.scss'

const fields = [
  'query',
  'type',
  'category_id'
]

type PropsType = {
  fields: Object,
  categories: Array<Object>,
  handleSubmit: Function,
  getBooks: Function,
  guard: string
};

class SearchHero extends React.Component<PropsType> {
  static defaultProps = {
    categories: [],
    guard: 'students'
  }
  render (): React.Element<'div'> {
    const { fields: { query, type, category_id: categoryId }, handleSubmit, categories } = this.props
    const submitDisabled = !query.value && !categoryId.value

    return (
      <div className='c-library-search-hero'>
        <div className='c-library-search-hero__right'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                  <input placeholder='عن ماذا تبحث ؟'
                    className='c-library-search-hero__input'
                    type='text'
                    {...domOnlyProps(query)} />
                  <div className='col-xs-12 col-md-7 m-r-0 p-r-0'>
                    <label className={`c-library-search-hero__radiolabel m-b-1 is-first
                      ${type.value === 'subjects' ? 'is-checked' : ''}`}>
                      <input className='c-library-search-hero__radio'
                        type='radio'
                        {...domOnlyProps(type)}
                        value='subjects' />
                      المواضيع
                    </label>
                    <label className={`c-library-search-hero__radiolabel m-b-1
                      ${type.value === 'pages' ? 'is-checked' : ''}`}>
                      <input className='c-library-search-hero__radio'
                        type='radio'
                        {...domOnlyProps(type)}
                        value='pages' />
                      المحتوى
                    </label>
                    <label className={`c-library-search-hero__radiolabel m-b-1
                      ${type.value === 'titles' ? 'is-checked' : ''}`}>
                      <input className='c-library-search-hero__radio'
                        type='radio'
                        {...domOnlyProps(type)}
                        value='titles' />
                      عنوان الكتاب
                    </label>
                    <label className={`c-library-search-hero__radiolabel m-b-1
                      ${type.value === 'authors' ? 'is-checked' : ''}`}>
                      <input className='c-library-search-hero__radio'
                        type='radio'
                        {...domOnlyProps(type)}
                        value='authors' />
                      المؤلفين
                    </label>
                  </div>
                  <div className='col-xs-12 col-md-3'>
                    <select {...domOnlyProps(categoryId)} className='c-library-search-hero__select'>
                      <option>كل الأقسام</option>
                      {categories.map((c: Object): React.Element<'option'> =>
                        <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className='col-xs-12 col-md-2 p-l-0'>
                    <button disabled={submitDisabled} className='btn c-library-search-hero__btn btn-block'>
                      البحث
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }

  _handleSubmit = (values: Object) => {
    const { getBooks, guard } = this.props
    getBooks({ ...values, guard })
  }
}

export default reduxForm({
  form: 'librarysearchhero',
  fields
})(SearchHero)
