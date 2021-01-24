// @flow
import * as React from 'react'
import ReasonBlock from 'components/ReasonBlock'

type PropsType = {
  onNext: Function,
  activeReason: string,
  reasons: Array<Object>,
  onChoice: Function
};

export default class ChooseReason extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { activeReason, reasons } = this.props

    return (
      <div>
        <h4 className='p-b-3 text-xs-center'><b>اختر سبب الغياب</b></h4>
        {reasons.map((t: Object, i: number): React.Element<typeof ReasonBlock> => {
          return <div className='col-xs-12 col-md-4' key={i} >
            <ReasonBlock
              active={t.title === activeReason}
              key={i}
              hasdesciption
              onSubmit={this._handleChoice} {...t} />
          </div>
        })}
        <div className='clearfix' />
        <footer className='p-a-2 text-xs-center'>
          <button disabled={activeReason === ''} onClick={this._goNext} className='btn btn-xs btn-success p-x-3 m-l-1'>
              التالي
          </button>
        </footer>
      </div>
    )
  }
  _handleChoice = (value: string) => {
    const { onChoice } = this.props
    onChoice(value)
  }
  _goNext = () => {
    const { onNext } = this.props
    onNext(2)
  }
}
