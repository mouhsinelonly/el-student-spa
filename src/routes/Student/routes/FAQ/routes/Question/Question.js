// @flow
import React from 'react'
import Header from '../../components/Header'
import './style.scss'

type Props = {
  params: Object,
  questions: Array<Object>,
  categories: Array<Object>
};

class Question extends React.Component<Props> {
  render () {
    const { params: { catId, id }, questions, categories } = this.props
    const question = questions.find(q => Number(q.id) === Number(id))
    const category = categories.find(c => Number(catId) === c.id)

    if (!question || !category) return false

    return <div className='p-faq-question'>
      <Header searchHolder='الأسئلة الشائعة' subtitle={category.name} />
      <div className='container'>
        <div className='row p-y-3'>
          <div className='col-xs-12 col-md-6 col-md-pull-1'>
            <h4 className='p-y-3'>{question.question}</h4>
            <p>
              {question.answer}
            </p>
          </div>
          <div className='col-xs-12 col-md-3 col-md-pull-1'>
            <h5 className='p-y-3'>أسئلة ذات صلة</h5>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Question
