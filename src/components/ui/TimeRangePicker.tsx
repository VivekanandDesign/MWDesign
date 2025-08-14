'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Clock, ChevronDown, X } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface TimeRange {
  from: string | null
  to: string | null
}

interface TimeRangePickerProps {
  value?: TimeRange
  onChange?: (range: TimeRange) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  format?: '12' | '24'
  minuteStep?: number
  minTime?: string
  maxTime?: string
  className?: string
  presets?: Array<{
    label: string
    range: TimeRange
  }>
}

const defaultPresets = [
  {
    label: 'Morning (9AM - 12PM)',
    range: { from: '09:00', to: '12:00' }
  },
  {
    label: 'Afternoon (1PM - 5PM)',
    range: { from: '13:00', to: '17:00' }
  },
  {
    label: 'Evening (6PM - 9PM)',
    range: { from: '18:00', to: '21:00' }
  },
  {
    label: 'Business Hours (9AM - 5PM)',
    range: { from: '09:00', to: '17:00' }
  },
  {
    label: 'Full Day',
    range: { from: '00:00', to: '23:59' }
  }
]

function generateTimeOptions(format: '12' | '24', minuteStep: number = 15): string[] {
  const times: string[] = []
  
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += minuteStep) {
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      if (format === '24') {
        times.push(time24)
      } else {
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        const ampm = hour < 12 ? 'AM' : 'PM'
        const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`
        times.push(time12)
      }
    }
  }
  
  return times
}

function convertTo24Hour(time12: string): string {
  const [time, modifier] = time12.split(' ')
  let [hours, minutes] = time.split(':')
  
  if (hours === '12') {
    hours = '00'
  }
  
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString()
  }
  
  return `${hours.padStart(2, '0')}:${minutes}`
}

function convertTo12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':')
  const hour = parseInt(hours, 10)
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  const ampm = hour < 12 ? 'AM' : 'PM'
  
  return `${hour12}:${minutes} ${ampm}`
}

function isTimeInRange(time: string, min?: string, max?: string): boolean {
  if (!min && !max) return true
  
  const timeMinutes = timeToMinutes(time)
  
  if (min && timeMinutes < timeToMinutes(min)) return false
  if (max && timeMinutes > timeToMinutes(max)) return false
  
  return true
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function isValidTimeRange(fromTime: string | null, toTime: string | null): boolean {
  if (!fromTime || !toTime) return true
  return timeToMinutes(fromTime) < timeToMinutes(toTime)
}

interface TimeSelectProps {
  value: string | null
  onChange: (time: string) => void
  options: string[]
  format: '12' | '24'
  placeholder: string
  disabled?: boolean
  minTime?: string
  maxTime?: string
}

function TimeSelect({ 
  value, 
  onChange, 
  options, 
  format, 
  placeholder, 
  disabled,
  minTime,
  maxTime 
}: TimeSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = options.filter(option => {
    const time24 = format === '12' ? convertTo24Hour(option) : option
    
    // Filter by search term
    if (searchTerm && !option.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    // Filter by time range
    if (!isTimeInRange(time24, minTime, maxTime)) {
      return false
    }
    
    return true
  })

  const displayValue = value || placeholder

  return (
    <div ref={selectRef} className="relative">
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
          !value && 'text-mw-gray-500 dark:text-mw-gray-400'
        )}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown className="w-4 h-4 text-mw-gray-400 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-mw-gray-200 dark:border-mw-gray-700">
            <input
              type="text"
              placeholder="Search time..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-mw-gray-300 dark:border-mw-gray-600 rounded bg-white dark:bg-mw-gray-900 text-mw-gray-900 dark:text-white placeholder-mw-gray-500 dark:placeholder-mw-gray-400 focus:outline-none focus:ring-1 focus:ring-mw-blue-500"
            />
          </div>
          
          <div className="overflow-y-auto max-h-44">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                    setSearchTerm('')
                  }}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700',
                    value === option && 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                  )}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-mw-gray-500 dark:text-mw-gray-400">
                No times found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function TimeRangePicker({
  value,
  onChange,
  placeholder = 'Select time range',
  disabled = false,
  required = false,
  clearable = true,
  format = '12',
  minuteStep = 15,
  minTime,
  maxTime,
  className,
  presets = defaultPresets
}: TimeRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(value || { from: null, to: null })
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const timeOptions = generateTimeOptions(format, minuteStep)

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

  const handleRangeChange = (newRange: TimeRange) => {
    setSelectedRange(newRange)
    onChange?.(newRange)
  }

  const handleFromTimeChange = (time: string) => {
    const newRange = { ...selectedRange, from: time }
    
    // Validate that from time is before to time
    if (newRange.to && !isValidTimeRange(time, newRange.to)) {
      newRange.to = null
    }
    
    handleRangeChange(newRange)
  }

  const handleToTimeChange = (time: string) => {
    const newRange = { ...selectedRange, to: time }
    handleRangeChange(newRange)
  }

  const handlePresetSelect = (preset: { label: string; range: TimeRange }) => {
    let presetRange = preset.range
    
    // Convert preset times to the correct format
    if (format === '12' && presetRange.from && presetRange.to) {
      presetRange = {
        from: convertTo12Hour(presetRange.from),
        to: convertTo12Hour(presetRange.to)
      }
    }
    
    handleRangeChange(presetRange)
    setIsOpen(false)
  }

  const handleClear = () => {
    const clearedRange = { from: null, to: null }
    handleRangeChange(clearedRange)
  }

  const formatDisplayValue = () => {
    if (!selectedRange.from && !selectedRange.to) return placeholder
    if (selectedRange.from && !selectedRange.to) return selectedRange.from
    if (selectedRange.from && selectedRange.to) {
      return `${selectedRange.from} - ${selectedRange.to}`
    }
    return placeholder
  }

  const isRangeValid = isValidTimeRange(selectedRange.from, selectedRange.to)

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
          (!selectedRange.from && !selectedRange.to) && 'text-mw-gray-500 dark:text-mw-gray-400',
          !isRangeValid && 'border-mw-red-300 dark:border-mw-red-600'
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
          <Clock className="w-4 h-4 text-mw-gray-400" />
        </div>
      </button>

      {!isRangeValid && selectedRange.from && selectedRange.to && (
        <p className="mt-1 text-xs text-mw-red-600 dark:text-mw-red-400">
          Start time must be before end time
        </p>
      )}

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

            {/* Time Selectors */}
            <div className="p-4 min-w-[320px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-mw-gray-900 dark:text-white">
                    From Time
                  </label>
                  <TimeSelect
                    value={selectedRange.from}
                    onChange={handleFromTimeChange}
                    options={timeOptions}
                    format={format}
                    placeholder="Select start time"
                    disabled={disabled}
                    minTime={minTime}
                    maxTime={selectedRange.to ? (format === '12' ? convertTo24Hour(selectedRange.to) : selectedRange.to) : maxTime}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-mw-gray-900 dark:text-white">
                    To Time
                  </label>
                  <TimeSelect
                    value={selectedRange.to}
                    onChange={handleToTimeChange}
                    options={timeOptions}
                    format={format}
                    placeholder="Select end time"
                    disabled={disabled || !selectedRange.from}
                    minTime={selectedRange.from ? (format === '12' ? convertTo24Hour(selectedRange.from) : selectedRange.from) : minTime}
                    maxTime={maxTime}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-mw-gray-200 dark:border-mw-gray-700">
                <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
                  {format === '12' ? '12-hour format' : '24-hour format'}
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
                    disabled={!selectedRange.from || !isRangeValid}
                    className="px-3 py-1 text-sm bg-mw-blue-500 text-white rounded hover:bg-mw-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeRangePicker
