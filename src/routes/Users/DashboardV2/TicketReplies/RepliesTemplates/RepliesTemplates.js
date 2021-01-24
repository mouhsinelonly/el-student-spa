// @flow
import * as React from 'react'
import Loading from 'components/Loading'

import './style.scss'

type PropsType = {
  templatesLoading: boolean,
  visible: boolean,
  onItemSelected: Function,
  templates: Array<Object>
};

type StateType = {
  templates: Array<Object>,
  searchTerm: string
};

class RepliesTemplates extends React.Component<PropsType, StateType> {
  inputRef = React.createRef()
  state = {
    searchTerm: '',
    templates: this.props.templates || []
  }
  render (): React.Element<'div'> {
    const { templatesLoading, visible } = this.props
    const { templates } = this.state

    if (templatesLoading) return <Loading />
    return (
      <div className={`v2-ticket-templates ${visible ? '' : 'hidden-xs-up'}`}>
        <div className='v2-ticket-templates__search'>
          <input type='text'
            onKeyUp={this._search}
            ref={this.inputRef}
            placeholder='البحث عن رد جاهز'
            className='form-control' />
          <i className='material-icons'>search</i>
        </div>
        <div className='v2-ticket-templates__items'>
          {templates.map((t: Object): React.Element<typeof ReplyTemplate> =>
            <ReplyTemplate {...t} key={t.id} onChange={this._onChange} />)}
        </div>
      </div>
    )
  }
  _onChange = (value: string) => {
    const { onItemSelected } = this.props
    onItemSelected(value)
  }

  _search = () => {
    const { templates } = this.props
    const value = this.inputRef.current.value
    const filtered = templates.filter((t: Object): boolean =>
      (t.title.search(value) >= 0) || (t.subject.search(value) > 0))
    this.setState((): Object => ({ templates: filtered, searchTerm: value }))
  }
}
type ReplyPropsType = {
  title: string,
  subject: string,
  onChange: Function
};

class ReplyTemplate extends React.Component<ReplyPropsType> {
  render (): React.Element<'div'> {
    const { title, subject } = this.props

    return (<div onClick={this._onChange}
      className='v2-ticket-templates__item p-a-2'>
      <h4 className='v2-ticket-templates__title p-b-0'>{title}</h4>
      <p className='v2-ticket-templates__content m-b-0'>{subject.substr(0, 60)}...</p>
    </div>)
  }
  _onChange = () => {
    const { subject, onChange } = this.props
    onChange(subject)
  }
}
export default RepliesTemplates
