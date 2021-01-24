// @flow
import * as React from 'react'
import { reduxForm } from 'redux-form'
import Icon from 'components/Icon'
type PropsType = {
  handleSubmit: Function,
  handleHidePoll: Function,
  link: string
};
class TestDone extends React.Component<PropsType> {
  form = React.createRef()
  componentDidMount () {
    this.props.handleSubmit()
  }
  render (): React.Element<'form'> {
    const { handleSubmit, link, handleHidePoll } = this.props

    return (
      <form ref={this.form}
        onSubmit={handleSubmit}
        style={{ display: 'table',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          right: 0,
          backgroundColor: '#fff' }}>
        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <Icon name='checkmark-success-leaf-medium' />
          <h3 className='p-y-2'>تم حفظ أجوبتك بنجاح</h3>
          <a href={link} target='_blank' onClick={handleHidePoll} className='btn btn-dark-gray btn-lg p-x-2'>
            العودة للحصة
          </a>
        </div>
      </form>
    )
  }
}

const TestDoneForm = reduxForm({
  form: 'poll',
  fields: [],
  destroyOnUnmount: false
})(TestDone)

export default TestDoneForm
