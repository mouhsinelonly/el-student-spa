// @flow
import React from 'react'
import { useSelector } from 'react-redux'
import ThesisWorkStep from './ThesisWorkStep'
import UploadDraft from '../../components/UploadDraft'

import './ThesisWorkSteps.scss'
const deliveries = [
  {
    id: 1,
    name: 'التسليم الأول'
  },
  {
    id: 2,
    name: 'التسليم الثاني'
  },
  {
    id: 3,
    name: 'التسليم الثالث'
  },
  {
    id: 4,
    name: 'التسليم الرابع'
  }
]

const eventSteps = {
  'thesis_first_delivery': 1,
  'thesis_second_delivery': 2,
  'thesis_third_delivery': 3,
  'thesis_fourth_delivery': 4,
}

const eventCategories = [
  'thesis_first_delivery',
  'thesis_second_delivery',
  'thesis_third_delivery',
  'thesis_fourth_delivery',
]

const stepEvents = {
  1: 'thesis_first_delivery',
  2: 'thesis_second_delivery',
  3: 'thesis_third_delivery',
  4: 'thesis_fourth_delivery',
}

const WorkSteps = (): React.Element => {
  const { drafts } = useSelector((state: Object): Object => state.thesis)
  const { data: events } = useSelector((state: Object): Object => state.semester_events)

  const activeEvent = events.filter((event: Object): boolean => eventCategories.includes(event.category))
  .find((event: Object): boolean => event.isCurrent)

  const activeStepId = activeEvent ? eventSteps[activeEvent.category] : 0

  const activeStep = deliveries.find((delivery: Object): boolean => delivery.id === activeStepId)

  const mappedDrafts = Object.keys(drafts).map((key: string): boolean => drafts[key], [])

  const activeApproved = mappedDrafts.findIndex((draft: Object): boolean => 
        draft.approved && draft.delivery_order === activeStepId) >= 0

  return <div className='ThesisWorkSteps m-y-3'>
    {deliveries.map((delivery: Objecct): React.Element<'div'> => {
      const isDelivered = mappedDrafts.findIndex((draft: Object): boolean => 
        draft.approved && draft.delivery_order === delivery.id) >= 0
      const deliveryEvent = events.find((event: Object): boolean => event.category === stepEvents[delivery.id])
      return <ThesisWorkStep
        {...(deliveryEvent || {})}
        position={delivery.id}
        isActive={delivery.id === activeStepId}
        isDone={deliveryEvent ? deliveryEvent.isPast : false}
        isDelivered={isDelivered}
        title={delivery.name}
        key={delivery.id} />
    })
   }
    <div className='clearfix m-b-2' />
    {(activeStep && !activeApproved && activeEvent) ? <UploadDraft
      fullWidth
      uploadTitle='البحث'
      remainingDays={activeEvent.remainingDays}
      deliveryOrder={activeStepId}
      title={`رفع ملف ${activeStep.name}`} /> : null }
  </div>
}

export default WorkSteps
