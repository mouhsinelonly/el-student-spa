// @flow
import * as React from 'react'
import './style.scss'
import Loading from 'components/Loading'
import SoftwareItem from './SoftwareItem'

type PropsType = {
 softwares: Array<Object>,
 getSoftwares: Function,
 loading: boolean,
 toggleModalVisibility: Function
};

const Softwares = (props: PropsType): React.Element<'div'> => {
  const { loading, softwares, getSoftwares, toggleModalVisibility } = props

  React.useEffect((): Function => {
    getSoftwares()
    toggleModalVisibility(false)
    return () => {
      toggleModalVisibility(true)
    }
  })

  return (
    <div className='p-student-softwares__container'>
      <div className='p-student-softwares__heading m-b-3 p-y-3'>
        <h1 className='p-student-softwares__title m-a-0 text-xs-center'>البرامج المساعدة</h1>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12.col-md-10 col-md-pull-1 col-lg-8 col-lg-pull-2'>
            {loading && <Loading className='m-y-2' text='جاري تحميل البرامج المساعدة...' />}
            {softwares.length && softwares.map((s: Object, i: number): React.Element<typeof SoftwareItem> =>
              <SoftwareItem {...s} key={i} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Softwares
