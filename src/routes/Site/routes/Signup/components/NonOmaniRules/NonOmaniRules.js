// @flow
import React from 'react'
import './NonOmaniRules.scss'

const rules = [
  { text: 'ينبغي على المتقدم تجهيز كافة الوثائق المطلوبة <b>وتوثيقها من سفارة سلطنة عمان</b> وهي: ',
    subrules: [
      { text: 'أ. البطاقية المدنية من الوجهين او جواز السفر ' },
      { text: 'ب. الشهادة الثانوية للمتقدمين للدبلوم او البكالوريوس ' },
      { text: 'ج. او شهادة البكالوريوس أو الليسانس للمتقدمين للماجستير ' },
  ] },
 { text: 'تعبئة كافة بيانات استمارة التسجيل مع ضرورة مراعاة الدقة عند إدخال البيانات. ' },
 { text: 'تحميل نسخة إلكترونية من الوثائق في الأماكن المخصصة لها في الاستمارة. ويمكن تحميلها لاحقا من خلال بوابة المتقدم.' },
 { text: 'سداد رسوم التسجيل إلكترونيا من خلال بوابتك.' },
 { text: 'بعد الحصول على إشعار القبول المبدئي يلزم <b>إرسال نسخة من جميع الوثائق مصدقة</b> بخاتم طبق الأصل من جهة رسمية. على أن يتم <b>إرسالها بالبريد السريع</b> على عنوان مقر الكلية بالسلطنة. ' },
 { text: 'بعد استلام الوثائق المرسلة بالبريد والتحقق منها يتم إصدار طلب سداد رسوم الفصل الأول.' },
 { text: 'ينبغي سداد الرسوم الدراسية للفصل الاول لكي يصدر لك إشعار القبول النهائي وتصبح طالبا منتظماً وتستطيع استخدام بوابة الطالب ومتابعة دراستك مه بداية الفصل الدراسي.' },
]

const NonOmaniRules = (): React.Element<'div'> => <div className='col-xs-12 col-md-8 col-md-pull-2 text-xs-right m-y-3'>
  <ol className='Signup-NonOmaniRules'>
    {rules.map((rule: Object, i: number): React.Element<'li'> => <li className='Signup-NonOmaniRules__item' key={i}>
      <span dangerouslySetInnerHTML={{ __html: rule.text }} />
      <ul>
        {rule.subrules &&
        rule.subrules.map((subrule: Object, j: number): React.Element<'li'> =>
          <li className='Signup-NonOmaniRules__subitem' key={j}>{subrule.text}</li>)}
      </ul>
    </li>)}
  </ol>
</div>

export default NonOmaniRules
