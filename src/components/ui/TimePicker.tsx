'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Clock, ChevronUp, ChevronDown } from 'lucide-react'

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

interface TimePickerProps {
  value?: string // Format: "HH:mm" or "HH:mm:ss"
  onChange?: (time: string) => void
  format?: '12h' | '24h'
  showSeconds?: boolean
  disabled?: boolean
  label?: string
  error?: string
  helpText?: string
  placeholder?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  step?: number // Minutes step (5, 15, 30 etc.)
}

interface TimeInputProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  disabled?: boolean
  className?: string
}

const timeInputSizes = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg'
}

function TimeInput({ value, onChange, min, max, step = 1, disabled, className }: TimeInputProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value.toString().padStart(2, '0'))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isEditing) {
      setInputValue(value.toString().padStart(2, '0'))
    }
  }, [value, isEditing])

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step)
    onChange(newValue)
  }

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    setIsEditing(false)
    const numValue = parseInt(inputValue, 10)
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue)
    } else {
      setInputValue(value.toString().padStart(2, '0'))
    }
  }

  const handleInputFocus = () => {
    setIsEditing(true)
    inputRef.current?.select()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      handleIncrement()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      handleDecrement()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      inputRef.current?.blur()
    }
  }

  return (
    <div className={cn('relative', className)}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="w-12 text-center bg-transparent border-none outline-none text-mw-gray-900 dark:text-white disabled:opacity-50"
        maxLength={2}
      />
      
      <div className="absolute right-0 top-0 h-full flex flex-col">
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled}
          className="flex-1 px-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200 disabled:opacity-50"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled}
          className="flex-1 px-1 text-mw-gray-400 hover:text-mw-gray-600 dark:hover:text-mw-gray-200 disabled:opacity-50"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

function parseTimeString(timeString: string): { hours: number; minutes: number; seconds: number } {
  const parts = timeString.split(':')
  return {
    hours: parseInt(parts[0] || '0', 10),
    minutes: parseInt(parts[1] || '0', 10),
    seconds: parseInt(parts[2] || '0', 10)
  }
}

function formatTime(hours: number, minutes: number, seconds: number, format: '12h' | '24h', showSeconds: boolean): string {
  if (format === '12h') {
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHours = hours % 12 || 12
    const timeString = showSeconds 
      ? `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`
      : `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`
    return timeString
  } else {
    return showSeconds
      ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }
}

export function TimePicker({
  value = '',
  onChange,
  format = '24h',
  showSeconds = false,
  disabled = false,
  label,
  error,
  helpText,
  placeholder = 'Select time',
  className,
  size = 'md',
  step = 1
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM')
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Parse initial value
  useEffect(() => {
    if (value) {
      const parsed = parseTimeString(value)
      setHours(parsed.hours)
      setMinutes(parsed.minutes)
      setSeconds(parsed.seconds)
      setAmpm(parsed.hours >= 12 ? 'PM' : 'AM')
    }
  }, [value])

  // Handle clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTimeChange = (newHours: number, newMinutes: number, newSeconds: number) => {
    const finalHours = format === '12h' 
      ? (ampm === 'PM' && newHours !== 12 ? newHours + 12 : (ampm === 'AM' && newHours === 12 ? 0 : newHours))
      : newHours

    const timeString = showSeconds
      ? `${finalHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
      : `${finalHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`
    
    onChange?.(timeString)
  }

  const handleHoursChange = (newHours: number) => {
    setHours(newHours)
    handleTimeChange(newHours, minutes, seconds)
  }

  const handleMinutesChange = (newMinutes: number) => {
    setMinutes(newMinutes)
    handleTimeChange(hours, newMinutes, seconds)
  }

  const handleSecondsChange = (newSeconds: number) => {
    setSeconds(newSeconds)
    handleTimeChange(hours, minutes, newSeconds)
  }

  const handleAmpmChange = (newAmpm: 'AM' | 'PM') => {
    setAmpm(newAmpm)
    handleTimeChange(hours, minutes, seconds)
  }

  const displayValue = value 
    ? formatTime(hours, minutes, seconds, format, showSeconds)
    : ''

  const displayHours = format === '12h' ? (hours % 12 || 12) : hours

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'relative w-full pl-3 pr-10 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
            timeInputSizes[size],
            error
              ? 'border-red-300 dark:border-red-600'
              : 'border-mw-gray-300 dark:border-mw-gray-600',
            'bg-white dark:bg-mw-gray-800 text-mw-gray-900 dark:text-white'
          )}
        >
          <span className={cn(!displayValue && 'text-mw-gray-500 dark:text-mw-gray-400')}>
            {displayValue || placeholder}
          </span>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Clock className="w-4 h-4 text-mw-gray-400" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-mw-gray-800 border border-mw-gray-200 dark:border-mw-gray-700 rounded-md shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-center space-x-2">
                {/* Hours */}
                <TimeInput
                  value={displayHours}
                  onChange={handleHoursChange}
                  min={format === '12h' ? 1 : 0}
                  max={format === '12h' ? 12 : 23}
                  disabled={disabled}
                />
                
                <span className="text-mw-gray-500">:</span>
                
                {/* Minutes */}
                <TimeInput
                  value={minutes}
                  onChange={handleMinutesChange}
                  min={0}
                  max={59}
                  step={step}
                  disabled={disabled}
                />
                
                {showSeconds && (
                  <>
                    <span className="text-mw-gray-500">:</span>
                    <TimeInput
                      value={seconds}
                      onChange={handleSecondsChange}
                      min={0}
                      max={59}
                      disabled={disabled}
                    />
                  </>
                )}
                
                {format === '12h' && (
                  <div className="ml-2 flex flex-col space-y-1">
                    <button
                      type="button"
                      onClick={() => handleAmpmChange('AM')}
                      disabled={disabled}
                      className={cn(
                        'px-2 py-1 text-xs rounded',
                        ampm === 'AM'
                          ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                          : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'
                      )}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAmpmChange('PM')}
                      disabled={disabled}
                      className={cn(
                        'px-2 py-1 text-xs rounded',
                        ampm === 'PM'
                          ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                          : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-700'
                      )}
                    >
                      PM
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {helpText && !error && (
        <p className="mt-1 text-xs text-mw-gray-500 dark:text-mw-gray-400">
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
