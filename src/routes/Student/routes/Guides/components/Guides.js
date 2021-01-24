// @flow
import React, { useEffect } from 'react'
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getRuleFiles } from 'routes/Student/modules/tickets'
import YoutubeBlock from 'components/YoutubeBlock'
import { toggleModalVisibility } from 'modules/modals'

type PropsRuleType = {
  title: string,
  file_url: string
};

const RuleFile = (props: PropsRuleType): React.Element<'div'> =>
  <a href={props.file_url} style={{ display: 'block', color: '#555658', fontSize: 18 }}
    className='shadow-1 m-b-2 p-x-2 p-y-3 my-panel-white'>{props.title}</a>

const Guides = (): React.Element<'div'> => {
  const { guideRules, guideRulesLoading } = useSelector((state: Object): Object => state.tickets)
  const dispatch = useDispatch()
  useEffect((): Function => {
    if (!guideRules.length) {
      dispatch(getRuleFiles())
    }
    dispatch(toggleModalVisibility(false))
    return () => {
      dispatch(toggleModalVisibility(true))
    }
  }, [])
  return (
    <div className='p-student-guides__container'>
      <h2 className='p-student-guides__heading text-xs-center m-a-0 p-y-3 font-weight-bold'>إرشادات و شروحات</h2>
      {!guideRulesLoading && guideRules.length > 0 && <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 col-md-pull-1 text-xs-center'>
            <h4 className='p-y-3' style={{ color: '#52565a' }}>القوانين و الشروط</h4>
            {guideRules.map((rule: Object): React.Element<'div'> => <div className='col-xs-12 col-md-4' key={rule.id}>
              <RuleFile {...rule} />
            </div>)}
          </div>
        </div>
      </div>}
      <div className='container'>
        <div className='row text-xs-center'>
          <div className='col-xs-12 col-md-10 col-md-pull-1'>
            <h4 className='p-y-3' style={{ color: '#52565a' }}>فيديوهات الشروحات</h4>
            <div className='col-xs-12 col-md-6 col-lg-4 p-b-1'>
              <YoutubeBlock id='8BLUsjGVeT8' title='التعليم عن بعد: مفهومه وكيفية متابعة الدراسة' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-4 p-b-1'>
              <YoutubeBlock id='wzirN22dyuY' title='طرق التعلم المستخدمة في مركز التعليم عن بعد' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-4 p-b-1'>
              <YoutubeBlock id='AZpsLQJE0jM' title='استخدام بوابة الطالب' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-4 p-b-1'>
              <YoutubeBlock id='AZpsLQJE0jM' title='كيفية سداد الرسوم الدراسية إلكترونيًا' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-4 p-b-1'>
              <YoutubeBlock id='25mZi7Q8INY' title='آلية الشراء من المتجر' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-4 p-b-1'>
              <YoutubeBlock id='xUJF59cqaGM' title='آلية الشراء من المتجرطريقة تنصيب برنامج الاختبارات' />
            </div>
            <div className='col-xs-12 col-md-6 col-lg-4 p-b-1'>
              <YoutubeBlock id='MejuZCkOBFI' title='طريقة أستخدام برنامج كاميرا الاختبارات للهواتف' />
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default Guides
