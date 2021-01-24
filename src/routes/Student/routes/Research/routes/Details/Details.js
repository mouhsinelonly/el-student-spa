// @flow
import React from 'react'
import Loading from 'components/Loading'
import Icon from 'components/Icon'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import './style.scss'
import { degreeNumberToString, bytesToSize } from 'utils'

const Details = ({ params: { id: paramsId } }: Object): React.Element<'div'> => {
  const _createMarkup = (markup: string): Object => {
    return { __html: markup }
  }
  const activities = useSelector((state: Object): Object => state.researches.activities)
  const serverdate = useSelector((state: Object): Object => state.serverdate)
  const serverTime = moment(serverdate)
  const { degree_type: degreeType } = useSelector((state: Object): Object => state.student.profile)

  if (!activities.length) return <Loading />

  const activity = activities.find((a: Object): boolean => a.id === parseInt(paramsId))

  if (!activity) return false

  const { id, title, start_at: startAt, active, submitted, information,
    type, description, activity_grade: activityGrade, homework_grade: researchGrade,
    sample, template,
    template_file_size: templateSize, sample_file_size: sampleSize } = activity

  const browsable = moment(startAt).isBefore(serverTime) &&
  active

  return (
    <div className='p-research-activity-details'>
      <div className='p-research-activity-details__header p-y-2'>
        <div className='container'>
          <div className='row col-xs-12'>
            <Link to='/student/research'>
              <Icon name='arrow-right-small-dark' className='m-l-3' />
            </Link>
            <span className='p-research-activity-details__title'>
              متطلبات {title}
            </span>
            <Link to={`/student/research/form/${id}`}
              className={`btn pull-xs-left btn-success p-x-3
                ${(!browsable || type === 'research') && 'hidden-xs-up'}`}>
              {submitted ? 'الإطلاع على النشاط' : 'إنجاز النشاط'}
            </Link>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-7 col-md-pull-1'>
            <h5 className='p-t-3 p-b-2 p-research-activity-details__heading'>
              معلومات الإعداد {type === 'activity' ? 'للنشاط' : 'للبحث'}
            </h5>
            <p dangerouslySetInnerHTML={_createMarkup(information.replace(/(?:\r\n|\r|\n)/g, '<br />'))} />
            <h5 className='p-t-3 p-b-2 p-research-activity-details__heading'>
              المطلوب
            </h5>
            <p dangerouslySetInnerHTML={_createMarkup(description.replace(/(?:\r\n|\r|\n)/g, '<br />'))} />
            <h5 className='p-t-3 p-b-2 p-research-activity-details__heading'>
              الدرجة : <span className='text-success'>
                {degreeNumberToString(type === 'activity' ? activityGrade : researchGrade)}
              </span>
            </h5>
          </div>
          <div className='col-xs-12 col-md-4 col-md-pull-1'>
            <h5 className={`p-y-3 p-research-activity-details__heading
              ${(!sampleSize && !templateSize) && 'hidden-xs-up'}`}>
              مرفقات للتحميل
            </h5>
            <a href={sample} target='_blank'
              className={`my-panel-white shadow-1 p-a-2 m-b-2 p-research-activity-details__link
              ${!sampleSize && 'hidden-xs-up'}`}>
              <b className='p-research-activity-details__link-primary'>نموذج {title}</b>
              <div className='p-research-activity-details__link-secondary'>ملف بحجم {bytesToSize(sampleSize)}</div>
              <Icon name='download-gray' className='p-research-activity-details__link-icon' />
            </a>
            <a href={template} target='_blank'
              className={`my-panel-white shadow-1 p-a-2 p-research-activity-details__link
              ${!templateSize && 'hidden-xs-up'}`}>
              <b className='p-research-activity-details__link-primary'>
                <span className={`${degreeType === 'maj' && 'hidden-xs-up'}`}>
                  قالب مفرغ {type === 'activity' ? 'للنشاط' : 'للبحث'}
                </span>
                <span className={`${degreeType === 'bac' && 'hidden-xs-up'}`}>الضوابط و التعليمات</span>
              </b>
              <div className='p-research-activity-details__link-secondary'>ملف بحجم {bytesToSize(templateSize)}</div>
              <Icon name='download-gray' className='p-research-activity-details__link-icon' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
