// @flow
import * as React from 'react'
import { domOnlyProps } from 'utils'
import TextareaAutosize from 'react-autosize-textarea'
import VisibilitySensor from 'react-visibility-sensor'

type PropType = {
  setVisible: Function,
  unSetVisible: Function,
  visibileQuestions: Array<number>,
  id: number,
  title: string,
  answer_text: string,
  type: string,
  name: string,
  order: number,
  opaque: boolean,
  field: Object
};

class QuestionField extends React.Component<PropType> {
  render (): React.Element<'li'> {
    const { title, order, field, name, type, visibileQuestions, id, opaque, answer_text: Answer } = this.props
    // console.log(id)
    const isVisible = visibileQuestions.findIndex((i: number): boolean => i === id) >= 0
    return (<VisibilitySensor top={100} bottom={100} onChange={this._handleFieldVisibility}>
      <li className={`m-b-3 c-research-questions__field ${(!isVisible && opaque) ? 'is-1hidden' : 'is-1visible'}`}>
        <label htmlFor={name} className='c-research-questions__label'>
          {title}
        </label>
        <br />
        {(() => {
          switch (type) {
            case 'file':
              return <div>
                <img src={Answer} alt='' className='c-research-questions__image' />
                <input type='file' {...domOnlyProps(field)}
                  accept='image/*'
                  value={undefined}
                  className={!opaque ? 'hidden-xs-up' : ''} />
              </div>
            default:
              return <TextareaAutosize tabIndex={order}
                disabled={!opaque}
                className={`c-research-questions__text  ${(!isVisible && opaque) ? 'is-qhidden' : 'is-qvisible'}`}
                placeholder={`${opaque ? 'أكتب الإجابة هنا...' : ''}`}
                {...domOnlyProps(field)} />
          }
        })()}
      </li>
    </VisibilitySensor>)
  }

  _handleFieldVisibility = (isVisible: boolean) => {
    const { id, unSetVisible, setVisible, visibileQuestions } = this.props

    if (isVisible && (visibileQuestions.findIndex((i: number): boolean => i === id) < 0)) {
      setVisible(id)
    } else if (!isVisible && (visibileQuestions.findIndex((i: number): boolean => i === id) >= 0)) {
      unSetVisible(id)
    }
  }
}

export default QuestionField
