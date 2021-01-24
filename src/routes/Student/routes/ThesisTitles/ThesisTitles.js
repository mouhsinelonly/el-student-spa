// @flow
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getTitles, confirmTitle } from 'routes/Student/modules/thesis'
import ThesisTitleRowItem from './ThesisTitleRowItem'
import { copyStringToClipboard } from 'utils'
import './ThesisTitles.scss'

const ThesisTitles = (): React.Element<'div'> => {
  const [ query, setQuery ] = useState('')
  const dispatch = useDispatch()
  const { titles } = useSelector((state: Object): Object => state.thesis)
  useEffect(() => {
    dispatch(getTitles())
  }, [])
  const _handleKeyUp = (event: Object) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      setQuery(event.currentTarget.value)
    }
  }
  const _handleChoose = (event: Object) => {
    dispatch(confirmTitle({ id: +event.currentTarget.dataset.id }))
  }
  const _handleUnchoose = (event: Object) => {
    // dispatch(unConfirmTitle({ id: +event.currentTarget.dataset.id }))
  }
  const _copyToClipboard = (event: Object) => {
    copyStringToClipboard(event.currentTarget.dataset.content)
  }
  return <div className='ThesisTitles'>
    <div className='container p-y-3'>
      <div className='col-xs-12 ThesisTitles__search-block'>
        <Link to='/student' className='ThesisTitles__back'>
          <i className='material-icons'>arrow_forward</i>
        </Link>
        <input
          onKeyUp={_handleKeyUp}
          type='text' placeholder='البحث في المواضيع' className='ThesisTitles__search form-control' />
      </div>
    </div>
    <div className='ThesisTitles__titles p-b-3'>
      <div className='container p-b-3'>
        {titles.filter((title: Object): boolean => title.title.search(query) > -1)
        .map((title: Object): React.Element<'div'> => <ThesisTitleRowItem
          key={title.id} title={title.title}
          id={title.id}
          isChosen={title.isChosen}
          enabled={title.totalChosen < 2}
          onChoose={_handleChoose}
          onUnchoose={_handleUnchoose}
          onCopy={_copyToClipboard} />)}
      </div>
    </div>
  </div>
}

export default ThesisTitles
