import { connect } from 'react-redux'
import { getNews, setSearchQuery } from 'routes/Home/modules/news_reducer'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the profile:   */

import Blog from '../components/Blog'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around getProfile; the component doesn't care   */

const mapActionCreators = {
  getNews,
  setSearchQuery
}

const mapStateToProps = (state) => {
  return {
    posts: state.blog.data,
    currentPage: state.blog.currentPage,
    loading: state.blog.loading,
    totalPages: state.blog.totalPages,
    query: state.blog.query
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const profile = (state) => state.profile
    const tripleCount = createSelector(profile, (count) => count * 3)
    const mapStateToProps = (state) => ({
      profile: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Blog)