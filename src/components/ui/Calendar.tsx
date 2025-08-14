'use client'

import React, { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface CalendarEvent {
  id: string
  title: string
  date: Date
  color?: string
  allDay?: boolean
  startTime?: string
  endTime?: string
  description?: string
}

interface CalendarProps {
  value?: Date
  onChange?: (date: Date) => void
  events?: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  showWeekNumbers?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = Sunday, 1 = Monday, etc.
  className?: string
  locale?: string
}

interface CalendarDateProps {
  date: Date
  currentMonth: number
  selected?: boolean
  today?: boolean
  disabled?: boolean
  hasEvents?: boolean
  events?: CalendarEvent[]
  onClick?: (date: Date) => void
  onEventClick?: (event: CalendarEvent) => void
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function CalendarDate({
  date,
  currentMonth,
  selected = false,
  today = false,
  disabled = false,
  hasEvents = false,
  events = [],
  onClick,
  onEventClick
}: CalendarDateProps) {
  const isCurrentMonth = date.getMonth() === currentMonth
  const dateNumber = date.getDate()

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(date)
    }
  }

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation()
    onEventClick?.(event)
  }

  return (
    <div
      className={cn(
        'relative min-h-[2.5rem] p-1 border border-mw-gray-200 dark:border-mw-gray-700 cursor-pointer transition-colors',
        !isCurrentMonth && 'bg-mw-gray-50 dark:bg-mw-gray-800/50 text-mw-gray-400',
        isCurrentMonth && 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800',
        selected && 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300',
        today && !selected && 'bg-mw-blue-50 dark:bg-mw-blue-900/10 text-mw-blue-600 dark:text-mw-blue-400',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={handleClick}
    >
      <div className={cn(
        'flex items-center justify-center w-6 h-6 text-sm font-medium rounded-full',
        today && 'bg-mw-blue-600 text-white'
      )}>
        {dateNumber}
      </div>
      
      {/* Events */}
      {hasEvents && events.length > 0 && (
        <div className="mt-1 space-y-1">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className={cn(
                'px-1 py-0.5 text-xs rounded truncate cursor-pointer',
                event.color === 'red' && 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
                event.color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
                event.color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
                event.color === 'yellow' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
                !event.color && 'bg-mw-gray-100 text-mw-gray-700 dark:bg-mw-gray-700 dark:text-mw-gray-300'
              )}
              onClick={(e) => handleEventClick(e, event)}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          {events.length > 3 && (
            <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
              +{events.length - 3} more
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function Calendar({
  value,
  onChange,
  events = [],
  onEventClick,
  minDate,
  maxDate,
  disabled = false,
  showWeekNumbers = false,
  weekStartsOn = 0,
  className,
  locale = 'en-US'
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value || new Date())
  const today = new Date()

  const { year, month } = useMemo(() => ({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth()
  }), [currentDate])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayOfWeek = (firstDayOfMonth.getDay() - weekStartsOn + 7) % 7
    const daysInMonth = lastDayOfMonth.getDate()

    const days: Date[] = []

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i))
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day))
    }

    return days
  }, [year, month, weekStartsOn])

  // Group events by date
  const eventsByDate = useMemo(() => {
    const grouped: { [key: string]: CalendarEvent[] } = {}
    
    events.forEach(event => {
      const dateKey = event.date.toDateString()
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })
    
    return grouped
  }, [events])

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(month - 1)
    } else {
      newDate.setMonth(month + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date: Date) => {
    if (disabled) return
    
    if (minDate && date < minDate) return
    if (maxDate && date > maxDate) return
    
    onChange?.(date)
  }

  const isDateDisabled = (date: Date) => {
    if (disabled) return true
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return value && date.toDateString() === value.toDateString()
  }

  // Adjust day labels based on week start
  const dayLabels = useMemo(() => {
    const labels = [...DAYS_OF_WEEK]
    for (let i = 0; i < weekStartsOn; i++) {
      labels.push(labels.shift()!)
    }
    return labels
  }, [weekStartsOn])

  return (
    <div className={cn('bg-white dark:bg-mw-gray-900 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg p-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
            {MONTHS[month]} {year}
          </h2>
          <button
            onClick={navigateToToday}
            className="px-2 py-1 text-xs font-medium text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-700 dark:hover:text-mw-blue-300 border border-mw-blue-200 dark:border-mw-blue-700 rounded"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 text-mw-gray-600 dark:text-mw-gray-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {/* Week numbers header */}
        {showWeekNumbers && (
          <div className="text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 p-2">
            Wk
          </div>
        )}
        
        {/* Day headers */}
        {dayLabels.map((day) => (
          <div
            key={day}
            className="text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 p-2 text-center"
          >
            {day}
          </div>
        ))}

        {/* Calendar dates */}
        {calendarDays.map((date, index) => {
          const dateKey = date.toDateString()
          const dateEvents = eventsByDate[dateKey] || []
          
          // Week number for first day of each week
          const showWeekNumber = showWeekNumbers && index % 7 === 0
          const weekNumber = getWeekNumber(date)

          return (
            <React.Fragment key={date.toISOString()}>
              {showWeekNumber && (
                <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400 p-2 border border-mw-gray-200 dark:border-mw-gray-700 bg-mw-gray-50 dark:bg-mw-gray-800 flex items-center justify-center">
                  {weekNumber}
                </div>
              )}
              <CalendarDate
                date={date}
                currentMonth={month}
                selected={isSelected(date)}
                today={isToday(date)}
                disabled={isDateDisabled(date)}
                hasEvents={dateEvents.length > 0}
                events={dateEvents}
                onClick={handleDateClick}
                onEventClick={onEventClick}
              />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

// Utility function to get week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}
