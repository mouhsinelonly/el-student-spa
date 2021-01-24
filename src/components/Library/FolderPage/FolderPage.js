// @flow
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import './FolderPage.scss'
import { getBookPageImageUrl } from 'utils'
import { showModal } from 'modules/modals'
import { removePageFromFolder } from 'modules/library_research'
import { useDispatch } from 'react-redux'

type PropsType = {
  params: Object
};

const FolderPage = (props: PropsType): React.Element<'div'> => {
  const { folders } = useSelector((state: Object): Object => state.library_research)

  const folder = folders.find((folder: Object): Object => folder.id === +props.params.id)

  if (!folder) {
    return <div />
  }

  return <div className='LibraryFolderPage'>
    <div className='container'>
      <div className='row col-xs-12 col-md-10 col-md-pull-1 col-lg-6 col-lg-pull-3'>
        <h4 className='m-t-3 LibraryFolderPage__title'>{folder.title}</h4>
        <p>كلمات البحث : {folder.pages.reduce((total: Array, page: Object): Array => total.concat(JSON.parse(page.keywords)), [])
            .map((keyword: string, i: number): React.Element<'span'> =>
              <span key={i} className='p-r-1'>{keyword}</span>)}
        </p>
        <p className='LibraryFolderPage__label'>عدد الصفحات : {folder.pages.length}</p>
        <p className='LibraryFolderPage__label p-b-3'>نوع البحث :
          <span>في الكتب</span> <span>{folder.connected ? 'مقتون' : 'غير مقترن'}</span></p>
        <div className='LibraryFolderPage__pages my-panel-white shadow-2 m-b-3'>
          {folder.pages.map((page: Object): React.Element<typeof FolderPage> =>
            <FolderRenderPage key={page.id} {...page} />)}
        </div>
      </div>
    </div>
  </div>
}

const FolderRenderPage = (props: PagePropsType) => {
  const dispatch = useDispatch()
  const handleClick = useCallback((e: Object) => {
    dispatch(showModal('researchbookpage', {
      id: props.page_id, guard: '', bookId: props.book_id, page: props.page_number, showAdd: false }))
  }, [])

  const onDelete = useCallback(() => {
    dispatch(removePageFromFolder({ id: props.folder_id, guard: props.guard }))
  }, [props])
  return <div
    className='LibraryFolderPage__page p-a-1'>
    <div className='LibraryFolderPage__img'>
      <img className='img-fluid'
        onClick={handleClick}
        src={getBookPageImageUrl({ bookId: props.book_id, pageNumber: props.page_number })}
        alt={props.title} />
    </div>
    <button className='btn btn-white' style={{ border: 0 }}>صفحة الاقتباس</button>
    <button onClick={onDelete} className='btn btn-white pull-xs-left' style={{ border: 0 }}>حذف</button>
  </div>
}

export default FolderPage
