import { connect } from 'react-redux'
import {setPage} from '../modules/uploader'
import {uploadFile} from '../../../modules/registrar'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import FilesUploader from '../components/FilesUploader'


const mapActionCreators = {
  setPage,
  uploadFile
}


const mapStateToProps = (state) => {
  return {
    files: state.registrar.profile.files,
    socialstatus: state.registrar.profile.social_status,
    gender: state.registrar.profile.gender,
    job: state.registrar.profile.social_job_status,
    page:state.registration_uploader.page
  };
};

export default connect(mapStateToProps, mapActionCreators)(FilesUploader)
