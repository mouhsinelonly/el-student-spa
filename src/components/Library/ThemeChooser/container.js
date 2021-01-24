// @flow
import { connect } from 'react-redux'
import { setBrowseTheme, setBrowseFontSize } from 'routes/Student/modules/library'
import ThemeChooser from './ThemeChooser'

const mapActionCreators = {
  setBrowseTheme,
  setBrowseFontSize
}

const mapStateToProps = (state: Object): Object => {
  return {
    settings: state.library.settings
  }
}

export default connect(mapStateToProps, mapActionCreators)(ThemeChooser)
