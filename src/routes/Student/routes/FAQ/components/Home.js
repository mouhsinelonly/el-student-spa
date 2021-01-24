// @flow
import React from 'react'
import FaqCategory from './FaqCategory'

type Props = {
  query: string,
  setQuery: Function,
  categories: Array<Object>,
  loading: boolean
};

class Home extends React.Component<Props> {
  render () {
    const { query, categories } = this.props
    return (<div className='p-faq'>
      <div className='p-faq__header p-y-3'>
        <div className='container p-y-3'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-6 col-lg-pull-3'>
              <h1 className='p-faq__title text-xs-center p-b-2'>كيف يمكننا مساعدتك ؟</h1>
              <div className='p-faq__form'>
                <div className='input-group m-t-1'>
                  <input
                    ref='query'
                    placeholder='البحث في الأخبار...'
                    className={`form-control blog-page__search-input p-y-1`}
                    type='text'
                    onKeyUp={this._search}
                    defaultValue={query} />
                  <span className='input-group-btn'>
                    <button className={`btn blog-page__search-button btn-success p-y-1 p-x-3`}
                      onClick={this._search}>
                      البحث
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='p-faq__content p-y-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-10 col-lg-pull-1'>
              {categories.map((c, index) => <div className='col-xs-12 col-md-6' key={index}>
                <FaqCategory {...c} />
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

  _search = (e) => {
    if (typeof e.keyCode === 'undefined' || e.keyCode === 13) {
      const { setQuery } = this.props
      const query = this.refs['query'].value
      setQuery(query)
    }
  }
}

export default Home
