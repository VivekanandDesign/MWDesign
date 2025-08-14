'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
  error?: string
  minDate?: Date
  maxDate?: Date
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  className,
  label,
  error,
  minDate,
  maxDate
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(value || new Date())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange?.(date)
      setIsOpen(false)
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setViewDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(viewDate)

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={clsx(
          'w-full flex items-center justify-between px-3 py-2 border rounded-md shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-300 text-red-900'
            : 'border-mw-gray-300 dark:border-mw-gray-600 text-mw-gray-900 dark:text-white',
          'bg-white dark:bg-mw-gray-800',
          className
        )}
      >
        <span className={clsx(
          value ? 'text-mw-gray-900 dark:text-white' : 'text-mw-gray-500 dark:text-mw-gray-400'
        )}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar className="w-4 h-4 text-mw-gray-400" />
      </button>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg p-4 min-w-[280px]">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
              {months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div
                key={day}
                className="text-center text-xs font-medium text-mw-gray-500 dark:text-mw-gray-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => day && handleDateSelect(day)}
                disabled={!day || isDateDisabled(day)}
                className={clsx(
                  'w-8 h-8 text-sm rounded transition-colors',
                  !day && 'invisible',
                  day && !isDateDisabled(day) && 'hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700',
                  day && value && day.toDateString() === value.toDateString()
                    ? 'bg-mw-blue-600 text-white'
                    : 'text-mw-gray-900 dark:text-white',
                  day && isDateDisabled(day) && 'opacity-50 cursor-not-allowed'
                )}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
