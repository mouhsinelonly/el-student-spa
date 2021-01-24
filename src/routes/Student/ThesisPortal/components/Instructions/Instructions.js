// @flow
import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getInstructions } from 'routes/Student/modules/thesis'
import './Instruction.scss'

const Instructions = (): React.Element<'div'> => {
  const dispatch = useDispatch()
  const { instructions } = useSelector((state: Object): Object => state.thesis)
  useEffect(() => {
    dispatch(getInstructions())
  }, [])
  if (instructions.length === 0) {
    return false
  }
  return <div className='Thesis-Instruction my-panel-white shadow-1'>
    <div className='Thesis-Instruction__header p-a-3 text-xs-center'>
      <h5 className='font-weight-bold Thesis-Instruction__header-title'>التعليمات</h5>
      <p className='Thesis-Instruction__header-description p-b-0 m-b-0 hidden-xs-up'>
        قم بسحب وإفلات الملف هنا، او قم بالنقر لتحديد الملف
      </p>
    </div>
    <div className='p-a-3'>
      {instructions.map((instruction: Object, index: number): React.Element<typeof Instruction> => <Instruction
        title={instruction.title}
        padding={index > 0}
        description={instruction.description}
        slug={instruction.slug}
        fileUrl={instruction.fileUrl}
        key={instruction.id} />)}
    </div>
  </div>
}

type PropertiesType = {
  title: string,
  slug: string,
  padding: boolean,
  description: string,
  fileUrl: string
};

const Instruction = ({ title, slug, description, fileUrl, padding }: PropertiesType): React.Element<'div'> => <div
  className={padding ? 'm-t-3' : null}>
  <h6 className='font-weight-bold'>{title}</h6>
  <p className='Thesis-Instruction__item-description' dangerouslySetInnerHTML={{ __html:description.replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
  {slug === 'subject' ? <a href={fileUrl} target='_blank' rel='noopener noreferrer' className='btn btn-purple-light m-t-1 Thesis-Instruction__btn'>
    <i className='material-icons m-l-1'>cloud_download</i> تحميل دليل إعداد المخطط
  </a> : null }
  <br />
  <br />
  {slug === 'subject' ? <Link to='/student/thesis_titles' className='btn btn-purple-light m-t-1 Thesis-Instruction__btn'>
    استعراض قائمة عناوين مقترحة <i className='material-icons m-r-1'>arrow_back</i>
  </Link> : null }
  <div className='clearfix' />
  {slug === 'sample' ? <a href={fileUrl} target='_blank' rel='noopener noreferrer' className='btn btn-purple-light m-t-1 Thesis-Instruction__btn'>
    <i className='material-icons m-l-1'>cloud_download</i> تحميل نموذج خطة العمل
  </a> : null }
</div>

export default Instructions
