// @flow
import React from 'react'
import QuestionRow from '../QuestionRow'
import { Link } from 'react-router'
import Loading from 'components/Loading'
import './style.scss'

type PropsType = {
    name: string,
    id: number,
    questions: Array<Object>,
    loading: boolean
};

const FaqCategory = (props: PropsType): React.Element<*> => {
  const { name, questions, loading, id } = props

  if (loading) {
    return <Loading />
  }

  if (!questions.reduce((total: number, cur: number): number => total + (cur.cat_id === id ? 1 : 0), 0)) return false

  return (<div className='c-faq-category'>
    <h4 className='c-faq-category__title p-y-2'>
      <Link to={`/support/faq/category/${id}`}>
        {name}
      </Link>
    </h4>
    {
      questions.filter((q: Object, index: number): boolean => index < 5 && q.cat_id === id)
      .map((q: Object, index: number): React.Element<typeof QuestionRow> => <QuestionRow key={index} {...q} />)
    }
    {questions.length > 5 ? <Link> روية المزيد + {questions.length - 5} </Link> : null}
  </div>)
}

export default FaqCategory
