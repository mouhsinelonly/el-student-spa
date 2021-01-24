// @flow
// import libraries
import * as React from 'react'
import { Translate } from 'react-localize-redux'
// import css
import './ReturnPolicy.scss'

type PropsType = {};

class ReturnPolicy extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    return (
      <div>
        <div className='container'>
          <h1 className='return-page__heading text-xs-center'>
            <Translate id='return_policy.header' />
          </h1>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
              <h5 className='font-weight-bold'>
                <Translate id='return_policy.subheader' />
              </h5>
              <ol className='return-page__body m-b-3'>
                <Translate id='return_policy.rules' />
              </ol>
            </div>
          </div>
        </div>
      </div>)
  }
}

export default ReturnPolicy
