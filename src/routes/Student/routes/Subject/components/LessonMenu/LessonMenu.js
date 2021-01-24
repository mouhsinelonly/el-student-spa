// @flow
import * as React from 'react'
import './style.scss'
import Icon from 'components/Icon'
import SessionPerson from 'components/Svg/SessionPerson'

type PropType = {
 setActiveSubjectLesson: Function,
 onItemClick: Function,
 lessons: Array<Object>,
 active: number,
 className: string,
 loading: boolean,
 noIntro: boolean
};

const LessonMenu = (props: PropType): React.Element<'ul'> => {
  const { lessons, active, setActiveSubjectLesson, loading, onItemClick, noIntro, className } = props
  if (loading || !lessons) return <ul />
  return (<ul className={`c-student-lesson-menu ${className}`}>
    {lessons.map((l: Object, i: number): React.Element<typeof MenuItem> =>
      (l.type === 'session' || l.type === 'forum' || l.type === 'درس' || (l.type === 'مقدمة' && noIntro === false))
      ? <MenuItem
        onItemClick={onItemClick}
        setActive={setActiveSubjectLesson}
        key={i}
        active={active}
        {...l} /> : null)}
  </ul>)
}

LessonMenu.defaultProps = {
  onItemClick: () => {},
  noIntro: false
}

type ItemType = {
  name: string,
  type: string,
  onItemClick: Function,
  setActive: Function,
  id: number,
  ItemType: string,
  subtitle: string,
  lesson_order: number,
  elements: Array<Object>,
  active: number
};

class MenuItem extends React.Component<ItemType> {
  render (): React.Element<'li'> {
    const { active, name, type, lesson_order: order, elements, id, ItemType, subtitle } = this.props

    const watched = elements && elements.findIndex((e: Object): boolean => e.watched === 1 && e.type === 'فيديو') >= 0
    return (<li onClick={this._setActive}
      data-id={id}
      className={`c-student-lesson-menu__item p-r-3
      ${+id === +active ? 'is-active' : ''}
      is-${ItemType}
      ${type === 'مقدمة' ? 'is-intro' : ''}`}>
      <h4 className='c-student-lesson-menu__item__title'>{type === 'مقدمة' ? 'مدخل للمادة' : name}</h4>
      {type === 'درس' ? <h6 className='c-student-lesson-menu__item__subtitle'>الدرس {order}</h6>
      : <h6 className='c-student-lesson-menu__item__subtitle' >{subtitle}</h6>}
      {ItemType === 'forum' ? <i className='material-icons c-student-lesson-menu__item__icon'>chat</i> : null }
      {ItemType === 'session' ? <SessionPerson className='c-student-lesson-menu__item__icon' /> : null }
      <Icon name='small-check-green' className={`${!watched ? 'hidden-xs-up' : ''}
      c-student-lesson-menu__item__watched`} />
    </li>)
  }

  _setActive = (e: Object) => {
    const id = +e.target.dataset.id
    const { setActive, onItemClick } = this.props
    setActive(id)
    onItemClick(id)
  }
}

export default LessonMenu
