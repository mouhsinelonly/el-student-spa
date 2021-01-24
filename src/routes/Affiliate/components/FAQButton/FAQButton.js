// @flow
import React from 'react'
import { Link } from 'react-router'
import './FAQButton.scss'

const FAQButton = (): React.Element<typeof Link> => <Link to='support/faq'
  className='FAQButton btn p-x-3 p-y-2 m-x-auto'>
الأسئلة الشائعة
</Link>

export default FAQButton
