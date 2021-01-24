// @flow
import * as React from 'react'
//  import css
import './style.scss'

type PropertiesType = {
  accept: string,
  refuse: string,
  title: string,
  children: React.Node,
  body: string,
  closeModal: Function,
  onAnswerYes: Function
};

const YesModal = ({ accept, refuse, title, body, closeModal, onAnswerYes, children }: PropertiesType): React.Component<Props> =>
(<div className='modal-body shadow-modal c-yes-modal p-a-0 text-xs-center'>
  <div className='p-a-3'>
    <h5 className='font-weight-bold'>{title}</h5>
    <p className='p-y-2'>{body}</p>
  </div>
  {children}
  <button
    className='btn btn-success c-yes-modal__action'
    style={{ borderRadius: 0 }}
    onClick={onAnswerYes} >{accept}</button>
</div>)

export default YesModal
