// @flow
import * as React from 'react'
// import css
import './Features.scss'
import Feature from './Feature'

type PropsType = {
  features: Array<Object>,
  description: string
};

class Features extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { features, description } = this.props

    const data = features.map((f: Object, i: number): React.Element<typeof Feature> =>
      <Feature last={i === 2} index={i} {...f} more={f.more} key={i} />)
    return (
      <div className='c-features'>
        <div className='container text-xs-center'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
              <p className='c-features__title'>{description}</p>
            </div>
          </div>
          <div className='row'>{data}</div>
        </div>
      </div>
    )
  }
}

export default Features
