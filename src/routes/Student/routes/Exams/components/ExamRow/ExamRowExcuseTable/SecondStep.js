// @flow
import * as React from 'react'
import ReasonBlock from 'components/ReasonBlock'

type PropType = {
  events: Array<Object>,
  reasons: Array<Object>,
  type: string,
  addExamExcuseReason: Function,
  goToExcuseStep: Function,
  excusereason: string
};
class SecondStep extends React.Component<PropType> {
  render (): React.Element<'div'> {
    const { excusereason, type, reasons } = this.props
    return (<div>
      <h4 className='p-b-3 text-xs-center'><b>اختر سبب الإعتذار</b></h4>
      {reasons.filter((r: Object): boolean => r.slug === type)
        .map((t: Object, i: number): React.Element<'div'> =>
          <div className='col-lg-4' key={i}>
            <ReasonBlock
              active={t.title === excusereason}
              hasdesciption
              desc={t.content}
              onSubmit={this._onSelect} {...t} />
          </div>)}
      <div className='clearfix' />
      <footer className='text-xs-center p-y-3 c-exam-row-excuse-table__footer m-t-3' >
        <button className='btn btn-gray btn-lg p-x-3' disabled={!excusereason} onClick={this._next}>
          التالي
        </button>
        <div onClick={this._prev} className='c-exam-row-excuse-table__prev'>الرجوع للسابق</div>
      </footer>
    </div>)
  }

  _onSelect = (reason: string) => {
    const { addExamExcuseReason } = this.props
    addExamExcuseReason(reason)
  }

  _next = () => {
    const { goToExcuseStep } = this.props
    goToExcuseStep(3)
  }
  _prev = () => {
    const { goToExcuseStep } = this.props
    goToExcuseStep(1)
  }
}

export default SecondStep
