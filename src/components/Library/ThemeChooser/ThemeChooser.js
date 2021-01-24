// @flow
import * as React from 'react'
import './style.scss'

type PropsType = {
  setBrowseTheme?: Function,
  setBrowseFontSize?: Function,
  visible: boolean,
  settings: Object
};

class ThemeChooser extends React.Component<PropsType> {
  static defaultProps = {
    visible: false,
    settings: { fontSize: 12 }
  }
  render (): React.Element<'ul'> {
    const { settings: { fontSize }, visible } = this.props
    if (!visible) {
      return <ul />
    }
    return (<ul className='c-theme-chooser my-panel-white shadow-1'>
      <li className='c-theme-chooser__item p-y-2 p-x-1'>حجم الخط
        <div className='pull-xs-left'>
          <button className='btn btn-white-border' onClick={this._decrementFontSize} disabled={fontSize <= 8}>
          -
          </button>
          <span className='p-x-1'>{parseInt((fontSize / 22) * 100, 10)}%</span>
          <button className='btn btn-white-border' onClick={this._incrementFontSize} disabled={fontSize >= 40}>
            +
          </button>
        </div>
      </li>
      <li className='c-theme-chooser__item p-y-2 p-x-1'>لون الخلفية
        <button className='btn m-l-1 pull-xs-left btn-white' onClick={this._setWhiteTheme} />
        <button className='btn m-l-1 pull-xs-left btn-black' onClick={this._setBlackTheme} />
        <button className='btn m-l-1 pull-xs-left btn-caramel' onClick={this._setCaramelTheme} />
      </li>
    </ul>)
  }

  _incrementFontSize = () => {
    let { setBrowseFontSize, settings: { fontSize } } = this.props
    setBrowseFontSize(++fontSize)
  }
  _decrementFontSize = () => {
    let { setBrowseFontSize, settings: { fontSize } } = this.props
    setBrowseFontSize(--fontSize)
  }
  _setBlackTheme = () => {
    const { setBrowseTheme } = this.props
    setBrowseTheme('black')
  }
  _setWhiteTheme = () => {
    const { setBrowseTheme } = this.props
    setBrowseTheme('white')
  }
  _setCaramelTheme = () => {
    const { setBrowseTheme } = this.props
    setBrowseTheme('caramel')
  }
}

export default ThemeChooser
