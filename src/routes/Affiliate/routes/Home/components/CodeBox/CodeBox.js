// @flow
import React, { useCallback, useRef } from 'react'
import Copy from 'components/Svg/Copy'
import { useSelector } from 'react-redux'

type PropsType = {
  light: boolean,
  iconColor: string
};

const CodeBox = (props: PropsType): React.Element<'div'> => {
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const { data, loading } = useSelector((state: Object): Object => state.affiliates.profile)
  // console.log(data)
  const onClickHandler = useCallback(() => {
    /* Select the text field */
    inputRef.current.select()
    containerRef.current.classList.add('is-copied')
    /* Copy the text inside the text field */
    document.execCommand('copy')
    setTimeout((): Function => containerRef.current.classList.remove('is-copied'), 500)
  })
  return <div ref={containerRef} className={`input-group Affiliate-UserNavbar__link ${props.light ? 'is-light' : ''}`}>
    <span className='input-group-addon' id='basic-addon2' onClick={onClickHandler}>
      <Copy fill={props.iconColor} />
    </span>
    <input ref={inputRef} type='text' className='form-control Affiliate-UserNavbar__link-input'
      value={`https://el-css.edu.om/A-${!loading && data !== null ? data.code : null}`}
      readOnly
      aria-describedby='basic-addon2' />
  </div>
}

export default CodeBox
