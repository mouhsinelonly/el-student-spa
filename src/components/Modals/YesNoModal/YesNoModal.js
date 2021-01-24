// @flow
import * as React from 'react'
//  import css
import './style.scss'

type PropertiesType = {
  accept: string,
  refuse: string,
  title: string,
  body: string,
  closeModal: Function,
  onAnswerYes: Function
};

const YesNoModal = ({ accept, refuse, title, body, closeModal, onAnswerYes }: PropertiesType): React.Component<Props> =>
(<div className='modal-body shadow-modal c-yesno-modal p-a-0 text-xs-center'>
  <div className='p-a-3'>
    <h5 className='font-weight-bold'>{title}</h5>
    <p className='p-y-2'>{body}</p>
  </div>
  <button
    className='btn btn-gray c-yesno-modal__action'
    style={{ borderRadius: 0 }}
    onClick={closeModal} >{refuse}</button>
  <button
    className='btn btn-success c-yesno-modal__action'
    style={{ borderRadius: 0 }}
    onClick={onAnswerYes} >{accept}</button>
</div>)

export default YesNoModal
