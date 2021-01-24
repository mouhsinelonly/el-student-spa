// @flow
import * as React from 'react'
import GeneratingBooksModal from './GeneratingBooksModal'
import LibraryDashboard from './LibraryDashboard'

type PropsType = {
  toggleLibraryVisibility: Function,
  getCategories: Function,
  getFolders: Function,
  borrowingids: Array<Object>
};

class Library extends React.Component<PropsType> {
  componentDidMount () {
    const { toggleLibraryVisibility, getCategories, getFolders } = this.props
    toggleLibraryVisibility(true)
    getFolders({ guard: 'student'})
    getCategories({ guard: 'student' })
  }
  componentWillUnmount () {
    const { toggleLibraryVisibility } = this.props
    toggleLibraryVisibility(false)
  }
  render (): Array<React.Node> {
    const { borrowingids } = this.props

    return [<LibraryDashboard key='dashboard' {...this.props} />,
      <GeneratingBooksModal key='booksmodal' enabled={borrowingids.length > 0} />]
  }
}

export default Library
