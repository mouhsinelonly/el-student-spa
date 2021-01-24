// @flow
import * as React from 'react'
import { useSelector } from 'react-redux'
import SearchHero from '../SearchHero'
import FooterCategories from '../FooterCategories'
import FooterResources from '../FooterResources'
import './style.scss'
import Icon from 'components/Icon'
import SearchResult from '../SearchResult'

const Home = (): React.Node => {
  const { query, category_id: categoryId, type } = useSelector((state: Object): Object => state.library.search)
  const { profile: { id } } = useSelector((state: Object): Object => state.student)
  // console.log(id)
  const isSearch = (query || categoryId || type)

  if (isSearch) {
    return <div className='p-library-prod'>
      <SearchResult query={query} category_id={categoryId} />
    </div>
  }

  return (<div>
    <SearchHero initialValues={{ type: 'subjects' }} />
    <FooterCategories />
    <FooterResources />
    <button className='hidden-xs-up btn btn-library-hollow m-t-3 m-x-auto m-b-3 p-library-home__more'>
      <Icon name='library-play-tiny' /> تعرف على خدمات المكتبة
    </button>
    <div className='clearfix' />
  </div>)
}

export default Home
