// @flow
import * as React from 'react'
import Dashboard from './Dashboard'

type PropsType = {
  toggleModalVisibility: Function,
  getDelayOrders: Function,
  getStatementOrders: Function,
  getFiles: Function,
  getWithdrawOrders: Function,
  children: React.Element<*>
};

class Orders extends React.Component<PropsType> {
  componentDidMount () {
    const { getDelayOrders, getWithdrawOrders,
      toggleModalVisibility, getStatementOrders, getFiles } = this.props
    toggleModalVisibility(false)
    getDelayOrders()
    getFiles()
    getStatementOrders()
    getWithdrawOrders()
  }
  componentWillUnmount () {
    const { toggleModalVisibility } = this.props
    toggleModalVisibility(true)
  }

  render (): React.Element<*> {
    const { children } = this.props

    return (children || <Dashboard {...this.props} />)
  }
}

export default Orders
