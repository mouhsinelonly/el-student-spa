// @flow
import React from 'react'
import Header from '../../components/Header'
import './style.scss'

type Props = {
  query: string
};

class Search extends React.Component<Props> {
  render () {
    const { query } = this.props

    return <div className='p-faq-search'>
      <Header searchHolder='البحث في الأسئلة' subtitle='التسجيل و القبول' />
      ss results {query}
    </div>
  }
}

export default Search
