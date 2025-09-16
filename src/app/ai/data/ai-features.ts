import { 
  Bot, Palette, Search, Code, Zap, Wand2, 
  Brain, Sparkles, Target, MessageCircle,
  PaintBucket, Lightbulb, Rocket, Cpu
} from 'lucide-react'

export interface AIFeature {
  id: string
  title: string
  subtitle: string
  description: string
  icon: any
  gradient: string
  features: string[]
  status: 'available' | 'beta' | 'coming-soon'
  demoType: 'chat' | 'visual' | 'interactive'
  category: 'generation' | 'optimization' | 'assistance'
}

export const aiFeatures: AIFeature[] = [
  {
    id: 'mw-copilot',
    title: 'MW Copilot',
    subtitle: 'AI Design Assistant',
    description: 'Your intelligent design companion that understands your intent and helps create breakthrough experiences.',
    icon: Bot,
    gradient: 'from-mw-primary-500 to-mw-primary-700',
    features: [
      'Natural language component generation',
      'Smart accessibility suggestions',
      'Context-aware design recommendations',
      'Voice-activated design commands'
    ],
    status: 'beta',
    demoType: 'chat',
    category: 'assistance'
  },
  {
    id: 'theme-forge',
    title: 'ThemeForge AI',
    subtitle: 'Intelligent Theme Generator',
    description: 'Generate complete brand themes from logos, mood boards, or simple descriptions using breakthrough AI.',
    icon: Palette,
    gradient: 'from-mw-secondary-500 to-mw-secondary-700',
    features: [
      'Logo-to-theme generation',
      'Emotion-based color palettes',
      'Accessible color scale creation',
      'Cultural adaptation support'
    ],
    status: 'available',
    demoType: 'visual',
    category: 'generation'
  },
  {
    id: 'mw-explorer',
    title: 'MW Explorer',
    subtitle: 'Semantic Design Search',
    description: 'Revolutionary search that understands design intent, not just keywords. Find what you need instantly.',
    icon: Search,
    gradient: 'from-mw-flow-500 to-mw-flow-700',
    features: [
      'Intent-based component discovery',
      'Visual similarity search',
      'Cross-platform pattern matching',
      'Smart recommendation engine'
    ],
    status: 'available',
    demoType: 'interactive',
    category: 'assistance'
  },
  {
    id: 'component-craft',
    title: 'ComponentCraft',
    subtitle: 'AI Component Builder',
    description: 'Create components through natural language, visual inputs, or style transfer. The future of component creation.',
    icon: Code,
    gradient: 'from-purple-500 to-purple-700',
    features: [
      'Natural language component building',
      'Style transfer from designs',
      'Responsive variant generation',
      'Accessibility-first creation'
    ],
    status: 'beta',
    demoType: 'interactive',
    category: 'generation'
  },
  {
    id: 'smart-optimizer',
    title: 'Smart Optimizer',
    subtitle: 'AI Performance Engine',
    description: 'Automatically optimize your design system for performance, accessibility, and user experience.',
    icon: Zap,
    gradient: 'from-green-500 to-green-700',
    features: [
      'Bundle size optimization',
      'Performance bottleneck detection',
      'Accessibility compliance checking',
      'Usage pattern analysis'
    ],
    status: 'coming-soon',
    demoType: 'visual',
    category: 'optimization'
  },
  {
    id: 'design-intelligence',
    title: 'Design Intelligence',
    subtitle: 'Predictive Design AI',
    description: 'AI that learns from your design patterns and predicts what you\'ll need next. Stay ahead of trends.',
    icon: Brain,
    gradient: 'from-indigo-500 to-indigo-700',
    features: [
      'Trend prediction and analysis',
      'Usage pattern recognition',
      'Proactive component suggestions',
      'Design consistency scoring'
    ],
    status: 'coming-soon',
    demoType: 'visual',
    category: 'assistance'
  }
]

export const aiStats = {
  componentsGenerated: '12,847',
  themesCreated: '3,429',
  accessibilityIssuesFixed: '8,756',
  developmentTimeReduced: '67%'
}

export const aiDemoConversations = [
  {
    id: 1,
    user: "Create a pricing card with three tiers",
    assistant: "I'll create a responsive pricing card component with three tiers using MW design tokens. Let me generate that for you...",
    code: `<PricingCard>
  <PricingTier 
    name="Starter" 
    price="$9" 
    features={['Basic components', '10 projects']}
  />
  <PricingTier 
    name="Pro" 
    price="$29" 
    highlighted 
    features={['All components', 'Unlimited projects', 'AI assistance']}
  />
  <PricingTier 
    name="Enterprise" 
    price="Custom" 
    features={['Everything in Pro', 'Custom themes', 'Priority support']}
  />
</PricingCard>`,
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    user: "Make this button more accessible",
    assistant: "I've analyzed your button and here are the accessibility improvements I recommend...",
    suggestions: [
      'Add focus ring with 2px offset for WCAG compliance',
      'Increase color contrast ratio to 4.5:1',
      'Add aria-label for screen readers',
      'Ensure minimum touch target of 44px'
    ],
    timestamp: '5 minutes ago'
  }
]
