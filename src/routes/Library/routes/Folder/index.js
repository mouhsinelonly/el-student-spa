// @flow
export default (store: Object): Object => ({
  path: 'folder/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState: Object, cb: Function) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    // $FlowFixMe
    require.ensure([], (require: Function) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Folder = require('components/Library/FolderPage').default
      /*  Return getComponent   */
      cb(null, Folder)
      /* Webpack named bundle   */
    }, 'Folder')
  }
})
