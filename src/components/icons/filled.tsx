import React from 'react'
import { Heart, Star } from 'lucide-react'
import type { LucideProps } from 'lucide-react'

export const HeartFilled: React.FC<LucideProps> = (props) => (
  <Heart {...props} fill="currentColor" />
)

export const StarFilled: React.FC<LucideProps> = (props) => (
  <Star {...props} fill="currentColor" />
)
