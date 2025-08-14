'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Star } from 'lucide-react'

export interface RatingProps {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  allowHalf?: boolean
  onChange?: (value: number) => void
  className?: string
}

const ratingSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

export function Rating({
  value = 0,
  max = 5,
  size = 'md',
  readonly = false,
  allowHalf = false,
  onChange,
  className
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const currentValue = isHovering ? hoverValue : value

  const handleMouseEnter = (index: number, isHalf?: boolean) => {
    if (readonly) return
    const newValue = isHalf ? index + 0.5 : index + 1
    setHoverValue(newValue)
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setIsHovering(false)
    setHoverValue(0)
  }

  const handleClick = (index: number, isHalf?: boolean) => {
    if (readonly) return
    const newValue = isHalf ? index + 0.5 : index + 1
    onChange?.(newValue)
  }

  return (
    <div 
      className={clsx('flex items-center space-x-1', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = currentValue > index
        const isHalfFilled = allowHalf && currentValue > index && currentValue < index + 1

        return (
          <div
            key={index}
            className={clsx(
              'relative',
              !readonly && 'cursor-pointer'
            )}
          >
            <Star
              className={clsx(
                ratingSizes[size],
                'transition-colors duration-150',
                isFilled 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'fill-none text-mw-gray-300 dark:text-mw-gray-600'
              )}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleClick(index)}
            />
            
            {allowHalf && (
              <div
                className="absolute inset-0 w-1/2 overflow-hidden"
                onMouseEnter={() => handleMouseEnter(index, true)}
                onClick={() => handleClick(index, true)}
              >
                <Star
                  className={clsx(
                    ratingSizes[size],
                    'transition-colors duration-150',
                    isHalfFilled 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'fill-none text-transparent'
                  )}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
