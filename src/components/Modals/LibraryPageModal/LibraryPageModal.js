// @flow
import React, { useCallback, useRef, memo, useState, useEffect } from 'react'
import { getBookPageImageUrl } from 'utils'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from 'modules/modals'
import { addToFolder } from 'modules/library_research'
import './LibraryPageModal.scss'

type PropsType = {
  page: number,
  showAdd: boolean,
  id: number,
  guard: string,
  bookId: number
};

const LibraryPageModal = memo(({ page, bookId, guard, id: pageId, showAdd = true }: PropsType): React.Element<'div'> => {
  const { folders } = useSelector((state: Object): Object => state.library_research)
  const [ position, setPosition ] = useState({ x: 0, y: 0 })
  const [ foldersVisible, setFolderVisibility ] = useState(false)
  const [ selectedFolder, setSelectedFolder ] = useState(0)
  // console.log(selectedFolder)
  const copyRef = useRef()

  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    dispatch(closeModal())
  }, [])

  const _setSelectedFolderCallback = useCallback((event: Object) => {
    setSelectedFolder(!event.target.dataset.id ? event.target.value : event.target.dataset.id)
  }, [])

  const _toggleFolders = useCallback(() => {
    setFolderVisibility(!foldersVisible)
  }, [foldersVisible])

  const _addToFolder = useCallback(() => {
    dispatch(addToFolder({ bookId, pageNumber: page, pageId, guard, folderNameOrId: selectedFolder }))
    _toggleFolders()
  }, [selectedFolder, page, bookId])

  useEffect(() => {
    if (copyRef.current) {
      setPosition({ x: copyRef.current.getBoundingClientRect().x, y: copyRef.current.getBoundingClientRect().y })
    }
  }, [copyRef.current])

  return <div className='LibraryPageModal'>
    <img src={getBookPageImageUrl({ bookId, pageNumber: page, pageId: pageId })} alt={page} className='img-fluid' />
    <div className='LibraryPageModal__actions text-xs-center'>
      {foldersVisible && <div className='LibraryPageModal__folders shadow-2'
        style={{ left: position.x - 70, bottom: 70 }}>
        <h6 className='text-xs-right p-t-1 font-weight-bold'>اختر ملف البحث</h6>
        <ul className='m-x-0 LibraryPageModal__folders-items' >
          {folders.map((folder: Object): React.Element<'div'> => <li
            onClick={_setSelectedFolderCallback}
            data-id={folder.id}
            className={`LibraryPageModal__folders-item ${folder.id === +selectedFolder && 'is-selected'}`}
            key={folder.id}>{folder.title}</li>)}
        </ul>
        <input
          onKeyUp={_setSelectedFolderCallback}
          data-id={null}
          placeholder='ملف بحث جديد'
          type='text'
          className='form-control m-y-2' />

        <button style={{ width: '40%' }} disabled={!selectedFolder}
          onClick={_addToFolder}
          className={`btn m-l-1 btn-success ${!selectedFolder && 'disabled'}`}>حفظ</button>
        <button style={{ width: '40%' }} className='btn btn-danger'>إلغاء</button>
      </div> }
      {showAdd && <button ref={copyRef} onClick={_toggleFolders} className='shadow-1 LibraryPageModal__add btn'>
        نسخ لملف البحث
      </button>}
      <button onClick={handleClose} className='shadow-1 LibraryPageModal__close btn btn-brown-outline m-r-1'>
        غلق الصفحة
      </button>
      <Link to={`/${guard === 'student' ? 'student/library' : 'library'}/browse/${bookId}`} onClick={handleClose}
        className='shadow-1 LibraryPageModal__browse btn-success-outline btn m-r-1'>
        الإستمرار في تصفح الكتاب
      </Link>
    </div>
  </div>
})

export default LibraryPageModal
