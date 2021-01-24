// @flow
import io from 'socket.io-client'

let SOCKET_CONNECTION = null

const SOCKET_IO_SERVER = 'https://ws.el-css.edu.om'

// export const socket = io(SOCKET_IO_SERVER, { transports: ['websocket'] })

export function socket ({ userId, userType }: Object): Object {
  if (SOCKET_CONNECTION === null) {
    SOCKET_CONNECTION = io(SOCKET_IO_SERVER, { query: { userType, userId }, transports: ['websocket'] })
  }
  return SOCKET_CONNECTION
}
