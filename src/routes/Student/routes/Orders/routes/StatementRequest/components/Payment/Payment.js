// @flow
import * as React from 'react'
import './style.scss'
type PropsType = {
  getStatementPayment: Function,
  loading: boolean
};

class Payment extends React.Component<PropsType> {
  render (): React.Element<'div'> {
    const { loading } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 p-y-3'>
            <h2 className='text-xs-center font-weight-bold'>طلب إفادة التخرج</h2>
            <div className='text-xs-center p-y-1' style={{ color: '#777d84' }} >
              دفع رسوم الطلب
            </div>
          </div>
          <div className='col-xs-12 col-md-6 col-md-pull-3 '>
            <div className='card shadow-2 p-x-3 p-t-3'>
              <div className='card-body p-b-3'>
                <span className='c-statements-payment__amount'>5</span>
                <div className='c-statements-payment__header'>
                  <h3>ريال</h3>
                  <span>رسوم الطلب</span>
                </div>
                <p className='p-t-3' style={{ fontSize: 14 }}>
                  لكونك تطلب إفادة التخرج للمرة الثانية، ينبغي عليك دفع رسوم استخراج الإفادة و يتم دفعها إلكترونيا.
                </p>
              </div>
              <div className='card-footer text-xs-center p-b-2' style={{ borderWidth:0, background: 'transparent' }}>
                <button
                  disabled={loading}
                  onClick={this._getPayment}
                  className='btn btn-lg btn-success p-a-x m-x-auto'>
                  {loading ? 'جاري التحميل....' : 'الدفع و أرسل الطلب'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getPayment = () => {
    const { getStatementPayment } = this.props
    getStatementPayment()
  }
}

export default Payment
