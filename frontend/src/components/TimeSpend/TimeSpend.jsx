import React from 'react'
import { useTimeTracker } from './TimeProvider';

function TimeSpend() {
    const {timeSpent} = useTimeTracker();



  return (
    <div>
      {timeSpent}
    </div>
  )
}

export default TimeSpend
