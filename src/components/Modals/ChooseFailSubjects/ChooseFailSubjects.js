// @flow
import React, { useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'
import Icon from 'components/Icon'
import update from 'immutability-helper'
import { storeChooseSubjects } from 'routes/Student/modules/subjects'
import { closeModal } from 'modules/modals'

const directions = `
<p>
الطلاب الذين أنهوا الخطة الدراسية كاملة ويتبقى لهم فقط المواد التي لم يوفقوا في اجتيازها يسمح لهم باختيار هذه المواد خلال الفصل الدراسي الحالي
</p>
<p>المواد عبارة عن فئتين:</p>
<ul>
<li>
الأولى: مواد نشطة خلال الفصل الحالي وينبغي على الطالب إذا اختارها أن يشاهد المحاضرات المتلفزة ويحضر اللقاءات المباشرة والاختبارات القصيرة والمنتصف والنهائي مثل أي فصل دراسي طبيعي.
</li>
<li>
الثانية: مواد غير نشطة خلال الفصل الحالي وينبغي على الطالب إذا اختارها حضور الامتحان النهائي فقط حسب التقويم الأكاديمي وتعامل معاملة الفصل الصيفي، ويكون الاختبار فيها من <b>100 درجة</b>.
</li>
</ul>
<b>الرسوم الدراسية:</b> 
<p>
تعامل جميع المواد في الفئتين معاملة المواد في الفصل الدراسي العادي بواقع <b>15 ريال عماني</b> لكل ساعة دراسية.</p>
<b>فترة التسجيل:</b>
<p>
تكون فترة تسجيل المواد خلال أسبوعين من تاريخ استلامك لهذه الرسالة، ولن يلتفت بعد ذلك إلى أي طلب لتسجيل مواد خلال الفصل الدراسي الحالي.
</p>
<b>فترة سداد الرسوم:</b>
<p>
تكون فترة سداد الرسوم حتى منتصف شهر نوفمبر 2020 فإذا لم يسدد الرسوم حتى نهاية الفترة المحددة يتم إسقاط المواد ولا يمكن تسجيلها مرة أخرى في نفس الفصل الدراسي الحالي.
</p>
`

const ChooseFailSubjects = (): React.Node => {
  const [rulesVisible, setRulesVisibility] = useState(false)
  const subjects = useSelector((state: Object): Object => state.subjects.failSubjects)
  const [ checkedsubjects, setCheckedSubjects ] = useState([])
  const dispatch = useDispatch()
  const close = useCallback(() => {
    dispatch(closeModal())
  })
  const _submitForm = () => {
    const confirm = window.confirm('هل أنت متاكد من اختيارك لا يمكنك التراجع عن هذه العملية  !!!!!')
    if (confirm) {
      dispatch(storeChooseSubjects(checkedsubjects))
    }
  }

  const _checkSubject = useCallback((id: number) => {
    const index = checkedsubjects.findIndex((s: number): boolean => +s === +id)
    if (index >= 0) {
      const newIds = update(checkedsubjects, { $splice: [[index, 1]] })

      setCheckedSubjects(newIds)
    } else {
      setCheckedSubjects([...checkedsubjects, id])
    }
  }, [checkedsubjects])

  const inCurrentSemesterSubjects = useMemo((): Array => subjects
    .filter((subject: Object): boolean => subject.inCurrentSemester), [subjects])

  const renderFullSubjects = useMemo((): Array<typeof Item> => {
    if (!subjects) return false

    return inCurrentSemesterSubjects.map((s: Object): React.Node => <Item
      key={s.id}
      {...s}
      canCheckMore
      checkedsubjects={checkedsubjects}
      checkSubject={_checkSubject} />)
  }, [inCurrentSemesterSubjects, checkedsubjects])

  const notInCurrentSemesterSubjects = useMemo((): Array => subjects
    .filter((subject: Object): boolean => !subject.inCurrentSemester), [subjects])

  const renderNextSubjects = useMemo((): Array<typeof Item> => {
    if (!subjects) return false

    return notInCurrentSemesterSubjects.map((s: Object): React.Node => <Item
      key={s.id}
      {...s}
      canCheckMore
      checkedsubjects={checkedsubjects}
      checkSubject={_checkSubject} />)
  }, [notInCurrentSemesterSubjects, checkedsubjects])

  return (<div className='shadow-modal'>
    <header className={`c-choose-fail-modal__header modal-header text-xs-center p-y-3`}>
      <h4 className='modal-title font-weight-bold'>
        تسجيل مواد الإعادة
      </h4>
      <small>اختر المواد التي ترغب في إعادتها في الفصل الحالي</small>
    </header>
    <div className='c-choose-fail-modal__warning p-a-1 text-xs-center'>
      يرجى الإطلاع على الضوابط و الشروط قبل إختيار المواد <button
        onClick={(): Function => setRulesVisibility(!rulesVisible)}
        style={{ backgroundColor: 'transparent', borderWidth: 0 }}><b>{rulesVisible ? 'إغلاق' : 'من هنا'}</b></button>
    </div>
    {rulesVisible && <p dangerouslySetInnerHTML={{ __html: directions }}
      className='p-a-3 c-choose-fail-modal__rules' />}
    <div className={`modal-body c-choose-fail-modal__body`}>
      <div className='p-x-3 p-y-1'>
        <table className={`table m-a-0 c-choose-fail-modal__table`}>
          { inCurrentSemesterSubjects.length > 0 && [
            <thead>
              <tr>
                <th>مواد نشطة في الفصل الحالي (دراسة كاملة) <i className='material-icons'
                  data-rh='ينبغي عليك مشاهدة المحاضرات و حضور اللقاءات و أداء اختبارات الأنشطة و المنتصف و النهائية'
                  data-rh-at='top'
                  style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }}>info</i></th>
              </tr>
            </thead>,
            <tbody className='p-x-2'>
              {renderFullSubjects}
            </tbody>
          ]}
          {notInCurrentSemesterSubjects.length > 0 && [<thead>
            <tr>
              <th>مواد غير نشطة في الفصل الحالي (يدخل الطالب الاختبارات النهائية فقط) <i className='material-icons'
                data-rh='المواد في هذه الفئة ينبغي عليك فقط إختبار النهائي من 100 درجة'
                data-rh-at='top'
                style={{ display: 'inline-block', verticalAlign: 'middle', cursor: 'pointer' }}>info</i></th>
            </tr>
          </thead>,
            <tbody className='p-x-2'>
              {renderNextSubjects}
            </tbody>] }
        </table>
      </div>
    </div>
    <div className={`c-choose-fail-modal__footer modal-footer text-xs-center`}>
      <button onClick={_submitForm}
        disabled={checkedsubjects.length === 0}
        className='btn btn-success  m-y-2  p-y-1 p-x-3'>
        تسجيل المواد المختارة
      </button>
      <button onClick={close} className='btn m-r-1 btn-info m-y-2 p-y-1 p-x-3'>
        إغلاق و الاختيار لاحقا
      </button>
    </div>
  </div>)
}

const Item = (properties: ItemPropsType): React.Node => {
  const { id, name, checkedsubjects, canCheckMore, checkSubject } = properties

  const checked = checkedsubjects.findIndex((c: Object): boolean => c === id) >= 0

  const _checkSubject = useCallback(() => {
    checkSubject(id)
  }, [id, checkedsubjects])

  return (<tr key={id}>
    <td>{name}</td>
    <td width='150px'>
      <button
        disabled={!checked && !canCheckMore}
        onClick={_checkSubject}
        className='c-choose-fail-modal__checkbox'>
        <Icon name={`checkbox-${checked ? 'checked' : 'unchecked'}`} />
      </button>
    </td>
  </tr>)
}

export default ChooseFailSubjects
