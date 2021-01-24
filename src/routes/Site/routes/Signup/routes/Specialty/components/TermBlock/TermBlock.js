// @flow
import * as React from 'react'
// import css
import './TermBlock.scss'
// import utils
type PropsType = {
  subjects: Array<Object>,
  centered: boolean,
  left: boolean,
  right: boolean
};

export const TermBlock = (props: PropsType): React.Element<'div'> => (
  <div dir='rtl' className={`c-term-block__container
      ${props.centered ? 'is-centered' : ''} ${props.right ? 'is-right' : ''}
      ${props.left ? 'is-left' : ''}`}>
    <table className='table'>
      <thead>
        <tr>
          <th>المادة</th>
          <th>الساعات المعتمدة</th>
        </tr>
      </thead>
      <tbody>
        {props.subjects.map((s: Object): React.Element<'tr'> => <tr key={s.id}>
          <td>{s.name}</td>
          <td>{s.hour}</td>
        </tr>)}
      </tbody>
      <tfoot>
        <tr>
          <td>المجموع</td>
          <td> {props.subjects.reduce((t: number, s: Object): number => t + s.hour, 0)}</td>
        </tr>
        <tr>
          <td>رسوم الفصل</td>
          <td> {props.subjects.reduce((t: number, s: Object): number => t + (s.amount * s.hour), 0)} ريال عماني</td>
        </tr>
      </tfoot>
    </table>
  </div>)

TermBlock.defaultProps = {
  centered: false,
  right: false,
  left: false
}

export default TermBlock
