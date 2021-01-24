import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Link} from 'react-router'
// import css
import './Post.scss'

export const NextPreviousPosts = (props) => ((props.next || props.previous) ? <div className='container'>
  <div className='row'>
    <div className='col-xs-12 col-md-10 col-md-pull-1'>
      <h3 className={'text-xs-center blog-post__next-heading'}>التالي</h3>
      <div className='col-xs-12 col-md-6'>
        {props.next ? <NextPost {...props.next} /> : null }
      </div>
      <div className='col-xs-12 col-md-6'>
        {props.previous ? <NextPost {...props.previous} /> : null }
      </div>
    </div>
  </div>
</div> : null)

export const NextPost = (props) => <Link to={`/blog/post/${props.id}`} className={'blog-post__next-block'}>
  <div className='col-xs-12 col-md-5 p-x-0'>
    <img className={'img-fluid blog-post__next-image'} src={props.cover_thumb} alt={props.title} />
  </div>
  <div className='col-xs-12 col-md-7 '>
    <h3 className={'blog-post__next-title'}>
      {props.title}
    </h3>
    <div>
      {`${moment(props.createdAt).locale('en-us').format('DD')}
    ${moment(props.createdAt).locale('ar-SA').format('MMMM')}
    ${moment(props.createdAt).locale('en-us').format('YYYY')}`}
    </div>
  </div>
</Link>

NextPost.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string
}
NextPreviousPosts.defaultProps = {
	next: {},
	previous: {}
}

NextPreviousPosts.propTypes = {
    next: PropTypes.object,
    previous: PropTypes.object
}

export default NextPreviousPosts
