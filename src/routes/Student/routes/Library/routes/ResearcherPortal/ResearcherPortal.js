// @flow
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'
import SearchSwitch from 'components/Library/SearchSwitch'
import SearchHero from 'components/Library/SearchHero'
import { getBooksList } from 'routes/Student/modules/library_research'
import ResearcherResult from 'components/Library/ResearcherResult'
import LibraryFolders from 'components/Library/LibraryFolders'
import FooterResources from '../../components/FooterResources'

const ResearcherPortal = (): React.Node => {
  const _changeSearchType = (e: Object) => {
    const { setSearchType } = this.props
    setSearchType(e.target.value)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooksList({ guard: 'student' }))
  }, [])
  const { hideForm } = useSelector((state: Object): Object => state.library_research)

  return (<div className='p-library-researcher'>
    { hideForm ? <ResearcherResult key='4' guard='student' /> : <div>
      <SearchSwitch onChange={_changeSearchType} />
      <SearchHero />
      <LibraryFolders guard='student' />
      <FooterResources />
    </div> }
  </div>)
}

export default ResearcherPortal
