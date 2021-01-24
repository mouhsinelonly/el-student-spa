// @flow
import React, { useCallback, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postDeleteReply } from 'routes/Users/modules/users'
import { toggleFavoritesVisibility } from 'routes/Users/modules/tickets'
import useClickOutside from 'hooks/clickoutside'
import './FavoriteReply.scss'

type PropsType = {
  onItemSelected: Function
};

const FavoriteReply = (props: PropsType): React.Element<'div'> => {
  const [ query, setQuery ] = useState('')

  const refContainer = useRef()
  const dispatch = useDispatch()
  const { favoritesVisible: visible } = useSelector((state: Object): Object => state.user_tickets)
  const { favoriteReplies: replies } = useSelector((state: Object): Object => state.user_profile)

  const onSearch = (event: Object) => {
    setQuery(event.currentTarget.value)
  }

  useClickOutside(refContainer, () => {
    if (visible) {
      dispatch(toggleFavoritesVisibility(false))
    }
  })
  const _onDelete = useCallback((e: Object) => {
    e.stopPropagation()
    dispatch(postDeleteReply(+e.target.dataset.id))
  }, [])

  const _onClick = useCallback((e: Object) => {
    props.onItemSelected(e.target.dataset.content)
  }, [])

  return (<div ref={refContainer} className={`v2-ticket-FavoriteReply ${!visible && 'hidden-xs-up'}`}>
    <div className='v2-ticket-templates__search'>
      <input type='text'
        onKeyUp={onSearch}
        placeholder='البحث في المفضلة'
        className='form-control' />
      <i className='material-icons'>search</i>
    </div>
    <div className='v2-ticket-FavoriteReply__items'>
      { replies && replies.filter((t: Object): boolean => (`${t.category_name}`.search(query) >= 0) || (`${t.content}`.search(query) > 0))
      .map((r: Object): React.Element =>
        <div onClick={_onClick} className='v2-ticket-FavoriteReply__item p-a-2' key={r.id} data-content={r.content}>
          <i className='material-icons v2-ticket-FavoriteReply__icon' data-id={r.id}
            onClick={_onDelete}>delete</i>
          <h1 className='v2-ticket-FavoriteReply__title p-b-0'>{r.category_name}</h1>
          <p
            className='v2-ticket-FavoriteReply__content m-b-0'>{`${r.content}`.substr(0, 100)}...</p>
        </div>) }
    </div>
  </div>)
}

export default FavoriteReply
