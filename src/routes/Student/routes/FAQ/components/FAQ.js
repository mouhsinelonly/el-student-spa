// @flow
import React, { Component } from 'react'
import './style.scss'
import Loading from 'components/Loading'
import Home from './Home'

type Props = {
    loading: boolean,
    children: ?Element,
    getFAQQuestions: Function,
    getFAQCategories: Function
};

class FAQ extends Component<Props> {
  componentDidMount () {
    const { getFAQQuestions, getFAQCategories } = this.props
    getFAQCategories()
    getFAQQuestions()
  }
  render () {
    const { loading, children } = this.props

    if (loading) return <Loading />

    return (children || <Home {...this.props} />)
  }
}

export default FAQ
