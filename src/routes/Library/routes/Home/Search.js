// @flow
import * as React from 'react'
import SubNav from './components/SubNav'
import SearchHero from './components/SearchHero'
import FooterCategories from 'components/LibraryFooterCategories'
import UpgradePackage from 'components/Library/UpgradePackage'

type PropsType = {
  categories: Array<Object>,
  profile: Object,
  getBooks: Function
};

const Search = ({ profile, categories, getBooks }: PropsType): React.Element<'div'> => {
  return (
    <>
      <SubNav />
      <SearchHero categories={categories} guard='libraryuser' />
      <FooterCategories categories={categories} guard='libraryuser' getBooks={getBooks} />
      {!profile.activeSubscription ? <UpgradePackage /> : null }
    </>
  )
}

export default Search
