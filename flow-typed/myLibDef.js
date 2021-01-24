// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

export type Dispatch = ReduxDispatch<Object> & Thunk<Object>;

declare var __DEV__: Boolean
declare var __PROD__: Boolean
declare var __TEST__: Boolean
declare var __DEBUG__: Boolean
declare var __COVERAGE__: Boolean
declare var __BASENAME__: Boolean

declare var laroute: {
  route: (name: string, options?: Object) => string
}

// declare var require: {
//   (id: string): any,
//   ensure(ids: Array<string>, callback?: { (require: typeof require): void }, chunk?: string): void
// }

declare var module: {
  hot: {
    accept(path: Array<string>, callback: () => void): void
  }
}
