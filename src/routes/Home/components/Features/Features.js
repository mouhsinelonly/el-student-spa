// @flow
// import libraries
import * as React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'

// import css
import './Features.scss'
import { Link } from 'react-router'
type PropType = {
  description: string,
  features: Array<Object>
};
class Features extends React.Component<PropType> {
  render (): React.Element<'div'> {
    let { features, description } = this.props

    let data = features.map((f: Object, i: number): React.Element<typeof Feature> =>
      <Feature last={i === 2} index={i} {...f} more={f.more} key={i} />)
    return (
      <div className='c-home-features'>
        <div className='container text-xs-center'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
              <p className='c-home-features__title'>
                <Translate id={description} />
              </p>
            </div>
          </div>
          <div className='row'>
            {data}
          </div>
        </div>
      </div>
    )
  }
}

export const Feature = (props: Object): React.Element<'div'> => <div className='col-xs-12 col-md-4'>
  <div className={`c-home-features__item c-home-features__item--${props.color}
  ${(props.last === true) ? 'c-home-features__item--last' : ''}`}>
    {props.icon && <i className={`icon icon-${props.icon}`} />}
    <h1 className={`m-t-2 c-home-features__item__title c-home-features__item__title--${props.color}`}>
      <b><Translate id={props.title} /></b>
    </h1>
    <p className='c-home-features__item__content'><Translate id={props.content} /></p>
    {props.more
        ? <Link className={`c-home-features__item__more c-home-features__item--${props.color}__more`}
          to={props.link}>
          <Translate id={props.more} />
        </Link> : null}
    {props.hint ? <small className='c-home-features__item__hint'>{props.hint}</small> : null}
  </div>
</div>

Feature.defaultProps = {
  color: ''
}

Feature.propTypes = {
  color: PropTypes.string,
  last: PropTypes.bool,
  title: PropTypes.string,
  link: PropTypes.string,
  more: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.string,
  content: PropTypes.string
}

export default Features
