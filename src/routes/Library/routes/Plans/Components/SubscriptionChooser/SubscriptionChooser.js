// @flow
import * as React from 'react'
import './SubscriptionChooser.scss'
import Bookmark from 'components/Svg/Bookmark'
import Loading from 'components/Loading'
type PropsType = {
  packages: Array<Object>,
  choosePackage: Function,
  handleSubscribe: Function,
  getProfile: Function,
  activePackage: Object,
  profile: Object,
  loadingPayment: boolean,
  getPackages: Function
};

class SubscriptionChooser extends React.Component<PropsType> {
  componentDidMount () {
    const { getPackages, getProfile } = this.props
    // getProfile()
    getPackages()
  }
  render (): React.Element<'div'> {
    const { choosePackage, activePackage, packages, handleSubscribe, loadingPayment, profile } = this.props
    return (
      <div className='lib-subscription-chooser'>
        <div className='lib-subscription-chooser__content text-xs-center'>
          <h4 className='lib-subscription-chooser__title'>
            الخطة المدفوعة
          </h4>
          <p className='lib-subscription-chooser__desc'>
              تمكنك من الوصول لكل كتب المكتبة ، أزيد من <b>5000</b> كتاب <br />
              بالإضافة إلى <b>200</b> كتاب تضاف شهريا
          </p>
          <div className='row p-x-2'>
            {packages.map((p: Object): React.Element<typeof Package> => <Package key={p.months}
              handleClick={(): Function => choosePackage(p.id)}
              active={p.id === activePackage.id}
              special={p.discount < p.price}
              {...p} />)}
          </div>
          { typeof activePackage.id !== 'undefined' ? <PackageInfo {...activePackage} /> : null }
        </div>
        <button disabled={(typeof activePackage.id === 'undefined') ||
        loadingPayment ||
        profile.activeSubscription}
          onClick={handleSubscribe}
          className='btn lib-subscription-chooser__subscribe btn-block'>
          {loadingPayment ? <Loading inline scale={10} className='m-l-2' /> : null }
          {loadingPayment ? 'جاري تحويلك للدفع...' : 'اشتراك في الخطة'}
        </button>
      </div>
    )
  }
}
type PlanColumnType = {
  months: number,
  active: boolean,
  special: boolean,
  handleClick: Function
};

type PackageInfoType = {
  price: number,
  discount: number
};

const PackageInfo = (props: PackageInfoType): React.Element<'div'> =>
(<div className='lib-subscription-chooser__info row p-x-3'>
  <div className='col-xs-4'>
    <div className={`lib-subscription-chooser__info-price text-xs-right
      ${props.discount === props.price ? 'hidden-xs-up' : ''}`}>
      <div>{props.price}</div>
      <small>ريال عماني</small>
    </div>
  </div>
  <div className='col-xs-4 p-t-1'>
    <div className='lib-subscription-chooser__info-discount'>
      <div>{props.discount}</div>
      <small>ريال عماني</small>
    </div>
  </div>
  <div className='col-xs-4'>
    <div className={`lib-subscription-chooser__info-percent ${props.discount === props.price ? 'hidden-xs-up' : ''}`}>
      <div>توفر</div>
      <b>{ 100 - ((props.discount / props.price) * 100)}%</b>
    </div>
  </div>
</div>)

const Package = (props: PlanColumnType): React.Element<'div'> =>
(<div className='col-xs-3'>
  <div className={`lib-subscription-chooser__package ${props.active ? 'is-active' : ''}
  ${props.special ? 'is-special' : ''}`}
    onClick={props.handleClick}>
    { props.special ? <Bookmark className='lib-subscription-chooser__package-bookmark' /> : null }
    <div className='lib-subscription-chooser__package-months'>
      {props.months}
    </div>
    <span className='lib-subscription-chooser__package-label'>شهر</span>
  </div>
</div>)

export default SubscriptionChooser
