import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
// import components
import SubjectForm from '../SubjectForm'
// import form validation
import validation from './validation'
// import css
import './style.scss'
import Icon from 'components/Icon'

export const fields = [
  'id',
  'university',
  'level',
  'files[].id',
  'files[].type',
  'files[].attachments',
  'grade',
  'subjects[].id',
  'subjects[].name',
  'subjects[].status',
  'subjects[].hours',
  'subjects[].code',
  'subjects[].score',
  'subjects[].score_total'
]

class SubjectsForm extends Component {
	constructor(props) {
		super(props)

		this.editSubject  = this.editSubject.bind(this)
		this.deleteSubject  = this.deleteSubject.bind(this)
		this.renderSubjects = this.renderSubjects.bind(this)
		this.hideAddForm    = this.hideAddForm.bind(this)
		this.handleSubmit   = this.handleSubmit.bind(this)
		this.addSubject     = this.addSubject.bind(this)
		this.showEditForm   = this.showEditForm.bind(this)
	}

	render() {
		const {handleSubmit, invalid, fields:{university, grade ,level, files, subjects}, canupdate} = this.props

		return (<div className='c-reg-equ-subjects-form__container container'>
			<form onSubmit={handleSubmit(this.handleSubmit)}>
			<h1 className={`text-xs-center m-y-3 `}>
      		<b>{canupdate ? 'إضافة المواد' : 'المواد' }</b>
      		{canupdate ? <button disabled={invalid || !subjects.length}
      				onSubmit={handleSubmit(this.handleSubmit)}
      		        className={`btn btn-success btn p-x-3 p-y-1 btn-lg c-reg-equ-subjects-form__cta`}>
      			حفظ و إرسال
      		</button> : null }
      		</h1>
      		</form>
				<div className='row'>
					<div className={`c-reg-equ-subjects-form__degree-header col-xs-12 col-md-5`}>
						<h2>شهادة {(()=>{
							switch(level.value) {
								case 'dip': return 'دبلوم';
								case 'bac': return 'بكالوريوس';
								case 'maj': return 'ماجستير';
								case 'doc': return 'دكتوراه';
								case 'other': return 'لم أكمل';
							}
						})()}</h2>
						{canupdate ? <button onClick={this.showEditForm} className={`c-reg-equ-subjects-form__edit-button btn btn-secondary-outline p-x-3`}>
							تعديل
						</button> : null }
						<span>من {university.value}</span><span className='p-x-1'>|</span> <span>بمعدل {grade.value}</span>
						{
							files.filter(f=>f.type.value=='transcript').length &&
							files.filter(f=>f.type.value=='transcript').map((f,i)=>i===0 && <Diploma key={i} {...f}/>)
						}

					</div>
					<div className='col-xs-12 col-md-7'>
						{canupdate ? <div>
							<SubjectForm onSubmit={this.addSubject}/>
							<hr className='m-y-3'/>
						</div>  : null }

						<ul className={`c-reg-equ-subjects-form__subjects-list m-a-0 p-a-0`}>
							{
							this.renderSubjects()
							}
						</ul>
					</div>
				</div>
		</div>)
	}

  addSubject (subject) {
    const {fields: {subjects}} = this.props
    subjects.addField(subject)
  }

	handleSubmit (fields) {
		const {addEquationSubject} = this.props
		addEquationSubject(fields)
	}

	showEditForm () {
		const {changeFormPage} = this.props;

		changeFormPage(1)
	}
	renderSubjects() {
		const {fields:{subjects}, canupdate} = this.props

		return subjects.reverse().map((s,i)=><SubjectRow key={i}
			                                            name={s.name.value}
			                                           code={s.code.value}
			                                           index={i}
			                                           onDelete={this.deleteSubject}
			                                           onEdit={this.editSubject}
			                                           hours={s.hours.value}
			                                           score={s.score.value}
			                                           status={s.status.value}
			                                           canupdate={canupdate}
			                                           scoretotal={s.score_total.value}/>)
	}
	editSubject(index){
		const {editEquationSubject, values, fields :{subjects}} = this.props

		editEquationSubject(values.subjects.find((s, i)=>i==index))
		subjects.removeField(index)
	}

	deleteSubject(index){
		const {fields:{subjects}} = this.props
		subjects.removeField(index)
	}

   hideAddForm() {
    const {hideAddEquation} = this.props
      hideAddEquation()
  }
}


SubjectsForm.propType =  {
    fields: PropTypes.object.isRequired,
  	handleSubmit: PropTypes.func.isRequired,
}

export const SubjectRow = (props) => (<li className={`c-reg-equ-subjects-form__subject-row row m-b-2 p-y-2 p-x-2`}>
	<div className={props.canupdate ? 'col-xs-10' : 'col-xs-12'}>
	<h1 className={`c-reg-equ-subjects-form__subject-row__title`}>
		{props.name}
		{(()=>{
			switch(props.status) {
				case 'waiting':
					return <button className={`btn  p-r-3 m-x-2 c-reg-equ-subjects-form__btn-info`}>
						<Icon name='clock-info-tiny' /> جاري المراجعة
					</button>
				break;
				case  'refused':
					return <button className={`btn  p-r-3 m-x-2 c-reg-equ-subjects-form__btn-warning`}>
						<Icon name='times-single-warning' /> غير مقبول
					</button>
				break;

				case 'accepted':
					return <button className={`btn  p-r-3 m-x-2 c-reg-equ-subjects-form__btn-success`}>
						<Icon name='check-single-green'/> تم معادلتها
					</button>
				break;
			}
		})()}
	</h1>
	<div className={`c-reg-equ-subjects-form__subject-row__meta`}>
		<div className='pull-xs-right'>الكود {props.code} <span className={'p-x-1'}>|</span></div>
		<div className='pull-xs-right'>{props.hours} ساعات معتمدة <span className={'p-x-1'}>|</span></div>
		<div className='pull-xs-right'>الدرجة {props.score} <span className={'p-x-1'}>|</span></div>
		<div className='pull-xs-right'>الدرجة الكلية {props.scoretotal}</div>
	</div>
	</div>
	{props.canupdate ? <div className={`col-xs-2`}>
		<button onClick={()=>props.onDelete(props.index)} className={`btn btn-block btn-secondary-outline c-reg-equ-subjects-form__subject-row__delete`}>
			حذف
		</button>
		<button onClick={()=>props.onEdit(props.index)} className={`btn btn-block btn-secondary-outline c-reg-equ-subjects-form__subject-row__delete`}>
			تعديل
		</button>
	</div>
	: null }
</li>);
export const Diploma = (props) => (<div className={`c-reg-equ-subjects-form__panel m-t-2 p-a-1`}>
	<img className='img-fluid' src={props.attachments.value.large} />
</div>)

export default reduxForm({
  form: 'create_degree',
  fields,
  destroyOnUnmount: false,
  validate: validation
})(SubjectsForm)
