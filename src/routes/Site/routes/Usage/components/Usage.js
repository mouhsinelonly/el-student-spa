// @flow
// import libraries
import * as React from 'react'
import { Translate } from 'react-localize-redux'
// import css
import './Usage.scss'

type PropsType = {};

class Usage extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    return (
      <div>
        <div className='container'>
          <h1 className='return-page__heading text-xs-center'>
            <Translate id='global.usage_rules' />
          </h1>
          <div className='row'>
            <div className='col-xs-12 col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
              <h5 className='font-weight-bold'>
                <Translate id='usage_page.restriction_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.restriction_content' />
              </p>
              <h5>
                <b>الروابط من وإلى البوابة:</b>
              </h5>
              <p className='return-page__body p-b-3'>
                 روابط من بوابات جهات أخرى إلى بوابة المركز:
<ul>
<li>باستثناء ما هو وارد أدناه، يمنع نقل أو نسخ أي من محتويات البوابة أو إنشاء أية روابط إلكترونية خاصة بها أو عرض أي منها في إطار.</li>
<li>يمكن وضع روابط خاصة بالبوابة في أية مواقع أخرى لا تتعارض في أهدافها وتوجهها العام مع أهداف وسياسات وأطر عمل البوابة الإلكترونية للمركز.</li>
<li>لا تعتبر الجامعة بأي حال من الأحوال مشاركة أو مرتبطة بأي شكل كان بأية علامات أو شعارات أو رموز تجارية أو خدمية أو أية وسائل أخرى مستخدمة أو تظهر على مواقع ويب المرتبطة بهذه البوابة أو أي من محتوياتها.</li>
<li>يحتفظ المركز بحقوقا الكاملة في إيقاف وإعاقة أي ارتباط بأي شكل من الأشكال من أي موقع يحتوي على مواضيع غير ملائمة أو فاضحة أو متعدية أو بذيئة أو إباحية أو غير لائقة أو غير مقبولة أو غير قانونية، أو أسماء أو مواد أو معلومات تخالف أي قانون أو تنتهك أية حقوق للملكية الفكرية أو لحقوق الخصوصية أو حقوق العلنية.</li>
<li>يحتفظ المركز بحق تعطيل أي ارتباط بأي شكل من الأشكال غير مصرح به ولا يتحمل أية مسئولية عن المحتويات المتوفرة في أي موقع آخر يتم الوصول إليه عبر هذه البوابة أو الوصول منه لهذه البوابة.</li>
</ul>
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.other_link_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.other_link_content' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.virus_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.virus_content' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.waiving_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.waiving_content' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.responsibility_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.responsibility_conetnt' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.compensation_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.compensation_content' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.termination_header' />
              </h5>
              <p className='return-page__body m-t-3'>
                <Translate id='usage_page.termination_content' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.ownership_header' />
              </h5>
              <p className='return-page__body m-t-3'>
                <Translate id='usage_page.ownership_content' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.juridical_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.juridical_content' />
              </p>
              <h5 className='font-weight-bold m-t-3'>
                <Translate id='usage_page.general_rules_header' />
              </h5>
              <p className='return-page__body p-b-3'>
                <Translate id='usage_page.general_rules_content' />
              </p>
            </div>
          </div>
        </div>
      </div>)
  }
}

export default Usage
