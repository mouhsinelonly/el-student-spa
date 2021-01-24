// @flow
import React, { useEffect } from 'react'
import Loading from 'components/Loading'
// import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { hideStudentNavbar, showStudentNavbar } from 'routes/Student/modules/ui'
import { getDrafts, getDraftNotes } from 'routes/Student/modules/thesis'
import './ThesisDraft.scss'

type PropertiesType = {
  params: Object
};

const ThesisDraft = ({ params: { id } }: PropertiesType): React.Element<'div'> => {
  const dispatch = useDispatch()
  useEffect((): Function => {
    dispatch(hideStudentNavbar())
    dispatch(getDrafts())
    setTimeout(() => {
      dispatch(getDraftNotes({ id }))
    }, 1000)
    return () => {
      dispatch(showStudentNavbar())
    }
  }, [])
  // const [ query, setQuery ] = useState('')
  // const dispatch = useDispatch()
  const { drafts } = useSelector((state: Object): Object => state.thesis)
  // console.log(drafts)
  // const _handleKeyUp = (event: Object) => {
  //   if (event.keyCode === 13 && !event.shiftKey) {
  //     setQuery(event.currentTarget.value)
  //   }
  // }

  const draft = drafts[`item-${id}`]
  console.log(drafts)
  // console.log(draft, 'dd')
  if (!draft) {
    return <Loading />
  }
  // console.log(draft)
  return <div className='ThesisDraft ThesisDraft__fh'>
    <div className='container ThesisDraft__fh' style={{ position: 'relative' }}>
      <div className='col-xs-8 ThesisDraft__fh p-y-3'>
        <iframe style={{ width: '100%' }}
          className='ThesisDraft__fh' src={`https://view.officeapps.live.com/op/embed.aspx?src=${draft.filePath}`}
          frameBorder='0' />
      </div>
      <div className='col-xs-4 p-t-3' style={{ ooverflow: 'hidden', height: '100%' }}>
        <h6 className='font-weight-bold p-b-2'>الملحوظات</h6>
        <div style={{ height: '90%', overflow: 'scroll' }}>
          {draft.notes.map((note: Object): Array<Object> => <div key={note.id} className='p-b-2 text-xs-right'>
            <div className='col-xs-2'>
              <img src='' alt={draft.title} className='ThesisDraft__img' />
            </div>
            <div className='col-xs-8 font-adobe'>
              {note.content}
            </div>
            <div className='clearfix' />
          </div>)}
        </div>
      </div>
    </div>
  </div>
}

export default ThesisDraft
