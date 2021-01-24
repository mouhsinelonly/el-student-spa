// @flow
import React, { useEffect } from 'react'
import { reduxForm } from 'redux-form'
import TextareaAutosize from 'react-autosize-textarea'
import validation from './validation'
import { domOnlyProps } from 'utils'
import './ExamRecordingPlaint.scss'

type PropsType = {
  loading: boolean,
  location: Object,
  fields: Object,
  valid: boolean,
  storeRecordingPlaint: Function,
  handleSubmit: Function,
  invalid: boolean,
  getRecordingPlaints: Function,
  plaints: Array<Object>,
  exams: Array<Object>
};

function alreadyPlaint ({ plaints = [], examId = 0, loading = false, exams = {} }: Object): boolean {
  return plaints.findIndex((p: Object): boolean => +p.exam_id === +examId) > -1 || loading
}

const Home = (props: PropsType): React.Element<'form'> => {
  const { getRecordingPlaints, storeRecordingPlaint } = props
  useEffect((): Function => {
    getRecordingPlaints()
  }, [])
  const _submit = (values: Object) => {
    storeRecordingPlaint(values)
  }
  const studentAlreadyPlainted = alreadyPlaint({
    exams: props.exams,
    plaints: props.plaints,
    examId: props.location.query.id,
    loading: props.loading })
  // console.log(studentAlreadyPlainted)
  return (
    <form onSubmit={props.handleSubmit(_submit)}
      className='container ExamRecordingPlaint__container'>
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-md-pull-2 m-t-3'>
          <h6 className='m-b-2'>ارسال شكوى بخصوص خصم درجات</h6>
          <div className='my-panel-white shadow-1 p-t-1'>
            <input type='hidden' {...domOnlyProps(props.fields.exam_id)} />
            <TextareaAutosize
              autoFocus
              {...domOnlyProps(props.fields.student_comment)}
              placeholder='ما التوضيحات التي تود تقديمها بخصوص الخصم ؟'
              className='student-community-create__content ExamRecordingPlaint__reason' />
          </div>
          <p style={{ color: '#000' }} className='font-weight-bold m-b-2'>
            عدد الحروف يجب أن <b className='text-danger'>لا يقل عن 30</b> حرفًا <b className='text-danger'>ولا يزيد عن 1000</b> حَرْفٍ
          </p>
          <div className='text-xs-center'>
            <button className='btn btn-success p-x-3'
              disabled={props.invalid || studentAlreadyPlainted}>
              ارسال الشكوى
            </button>
          </div>
        </div>
      </div>
    </form>)
}

export default reduxForm({
  form: 'signup',
  fields: ['student_comment', 'exam_id'],
  validate: validation,
  destroyOnUnmount: true
}, (state: Object): Object => ({
  initialValues: { exam_id: state.location.query ? state.location.query.id : 0 }
}))(Home)
