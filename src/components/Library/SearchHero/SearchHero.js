// @flow
import React, { useCallback, useEffect, useRef } from 'react'
import Icon from 'components/Icon'
import CategoryTag from './CategoryTag'
import FilterCategory from './FilterCategory'
import CategoryBook from './CategoryBook'
import Loading from 'components/Loading'
import { Creatable } from 'react-select'
import 'react-select/dist/react-select.css'
import './style.scss'
import { Scrollbars } from 'react-custom-scrollbars'
import { inArray } from 'utils'
import useClickOutside from 'hooks/clickoutside'

type SearchHeroType = {
  getCategories: Function,
  toggleHamza: Function,
  setSearchWords: Function,
  searchCategories: Array<number>,
  searchCategoriesBooks: Array<Object>,
  booksList: Array<Object>,
  searchWords: Array<Object>,
  setSearchConnected: Function,
  toggleFormVisibility: Function,
  getBooks: Function,
  searchCategoryDropdownOpen: boolean,
  searchHamza: boolean,
  searchSelectedCategory: number,
  setSearchBook: Function,
  toggleSearchCategoryDropDown: Function,
  toggleSearchCategory: Function,
  showSearchCategory: Function,
  guard: string,
  searchConnected: number,
  booksListLoading: boolean,
  categories: Array<Object>
};

const SearchHero = (props: SearchHeroType): React.Element<'div'> => {
  const boxRef = useRef()
  const { categories, toggleSearchCategory, searchCategories, searchCategoryDropdownOpen,
      booksList, searchSelectedCategory, setSearchBook, searchCategoriesBooks, showSearchCategory,
       searchHamza, searchWords, booksListLoading, searchConnected, setSearchWords,
       toggleHamza, toggleSearchCategoryDropDown, toggleFormVisibility, setSearchConnected,
       getBooks, getCategories, guard } = props

  const _handleChange = useCallback((value: string) => {
    setSearchWords(value)
  }, [])

  useEffect(() => {
    getCategories({ guard })
  }, [])
  const _enableHamza = useCallback(() => {
    toggleHamza(true)
  }, [])
  const _disableHamza = useCallback(() => {
    toggleHamza(false)
  }, [])
  const _toggleDropdown = useCallback((e: Object) => {
    e.stopPropagation()
    toggleSearchCategoryDropDown()
  }, [])
  const _hideDropdown = useCallback(() => {
    toggleSearchCategoryDropDown(false)
  }, [])
  const _search = useCallback(() => {
    getBooks({ guard, type: 'pages' })
    toggleFormVisibility(true)
  }, [])
  const _searchConnected = useCallback(() => {
    setSearchConnected(1)
  }, [])
  const _searchUnConnected = useCallback(() => {
    setSearchConnected(0)
  }, [])

  useClickOutside(boxRef, _hideDropdown)

  const selectedCategories = categories.filter((c: Object): boolean => inArray(c.id, searchCategories))
  const { length: isCategoriesSelected } = selectedCategories

  return (<div className={`container text-xs-right m-t-3 m-b-3 p-b-3`} >
    <div className='row'>
      <div className='col-xs-12 col-md-8 col-md-pull-2'>
        <div className='c-library-research-hero'>
          <div className='c-library-research-hero__header p-a-0 m-a-0'>
            <label className={`c-library-research-hero__header-item ${searchConnected ? 'is-active' : ''}`}
              onClick={_searchConnected} >نتائج كلمات في نفس النص</label>
            <label className={`c-library-research-hero__header-item ${!searchConnected ? 'is-active' : ''}`}
              onClick={_searchUnConnected} >نتائج متعددة للكلمات بدون اقتران</label>
          </div>
          <Creatable
            rtl
            multi
            creatable
            arrowRenderer={null}
            noResultsText=''
            options={[]}
            placeholder='أدخل كلمات البحث...'
            searchPromptText='أدخل كلمات البحث...'
            name='form-field-name'
            value={searchWords}
            onChange={_handleChange}
            promptTextCreator={(label: string): string => label} />
            <div ref={boxRef} >
          <div className={`c-library-research-hero__cats m-t-1 ${searchCategoryDropdownOpen ? 'is-open' : ''}`}
            onClick={_toggleDropdown}>
            { !isCategoriesSelected
                ? 'إختر الأقسام و كتب البحث'
              : selectedCategories.map((c: Object): React.Element<typeof CategoryTag> =>
                <CategoryTag
                  key={c.id} {...c}
                  totalBooks={searchCategoriesBooks.reduce((total: number, current: Object): number =>
                        current.catId === c.id ? total + 1 : total, 0)}
                  toggle={toggleSearchCategory} />) }
          </div>
          <div className={`c-library-research-hero__filters ${!searchCategoryDropdownOpen ? 'hidden-xs-up' : ''}`}>
            <div className='col-xs-4 p-a-0 c-library-research-hero__filters-right'>
              <div className='c-library-research-hero__filters-all-cats'>
                <Icon name='checkbox-brown' className='m-l-1' /> تحديد كل الأقسام
              </div>
              <Scrollbars>
                <ul className='m-a-0 p-a-0 c-library-research-hero__cats-list'>
                  {categories.map((c: Object, i: number): React.Element<typeof FilterCategory> =>
                    <FilterCategory key={i} {...c}
                      active={searchCategories.findIndex((id: number): boolean =>
                      id === c.id) >= 0}
                      show={showSearchCategory}
                      toggle={toggleSearchCategory} />)}
                </ul>
              </Scrollbars>
            </div>
            <div className='col-xs-8 p-a-0 c-library-research-hero__filters-left'>
              <div className='c-library-research-hero__filters-all-books'>
                البحث عن كتاب
              </div>
              <Scrollbars>
                { booksListLoading ? <Loading /> : null }
                <ul className='p-a-0 m-a-0'>
                  {booksList.filter((b: Object): boolean =>
                    b.category_id === searchSelectedCategory && b.category_id !== 0)
                    .map((b: Object): React.Element<typeof CategoryBook> => <CategoryBook
                      key={b.id}
                      active={searchCategoriesBooks.findIndex((s: Object): boolean => s.id === b.id) >= 0}
                      toggle={setSearchBook}
                      {...b} />)}
                </ul>
              </Scrollbars>
            </div>
          </div>
          </div>
          <div className='col-xs-12 col-md-9 col-lg-8 p-a-0 p-t-2'>
            <label
              className={`c-library-search-switch__radiolabel m-b-1 ${searchHamza ? 'is-checked' : ''}`}>
              <input className='c-library-search-switch__radio'
                type='radio'
                onClick={_enableHamza}
                name='type'
                value='do' />
              اعتبار الهمزات و نحوها
            </label>
            <label
              className={`c-library-search-switch__radiolabel m-b-1 ${!searchHamza ? 'is-checked' : ''}`}>
              <input className='c-library-search-switch__radio'
                type='radio'
                onClick={_disableHamza}
                name='type'
                value='dont' />
              عدم اعتبار الفروق
            </label>
          </div>
          <div className='col-xs-12 col-md-3 col-lg-4 p-a-0'>
            <button
              disabled={!searchWords.length}
              onClick={_search}
              className='btn btn-lg btn-block btn-brown p-x-3 m-t-1'>
            البحث
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

SearchHero.defaultProps = {
  guard: 'student',
  booksListLoading: false
}

export default SearchHero
