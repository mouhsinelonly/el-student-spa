// @flow
import * as React from 'react'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
import './style.scss'

type PropsType = {
  className: string,
  onChange: Function,
  handleFocus: Function,
  html: string,
  placeholder: string
};

type StateType = {
  editorState: Object,
  html: '',
  open: boolean
};

class RichEditorExample extends React.Component<PropsType, StateType> {
  ref = React.createRef()
  editorRef = React.createRef()
  state = { editorState: EditorState.createEmpty(), html: '', open: false }

  componentDidMount () {
    const { html } = this.props
    const contentState = stateFromHTML(html)
    this.setState((): Object => ({ editorState: EditorState.createWithContent(contentState) }))
  }

  onChange = (editorState: EditorState): typeof undefined => {
    const html = stateToHTML(editorState.getCurrentContent())
    this.props.onChange(html)
    this.setState((): Object => ({ editorState, html }))
  }

  handleKeyCommand = (command: string, editorState: EditorState): boolean => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }
  mapKeyToEditorCommand = (e: Object): typeof undefined | Function | typeof null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      )
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }
  toggleBlockType = (blockType: string) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }
  toggleInlineStyle = (inlineStyle: string) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }
  handleFocus = () => {
    this.editorRef.current.focus()
    this.setState((): Object => ({ open: true }))
    this.props.handleFocus(true)
    // console.log('div was focused')
  }
  handleUnfocus = () => {

  }
  render (): React.Element<'div'> {

    const { editorState, open } = this.state
    const { className, placeholder } = this.props
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let classNames = `RichEditor-editor p-a-1`
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        classNames += ' RichEditor-hidePlaceholder'
      }
    }
    if (open) {
      classNames += ' is-open'
    }
    return (
      <div ref={this.ref} className={`RichEditor-root ${className}`} >
        <div className='RichEditor__toolbar p-a-1'>
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
        </div>
        <div className={classNames} onClick={this.handleFocus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder={placeholder}
            ref={this.editorRef}
            spellCheck
          />
        </div>
      </div>
    )
  }
}
RichEditorExample.defaultProps = {
  handleFocus: () => {},
  placeholder: 'أضف مشاركتك هنا'
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

function getBlockStyle (block: Object): string | null {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote'
    default: return null
  }
}

type StyleButtonType = {
  onToggle: Function,
  active: boolean,
  style: string,
  label?: string,
  icon?: string
};

const StyleButton = (props: StyleButtonType): React.Element<'button'> => {
  const onToggle = (e: Object) => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  let className = 'RichEditor-styleButton m-l-1'
  if (props.active) {
    className += ' RichEditor-activeButton'
  }
  return (
    <button className={className} onMouseDown={onToggle}>
      { props.icon ? <i className='material-icons'>{props.icon}</i> : props.label }
    </button>
  )
}

const BLOCK_TYPES = [
  { label: 'UL', style: 'unordered-list-item', icon: 'format_list_bulleted' },
  { label: 'OL', style: 'ordered-list-item', icon: 'format_list_numbered_rtl' },
  { label: 'h1', style: 'header-one', icon: '' },
  { label: 'h2', style: 'header-two', icon: '' },
  { label: 'h3', style: 'header-three', icon: '' },
  { label: 'h4', style: 'header-four', icon: '' },
  { label: 'h5', style: 'header-five', icon: '' },
  { label: 'h6', style: 'header-six', icon: '' },
  // { label: 'Blockquote', style: 'blockquote' },
  // { label: 'Code Block', style: 'code-block' },
]
const BlockStyleControls = (props: Object): Array<*> => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  return BLOCK_TYPES.map((type: Object): React.Element<typeof StyleButton> =>
    <StyleButton
      key={type.label}
      active={type.style === blockType}
      label={type.label}
      icon={type.icon}
      onToggle={props.onToggle}
      style={type.style}
    />)
}
var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: 'format_bold' },
  { label: 'Italic', style: 'ITALIC', icon: 'format_italic' },
  { label: 'Underline', style: 'UNDERLINE', icon: 'format_underline' },
  // { label: 'Monospace', style: 'CODE' },
]
const InlineStyleControls = (props: Object): Array<*> => {
  const currentStyle = props.editorState.getCurrentInlineStyle()

  return INLINE_STYLES.map((type: Object): React.Element<typeof StyleButton> =>
    <StyleButton
      key={type.label}
      active={currentStyle.has(type.style)}
      label={type.label}
      icon={type.icon}
      onToggle={props.onToggle}
      style={type.style}
    />
  )
}

export default RichEditorExample
