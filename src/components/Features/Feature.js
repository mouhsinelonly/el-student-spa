// @flow
import * as React from 'react'
import { Translate } from 'react-localize-redux'
type PropsType = {
  color: string,
  last: boolean,
  icon: string,
  content: string,
  more: string,
  title: string,
  hint: string
};
function Feature (props: PropsType): React.Element<'div'> {
  return (
    <div className='col-xs-12 col-md-4'>
      <div className={`c-features__item ${props.last === true ? 'c-features__item--last' : ''}`}>
        {props.icon && <i className={`icon icon-${props.icon}`} />}
        <h1 className={`m-t-2 c-features__item__title font-weight-bold
            c-features__item__title--${!props.color ? '' : props.color}`}>
          <Translate id={props.title} />
        </h1>
        <p className='c-features__item__content'><Translate id={props.content} /></p>
        {props.more ? (
          <a className='c-features__item__more' href=''>
            {props.more}
          </a>
        ) : null}
        {props.hint ? <small className='c-features__item__hint'>
          <Translate id={props.hint} />
        </small> : null}
      </div>
    </div>
  )
}

export default Feature
