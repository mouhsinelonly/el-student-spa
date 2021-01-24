// @flow
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './LibraryFolders.scss'
import { Link } from 'react-router'
import { getFolders } from 'modules/library_research'

const LibraryFolders = ({ guard }: PropsType): React.Element<'div'> => {
  const dispatch = useDispatch()
  useEffect((): Function => {
    dispatch(getFolders({ guard }))
  }, [])

  const { folders } = useSelector((state: Object): Object => state.library_research)
  return <div className='text-xs-center container'>
    <div className='row'>
      <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-6 col-lg-pull-3'>
        <h4 className='p-y-2'>أبحاثي</h4>
        {folders.map((folder: Object): React.Element<'div'> =>
          <Link
            to={`/${guard === '' ? 'library' : 'student/library'}/folder/${folder.id}`}
            className='LibraryFolders__item text-right p-a-1 text-xs-right shadow-1 m-b-2'
            key={folder.id} >
            <h5 className='LibraryFolders__item-title'>{folder.title}</h5>
            <p>كلمات البحث : {folder.pages.reduce((total: Array, page: Object): Array => total.concat(JSON.parse(page.keywords)), [])
            .map((keyword: string, i: number): React.Element<'span'> =>
              <span key={i} className='p-r-1'>{keyword}</span>)}</p>
            <button className='btn btn-xs btn-success-outline LibraryFolders__item-num'>{folder.pages.length} اقتباسات</button>
          </Link>)}
      </div>
    </div>
  </div>
}

export default LibraryFolders
