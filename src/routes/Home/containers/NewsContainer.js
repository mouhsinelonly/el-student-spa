import { connect } from 'react-redux'
import { getNews } from '../modules/news_reducer'

import News from '../components/News/'

const mapActionCreators = {
  getNews
}

const mapStateToProps = (state) => {
  return {
    data: state.blog.data,
    loading:state.blog.loading
  }
}

export default connect(mapStateToProps, mapActionCreators)(News)
