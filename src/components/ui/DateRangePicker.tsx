'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface DateRange {
  from: Date | null
  to: Date | null
}

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  minDate?: Date
  maxDate?: Date
  selectsRange?: boolean
  numberOfMonths?: 1 | 2
  className?: string
  format?: string
  presets?: Array<{
    label: string
    range: DateRange
  }>
}

const defaultPresets = [
  {
    label: 'Today',
    range: { from: new Date(), to: new Date() }
  },
  {
    label: 'Yesterday',
    range: { 
      from: new Date(Date.now() - 24 * 60 * 60 * 1000), 
      to: new Date(Date.now() - 24 * 60 * 60 * 1000) 
    }
  },
  {
    label: 'Last 7 days',
    range: { 
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
      to: new Date() 
    }
  },
  {
    label: 'Last 30 days',
    range: { 
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
      to: new Date() 
    }
  },
  {
    label: 'This month',
    range: { 
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), 
      to: new Date() 
    }
  },
  {
    label: 'Last month',
    range: { 
      from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), 
      to: new Date(new Date().getFullYear(), new Date().getMonth(), 0) 
    }
  }
]

function formatDate(date: Date | null, format: string = 'MM/dd/yyyy'): string {
  if (!date) return ''
  
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  
  return format
    .replace('MM', month)
    .replace('dd', day)
    .replace('yyyy', String(year))
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false
  return date1.toDateString() === date2.toDateString()
}

function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.from) return false
  if (!range.to) return isSameDay(date, range.from)
  return date >= range.from && date <= range.to
}

function isDateBetween(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  return date > start && date < end
}

interface CalendarProps {
  currentMonth: Date
  selectedRange: DateRange
  onDateSelect: (date: Date) => void
  onMonthChange: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  selectingStart: boolean
}

