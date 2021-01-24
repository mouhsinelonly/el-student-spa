// @flow
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Waiting from './Waiting'
import EmptyChat from './EmptyChat'
import { getMessages } from 'routes/Student/modules/thesis'
import TextBoxForm from './TextBoxForm'
import ChatList from './ChatList'
import './Chat.scss'

const className = 'Thesis-Chat col-xs-12 col-md-2 col-lg-pull-2 my-panel-white shadow-1'

const style = {
  position: 'fixed',
  left: 0,
  right: 'auto',
  bottom: 0,
  top: 0,
  paddingTop: 67,
  padding: 0,
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: '#f7f8fa',
  borderRadius: 0
}

type PropertiesType = {
  visible: boolean,
  onToggleVisibility: Function
};

const inlineStyle = { display: 'inline-block', verticalAlign: 'middle' }

const Chat = ({ visible, onToggleVisibility }: PropertiesType): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { steps, loadingSteps, chosenTeachers, messages } = useSelector((state: Object): Object => state.thesis)
  const isPresenterStep = steps.some((step: Object): boolean => step.active === 1 && step.step === 'presenter')
  const isWaitingStep = steps.some((step: Object): boolean => step.active === 1 && step.step === 'waiting')
  const isVisible = isPresenterStep || (steps.length === 0 && !loadingSteps)

  useEffect(() => {
    dispatch(getMessages())
  }, [])

  const data = chosenTeachers.map((teacher: Object): React.Element<'div'> =>
    <div className='p-a-1 Thesis-Chat__teacher-item'
      key={teacher.id}>
      <img src={teacher.photoUrl} className='Thesis-Chat__teacher-item-photo' alt={teacher.title} />
      <div className='p-x-1 text-truncate'>
        <div className='text-truncate Thesis-Chat__teacher-item-name'>{teacher.name}</div>
      </div>
      <button style={{ top: -5, left: -20, position: 'relative' }} className='hidden-sm-up btn pull-xs-left'
        onClick={(): Function => onToggleVisibility({ chat: false, steps: false })}>
        <i className='material-icons' style={inlineStyle}>arrow_back</i>
       </button>
    </div>)

  return <div
    style={{ ...style, ...(loadingSteps || isVisible ? { opacity: 0, visibility: 'hidden' } : {}) }}
    className={`${className} ${visible && 'is-visible'}`}>
    <div style={{ marginTop: 67, width: '100%' }} >{data}</div>
    { isWaitingStep ? <Waiting /> : null }
    { !isWaitingStep && Object.keys(messages).length === 0 ? <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      { (!isWaitingStep && Object.keys(messages).length === 0) ? <EmptyChat /> : null }
    </div> : null }
    <ChatList />
    <TextBoxForm disabled={isWaitingStep} />
  </div>
}

export default Chat
