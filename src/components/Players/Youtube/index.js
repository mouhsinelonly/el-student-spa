// @flow
import * as React from 'react'
type PropsType = {
  id: string,
  width: number,
  height: number
};
function Youtube (props: PropsType): React.Element<*> {
  if (!props.id) return false
  return (<iframe
    style={{ display: 'block', maxWidth: '100%' }}
    width={props.width}
    height={props.height}
    src={`https://www.youtube.com/embed/${props.id}?modestbranding=1&autohide=1&showinfo=0&controls=1`}
    frameBorder='0'
    allow='autoplay; encrypted-media'
    allowFullScreen />)
}

export default Youtube
