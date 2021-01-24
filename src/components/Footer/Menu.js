// @flow
import * as React from 'react'
import './Menu.scss'
import data from 'static/data/menu_footer'
import { Link } from 'react-router'
import { Translate } from 'react-localize-redux'

function Menu (): React.Element<'ul'> {
  return (
    <ul className='c-footer__menu'>
      {data.map((m: Object, i: number): React.Element<'li'> => (
        <li className='c-footer__menu__item' key={i}>
          <Link activeClassName='c-footer__menu__item__link-active' to={m.route} className='c-footer__menu__item__link'>
            <Translate id={m.title} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Menu
