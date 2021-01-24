import { connect } from 'react-redux'
import { getBlogPost } from 'modules/post'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Post from '../components/Post'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile; the component doesn't care   */

const mapActionCreators =  {
  getBlogPost
}

const mapStateToProps = (state) => {
  return {
    post: state.post.data,
    next: state.post.next,
    previous: state.post.previous,
    loading:state.post.loading,
  };
};



export default connect(mapStateToProps, mapActionCreators)(Post)
