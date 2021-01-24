// @flow
import React from 'react'
import Icon from 'components/Icon'

const SocialLinks = (props: PropsType): React.Element<'div'> => <ul className='c-footer__social'>
  <li className='c-footer__social__item'>
    <a target='_blank' rel='noopener' aria-label='Twitter' href='https://twitter.com/elearningcss'>
      <Icon name='twitter-tiny' />
    </a>
  </li>
  <li className='c-footer__social__item'>
    <a target='_blank' rel='noopener' aria-label='Youtube' href='https://youtube.com/elearningcss'>
      <Icon name='youtube-tiny' />
    </a>
  </li>
  <li className='c-footer__social__item'>
    <a target='_blank' rel='noopener' aria-label='Facebook' href='https://facebook.com/elearningcss'>
      <Icon name='facebook-tiny' />
    </a>
  </li>
</ul>

export default SocialLinks
