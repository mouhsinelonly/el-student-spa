// @flow
import * as React from 'react'
import Form from './components/Form'
import Payment from './components/Payment'

type PropsType = {
  query: Object,
  isFetching: boolean,
  statements: Array<Object>
};

class StatementRequest extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { statements, query: { type, id }, isFetching } = this.props

    const intId = parseInt(id)

    const hasPayed = statements.findIndex((s: Object): boolean => s.id === intId && s.payed === true &&
      s.status === 'uncomplete') >= 0

    const alreadyOrdered = statements.findIndex((s: Object): boolean => s.type === type && s.id !== intId) >= 0

    if (isFetching) {
      return <div />
    }
    return ((!alreadyOrdered || hasPayed) ? <Form /> : <Payment />)
  }
}

export default StatementRequest