function CalendarMonth({ 
  currentMonth, 
  selectedRange, 
  onDateSelect, 
  onMonthChange, 
  minDate, 
  maxDate,
  selectingStart 
}: CalendarProps) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()
  
  const days = []
  
  // Previous month's trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(firstDayOfMonth)
    date.setDate(date.getDate() - (i + 1))
    days.push({ date, isCurrentMonth: false })
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    days.push({ date, isCurrentMonth: true })
  }
  
  // Next month's leading days
  const totalCells = Math.ceil(days.length / 7) * 7
  for (let i = days.length; i < totalCells; i++) {
    const date = new Date(lastDayOfMonth)
    date.setDate(date.getDate() + (i - days.length + 1))
    days.push({ date, isCurrentMonth: false })
  }

  return (
    <div className="p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            const newMonth = new Date(currentMonth)
            newMonth.setMonth(newMonth.getMonth() - 1)
            onMonthChange(newMonth)
          }}
          className="p-1 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 rounded"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="text-sm font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        
        <button
          onClick={() => {
            const newMonth = new Date(currentMonth)
            newMonth.setMonth(newMonth.getMonth() + 1)
            onMonthChange(newMonth)
          }}
          className="p-1 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 rounded"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-xs font-medium text-center text-mw-gray-500 dark:text-mw-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(({ date, isCurrentMonth }, index) => {
          const isSelected = isSameDay(date, selectedRange.from) || isSameDay(date, selectedRange.to)
          const isInRange = isDateInRange(date, selectedRange)
          const isBetween = isDateBetween(date, selectedRange.from, selectedRange.to)
          const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate)
          const isToday = isSameDay(date, new Date())

          return (
            <button
              key={index}
              onClick={() => !isDisabled && onDateSelect(date)}
              disabled={isDisabled}
              className={cn(
                'p-2 text-sm rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 transition-colors',
                !isCurrentMonth && 'text-mw-gray-400 dark:text-mw-gray-600',
                isCurrentMonth && 'text-mw-gray-900 dark:text-white',
                isSelected && 'bg-mw-blue-500 text-white hover:bg-mw-blue-600',
                isBetween && !isSelected && 'bg-mw-blue-100 dark:bg-mw-blue-900/20',
                isToday && !isSelected && 'bg-mw-blue-50 dark:bg-mw-blue-950 font-medium',
                isDisabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Select date range',
  disabled = false,
  required = false,
  clearable = true,
  minDate,
  maxDate,
  numberOfMonths = 1,
  className,
  format = 'MM/dd/yyyy',
  presets = defaultPresets
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<DateRange>(value || { from: null, to: null })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectingStart, setSelectingStart] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setSelectedRange(value)
    }
  }, [value])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDateSelect = (date: Date) => {
    let newRange: DateRange

    if (selectingStart || !selectedRange.from) {
      newRange = { from: date, to: null }
      setSelectingStart(false)
    } else {
      if (date < selectedRange.from) {
        newRange = { from: date, to: selectedRange.from }
      } else {
        newRange = { from: selectedRange.from, to: date }
      }
      setSelectingStart(true)
    }

    setSelectedRange(newRange)
    onChange?.(newRange)

    if (newRange.from && newRange.to) {
      setIsOpen(false)
    }
  }

  const handlePresetSelect = (preset: { label: string; range: DateRange }) => {
    setSelectedRange(preset.range)
    onChange?.(preset.range)
    setIsOpen(false)
  }

  const handleClear = () => {
    const clearedRange = { from: null, to: null }
    setSelectedRange(clearedRange)
    onChange?.(clearedRange)
  }

  const formatDisplayValue = () => {
    if (!selectedRange.from && !selectedRange.to) return placeholder
    if (selectedRange.from && !selectedRange.to) return formatDate(selectedRange.from, format)
    if (selectedRange.from && selectedRange.to) {
      if (isSameDay(selectedRange.from, selectedRange.to)) {
        return formatDate(selectedRange.from, format)
      }
      return `${formatDate(selectedRange.from, format)} - ${formatDate(selectedRange.to, format)}`
    }
    return placeholder
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 text-left',
          'border border-mw-gray-300 dark:border-mw-gray-600 rounded-md',
          'bg-white dark:bg-mw-gray-800',
          'text-mw-gray-900 dark:text-white',
          'hover:border-mw-gray-400 dark:hover:border-mw-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent',
          disabled && 'opacity-50 cursor-not-allowed',
          (!selectedRange.from && !selectedRange.to) && 'text-mw-gray-500 dark:text-mw-gray-400'
        )}
      >
        <span className="truncate">{formatDisplayValue()}</span>
        <div className="flex items-center gap-1 ml-2">
          {clearable && (selectedRange.from || selectedRange.to) && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="p-1 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          <Calendar className="w-4 h-4 text-mw-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg shadow-lg">
          <div className="flex">
            {/* Presets */}
            {presets.length > 0 && (
              <div className="w-48 p-3 border-r border-mw-gray-200 dark:border-mw-gray-700">
                <h4 className="text-sm font-medium mb-2 text-mw-gray-900 dark:text-white">Quick Select</h4>
                <div className="space-y-1">
                  {presets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetSelect(preset)}
                      className="w-full text-left px-2 py-1 text-sm rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700 text-mw-gray-700 dark:text-mw-gray-300"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar */}
            <div className="flex">
              <CalendarMonth
                currentMonth={currentMonth}
                selectedRange={selectedRange}
                onDateSelect={handleDateSelect}
                onMonthChange={setCurrentMonth}
                minDate={minDate}
                maxDate={maxDate}
                selectingStart={selectingStart}
              />
              
              {numberOfMonths === 2 && (
                <CalendarMonth
                  currentMonth={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)}
                  selectedRange={selectedRange}
                  onDateSelect={handleDateSelect}
                  onMonthChange={(month) => {
                    const prevMonth = new Date(month)
                    prevMonth.setMonth(prevMonth.getMonth() - 1)
                    setCurrentMonth(prevMonth)
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                  selectingStart={selectingStart}
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-3 border-t border-mw-gray-200 dark:border-mw-gray-700">
            <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
              {selectingStart ? 'Select start date' : 'Select end date'}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm text-mw-gray-600 dark:text-mw-gray-400 hover:text-mw-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                disabled={!selectedRange.from}
                className="px-3 py-1 text-sm bg-mw-blue-500 text-white rounded hover:bg-mw-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangePicker
