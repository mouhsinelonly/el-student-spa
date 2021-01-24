import React from 'react'
import {Link} from 'react-router'
// import css
import './MoreInfoBlock.scss'

class MoreInfoBlock extends React.Component {
  render () {
    return (
      <div className='c-moreinfo__container text-xs-center'>
        <p className='c-moreinfo__content'>
        تعلم العلوم الشرعية عن بعد في أي مكان في أي وقت
        </p>
        <footer className='c-moreinfo__footer'>
          <Link to='/info' className='btn-lg btn btn-success btn-block'>
          تعرف على القبول و الدراسة
          </Link>
        </footer>
      </div>
    )
  }
}

export default MoreInfoBlock
