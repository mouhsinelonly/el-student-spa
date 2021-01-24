import React, {Component} from 'react'
import classes from './style.scss'

class DiscontinuousState extends Component {

  render () {
    return (<div className='text-xs-center p-y-3'>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6 col-md-pull-3 col-lg-4 col-lg-pull-4">
            <h3 className={classes['title']}>نعتذر٫ لقد إنقطعت عن الدراسة</h3>
            <p className={`${classes['description']} m-b-3`}>
              بسبب عدم متابعتك للدراسة تم توقيفك
              إذا كان لديك عذر تود تقديمه للدراسة في السنة المقبلة يمكنك
            </p>
            <button className='btn btn-lg btn-success-outline'>
                تقديم عذر عن الإنقطاع
            </button>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default DiscontinuousState
