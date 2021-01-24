import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import css
import './style.scss'
// import components
import CreateForm from './CreateForm'
import SubjectsForm from './SubjectsForm'
// import EquationsList from './EquationsList'
// import loading
import Loading from 'components/Loading'

class Equation extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    page: PropTypes.number,
    step: PropTypes.object,
    showAddEquation: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.toggleAddForm = this.toggleAddForm.bind(this)
  }
  render () {
    const {loading, page, step} = this.props

    if (loading) return <Loading />

    return (
      <div className={`container c-equation__container p-t-2`}>
        {(step.equation_input && page === 1) ? <CreateForm {...this.props} /> : null }
        {(!step.equation_input || page === 2) && <SubjectsForm canupdate={step.equation_input} {...this.props} /> }
      </div>
    )
  }

  toggleAddForm () {
    const {showAddEquation} = this.props
    showAddEquation()
  }
}

export const NoEquations = () => (<div className='text-xs-center p-y-3'>
  <b>لم تقم بإضافة أي شهادة !!</b>
</div>)

export default Equation
