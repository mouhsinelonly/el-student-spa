import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { reduxForm } from 'redux-form'
import {domOnlyProps} from 'utils'

const fields = [
  'content',
  'highlight',
  'book_id',
  'page_number'
]

class AddNote extends Component {
  static propTypes = {
    popupVisible: PropTypes.bool,
    x: PropTypes.number,
    text: PropTypes.string,
    fields: PropTypes.object,
    setHilightedText: PropTypes.func,
    storeNote: PropTypes.func,
    handleSubmit: PropTypes.func,
    setHilightedPopUpVisibility: PropTypes.func,
    y: PropTypes.number
  }
  componentDidMount () {
    // if (this.refs['note'] !== 'undefined') {
    // setTimeout(() => {
      // this.refs['note'].focus()
    // }, 200)
    // }
  }
  componentDidUpdate () {
    this.refs['content'].focus()
  }
  constructor (props) {
    super(props)

    this._showPopup = this._showPopup.bind(this)
    this._hidePopup = this._hidePopup.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }
  render () {
    const { x, y, popupVisible, text, fields: { content }, handleSubmit } = this.props
    if (x === 0 || y === 0) {
      return false
    }
    return (
      <div className='c-library-addnote' style={{top: y + 70}}>
        <form onSubmit={handleSubmit(this._handleSubmit)}
          className={`my-panel-white c-library-addnote__panel shadow-1 ${!popupVisible && 'hidden-xs-up'}`}>
          <div className='p-a-1 c-library-addnote__highlighted m-a-0'>{text}</div>
          <textarea {...domOnlyProps(content)} ref='content' className='shadow-2' placeholder='اكتب نص الملاحظة' />
          <div className='c-library-addnote__footer p-a-1 clearfix'>
            <button className='btn btn-brown btn-outline pull-xs-left'>حفظ</button>
            <button className='btn btn-brown btn-outline pull-xs-left m-l-2'
              type='button'
              onClick={this._hidePopup}>إلغاء</button>
          </div>
        </form>
        <button onClick={this._showPopup}
          className={`c-library-addnote__action btn btn-warning p-y-1 p-x-3 shadow-1 ${popupVisible && 'hidden-xs-up'}`}
          style={{left: x}}>
          إضافة ملاحظة
        </button>
      </div>
    )
  }
  _handleSubmit (values) {
    const {storeNote} = this.props
    storeNote(values)
  }
  _showPopup () {
    const {setHilightedPopUpVisibility} = this.props
    setHilightedPopUpVisibility(true)
  }
  _hidePopup () {
    const {setHilightedPopUpVisibility, setHilightedText} = this.props
    // document.getElementById('root').focus()
    // document.getElementById('root').blur()
    setHilightedText('', 0, 0, 0)
    setHilightedPopUpVisibility(false)
  }
}

export default reduxForm({
  form: 'highlightnote',
  fields
})(AddNote)
