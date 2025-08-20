'use client'

import React, { useState } from 'react'
import { 
  Form, FormSection, FormGroup, FormField, FormLabel, FormControl, 
  FormDescription, FormError, FormActions, Fieldset 
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Select } from '@/components/ui/Select'
import { Checkbox, Radio } from '@/components/ui/Checkbox'
import { Switch } from '@/components/ui/Switch'
import { Progress } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'
import { FileUpload } from '@/components/ui/FileUpload'
import { Rating } from '@/components/ui/Rating'
import { Slider } from '@/components/ui/Slider'
import { 
  User, Lock, Mail, Phone, Eye, EyeOff, Shield, 
  CheckCircle, AlertCircle, Upload, Star, Heart,
  Building, MapPin, CreditCard, Bell, Globe,
  Users, Calendar, Filter, Search, Settings,
  Save, Send, Download, Share2, Edit3, Trash2
} from 'lucide-react'

interface FormState {
  [key: string]: any
}

interface ValidationErrors {
  [key: string]: string
}

export default function FormsAuthenticationPreview() {
  const [activeTab, setActiveTab] = useState('auth')
  const [showPassword, setShowPassword] = useState(false)
  const [formStates, setFormStates] = useState<Record<string, FormState>>({})
  const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({})
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({})
  const [showModal, setShowModal] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Form validation functions
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid email'
    return null
  }

  const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain uppercase, lowercase, and number'
    }
    return null
  }

  const updateFormState = (formId: string, field: string, value: any) => {
    setFormStates(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [field]: value
      }
    }))

    // Clear validation error when user starts typing
    if (validationErrors[formId]?.[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [formId]: {
          ...prev[formId],
          [field]: ''
        }
      }))
    }
  }

  const handleSubmit = async (formId: string, formData: FormState) => {
    setIsSubmitting(prev => ({ ...prev, [formId]: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(prev => ({ ...prev, [formId]: false }))
    setShowModal(true)
    console.log(`${formId} submitted:`, formData)
  }

  // Select options
  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'sales', label: 'Sales Question' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Feedback' }
  ]

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-mw-gray-900 dark:text-white">
          Moving Walls Forms & Authentication
        </h1>
        <p className="text-xl text-mw-gray-600 dark:text-mw-gray-400 max-w-3xl mx-auto">
          Comprehensive forms collection including authentication, business forms, profiles, 
          and advanced form patterns with validation and accessibility features.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Secure Authentication</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Real-time Validation</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Accessibility Ready</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Settings className="w-3 h-3" />
            <span>15+ Form Types</span>
          </Badge>
        </div>
      </div>

      {/* Forms Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="business">Business Forms</TabsTrigger>
          <TabsTrigger value="profile">Profile & Settings</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Forms</TabsTrigger>
        </TabsList>

        {/* Authentication Forms */}
        <TabsContent value="auth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Login Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Login Form
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Standard authentication with email and password
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('login', formStates.login || {})}>
                  <FormField>
                    <FormLabel htmlFor="login-email" required>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="john@company.com"
                          className="pl-10"
                          value={formStates.login?.email || ''}
                          onChange={(e) => updateFormState('login', 'email', e.target.value)}
                        />
                      </div>
                    </FormControl>
                    {validationErrors.login?.email && (
                      <FormError>{validationErrors.login.email}</FormError>
                    )}
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="login-password" required>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          value={formStates.login?.password || ''}
                          onChange={(e) => updateFormState('login', 'password', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mw-gray-400 hover:text-mw-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                  </FormField>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember-me" />
                      <label htmlFor="remember-me" className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
                        Remember me
                      </label>
                    </div>
                    <button type="button" className="text-sm text-mw-primary-600 hover:text-mw-primary-700">
                      Forgot password?
                    </button>
                  </div>

                  <FormActions>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting.login}
                    >
                      {isSubmitting.login ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </FormActions>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-mw-gray-200 dark:border-mw-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-mw-gray-800 text-mw-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </Form>
              </CardContent>
            </Card>

            {/* Registration Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Registration Form
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Create a new account with validation
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('register', formStates.register || {})}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField>
                      <FormLabel htmlFor="reg-firstname" required>First Name</FormLabel>
                      <FormControl>
                        <Input
                          id="reg-firstname"
                          placeholder="John"
                          value={formStates.register?.firstName || ''}
                          onChange={(e) => updateFormState('register', 'firstName', e.target.value)}
                        />
                      </FormControl>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="reg-lastname" required>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="reg-lastname"
                          placeholder="Doe"
                          value={formStates.register?.lastName || ''}
                          onChange={(e) => updateFormState('register', 'lastName', e.target.value)}
                        />
                      </FormControl>
                    </FormField>
                  </div>

                  <FormField>
                    <FormLabel htmlFor="reg-email" required>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="john@company.com"
                          className="pl-10"
                          value={formStates.register?.email || ''}
                          onChange={(e) => updateFormState('register', 'email', e.target.value)}
                        />
                      </div>
                    </FormControl>
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="reg-password" required>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Create a strong password"
                          className="pl-10"
                          value={formStates.register?.password || ''}
                          onChange={(e) => updateFormState('register', 'password', e.target.value)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters with uppercase, lowercase, and number
                    </FormDescription>
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="reg-company">Company (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="reg-company"
                          placeholder="Your company name"
                          className="pl-10"
                          value={formStates.register?.company || ''}
                          onChange={(e) => updateFormState('register', 'company', e.target.value)}
                        />
                      </div>
                    </FormControl>
                  </FormField>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={formStates.register?.terms || false}
                        onChange={(e) => updateFormState('register', 'terms', e.target.checked)}
                      />
                      <label htmlFor="terms" className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
                        I agree to the <a href="#" className="text-mw-primary-600 hover:underline">Terms of Service</a> and{' '}
                        <a href="#" className="text-mw-primary-600 hover:underline">Privacy Policy</a>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="newsletter" 
                        checked={formStates.register?.newsletter || false}
                        onChange={(e) => updateFormState('register', 'newsletter', e.target.checked)}
                      />
                      <label htmlFor="newsletter" className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
                        Subscribe to our newsletter for updates and tips
                      </label>
                    </div>
                  </div>

                  <FormActions>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting.register || !formStates.register?.terms}
                    >
                      {isSubmitting.register ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </FormActions>
                </Form>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Enhanced security with 2FA verification
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                      </p>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    />
                  </div>

                  {twoFactorEnabled && (
                    <div className="space-y-4">
                      <FormField>
                        <FormLabel htmlFor="2fa-code">Enter 6-digit code</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            {[...Array(6)].map((_, i) => (
                              <Input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-lg font-mono"
                                value={formStates.twoFactor?.[`digit${i}`] || ''}
                                onChange={(e) => updateFormState('twoFactor', `digit${i}`, e.target.value)}
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter the 6-digit code from your authenticator app
                        </FormDescription>
                      </FormField>

                      <div className="flex space-x-3">
                        <Button>Verify Code</Button>
                        <Button variant="outline">Resend Code</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Password Reset */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Password Reset
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Secure password recovery flow
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('reset', formStates.reset || {})}>
                  <FormField>
                    <FormLabel htmlFor="reset-email" required>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-10"
                          value={formStates.reset?.email || ''}
                          onChange={(e) => updateFormState('reset', 'email', e.target.value)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      We'll send a password reset link to this email address
                    </FormDescription>
                  </FormField>

                  <FormActions>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting.reset}
                    >
                      {isSubmitting.reset ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </FormActions>

                  <div className="text-center">
                    <button type="button" className="text-sm text-mw-primary-600 hover:text-mw-primary-700">
                      Back to login
                    </button>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Forms */}
        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Contact Us Form
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Customer inquiry and support form
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('contact', formStates.contact || {})}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField>
                      <FormLabel htmlFor="contact-name" required>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          id="contact-name"
                          placeholder="John Doe"
                          value={formStates.contact?.name || ''}
                          onChange={(e) => updateFormState('contact', 'name', e.target.value)}
                        />
                      </FormControl>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="contact-email" required>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="john@company.com"
                          value={formStates.contact?.email || ''}
                          onChange={(e) => updateFormState('contact', 'email', e.target.value)}
                        />
                      </FormControl>
                    </FormField>
                  </div>

                  <FormField>
                    <FormLabel htmlFor="contact-phone">Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="contact-phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="pl-10"
                          value={formStates.contact?.phone || ''}
                          onChange={(e) => updateFormState('contact', 'phone', e.target.value)}
                        />
                      </div>
                    </FormControl>
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="contact-subject" required>Subject</FormLabel>
                    <FormControl>
                      <Select
                        options={subjectOptions}
                        value={formStates.contact?.subject || ''}
                        onChange={(e) => updateFormState('contact', 'subject', e.target.value)}
                        placeholder="Select a subject"
                      />
                    </FormControl>
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="contact-message" required>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us how we can help you..."
                        rows={4}
                        value={formStates.contact?.message || ''}
                        onChange={(e) => updateFormState('contact', 'message', e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      {(formStates.contact?.message?.length || 0)}/500 characters
                    </FormDescription>
                  </FormField>

                  <FormActions>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting.contact}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting.contact ? 'Sending...' : 'Send Message'}
                    </Button>
                  </FormActions>
                </Form>
              </CardContent>
            </Card>

            {/* Lead Generation Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Lead Generation
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Marketing lead capture form
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('lead', formStates.lead || {})}>
                  <FormField>
                    <FormLabel htmlFor="lead-email" required>Business Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="lead-email"
                          type="email"
                          placeholder="john@company.com"
                          className="pl-10"
                          value={formStates.lead?.email || ''}
                          onChange={(e) => updateFormState('lead', 'email', e.target.value)}
                        />
                      </div>
                    </FormControl>
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="lead-company" required>Company Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                        <Input
                          id="lead-company"
                          placeholder="Your company name"
                          className="pl-10"
                          value={formStates.lead?.company || ''}
                          onChange={(e) => updateFormState('lead', 'company', e.target.value)}
                        />
                      </div>
                    </FormControl>
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="lead-size">Company Size</FormLabel>
                    <FormControl>
                      <Select
                        options={companySizeOptions}
                        value={formStates.lead?.companySize || ''}
                        onChange={(e) => updateFormState('lead', 'companySize', e.target.value)}
                        placeholder="Select company size"
                      />
                    </FormControl>
                  </FormField>

                  <FormField>
                    <FormLabel>Interested in:</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {['Marketing Automation', 'Analytics Dashboard', 'Custom Integration', 'Enterprise Support'].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`interest-${option}`}
                              checked={formStates.lead?.interests?.includes(option) || false}
                              onChange={(e) => {
                                const current = formStates.lead?.interests || []
                                const updated = e.target.checked 
                                  ? [...current, option]
                                  : current.filter((item: string) => item !== option)
                                updateFormState('lead', 'interests', updated)
                              }}
                            />
                            <label htmlFor={`interest-${option}`} className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                  </FormField>

                  <FormActions>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting.lead}
                    >
                      {isSubmitting.lead ? 'Processing...' : 'Get Free Demo'}
                    </Button>
                  </FormActions>
                </Form>
              </CardContent>
            </Card>

            {/* Survey Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Customer Satisfaction Survey
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Collect customer feedback and ratings
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('survey', formStates.survey || {})}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField>
                        <FormLabel>Overall satisfaction</FormLabel>
                        <FormControl>
                          <Rating
                            value={formStates.survey?.satisfaction || 0}
                            onChange={(value) => updateFormState('survey', 'satisfaction', value)}
                            max={5}
                          />
                        </FormControl>
                      </FormField>

                      <FormField>
                        <FormLabel>How likely are you to recommend us?</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Slider
                              value={formStates.survey?.recommendation || 5}
                              onChange={(value) => updateFormState('survey', 'recommendation', value)}
                              max={10}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-mw-gray-500">
                              <span>Not likely</span>
                              <span>{formStates.survey?.recommendation || 5}/10</span>
                              <span>Very likely</span>
                            </div>
                          </div>
                        </FormControl>
                      </FormField>

                      <FormField>
                        <FormLabel>How did you hear about us?</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {['Search Engine', 'Social Media', 'Friend/Colleague', 'Advertisement', 'Other'].map((option) => (
                              <div key={option} className="flex items-center space-x-2">
                                <Radio 
                                  name="hearAbout"
                                  value={option}
                                  checked={formStates.survey?.hearAbout === option}
                                  onChange={() => updateFormState('survey', 'hearAbout', option)}
                                />
                                <label className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                      </FormField>
                    </div>

                    <div className="space-y-4">
                      <FormField>
                        <FormLabel>What features do you use most?</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {['Dashboard', 'Reports', 'Integrations', 'Mobile App', 'API'].map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`feature-${feature}`}
                                  checked={formStates.survey?.features?.includes(feature) || false}
                                  onChange={(e) => {
                                    const current = formStates.survey?.features || []
                                    const updated = e.target.checked 
                                      ? [...current, feature]
                                      : current.filter((item: string) => item !== feature)
                                    updateFormState('survey', 'features', updated)
                                  }}
                                />
                                <label htmlFor={`feature-${feature}`} className="text-sm text-mw-gray-700 dark:text-mw-gray-300">
                                  {feature}
                                </label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                      </FormField>

                      <FormField>
                        <FormLabel>Additional comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what we can improve..."
                            rows={4}
                            value={formStates.survey?.comments || ''}
                            onChange={(e) => updateFormState('survey', 'comments', e.target.value)}
                          />
                        </FormControl>
                      </FormField>
                    </div>
                  </div>

                  <FormActions>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting.survey}
                    >
                      {isSubmitting.survey ? 'Submitting...' : 'Submit Survey'}
                    </Button>
                  </FormActions>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile & Settings */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Profile */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    User Profile
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Manage your personal information
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <Avatar size="lg" />
                    <div>
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">
                        Profile Picture
                      </h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload new
                      </Button>
                    </div>
                  </div>

                  <Form onSubmit={(e) => handleSubmit('profile', formStates.profile || {})}>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField>
                        <FormLabel htmlFor="profile-firstname">First Name</FormLabel>
                        <FormControl>
                          <Input
                            id="profile-firstname"
                            value={formStates.profile?.firstName || 'John'}
                            onChange={(e) => updateFormState('profile', 'firstName', e.target.value)}
                          />
                        </FormControl>
                      </FormField>

                      <FormField>
                        <FormLabel htmlFor="profile-lastname">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            id="profile-lastname"
                            value={formStates.profile?.lastName || 'Doe'}
                            onChange={(e) => updateFormState('profile', 'lastName', e.target.value)}
                          />
                        </FormControl>
                      </FormField>
                    </div>

                    <FormField>
                      <FormLabel htmlFor="profile-email">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          id="profile-email"
                          type="email"
                          value={formStates.profile?.email || 'john.doe@company.com'}
                          onChange={(e) => updateFormState('profile', 'email', e.target.value)}
                        />
                      </FormControl>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="profile-phone">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          id="profile-phone"
                          type="tel"
                          value={formStates.profile?.phone || '+1 (555) 123-4567'}
                          onChange={(e) => updateFormState('profile', 'phone', e.target.value)}
                        />
                      </FormControl>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="profile-bio">Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          id="profile-bio"
                          placeholder="Tell us about yourself..."
                          rows={3}
                          value={formStates.profile?.bio || ''}
                          onChange={(e) => updateFormState('profile', 'bio', e.target.value)}
                        />
                      </FormControl>
                    </FormField>

                    <FormActions>
                      <Button type="submit" disabled={isSubmitting.profile}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSubmitting.profile ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button variant="outline">Cancel</Button>
                    </FormActions>
                  </Form>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Account Settings
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Manage your account preferences
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        Receive email about your account activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">
                        Marketing Emails
                      </h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        Receive emails about new features and updates
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">
                        Data Export
                      </h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                        Download a copy of your data
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="border-t border-mw-gray-200 dark:border-mw-gray-700 pt-6">
                  <h4 className="font-medium text-red-600 mb-2">Danger Zone</h4>
                  <div className="space-y-3">
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Forms */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    File Upload Form
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Document submission with validation
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('upload', formStates.upload || {})}>
                  <FormField>
                    <FormLabel>Document Type</FormLabel>
                    <FormControl>
                      <Select
                        options={[
                          { value: 'resume', label: 'Resume/CV' },
                          { value: 'portfolio', label: 'Portfolio' },
                          { value: 'certificate', label: 'Certificate' },
                          { value: 'other', label: 'Other' }
                        ]}
                        value={formStates.upload?.documentType || ''}
                        onChange={(e) => updateFormState('upload', 'documentType', e.target.value)}
                        placeholder="Select document type"
                      />
                    </FormControl>
                  </FormField>

                      <FormField>
                        <FormLabel>Upload Files</FormLabel>
                        <FormControl>
                          <FileUpload
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            maxSize={5 * 1024 * 1024} // 5MB
                            multiple
                            onFilesChange={(files: File[]) => updateFormState('upload', 'files', files)}
                          />
                        </FormControl>
                        <FormDescription>
                          Accepted formats: PDF, DOC, DOCX, JPG, PNG. Max size: 5MB per file.
                        </FormDescription>
                      </FormField>                  <FormField>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the documents..."
                        rows={3}
                        value={formStates.upload?.description || ''}
                        onChange={(e) => updateFormState('upload', 'description', e.target.value)}
                      />
                    </FormControl>
                  </FormField>

                  <FormActions>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting.upload}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isSubmitting.upload ? 'Uploading...' : 'Submit Documents'}
                    </Button>
                  </FormActions>
                </Form>
              </CardContent>
            </Card>

            {/* Dynamic Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-mw-primary-600" />
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                    Dynamic Form
                  </h3>
                </div>
                <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Form with conditional fields
                </p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => handleSubmit('dynamic', formStates.dynamic || {})}>
                  <FormField>
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <Select
                        options={[
                          { value: 'personal', label: 'Personal' },
                          { value: 'business', label: 'Business' },
                          { value: 'enterprise', label: 'Enterprise' }
                        ]}
                        value={formStates.dynamic?.accountType || ''}
                        onChange={(e) => updateFormState('dynamic', 'accountType', e.target.value)}
                        placeholder="Select account type"
                      />
                    </FormControl>
                  </FormField>

                  {formStates.dynamic?.accountType === 'business' && (
                    <>
                      <FormField>
                        <FormLabel>Company Name</FormLabel>
                        <Input
                          placeholder="Your company name"
                          value={formStates.dynamic?.companyName || ''}
                          onChange={(e) => updateFormState('dynamic', 'companyName', e.target.value)}
                        />
                      </FormField>

                      <FormField>
                        <FormLabel>Tax ID</FormLabel>
                        <Input
                          placeholder="Tax identification number"
                          value={formStates.dynamic?.taxId || ''}
                          onChange={(e) => updateFormState('dynamic', 'taxId', e.target.value)}
                        />
                      </FormField>
                    </>
                  )}

                  {formStates.dynamic?.accountType === 'enterprise' && (
                    <>
                      <FormField>
                        <FormLabel>Enterprise ID</FormLabel>
                        <Input
                          placeholder="Enterprise identification"
                          value={formStates.dynamic?.enterpriseId || ''}
                          onChange={(e) => updateFormState('dynamic', 'enterpriseId', e.target.value)}
                        />
                      </FormField>

                      <FormField>
                        <FormLabel>Annual Revenue</FormLabel>
                        <Select
                          options={[
                            { value: '1m-10m', label: '$1M - $10M' },
                            { value: '10m-100m', label: '$10M - $100M' },
                            { value: '100m+', label: '$100M+' }
                          ]}
                          value={formStates.dynamic?.revenue || ''}
                          onChange={(e) => updateFormState('dynamic', 'revenue', e.target.value)}
                          placeholder="Select revenue range"
                        />
                      </FormField>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="dedicated-support"
                          checked={formStates.dynamic?.dedicatedSupport || false}
                          onChange={(e) => updateFormState('dynamic', 'dedicatedSupport', e.target.checked)}
                        />
                        <label htmlFor="dedicated-support" className="text-sm">
                          Request dedicated support manager
                        </label>
                      </div>
                    </>
                  )}

                  <FormActions>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting.dynamic}
                    >
                      {isSubmitting.dynamic ? 'Creating...' : 'Create Account'}
                    </Button>
                  </FormActions>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Success Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center space-y-4 p-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
            Form Submitted Successfully!
          </h2>
          <p className="text-mw-gray-600 dark:text-mw-gray-400">
            Thank you for your submission. We'll get back to you soon.
          </p>
          <Button onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )
}
