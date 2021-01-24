// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import './style.scss'
import moment from 'moment'
import Icon from 'components/Icon'
import ReplyForm from './ReplyForm'
import YellowDone from 'components/Svg/YellowDone'

type PropsType = {
    posts: Object,
    toggleSupportFloatingButton: Function,
    serverdate: string,
    params: Object,
    createCommunityPost: Function
};

class Show extends Component<PropsType> {
  componentWillUnmount () {
    const { toggleSupportFloatingButton } = this.props
    toggleSupportFloatingButton(true)
  }
  componentDidMount () {
    const { toggleSupportFloatingButton } = this.props
    toggleSupportFloatingButton(false)
  }
  render (): React.Node {
    const { posts, params, serverdate } = this.props

    if (!posts[`post-${params.id}`]) return null

    const { subject, content, owner, created_at, id, replies } = posts[`post-${params.id}`]

    if (!content) return null

    const momentServerTime = moment(serverdate)

    return <div className='container no-xs-padding'>
      <div className='row p-y-2 no-xs-margin'>
        <div className='col-xs-12 col-md-10 col-lg-8 col-md-pull-1 col-lg-pull-2 no-xs-padding'>
          <div className='col-xs-12 col-md-3 p-t-1 no-xs-padding'>
            <Link to='/student/community' className='student-community-show__go-back p-r-1'>
              <Icon className='m-l-1' name='arrow-right-small-dark' /> الرجوع للنقاشات
            </Link>
          </div>
          <div className='col-xs-12 col-md-6' />
          <div className='col-xs-12 col-md-3 text-xs-center'>
            <Link to='/student/community/create' className='btn btn-success btn-block student-community-show__new'>
            إضافة نقاش
            </Link>
          </div>
          <div className='clearfix' />
          <div className={'col-xs-12 no-xs-padding'}>
            <div className={`p-x-3 p-y-2 student-community-show__post m-t-2`}>
              <h1 className={`text-xs-center student-community-show__post__subject`}>{subject}</h1>
              <div className={`student-community-show__post__meta text-xs-center`}>
                <b>{owner.name}  {owner.badge ? <YellowDone width={16} height={16} /> : null }</b>
                <span className='p-r-2'>{moment(created_at).locale('ar').from(momentServerTime)} - {created_at}</span>
              </div>
              <div className={`student-community-show__post__content m-t-2`}
                dangerouslySetInnerHTML={{__html: content}} />
            </div>
            <div className='col-xs-12 col-md-10 col-md-pull-1 m-b-3'>
              <ReplyForm initialValues={{ parentId: id, open: false }} onSubmit={this._handleReply} />
            </div>
            <div className='clearfix' />
            <h6 className={`student-community-show__post__replies-title m-b-2`} >
              <span>{replies.length} إجابة</span>
            </h6>

            {replies.length ? <ul className={`student-community-show__post__replies`}>
              {replies.map(r => <li key={r.id}
                className={`student-community-show__post__replies__item
                  ${r.owner && r.owner_type === 'students' ? '' : 'is-admin'}`}>
                <div>
                  <span className={`student-community-show__post__replies__item-owner
                    ${r.owner && r.owner_type === 'students' ? '' : 'is-admin'} p-l-2`}>
                    {r.owner && r.owner_type === 'students' ? r.owner.name : `${r.owner.name} (الدعم الفني)`}
                    {r.owner && r.owner.badge ? <YellowDone width={18} height={18} className='student-community-show__post__replies__item-badge' /> : null }
                  </span>
                  <span className={`student-community-show__post__replies__item-date
                    ${r.owner && r.owner_type === 'students' ? '' : 'is-admin'}`}>
                    {moment(r.created_at).locale('ar').fromNow()}
                  </span>
                </div>
                <p className={`student-community-show__post__replies__item-content p-y-1
                  ${r.owner && r.owner_type === 'students' ? '' : 'is-admin'}`}>{r.content}</p>
              </li>)}
            </ul> : null}
          </div>
        </div>
      </div>
    </div>
  }

  _handleReply = (values) => {
    const {createCommunityPost} = this.props
    createCommunityPost(values)
  }
}

export default Show
