// @flow
import * as React from 'react'
import './Signup.scss'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'

type PropsType = {
  currentStep: number,
  signup: Function,
  getCountries: Function,
  nextSignupStep: Function,
  prevSignupStep: Function
};

class Signup extends React.Component<PropsType> {
  componentDidMount () {
    const { getCountries } = this.props
    getCountries()
  }
  render (): React.Element<'div'> {
    const { nextSignupStep, prevSignupStep, signup, currentStep } = this.props
    return (
      <div className='Library-Signup'>
        <h1 className='Library-Signup__header text-xs-center p-y-3'>التسجيل في المكتبة</h1>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1'>
              <div className='Library-Signup__form'>
                { currentStep === 1 ? <FirstStep {...this.props} onSubmit={nextSignupStep} />
                  : <SecondStep {...this.props} onPrevious={prevSignupStep} onSubmit={signup} /> }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
