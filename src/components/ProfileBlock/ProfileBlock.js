// @flow
import * as React from 'react'
import './ProfileBlock.scss'

type PropsType = {
  name: string,
  photo: string,
  role: string
};

const ProfileBlock = (props: PropsType): React.Element<'div'> => {
  return <div className='c-ProfileBlock'>
    <img src={props.photo} alt={props.name} className='c-ProfileBlock__photo' />
    <h6 className={`font-weight-bold c-ProfileBlock__name p-b-0 m-b-0`}>{props.name}</h6>
    <div className='c-ProfileBlock__role'>{props.role}</div>
  </div>
}

export default ProfileBlock
