import { clsx } from 'clsx'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-mw-gray-200 dark:border-mw-gray-700 bg-white dark:bg-mw-gray-800 shadow-mw-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={clsx('p-6 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div
      className={clsx('p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}
