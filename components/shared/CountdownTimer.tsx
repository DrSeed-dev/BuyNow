'use client'

// components/shared/CountdownTimer.tsx
import { useEffect, useState } from 'react'

interface TimeLeft { hours: number; minutes: number; seconds: number }

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    hours:   Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function pad(n: number) { return String(n).padStart(2, '0') }

function defaultTarget() {
  const d = new Date()
  d.setHours(23, 59, 59, 0)
  return d
}

export default function CountdownTimer({
  targetDate,
  label = 'Ends in',
}: {
  targetDate?: Date
  label?: string
}) {
  const target             = targetDate ?? defaultTarget()
  const [time, setTime]    = useState<TimeLeft>(getTimeLeft(target))
  const [ready, setReady]  = useState(false)

  useEffect(() => {
    setReady(true)
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [])

  if (!ready) return null

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      {[
        { v: time.hours,   u: 'H' },
        { v: time.minutes, u: 'M' },
        { v: time.seconds, u: 'S' },
      ].map(({ v, u }, i) => (
        <div key={u} className="flex items-center gap-1">
          <div className="bg-gray-900 text-white text-sm font-mono font-bold px-2 py-1 rounded-md min-w-[2rem] text-center tabular-nums">
            {pad(v)}
          </div>
          {i < 2 && <span className="text-gray-500 font-bold">:</span>}
        </div>
      ))}
    </div>
  )
}
