import React, {Component} from 'react'
import {getYoutubeId} from 'utils'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import {Link} from 'react-router'

import './style.scss'

class VideoElement extends Component {
  static propTypes = {
    link: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string
  }
  render () {
    const {link, title, id} = this.props
    if (!link) return false

    return <Link to={`/student/element/${id}`} className='c-student-video-element__container'>
      <section className='c-student-video-element__container__thumb'>
        <img src={`//img.youtube.com/vi/${getYoutubeId(link)}/hqdefault.jpg`} className='img-fluid' />
        <Icon name='play-white-circle' className='c-student-video-element__container__icon' />
      </section>
      <footer className='c-student-video-element__container__footer p-a-2 text-xs-center'>
        {title}
      </footer>
    </Link>
  }
}

export default VideoElement
