// @flow
import React from 'react'
import { Link } from 'react-router'
import './style.scss'

type PropsType = {
  question: string,
  cat_id: number,
  id: number
};

const QuestionRow = (props: PropsType): React.Element<typeof Link> =>
(<Link to={`/support/faq/category/${props.cat_id}/${props.id}`} className='c-question-row p-y-1'>
  <h6 className='c-question-row__title'>{props.question}</h6>
</Link>)

export default QuestionRow
