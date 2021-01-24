// @flow
import * as React from 'react'

type PropsType = {
  children: React.Element<*>
};
type StateType = {
  hasError: boolean
};
class ErrorBoundary extends React.Component<PropsType, StateType> {
  state = {
    hasError: false
  }

  componentDidCatch (error: Object, info: Object) {
    // Display fallback UI
    console.error(error)
    this.setState((): Object => ({ hasError: true }))
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  render (): React.Element<*> {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h6 className='p-a-1'>👾 أوبس ... حدث خلل, تواصل مع فريق البرمجة</h6>
    }
    return this.props.children
  }
}

export default ErrorBoundary
