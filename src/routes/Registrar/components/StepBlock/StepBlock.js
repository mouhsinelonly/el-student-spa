// @flow
import * as React from 'react'
// import css
import './StepBlock.scss'

type PropsType = {
  title: string,
  order: number,
  active: number
};

class StepBlock extends React.PureComponent<PropsType> {
  render (): React.Element<'div'> {
    const { title, order, active } = this.props

    return (
      <div className={`c-step-block__container  ${(active === 1 ? 'is-active' : '')}`}>
        <article className={`c-step-block__step  ${(active === 1 ? 'is-active' : '')}`}>
          <span className={`c-step-block__order ${(active === 1 ? 'is-active' : '')}`}>{order}</span>
          <h4 className='c-step-block__step__title'>{title}</h4>
        </article>
      </div>
    )
  }
}

export default StepBlock
