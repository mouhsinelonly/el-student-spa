// @flow
import React from 'react'
import ShipBlock from 'routes/Student/routes/Market/components/Cart/ShipBlock'
import PickupBlock from 'routes/Student/routes/Market/components/Cart/PickupBlock'

type PropsType = {
    orderId: number,
    onSubmit: Function
};

const ShippingForm = ({ orderId, onSubmit }: PropsType): React.Element<'div'> => <div className='row p-a-2'>
  <div className='col-xs-12 col-md-6'>
    <PickupBlock />
  </div>
  <div className='col-xs-12 col-md-6'>
    <ShipBlock />
  </div>
  <div className='col-xs-12 text-xs-center m-t-2 p-a-2' style={{ backgroundColor: '#f2f2f2' }}>
    <button className='btn btn-success' onClick={onSubmit} data-id={orderId}>
      حفط التعديلات
    </button>
  </div>
</div>

export default ShippingForm
