// @flow
import React from 'react'
import './WaitingMessage.scss'

type PropertiesType = {
  title: string,
  description: string
};

const WaitingMessage = ({ title, description }: PropertiesType): React.Element<'div'> => <div
  className='Thesis-WaitingMessage my-panel-white p-a-2 m-y-2 p-x-3 text-xs-center shadow-1'>
  <h5 className='font-weight-bold Thesis-WaitingMessage__title'>{title}</h5>
  <p className='p-x-3 p-t-1'>{description}</p>
</div>

export default WaitingMessage
