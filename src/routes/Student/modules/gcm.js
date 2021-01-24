import request from 'superagent'
import { APIBASE } from 'utils'
// ------------------------------------
// Constants
// ------------------------------------
export const TOGGLE_GCM_STATUS = 'studentgcm.TOGGLE_GCM_STATUS'
export const SET_SUPPORTED = 'studentgcm.SET_SUPPORTED'

export const REGISTER_GCM_REQUEST = 'studentgcm.REGISTER_GCM_REQUEST'
export const REGISTER_GCM_SUCCESS = 'studentgcm.REGISTER_GCM_SUCCESS'
export const UNREGISTER_GCM_REQUEST = 'studentgcm.UNREGISTER_GCM_REQUEST'
export const UNREGISTER_GCM_SUCCESS = 'studentgcm.UNREGISTER_GCM_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
//
export function isPushSupported () {
  return function (dispatch) {
    if (!('Notification' in window)) {
      dispatch(setPushStatus(false, 'التنبيهات غير مدعمة'))
      return
    }
    // To check `push notification` permission is denied by user
    if (Notification.permission === 'denied') {
      dispatch(setPushStatus(false, 'الرسائل معطلة'))
      return
    }
    // Check `push notification` is supported or not
    if (!('PushManager' in window)) {
      dispatch(setPushStatus(false, 'المتصفح لا يدعم الرسائل'))
      return
    }

    dispatch(setNotificationSupported())
    // Get `push notification` subscription
    // If `serviceWorker` is registered and ready

    navigator.serviceWorker.ready.then(function (registration) {
      registration.pushManager.getSubscription()
        .then(function (subscription) {
          // If already access granted, enable push button status
          if (subscription) {
            dispatch(setPushStatus(true))
          } else {
            dispatch(setPushStatus(false))
            registration.pushManager.subscribe({
              userVisibleOnly: true // Always show notification when received
            })
            .then(function (subscription) {
              dispatch(registerGcm(subscription))
            })
            .catch(function (error) {
            })
          }
        })
        .catch(function (error) {
          dispatch(setPushStatus(false, 'حدث خلل اثناء تغعيل الرسائل'))
        })
    })
  }
}

export function setPushStatus (enabled = false, message = '') {
  return {
    type: TOGGLE_GCM_STATUS,
    payload: {
      enabled,
      message
    }
  }
}
export function setNotificationSupported () {
  return {
    type: SET_SUPPORTED
  }
}
//  Unsubscribe the user from push notifications
export function unsubscribePush () {
  return (dispatch) => {
    dispatch(unRegisterGcmRequest())
    navigator.serviceWorker.ready.then(function (registration) {
      // Get `push subscription`
      registration.pushManager.getSubscription()
      .then(function (subscription) {
        // If no `push subscription`, then return
        if (!subscription) {
          return
        }
        // Unsubscribe `push notification`
        subscription.unsubscribe()
          .then(function () {
            dispatch(unRegisterGcm(subscription))
            // changePushStatus(false)
          })
          .catch(function (error) {

          })
      })
      .catch(error => {

      })
    })
  }
}

export function subscribePush () {
  return (dispatch) => {
    dispatch(registerGcmRequest())

    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration.pushManager) {
        return false
      }
      // To subscribe `push notification` from push manager
      registration.pushManager.subscribe({
        userVisibleOnly: true // Always show notification when received
      })
      .then(function (subscription) {
        // const endpoint = subscription.endpoint
        // const key = subscription.getKey('p256dh')
        // const auth = subscription.getKey('auth')

        dispatch(registerGcm(subscription))
        // changePushStatus(true)
      })
      .catch(function (error) {

      })
    }).catch((error) => {
    })
  }
}

export function registerGcmSuccess () {
  return {
    type: REGISTER_GCM_SUCCESS
  }
}
export function registerGcmRequest () {
  return {
    type: REGISTER_GCM_REQUEST
  }
}

export function registerGcm (subscription) {
  return function (dispatch, getState) {
    const { endpoint, keys: { auth, p256dh } } = subscription.toJSON()

    const subscriptionId = endpoint.split('gcm/send/')[1]
    const state = getState()
    const token = state.auth.token
    return request.post(`${APIBASE}/api/students/registergcm`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ gcm_id: subscriptionId, p256dh, endpoint, auth })
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(registerGcmSuccess(res.body))
        } else {

        }
      })
  }
}

export function unRegisterGcmSuccess () {
  return {
    type: UNREGISTER_GCM_SUCCESS
  }
}
export function unRegisterGcmRequest () {
  return {
    type: UNREGISTER_GCM_REQUEST
  }
}

export function unRegisterGcm (subscription) {
  return function (dispatch, getState) {
    const subscriptionId = subscription.endpoint.split('gcm/send/')[1]
    const state = getState()
    const token = state.auth.token

    return request.post(`${APIBASE}/api/students/unregistergcm`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ gcm_id: subscriptionId })
      .end((err, res) => {
        if (!err && res.ok) {
          dispatch(unRegisterGcmSuccess(res.body))
        } else {

        }
      })
  }
}

export const actions = {
  isPushSupported,
  subscribePush,
  unsubscribePush
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_GCM_STATUS]: (state, action) => {
    return Object.assign({}, state, { enabled: action.payload.enabled, message: action.payload.message })
  },
  [REGISTER_GCM_SUCCESS]: (state, action) => {
    return Object.assign({}, state, { enabled: true, subscribing: false })
  },
  [REGISTER_GCM_REQUEST]: (state, action) => {
    return Object.assign({}, state, { subscribing: true })
  },
  [UNREGISTER_GCM_SUCCESS]: (state, action) => {
    return Object.assign({}, state, { enabled: false, subscribing: false })
  },
  [UNREGISTER_GCM_REQUEST]: (state, action) => {
    return Object.assign({}, state, { enabled: false, subscribing: true })
  },
  [SET_SUPPORTED]: (state, action) => {
    return Object.assign({}, state, { supported: true })
  }
  // [GET_STUDENT_MESSAGES_REQUEST]: (state, action) => Object.assign({}, state, {
  //   loading: true
  // }),
  // [GET_STUDENT_MESSAGES_SUCCESS]: (state, action) => {
  //   let _messages = {}

  //   for (let message of action.payload) {
  //     _messages = {
  //       ..._messages,
  //       ['message-' + message.id]: message
  //     }
  //   }
  //   return Object.assign({}, state, {
  //     data: _messages,
  //     loading: false,
  //     lastUpdated: new Date().getTime()
  //   })
  // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  supported: false,
  enabled: false,
  message: '',
  subscribing: false
}

export default function gcmReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
