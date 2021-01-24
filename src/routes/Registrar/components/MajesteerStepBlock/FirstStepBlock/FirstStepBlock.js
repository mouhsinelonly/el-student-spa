// @flow
import * as React from 'react'
import Icon from 'components/Icon'
import { Link } from 'react-router'
// import css
import '../StepBlock.scss'

export const types = [
  'nid',
  'photo',
  'certificate',
  'transcript',
  'job',
  'marriage'
]

type PropsType = {
  title: string,
  order: number,
  active: boolean,
  files: Array<Object>,
  step: Object,
  histories: Array<Object>,
  gender: string,
  done: boolean,
  married: boolean,
  hasjob: boolean
};

class FirstStepBlock extends React.PureComponent<PropsType> {
  render (): React.Element<'div'> {
    const { title, order, active, files, step, histories, done, gender, married, hasjob } = this.props

    const notUploaded = types.filter((t: string): boolean =>
      files.findIndex((f: Object): boolean => f.type === t) === -1)
    .filter((t: string): boolean => gender === 'm' ||
      (t === 'marriage' &&
      gender === 'f' &&
      ((!hasjob && married) || (hasjob))))

    let data, hint

    const secondTime = histories.filter((h: Object): boolean => h.step.upload_files)

    const secondMessage = secondTime.length > 1 ? 'تم فحص الوثائق و تبين أعدم إكتمالها فيرجى المبادرة إلى إكمالها'
    : 'تم استلام طلبك ويرجى سرعة رفع الوثائق المطلوبة'
    if (step.files_processing) {
      data = (
        <div>
          <p className='c-maj-step-block__step__header'>
           جاري عرض طلبكم على لجنة القبول للبث فيه
          </p>
          <button className='btn btn-info-outline btn-block btn-lg c-maj-step-block__info-button'>
            جاري مراجعة طلبك
          </button>
        </div>
        )

      hint = <p className='m-t-2 c-maj-step-block__step__hint'>
        نشكركم على الإنتظار حاليا تقوم الإدارة بمراجعة أزيد من 1000 طلب
      </p>
    } else if (step.upload_files || histories.findIndex((h: Object): boolean => h.step.files_done) === -1) {
      data = (
        <div>
          <p>
            { notUploaded.length === 0 ? 'تم استلام الوثائق و جاري فحصها' : secondMessage }
          </p>
          <Link to={'registrar/uploader'} className='btn btn-warning btn-block btn-lg'>
            {notUploaded.length === 0 ? 'رفع وثائق اضافية' : 'رفع الوثائق الآن'}
          </Link>
        </div>
        )
      hint = <p className='m-t-2 c-maj-step-block__step__hint'>
        لن تتمكن الإدارة من مراجعة طلبك، إذا لم تقم برفع الوثائق المطلوبة
      </p>
    } else if (done) {
      data = (
        <div>
          <p>
              تم التحقق من إكتمال الوثائق وجاري تحويله إلى لجنة القبول.
          </p>
        </div>
          )
    }
    return (
      <div className={`c-maj-step-block__container  ${(active ? 'is-active' : '')}`}>
        <article className={`c-maj-step-block__step ${(done ? 'is-done' : '')}
          ${(active ? 'is-active' : '')}`}>
          <span className={`c-maj-step-block__order ${(active ? 'is-active' : '')}`}>
            {done ? <Icon name='check-single-green' /> : order}
          </span>
          <h4 className='c-maj-step-block__step__title m-b-2'>{title}</h4>
          {data} {done}
        </article>
        {hint}
      </div>
    )
  }
}

export default FirstStepBlock
