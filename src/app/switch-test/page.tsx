'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/Switch'

export default function SwitchTest() {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className="p-8">
      <h1>Switch Test</h1>
      <div className="mt-4">
        <p>Current state: {isOn ? 'ON' : 'OFF'}</p>
        <Switch
          checked={isOn}
          onChange={(e) => {
            console.log('Test switch changed:', e.target.checked)
            setIsOn(e.target.checked)
          }}
          immediate={true}
        />
      </div>
    </div>
  )
}
