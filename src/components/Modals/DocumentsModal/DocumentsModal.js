// @flow
import * as React from 'react'
//  import css
type PropsType = {
  closeModal: Function,
  degree_type: string
};

const getDocuments = (type: string): Object => ({
  bac: [{ id: 1, title: 'نسخة مطبوعة من هذا الإشعار.' },
  { id: 2, title: 'أصل مع نسخة من البطاقة المدنية أو جواز السفر.' },
  { id: 3, title: 'أصل مع نسخة من شهادة الثانوية (الدبلوم العام).' },
  // { id: 4, title: 'أصل بطاقة العمل أو خطاب من جهة العمل للموظفين أو الموظفات.' },
  // { id: 5, title: 'أصل عقد الزواج للمتقدمات غير الموظفات.' }
  ],
  maj: [
    { id: 1, title: 'نسخة مطبوعة من هذا الإشعار.' },
    { id: 2, title: 'أصل مع نسخة من البطاقة المدنية أو جواز السفر.' },
    { id: 3, title: 'أصل مع نسخة من شهادة (إفادة) البكالوريوس، وكشف درجات البكالوريوس.' }
  ]
})[type]

class DocumentsModal extends React.Component<PropsType> {
  static defaultProps = {
    degree_type: 'bac'
  }
  closeModal = () => {
    const { closeModal } = this.props
    closeModal('documents')
  }
  render (): React.Element<'div'> {
    const { degree_type: type } = this.props
    return (<div className='shadow-modal'>
      <div className='modal-header'>
        {/* <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button> */}
        <h4 className='modal-title text-xs-center p-t-2 p-b-1 text-danger'>إرشادات هامة لمطابقة الوثائق</h4>
        <h5 className='text-xs-center p-b-2 text-danger'>ينبغي قبل الحضور للمطابقة  قراءة التعليمات بدقة ثم اختيار موعد للحضور</h5>
      </div>
      <div className='modal-body p-a-1'>
        <p>
         يسرنا أن نهنئكم لحصولكم على قبولٍ مبدئيٍ (غير نهائي)،
         ولاستكمال إجراءات طلبكم والحصول على إشعار القبول النهائي وتسجيلكم طالبًا معتمدًا؛
         يرجى المبادرة إلى سرعة تنفيذ ما يأتي خلال أسبوع من تاريخه:
        </p>
        <p className='font-weight-bold' style={{ color: '#000' }}>
          <strong className='text-danger'>اختيار موعد</strong> لحضور المتقدم شخصيًا إلى مقر كلية العلوم الشرعية بالخوير لاستكمال إجراءات القبول الآتية:
        </p>
      </div>
      <div>
        <ol>
          <li>التقاط صورة شخصية للمتقدم (تنبيه للعمانيين الذكور:
            يرجى الالتزام بالزي الرسمي العماني -الدشاشة والمصر أو الكمة).
          </li>
          <li>تسجيل بصمة المتقدم لاستخدامها لاحقًا في الامتحانات.</li>
          <li>مطابقة الوثائق الأصلية مع الوثائق التي تم تحميلها في النظام. <strong style={{ color: '#000' }}>علمًا بأن الوثائق المطلوب إحضارها هي:</strong></li>
        </ol>
        <ul>
          {getDocuments(type).map((doc: Object): React.Element<'li'> => <li key={doc.id}>{doc.title}</li>)}
        </ul>
      </div>
      <div>
        <div className='modal-body p-a-1'>
          <p className='font-weight-bold text-danger'>
          ملاحظات هامة
          </p>
        </div>
        <ol>
<li>ينبغي عليك <strong style={{ color: '#000' }}>حجز موعد قبل الحضور</strong> من خلال الضغط على <strong style={{ color: '#000' }}>(حجز موعد)</strong> واختيار الموعد المناسب لك من ضمن المواعيد المتاحة. </li>
<li>يجب الالتزام باليوم  والساعة التي تم  اختيارها وفي حال عدم  الحضور في الموعد المحدد ينبغي إعادة اختيار موعد جديد. </li>
<li>يرجى الالتزام بإجراءات الوقاية المتعلقة بفيروس كورونا كوفيد (19).</li>

          <li>لا يتوافر بالكلية تصوير المستندات لذا يجب على المتقدم إحضار الأصل والصورة معه.</li>
          <li>يجب أن تكون صور المستندات كاملة وواضحة.</li>
          <li>ستقوم إدارة القبول والتسجيل بالاطلاع على الأصل ورده إلى المتقدم والاحتفاظ بصور المستندات.</li>
        </ol>
      </div>
      <div className='modal-body  text-xs-center'>
        <h6 className='font-weight-bold text-danger'>عنوان الكلية</h6>
        <p className=''>
            كلية العلوم الشرعية سكة 2535 ، المها شارع الخوير 33
            مسقط سلطنة عمان 2535 way Al Maha St Al Kuwair 33, Muscat
        </p>
      </div>
      <div className='modal-footer text-xs-center'>
        <button type='button'
          onClick={this.closeModal}
          className='btn btn-success btn-lg m-y-2'>
                لقد قرأت الإرشادات
        </button>
      </div>
    </div>)
  }
}

export default DocumentsModal
