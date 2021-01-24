// @flow
import * as React from 'react'
//  import css
import './style.scss'

type PropsType = {
  closeModal: Function,
  studentId: number,
  typeform: Object
};

class TypeForm extends React.PureComponent<PropsType> {
  static defaultProps = {
    classroom_session: {}
  }

  _closeModal = (e: Object) => {
    e.stopPropagation()
    const { closeModal } = this.props
    closeModal('documents')
  }

  render (): React.Element<'div'> {
    const { typeform, studentId } = this.props

    if (typeof typeform.id === 'undefined') return <div />

    return (<div>
      <div className='modal-body shadow-modal p-a-2 text-xs-center p-a-3'>
        <h5 className='p-y-2 m-a-0'><b>{typeform.title}</b></h5>
        <p className={'p-x-3'} style={{ lineHeight: 1.7 }}>
          {typeform.description}
        </p>
        <a
          href={`${typeform.link}${studentId}`}
          className='btn btn-success btn-lg m-y-2 p-x-3'>
          أدخل الآن
        </a>
      </div>
    </div>)
  }
}

export default TypeForm
