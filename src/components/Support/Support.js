// @flow
import * as React from 'react'
// import components
import FloatActionButton from './FloatActionButton/'
import ChatBox from './ChatBox'
import PropTypes from 'prop-types'

type PropsType = {
  tickets: Array<Object>
};

const Support = (props: PropsType) => {
  return <>
    <ChatBox {...props} />
    <FloatActionButton tickets={props.tickets} />
  </>
}

Support.propTypes = {
  tickets: PropTypes.object
}
export default Support
