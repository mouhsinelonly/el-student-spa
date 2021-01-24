// @flow
import * as React from 'react'
import { Link } from 'react-router'
import Collapsible from 'react-collapsible'
import './style.scss'

type PropsType = {
  rules: Array<Object>,
  location: Object
};

const ExamRules = (props: PropsType): React.Element<'div'> => {
  return (
    <div className='h-100 container'>
      <div className='row'>
        <div className='col-xs-8 col-xs-pull-2'>
          <h3 className='text-xs-center  p-y-2 m-t-2 font-weight-bold m-t-2 registrar-dashboard__heading'>
            <Link to='/registrar' className='pull-xs-right' style={{ color: '#000', fontSize: 14 }}>
              <i className='material-icons' style={{ verticalAlign: 'middle', display: 'inline-block' }}>arrow_forward</i> رجوع
            </Link> ضوابط معلومات الاختبار
          </h3>
          {props.rules.filter((r: Object): boolean => +r.exam_order === +props.location.query.o)
            .map((r: Object, i: number): React.Element<typeof ExamRuleItem> => <ExamRuleItem
              open={i === 0}
              key={r.id}
              {...r} />)}
        </div>
      </div>
    </div>
  )
}

type ExamRulePropsType = {
  title: string,
  open: boolean,
  youtube_link: string,
  content: string
};
const ExamRuleItem = (props: ExamRulePropsType): React.Element<'div'> => <div>
  <Collapsible trigger={props.title} open={props.open}>
    <p className='Collapsible__content' dangerouslySetInnerHTML={{ __html: props.content }} />
    {props.youtube_link ? <div className='embed-responsive embed-responsive-16by9 m-b-2'>
      <iframe className='embed-responsive-item' src={props.youtube_link} />
    </div> : null }
  </Collapsible>
</div>

export default ExamRules
