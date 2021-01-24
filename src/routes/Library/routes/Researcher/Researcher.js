// @flow
import React from 'react'
import SearchSwitch from 'components/Library/SearchSwitch'
import SearchHero from 'components/Library/SearchHero'
import ResearcherResult from 'components/Library/ResearcherResult'
import LibraryFolders from 'components/Library/LibraryFolders'
import NavBar from '../Home/components/NavBar'
import SubNav from '../Home/components/SubNav'
import { useSelector } from 'react-redux'

type PropsType = {
  profile: Object,
  getBooksList: Function,
  getFolders: Function,
  hideForm: boolean
};

const Researcher = (props: PropsType): React.Element<'*'> => {
  const { hideForm } = useSelector((state: Object): Object => state.library_research)
  const { profile } = useSelector((state: Object): Object => state.library_account)

  return [
    <div className='container' key='1'>
      <div className='row col-xs-12' style={{ paddingTop: 67 }} >
        <NavBar name={profile ? profile.name : ''}
          smallPhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg'
          largePhoto='https://avatar.el-cdn.net/cache/000/010/001/large/1aym0ColOG.jpg' />
      </div>
    </div>,
    !hideForm ? <SubNav active={3} key='2' /> : null,
    hideForm ? <ResearcherResult key='4' guard='libraryuser' /> : <div key='5' style={{ backgroundColor: '#eff0eb' }}>
      <SearchSwitch />
      <SearchHero guard='libraryuser' />
    </div>,
    <LibraryFolders key='folders' guard='libraryuser' />
  ]
}

export default Researcher
