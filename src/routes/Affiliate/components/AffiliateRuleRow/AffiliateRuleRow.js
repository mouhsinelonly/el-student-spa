// @flow
import React from 'react'
import './AffiliateRuleRow.scss'

type PropsType = {
  text: string
};

const AffiliateRuleRow = (props: PropsType): React.Element<'li'> =>
  <li className='AffiliateRuleRow' dangerouslySetInnerHTML={{ __html: props.text }} />

export default AffiliateRuleRow
