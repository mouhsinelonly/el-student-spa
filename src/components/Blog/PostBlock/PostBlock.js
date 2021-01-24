import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router'
// import css
import './PostBlock.scss'

function PostBlock (props) {
  return (
    <Link to={`/blog/post/${props.id.toString()}`} className='news-block text-xs-right'>
      <img loading='lazy' src={props.cover} alt={props.title} className='news-block__cover' />
      <footer className='news-block__footer'>
        <h1 className='news-block__title'>{props.title}</h1>
        <div className='news-block__date'>
          {`${moment(props.createdAt)
            .locale('en-us')
            .format('DD')}
        ${moment(props.createdAt)
          .locale('ar-SA')
          .format('MMMM')}
        ${moment(props.createdAt)
          .locale('en-us')
          .format('YYYY')}`}
        </div>
      </footer>
    </Link>
  )
}

PostBlock.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  cover: PropTypes.string,
  createdAt: PropTypes.string
}

PostBlock.defaultProps = {
  id: 0,
  title: '',
  cover: ''
}

export default PostBlock
