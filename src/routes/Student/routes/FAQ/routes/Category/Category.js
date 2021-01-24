// @flow
import React from 'react'
import Loading from 'components/Loading'
import Header from '../../components/Header'
import './style.scss'
import QuestionRow from 'routes/Student/routes/FAQ/components/QuestionRow'

type Props = {
  params: Object,
  loadingCategories: boolean,
  loadingQuestions: boolean,
  setCategory: Function,
  questions: Array<Object>,
  categories: Array<Object>
};

class Category extends React.Component<Props> {
  componentDidMount () {
    const { params: { id }, setCategory } = this.props
    setCategory(id)
  }
  componentWillUnmount () {
    const { setCategory } = this.props
    setCategory(0)
  }
  render () {
    const { params: { id }, categories, loadingCategories, questions } = this.props

    const category = categories.find(c => c.id === Number(id))

    if (!category || loadingCategories) return <Loading />

    const { name } = category

    return (<div className='p-faq-category'>
      <Header searchHolder='البحث في الأسئلة' subtitle='التسجيل و القبول' />
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-8 col-md-pull-2 col-lg-10 col-lg-pull-1'>
            <h4 className='p-y-3 m-t-3'>{name}</h4>
            {questions.map((q, i) => <QuestionRow key={i} {...q} />)}
          </div>
        </div>
      </div>
    </div>)
  }
}

export default Category
