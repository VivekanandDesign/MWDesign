'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Alert'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { Spinner, Loading } from '@/components/ui/Spinner'
import { 
  MWLoader, 
  MWDotsLoader, 
  MWProgressiveLoader,
  MWHeartbeatLoader,
  MWMatrixLoader,
  MWBounceLoader
} from '@/components/ui/MWLoader'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion'
import { Tooltip } from '@/components/ui/Tooltip'
import { Checkbox, Radio } from '@/components/ui/Checkbox'
import { Select } from '@/components/ui/Select'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown'
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@/components/ui/Breadcrumb'
import { Pagination } from '@/components/ui/Pagination'
import { Switch } from '@/components/ui/Switch'
import { Textarea } from '@/components/ui/Textarea'
import { Slider } from '@/components/ui/Slider'
import { Progress } from '@/components/ui/Progress'
import { Separator } from '@/components/ui/Separator'
import { Skeleton } from '@/components/ui/Skeleton'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Rating } from '@/components/ui/Rating'
import { DatePicker } from '@/components/ui/DatePicker'
import { ToastProvider, useToast } from '@/components/ui/Toast'
import { Command, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/Command'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/Dialog'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover'
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/Sheet'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/Collapsible'
import { CollapsibleCode } from '@/components/ui/CollapsibleCode'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup'
import { EmptyState, NoDataEmptyState, NoResultsEmptyState } from '@/components/ui/EmptyState'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Chip, Tag } from '@/components/ui/Chip'
import { Stepper } from '@/components/ui/Stepper'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { Menu, MenuItem, MenuSeparator, MenuGroup, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem } from '@/components/ui/Menu'
// New component imports
import { Icon, SearchIcon, CloseIcon, CheckIcon } from '@/components/ui/Icon'
import { List, ListItem, DescriptionList, NavigationList } from '@/components/ui/List'
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger } from '@/components/ui/Sidebar'
import { Form, FormSection, FormGroup, FormField, FormLabel, FormControl, FormDescription, FormError, FormActions, Fieldset } from '@/components/ui/Form'
import { FileUpload } from '@/components/ui/FileUpload'
import { SearchBar, SearchResults } from '@/components/ui/SearchBar'
import { Autocomplete } from '@/components/ui/Autocomplete'
import { TimePicker } from '@/components/ui/TimePicker'
import { TreeView } from '@/components/ui/TreeView'
import { Carousel, CarouselSlide, ImageCarousel } from '@/components/ui/Carousel'
import { Notification, NotificationList, NotificationBadge, NotificationBell } from '@/components/ui/Notification'
import { SnackbarProvider, useSnackbar } from '@/components/ui/Snackbar'
import { Container, ResponsiveContainer, GridContainer, FlexContainer, Stack, HStack } from '@/components/ui/Container'
import { PanelGroup, Panel, PanelResizer, PanelHeader, SplitPanel, StackPanel, SidebarPanel } from '@/components/ui/Panel'
// Additional new components
import { RichTextEditor } from '@/components/ui/RichTextEditor'
import { DocumentEditor } from '@/components/ui/DocumentEditor'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { TimeRangePicker } from '@/components/ui/TimeRangePicker'
import { Filter } from '@/components/ui/Filter'
import type { FilterField } from '@/components/ui/Filter'
import { Thumbnail, VideoThumbnail, ImageThumbnail, ThumbnailGallery } from '@/components/ui/Thumbnail'
import { DragDrop, SortableList, useDragDrop } from '@/components/ui/DragDrop'
import { SwitchGroup } from '@/components/ui/Switch'
import { Calendar } from '@/components/ui/Calendar'
import { DataGrid } from '@/components/ui/DataGrid'
import { AdvancedTable } from '@/components/ui/AdvancedTable'
import { Copy, Check, Search, ChevronRight, ChevronDown, Code, Settings, User, Home } from 'lucide-react'

const componentCategories = [
  { 
    id: 'form', 
    name: 'Form Controls', 
    description: 'Interactive form elements',
    components: [
      { id: 'button', name: 'Button', description: 'Interactive elements for actions' },
      { id: 'input', name: 'Input', description: 'Text input controls' },
      { id: 'textarea', name: 'Textarea', description: 'Multi-line text input' },
      { id: 'checkbox', name: 'Checkbox & Radio', description: 'Selection controls' },
      { id: 'switch', name: 'Switch', description: 'Toggle switches' },
      { id: 'select', name: 'Select', description: 'Dropdown selection' },
      { id: 'slider', name: 'Slider', description: 'Range input controls' },
      { id: 'datepicker', name: 'Date Picker', description: 'Date selection' },
      { id: 'daterangepicker', name: 'Date Range Picker', description: 'Date range selection' },
      { id: 'timepicker', name: 'Time Picker', description: 'Time selection controls' },
      { id: 'timerangepicker', name: 'Time Range Picker', description: 'Time range selection' },
      { id: 'rating', name: 'Rating', description: 'Star rating input' },
      { id: 'togglegroup', name: 'Toggle Group', description: 'Multiple choice selection' },
      { id: 'form', name: 'Form', description: 'Form layout and structure' },
      { id: 'fileupload', name: 'File Upload', description: 'File upload with drag-drop' },
      { id: 'dragdrop', name: 'Drag & Drop', description: 'Advanced drag and drop interface' },
      { id: 'searchbar', name: 'Search Bar', description: 'Search input with suggestions' },
      { id: 'autocomplete', name: 'Autocomplete', description: 'Enhanced select with search' },
      { id: 'richtexteditor', name: 'Rich Text Editor', description: 'WYSIWYG text editor' },
      { id: 'documenteditor', name: 'Document Editor', description: 'Advanced document editing' },
      { id: 'filter', name: 'Filter', description: 'Advanced filtering interface' },
    ]
  },
  { 
    id: 'display', 
    name: 'Display', 
    description: 'Content presentation components',
    components: [
      { id: 'card', name: 'Card', description: 'Flexible content containers' },
      { id: 'badge', name: 'Badge', description: 'Status and label indicators' },
      { id: 'chip', name: 'Chip', description: 'Interactive tags and labels' },
      { id: 'alert', name: 'Alert', description: 'Contextual feedback messages' },
      { id: 'avatar', name: 'Avatar', description: 'User profile images' },
      { id: 'progress', name: 'Progress', description: 'Progress indicators' },
      { id: 'skeleton', name: 'Skeleton', description: 'Loading placeholders' },
      { id: 'separator', name: 'Separator', description: 'Content dividers' },
      { id: 'table', name: 'Table', description: 'Data tables' },
      { id: 'emptystate', name: 'Empty State', description: 'No data placeholders' },
      { id: 'icon', name: 'Icon', description: 'Icon system with presets' },
      { id: 'list', name: 'List', description: 'Data display lists' },
      { id: 'calendar', name: 'Calendar', description: 'Calendar with events' },
      { id: 'datagrid', name: 'Data Grid', description: 'Advanced data tables' },
      { id: 'advancedtable', name: 'Advanced Table', description: 'Comprehensive table with 50+ features' },
      { id: 'carousel', name: 'Carousel', description: 'Image and content carousels' },
      { id: 'treeview', name: 'Tree View', description: 'Hierarchical data display' },
      { id: 'thumbnail', name: 'Thumbnail', description: 'Media preview components' },
    ]
  },
  { 
    id: 'feedback', 
    name: 'Feedback', 
    description: 'User feedback components',
    components: [
      { id: 'spinner', name: 'Spinner & Loading', description: 'Loading indicators' },
      { id: 'toast', name: 'Toast', description: 'Notification messages' },
      { id: 'notification', name: 'Notification', description: 'System notifications' },
      { id: 'snackbar', name: 'Snackbar', description: 'Toast notifications with animations' },
    ]
  },
  { 
    id: 'layout', 
    name: 'Layout', 
    description: 'Content organization components',
    components: [
      { id: 'tabs', name: 'Tabs', description: 'Tabbed interfaces' },
      { id: 'accordion', name: 'Accordion', description: 'Collapsible content' },
      { id: 'collapsible', name: 'Collapsible', description: 'Simple collapsible content' },
      { id: 'scrollarea', name: 'Scroll Area', description: 'Custom scrollable areas' },
      { id: 'stepper', name: 'Stepper', description: 'Step-by-step processes' },
      { id: 'timeline', name: 'Timeline', description: 'Chronological event display' },
      { id: 'container', name: 'Container', description: 'Layout containers' },
      { id: 'panel', name: 'Panel', description: 'Resizable panels with splitters' },
    ]
  },
  { 
    id: 'navigation', 
    name: 'Navigation', 
    description: 'Navigation components',
    components: [
      { id: 'breadcrumb', name: 'Breadcrumb', description: 'Navigation trails' },
      { id: 'pagination', name: 'Pagination', description: 'Page navigation' },
      { id: 'menu', name: 'Menu', description: 'Context menus and navigation' },
      { id: 'sidebar', name: 'Sidebar', description: 'Navigation sidebar' },
    ]
  },
  { 
    id: 'overlay', 
    name: 'Overlay', 
    description: 'Modal and popup components',
    components: [
      { id: 'modal', name: 'Modal', description: 'Dialog overlays' },
      { id: 'dialog', name: 'Dialog', description: 'Flexible dialog system' },
      { id: 'sheet', name: 'Sheet', description: 'Side panel drawers' },
      { id: 'popover', name: 'Popover', description: 'Contextual popups' },
      { id: 'dropdown', name: 'Dropdown', description: 'Dropdown menus' },
      { id: 'tooltip', name: 'Tooltip', description: 'Contextual help' },
    ]
  },
  { 
    id: 'utility', 
    name: 'Utility', 
    description: 'Utility and helper components',
    components: [
      { id: 'command', name: 'Command', description: 'Search and command palette' },
      { id: 'collapsiblecode', name: 'Collapsible Code', description: 'Collapsible code blocks with copy functionality' },
    ]
  },
]

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = code
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
      }
    }
  }

  return (
    <div className="relative">
      {/* Toggle Button */}
      <div className="mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-mw-blue-600 dark:text-mw-blue-400 hover:text-mw-blue-700 dark:hover:text-mw-blue-300 transition-colors duration-200"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <Code className="h-4 w-4" />
          <span>{isExpanded ? 'Hide Code' : 'Show Code'}</span>
        </button>
      </div>

      {/* Code Block */}
      {isExpanded && (
        <div className="relative">
          <pre className="bg-mw-gray-900 text-mw-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
          <button
            onClick={copyCode}
            className="absolute top-2 right-2 p-2 rounded-md bg-mw-gray-800 hover:bg-mw-gray-700 text-mw-gray-300 hover:text-white transition-colors duration-200"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  )
}

function ComponentShowcase({ title, description, preview, code }: {
  title: string
  description: string
  preview: React.ReactNode
  code: string
}) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-mw-gray-600 dark:text-mw-gray-300">
          {description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Preview */}
          <div>
            <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-3">
              Preview
            </h4>
            <div className="p-6 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg bg-mw-gray-50 dark:bg-mw-gray-800/50">
              {preview}
            </div>
          </div>
          
          {/* Code */}
          <div>
            <h4 className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300 mb-3">
              Code
            </h4>
            <CodeBlock code={code} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper components for interactive examples
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <h2 className="text-lg font-semibold">Example Modal</h2>
        </ModalHeader>
        <ModalBody>
          <p>This is an example modal dialog. You can put any content here.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1)
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
      showFirstLast={true}
      showPrevNext={true}
      siblingCount={1}
    />
  )
}

function ToastExample() {
  const { addToast } = useToast()
  
  return (
    <div className="space-x-2">
      <Button 
        onClick={() => addToast({
          title: 'Success!',
          description: 'Your action was completed successfully.',
          variant: 'success'
        })}
      >
        Show Success Toast
      </Button>
      <Button 
        variant="outline"
        onClick={() => addToast({
          title: 'Warning',
          description: 'Please review your settings.',
          variant: 'warning'
        })}
      >
        Show Warning Toast
      </Button>
    </div>
  )
}

function CommandExample() {
  const [value, setValue] = useState('')
  
  const items = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'settings', label: 'Settings' },
    { value: 'profile', label: 'Profile' },
    { value: 'logout', label: 'Logout' }
  ]
  
  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(value.toLowerCase())
  )
  
  return (
    <Command value={value} onValueChange={setValue}>
      <CommandGroup>
        {filteredItems.map(item => (
          <CommandItem
            key={item.value}
            value={item.value}
            onSelect={() => console.log('Selected:', item.label)}
          >
            {item.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  )
}

export default function ComponentsPage() {
  return (
    <ToastProvider>
      <ComponentsPageContent />
    </ToastProvider>
  )
}

function ComponentsPageContent() {
  const [activeComponent, setActiveComponent] = useState('button')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter components based on search
  const filteredCategories = componentCategories.map(category => ({
    ...category,
    components: category.components.filter(component => 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.components.length > 0)

  const renderComponentContent = () => {
    switch(activeComponent) {
      case 'button':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Button
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Interactive elements showcasing MW brand colors, spacing tokens, and accessibility features.
              </p>
            </div>
            
            <ComponentShowcase
              title="MW Brand Color Variants"
              description="Primary action buttons using Energy Blue, Breakthrough Orange, and Flow Teal brand colors"
              preview={
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">Energy Blue</Button>
                  <Button variant="secondary" className="bg-orange-500 hover:bg-orange-600 text-white">Breakthrough Orange</Button>
                  <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">Flow Teal</Button>
                  <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">Ghost Energy</Button>
                </div>
              }
              code={`<!-- MW Energy Blue (Primary) -->
<Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
  Energy Blue
</Button>

<!-- MW Breakthrough Orange (Secondary) -->
<Button variant="secondary" className="bg-orange-500 hover:bg-orange-600 text-white">
  Breakthrough Orange  
</Button>

<!-- MW Flow Teal (Outline) -->
<Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
  Flow Teal
</Button>`}
            />

            <ComponentShowcase
              title="Semantic Color System"
              description="Action buttons using semantic colors with proper contrast ratios for accessibility"
              preview={
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" className="bg-green-600 hover:bg-green-700 text-white">Success Action</Button>
                  <Button variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">Warning Action</Button>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">Danger Action</Button>
                  <Button variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50">Info Action</Button>
                </div>
              }
              code={`<!-- Success (Green) -->
<Button className="bg-green-600 hover:bg-green-700 text-white">Success Action</Button>

<!-- Warning (Yellow) -->  
<Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Warning Action</Button>

<!-- Danger (Red) -->
<Button className="bg-red-600 hover:bg-red-700 text-white">Danger Action</Button>

<!-- Info (Cyan) -->
<Button className="border-cyan-500 text-cyan-600 hover:bg-cyan-50">Info Action</Button>`}
            />

            <ComponentShowcase
              title="Spacing & Size Tokens"
              description="Button sizes using 4pt grid spacing system for consistent vertical rhythm"
              preview={
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm" className="px-3 py-1.5 text-sm">Small (12px padding)</Button>
                  <Button size="md" className="px-4 py-2 text-base">Medium (16px padding)</Button>
                  <Button size="lg" className="px-6 py-3 text-lg">Large (24px padding)</Button>
                  <Button className="px-8 py-4 text-xl">XLarge (32px padding)</Button>
                </div>
              }
              code={`<!-- 4pt Grid Spacing System -->
<Button size="sm" className="px-3 py-1.5">Small (12px padding)</Button>
<Button size="md" className="px-4 py-2">Medium (16px padding)</Button> 
<Button size="lg" className="px-6 py-3">Large (24px padding)</Button>
<Button size="xl" className="px-8 py-4">XLarge (32px padding)</Button>`}
            />

            <ComponentShowcase
              title="Focus Ring & Accessibility"
              description="WCAG-compliant focus indicators with MW color system and keyboard navigation"
              preview={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 text-white">Energy Blue Focus</Button>
                    <Button className="focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 bg-orange-500 text-white">Orange Focus</Button>
                    <Button className="focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 border border-teal-500 text-teal-600">Teal Focus</Button>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      <strong>Accessibility:</strong> All buttons include 2px focus rings with 2px offset for WCAG AA compliance. 
                      Tab through buttons to see focus indicators.
                    </p>
                  </div>
                </div>
              }
              code={`<!-- Focus Ring System -->
<Button className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Energy Blue Focus
</Button>

<Button className="focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
  Orange Focus  
</Button>

<!-- WCAG AA Compliant Focus Rings -->
.btn-focus {
  @apply focus:ring-2 focus:ring-offset-2 focus:outline-none;
}`}
            />

            <ComponentShowcase
              title="Button Sizes"
              description="Different button sizes for various contexts"
              preview={
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              }
              code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
            />

            <ComponentShowcase
              title="Button States"
              description="Interactive states and disabled buttons"
              preview={
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Normal</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="outline">Hover me</Button>
                </div>
              }
              code={`<Button variant="primary">Normal</Button>
<Button variant="primary" disabled>Disabled</Button>
<Button variant="outline">Hover me</Button>`}
            />
          </div>
        )

      case 'input':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Input
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Form controls showcasing MW brand colors, focus ring system, and 4pt grid spacing.
              </p>
            </div>
            
            <ComponentShowcase
              title="MW Focus Ring System"
              description="Inputs demonstrating the comprehensive WCAG-compliant focus ring system"
              preview={
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <Input 
                      label="Energy Blue Focus" 
                      placeholder="Click to see Energy Blue focus ring"
                      className="focus:ring-blue-600 focus:border-blue-600"
                    />
                    <p className="text-xs text-mw-gray-500">MW Energy Blue (#1d65af) focus state</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Input 
                      label="Breakthrough Orange Focus" 
                      placeholder="Click to see Breakthrough Orange focus"
                      className="focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-xs text-mw-gray-500">MW Breakthrough Orange focus state</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Input 
                      label="Flow Teal Focus" 
                      placeholder="Click to see Flow Teal focus ring"
                      className="focus:ring-teal-500 focus:border-teal-500"
                    />
                    <p className="text-xs text-mw-gray-500">MW Flow Teal focus state</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Input 
                      label="Standard Focus Ring" 
                      placeholder="Default MW focus experience"
                      className="focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    />
                    <p className="text-xs text-mw-gray-500">WCAG-compliant 2px ring with offset</p>
                  </div>
                </div>
              }
              code={`<!-- MW Focus Ring System -->
<Input 
  className="focus:ring-blue-600 focus:border-blue-600"
  placeholder="Energy Blue focus ring"
/>

<Input 
  className="focus:ring-orange-500 focus:border-orange-500"
  placeholder="Breakthrough Orange focus"
/>

<Input 
  className="focus:ring-teal-500 focus:border-teal-500"
  placeholder="Flow Teal focus ring"
/>

<Input 
  className="focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
  placeholder="WCAG-compliant focus ring"
/>`}
            />

            <ComponentShowcase
              title="Semantic State Colors"
              description="Inputs using MW semantic color system for different validation states"
              preview={
                <div className="space-y-4 max-w-md">
                  <Input 
                    label="Success State" 
                    placeholder="Valid input"
                    className="border-green-600 focus:ring-green-600"
                    helpText="✓ This field meets all requirements"
                  />
                  
                  <Input 
                    label="Warning State" 
                    placeholder="Input with warning"
                    className="border-yellow-500 focus:ring-yellow-500"
                    helpText="⚠ This field needs attention"
                  />
                  
                  <Input 
                    label="Error State" 
                    placeholder="Invalid input"
                    className="border-red-600 focus:ring-red-600"
                    error="✗ This field contains errors"
                  />
                  
                  <Input 
                    label="Info State" 
                    placeholder="Information provided"
                    className="border-blue-500 focus:ring-blue-500"
                    helpText="ℹ Additional information available"
                  />
                </div>
              }
              code={`<!-- MW Semantic State Colors -->
<Input 
  className="border-green-600 focus:ring-green-600"
  helpText="✓ Success - MW Green (#2d7d32)"
/>

<Input 
  className="border-yellow-500 focus:ring-yellow-500"
  helpText="⚠ Warning - MW Orange (#f9a825)"
/>

<Input 
  className="border-red-600 focus:ring-red-600"
  error="✗ Error - MW Red (#d63535)"
/>

<Input 
  className="border-blue-500 focus:ring-blue-500"
  helpText="ℹ Info - MW Info Blue (#0188d1)"
/>`}
            />

            <ComponentShowcase
              title="4pt Grid Sizing System"
              description="Input fields demonstrating the 4pt grid sizing and spacing system"
              preview={
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Small (32px height)
                    </label>
                    <Input 
                      placeholder="Compact input for dense layouts"
                      className="h-8 px-3 text-sm"
                    />
                    <p className="text-xs text-mw-gray-500">8px padding, 32px total height</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Medium (40px height - MW Default)
                    </label>
                    <Input 
                      placeholder="Standard MW input field"
                      className="h-10 px-4"
                    />
                    <p className="text-xs text-mw-gray-500">16px padding, 40px total height</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Large (48px height)
                    </label>
                    <Input 
                      placeholder="Comfortable input for important forms"
                      className="h-12 px-4 text-lg"
                    />
                    <p className="text-xs text-mw-gray-500">16px padding, 48px total height</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                      Extra Large (56px height)
                    </label>
                    <Input 
                      placeholder="Prominent input for hero sections"
                      className="h-14 px-6 text-lg"
                    />
                    <p className="text-xs text-mw-gray-500">24px padding, 56px total height</p>
                  </div>
                </div>
              }
              code={`<!-- 4pt Grid Sizing System -->
<Input 
  className="h-8 px-3 text-sm"
  placeholder="Small (32px) - Compact layouts"
/>

<Input 
  className="h-10 px-4"
  placeholder="Medium (40px) - MW Default"
/>

<Input 
  className="h-12 px-4 text-lg"
  placeholder="Large (48px) - Important forms"
/>

<Input 
  className="h-14 px-6 text-lg"
  placeholder="XL (56px) - Hero sections"
/>`}
            />

            <ComponentShowcase
              title="MW Typography Integration"
              description="Input labels and help text using MW typography scale and brand colors"
              preview={
                <div className="space-y-6 max-w-md">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-4">Energy Blue Section</h3>
                    <Input 
                      label="Primary Input Field"
                      placeholder="Main action input"
                      className="focus:ring-blue-600 focus:border-blue-600"
                      helpText="Using MW Energy Blue for primary actions"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-orange-500 mb-3">Breakthrough Orange Section</h4>
                    <Input 
                      label="Secondary Input Field"
                      placeholder="Achievement tracking input"
                      className="focus:ring-orange-500 focus:border-orange-500"
                      helpText="Using MW Breakthrough Orange for progress tracking"
                    />
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-medium text-teal-500 mb-2">Flow Teal Section</h5>
                    <Input 
                      label="Workflow Input Field"
                      placeholder="Process management input"
                      className="focus:ring-teal-500 focus:border-teal-500"
                      helpText="Using MW Flow Teal for seamless workflows"
                    />
                  </div>
                </div>
              }
              code={`<!-- MW Typography Integration -->
<h3 className="text-2xl font-bold text-blue-600">
  Energy Blue Section
</h3>
<Input 
  label="Primary Input Field"
  className="focus:ring-blue-600 focus:border-blue-600"
  helpText="Using MW Energy Blue for primary actions"
/>

<h4 className="text-xl font-semibold text-orange-500">
  Breakthrough Orange Section
</h4>
<Input 
  label="Secondary Input Field"
  className="focus:ring-orange-500 focus:border-orange-500"
  helpText="Using MW Breakthrough Orange for progress"
/>

<h5 className="text-lg font-medium text-teal-500">
  Flow Teal Section
</h5>
<Input 
  label="Workflow Input Field"
  className="focus:ring-teal-500 focus:border-teal-500"
  helpText="Using MW Flow Teal for workflows"
/>`}
            />
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Checkbox & Radio
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Selection controls for forms with labels and descriptions.
              </p>
            </div>
            
            <ComponentShowcase
              title="Checkbox Examples"
              description="Checkbox controls with different states"
              preview={
                <div className="space-y-4 max-w-md">
                  <Checkbox
                    label="Accept terms and conditions"
                    description="By checking this box, you agree to our terms of service."
                  />
                  <Checkbox
                    label="Newsletter subscription"
                    error="This field is required"
                  />
                </div>
              }
              code={`<Checkbox
  label="Accept terms and conditions"
  description="By checking this box, you agree to our terms."
/>
<Checkbox
  label="Newsletter subscription"
  error="This field is required"
/>`}
            />

            <ComponentShowcase
              title="Radio Button Group"
              description="Radio buttons for selecting one option from a group"
              preview={
                <div className="space-y-2 max-w-md">
                  <p className="text-sm font-medium text-mw-gray-700 dark:text-mw-gray-300">
                    Choose your plan:
                  </p>
                  <Radio name="plan" label="Basic" description="Free forever" />
                  <Radio name="plan" label="Pro" description="$10/month" />
                  <Radio name="plan" label="Enterprise" description="Contact us" />
                </div>
              }
              code={`<Radio name="plan" label="Basic" description="Free forever" />
<Radio name="plan" label="Pro" description="$10/month" />
<Radio name="plan" label="Enterprise" description="Contact us" />`}
            />
          </div>
        )

      case 'select':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Select
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Dropdown selection controls with options and validation.
              </p>
            </div>
            
            <ComponentShowcase
              title="Select Examples"
              description="Dropdown selects with different configurations"
              preview={
                <div className="space-y-4 max-w-md">
                  <Select
                    label="Country"
                    placeholder="Select your country"
                    description="Choose your country of residence"
                    options={[
                      { value: 'us', label: 'United States' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'uk', label: 'United Kingdom' },
                      { value: 'de', label: 'Germany' },
                      { value: 'fr', label: 'France' }
                    ]}
                  />
                  <Select
                    label="Priority"
                    error="Please select a priority level"
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                      { value: 'urgent', label: 'Urgent', disabled: true }
                    ]}
                  />
                </div>
              }
              code={`<Select
  label="Country"
  placeholder="Select your country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ]}
/>`}
            />
          </div>
        )

      case 'card':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Card
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Flexible content containers showcasing MW elevation system, 4pt grid spacing, and border radius tokens.
              </p>
            </div>
            
            <ComponentShowcase
              title="MW Elevation System"
              description="Cards demonstrating the complete elevation scale from flat to maximum depth"
              preview={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-none border-2 border-gray-200">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">None</h3>
                      <p className="text-mw-gray-600 dark:text-mw-gray-300">Flat design, disabled states</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-mw-gray-500">shadow-none - No elevation</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Small</h3>
                      <p className="text-mw-gray-600 dark:text-mw-gray-300">Subtle depth for small elements</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-mw-gray-500">shadow-sm - Input fields, small cards</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Medium</h3>
                      <p className="text-mw-gray-600 dark:text-mw-gray-300">Standard elevation for components</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-mw-gray-500">shadow-md - MW Default card elevation</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-lg">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Large</h3>
                      <p className="text-mw-gray-600 dark:text-mw-gray-300">Elevated components, hover states</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-mw-gray-500">shadow-lg - Dropdown menus, tooltips</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-xl">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">Extra Large</h3>
                      <p className="text-mw-gray-600 dark:text-mw-gray-300">High elevation for important elements</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-mw-gray-500">shadow-xl - Modals, important notifications</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-2xl">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">2X Large</h3>
                      <p className="text-mw-gray-600 dark:text-mw-gray-300">Maximum elevation for overlays</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-mw-gray-500">shadow-2xl - Modal overlays, dialogs</p>
                    </CardContent>
                  </Card>
                </div>
              }
              code={`<!-- MW Elevation System -->
<Card className="shadow-none">Flat design, disabled states</Card>
<Card className="shadow-sm">Subtle depth for small elements</Card>
<Card className="shadow-md">Standard elevation (MW Default)</Card>
<Card className="shadow-lg">Elevated components, hover states</Card>
<Card className="shadow-xl">High elevation for important elements</Card>
<Card className="shadow-2xl">Maximum elevation for overlays</Card>`}
            />

            <ComponentShowcase
              title="4pt Grid Spacing System"
              description="Cards demonstrating consistent spacing patterns using the 4pt grid system"
              preview={
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-2">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white mb-1">Compact (8px)</h4>
                      <p className="text-sm text-mw-gray-600">Dense layouts, mobile interfaces</p>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white mb-2">Standard (16px)</h4>
                      <p className="text-sm text-mw-gray-600">MW default spacing for cards</p>
                    </Card>
                    
                    <Card className="p-6">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white mb-3">Comfortable (24px)</h4>
                      <p className="text-sm text-mw-gray-600">Generous spacing for important content</p>
                    </Card>
                    
                    <Card className="p-8">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white mb-4">Spacious (32px)</h4>
                      <p className="text-sm text-mw-gray-600">Maximum spacing for hero sections</p>
                    </Card>
                  </div>
                </div>
              }
              code={`<!-- 4pt Grid Spacing System -->
<Card className="p-2">Compact (8px) - Dense layouts</Card>
<Card className="p-4">Standard (16px) - MW Default</Card>
<Card className="p-6">Comfortable (24px) - Generous spacing</Card>
<Card className="p-8">Spacious (32px) - Maximum spacing</Card>`}
            />

            <ComponentShowcase
              title="Border Radius Variations"
              description="Cards showing MW border radius tokens from sharp to fully rounded"
              preview={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="rounded-none shadow-md">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">Sharp (0px)</h4>
                      <p className="text-sm text-mw-gray-600">Modern, technical feel</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="rounded-md shadow-md">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">Medium (6px)</h4>
                      <p className="text-sm text-mw-gray-600">MW standard border radius</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="rounded-lg shadow-md">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">Large (8px)</h4>
                      <p className="text-sm text-mw-gray-600">Friendly, approachable design</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="rounded-2xl shadow-md">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-mw-gray-900 dark:text-white">2XL (16px)</h4>
                      <p className="text-sm text-mw-gray-600">Soft, premium appearance</p>
                    </CardContent>
                  </Card>
                </div>
              }
              code={`<!-- Border Radius Tokens -->
<Card className="rounded-none">Sharp (0px) - Technical</Card>
<Card className="rounded-md">Medium (6px) - MW Standard</Card>
<Card className="rounded-lg">Large (8px) - Friendly</Card>
<Card className="rounded-2xl">2XL (16px) - Premium</Card>`}
            />

            <ComponentShowcase
              title="MW Brand Color Accents"
              description="Cards with MW brand color accents and semantic color borders"
              preview={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-l-4 border-blue-600 shadow-md">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Energy Blue Feature</h3>
                      <p className="text-blue-700 dark:text-blue-300">Primary brand color accent</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-mw-gray-600">Using MW Energy Blue (#1d65af) for primary features and main actions.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-orange-500 shadow-md">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Breakthrough Orange</h3>
                      <p className="text-orange-700 dark:text-orange-300">Secondary brand color accent</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-mw-gray-600">Using MW Breakthrough Orange (#4cb0e4) for momentum and achievements.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-teal-500 shadow-md">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Flow Teal Accent</h3>
                      <p className="text-teal-700 dark:text-teal-300">Tertiary brand color accent</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-mw-gray-600">Using MW Flow Teal for seamless experiences and smooth processes.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-green-600 shadow-md">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Success State</h3>
                      <p className="text-green-700 dark:text-green-300">Semantic success color</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-mw-gray-600">Using MW Success Green (#2d7d32) for positive outcomes and completions.</p>
                    </CardContent>
                  </Card>
                </div>
              }
              code={`<!-- MW Brand Color Accents -->
<Card className="border-l-4 border-blue-600">
  Energy Blue Feature (#1d65af)
</Card>

<Card className="border-l-4 border-orange-500">
  Breakthrough Orange (#4cb0e4)
</Card>

<Card className="border-l-4 border-teal-500">
  Flow Teal Accent
</Card>

<Card className="border-l-4 border-green-600">
  Success State (#2d7d32)
</Card>`}
            />
          </div>
        )

      case 'badge':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Badge
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Status indicators and labels showcasing MW color system, border radius tokens, and 4pt grid spacing.
              </p>
            </div>
            
            <ComponentShowcase
              title="MW Brand Color Badges"
              description="Badges using Energy Blue, Breakthrough Orange, Flow Teal, and semantic colors"
              preview={
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-blue-600 text-white">Energy Blue</Badge>
                  <Badge className="bg-orange-500 text-white">Breakthrough Orange</Badge>
                  <Badge className="bg-teal-500 text-white">Flow Teal</Badge>
                  <Badge variant="success" className="bg-green-600 text-white">Success Green</Badge>
                  <Badge variant="warning" className="bg-yellow-500 text-white">Warning Orange</Badge>
                  <Badge variant="error" className="bg-red-600 text-white">Danger Red</Badge>
                  <Badge className="bg-cyan-500 text-white">Info Blue</Badge>
                </div>
              }
              code={`<!-- MW Brand Colors -->
<Badge className="bg-blue-600 text-white">Energy Blue</Badge>
<Badge className="bg-orange-500 text-white">Breakthrough Orange</Badge>
<Badge className="bg-teal-500 text-white">Flow Teal</Badge>

<!-- MW Semantic Colors -->
<Badge className="bg-green-600 text-white">Success Green</Badge>
<Badge className="bg-yellow-500 text-white">Warning Orange</Badge>
<Badge className="bg-red-600 text-white">Danger Red</Badge>
<Badge className="bg-cyan-500 text-white">Info Blue</Badge>`}
            />

            <ComponentShowcase
              title="Border Radius Token System"
              description="Badges demonstrating MW border radius tokens from sharp to fully rounded"
              preview={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Badge className="rounded-none bg-gray-600 text-white">None (0px)</Badge>
                    <Badge className="rounded-sm bg-blue-600 text-white">Small (4px)</Badge>
                    <Badge className="rounded-md bg-orange-500 text-white">Medium (6px)</Badge>
                    <Badge className="rounded-lg bg-teal-500 text-white">Large (8px)</Badge>
                    <Badge className="rounded-xl bg-green-600 text-white">XL (12px)</Badge>
                    <Badge className="rounded-2xl bg-purple-600 text-white">2XL (16px)</Badge>
                    <Badge className="rounded-full bg-pink-600 text-white">Full (9999px)</Badge>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-md">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <strong>MW Standard:</strong> Medium (6px) is our default border radius. 
                      Use Full for pill-shaped badges and indicators.
                    </p>
                  </div>
                </div>
              }
              code={`<!-- Border Radius Tokens -->
<Badge className="rounded-none">None (0px)</Badge>
<Badge className="rounded-sm">Small (4px)</Badge>
<Badge className="rounded-md">Medium (6px) - MW Default</Badge>
<Badge className="rounded-lg">Large (8px)</Badge>
<Badge className="rounded-xl">XL (12px)</Badge>
<Badge className="rounded-2xl">2XL (16px)</Badge>
<Badge className="rounded-full">Full (9999px) - Pills</Badge>`}
            />

            <ComponentShowcase
              title="4pt Grid Spacing System"
              description="Badge sizes and padding using consistent 4pt grid spacing tokens"
              preview={
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-mw-gray-900 dark:text-white">Size Variations</h4>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge size="sm" className="px-2 py-0.5 text-xs bg-blue-600 text-white">Small (8px/2px)</Badge>
                      <Badge size="md" className="px-3 py-1 text-sm bg-orange-500 text-white">Medium (12px/4px)</Badge>
                      <Badge size="lg" className="px-4 py-1.5 text-base bg-teal-500 text-white">Large (16px/6px)</Badge>
                      <Badge className="px-5 py-2 text-lg bg-green-600 text-white">XLarge (20px/8px)</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-mw-gray-900 dark:text-white">Spacing Examples</h4>
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <Badge className="bg-gray-500 text-white">Tight (4px)</Badge>
                        <Badge className="bg-gray-500 text-white">Spacing</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-600 text-white">Standard (8px)</Badge>
                        <Badge className="bg-blue-600 text-white">Spacing</Badge>
                      </div>
                      <div className="flex gap-4">
                        <Badge className="bg-orange-500 text-white">Comfortable (16px)</Badge>
                        <Badge className="bg-orange-500 text-white">Spacing</Badge>
                      </div>
                      <div className="flex gap-6">
                        <Badge className="bg-teal-500 text-white">Generous (24px)</Badge>
                        <Badge className="bg-teal-500 text-white">Spacing</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              }
              code={`<!-- 4pt Grid Size System -->
<Badge className="px-2 py-0.5 text-xs">Small (8px/2px)</Badge>
<Badge className="px-3 py-1 text-sm">Medium (12px/4px)</Badge> 
<Badge className="px-4 py-1.5 text-base">Large (16px/6px)</Badge>
<Badge className="px-5 py-2 text-lg">XLarge (20px/8px)</Badge>

<!-- 4pt Grid Spacing Between Elements -->
<div class="flex gap-1">Tight (4px) spacing</div>
<div class="flex gap-2">Standard (8px) spacing</div>
<div class="flex gap-4">Comfortable (16px) spacing</div>
<div class="flex gap-6">Generous (24px) spacing</div>`}
            />

            <ComponentShowcase
              title="Interactive States & Accessibility"
              description="Badge hover states, focus indicators, and accessibility features"
              preview={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">Hoverable Energy</Badge>
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600 transition-colors cursor-pointer">Hoverable Orange</Badge>
                    <Badge className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors cursor-pointer">Hoverable Outline</Badge>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-green-600 text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2 tabindex-0">Focusable Success</Badge>
                    <Badge className="bg-red-600 text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2 tabindex-0">Focusable Danger</Badge>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      <strong>Accessibility:</strong> Interactive badges include focus rings and sufficient contrast ratios (4.5:1 minimum).
                      Hover states use 200ms transitions for smooth interactions.
                    </p>
                  </div>
                </div>
              }
              code={`<!-- Interactive Badges with MW Colors -->
<Badge className="bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer">
  Hoverable Energy
</Badge>

<!-- Focus Ring System -->
<Badge className="bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
  Focusable Success
</Badge>

<!-- Smooth Transitions (200ms) -->
.badge-hover {
  @apply transition-colors duration-200 ease-in-out;
}`}
            />
          </div>
        )

      case 'alert':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Alert
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Contextual feedback messages using MW semantic colors and accessibility-compliant contrast ratios.
              </p>
            </div>
            
            <ComponentShowcase
              title="MW Semantic Color System"
              description="Alert variants using MW semantic colors: Success Green, Warning Orange, Danger Red, and Info Blue"
              preview={
                <div className="space-y-4">
                  <Alert variant="info" title="Energy Information" dismissible className="border-blue-200 bg-blue-50 text-blue-800">
                    Using MW Energy Blue (#0188d1) for informational messages with proper contrast ratios.
                  </Alert>
                  <Alert variant="success" title="Breakthrough Success" dismissible className="border-green-200 bg-green-50 text-green-800">
                    Using MW Success Green (#2d7d32) for positive feedback and successful operations.
                  </Alert>
                  <Alert variant="warning" title="Flow Warning" className="border-yellow-200 bg-yellow-50 text-yellow-800">
                    Using MW Warning Orange (#f9a825) for cautionary messages and important notices.
                  </Alert>
                  <Alert variant="error" title="Critical Alert" className="border-red-200 bg-red-50 text-red-800">
                    Using MW Danger Red (#d63535) for error states and critical warnings.
                  </Alert>
                </div>
              }
              code={`<!-- MW Info Blue Alert -->
<Alert variant="info" className="border-blue-200 bg-blue-50 text-blue-800">
  Using MW Energy Blue (#0188d1) for informational messages.
</Alert>

<!-- MW Success Green Alert -->
<Alert variant="success" className="border-green-200 bg-green-50 text-green-800">
  Using MW Success Green (#2d7d32) for positive feedback.
</Alert>

<!-- MW Warning Orange Alert -->
<Alert variant="warning" className="border-yellow-200 bg-yellow-50 text-yellow-800">
  Using MW Warning Orange (#f9a825) for cautionary messages.
</Alert>

<!-- MW Danger Red Alert -->
<Alert variant="error" className="border-red-200 bg-red-50 text-red-800">
  Using MW Danger Red (#d63535) for error states.
</Alert>`}
            />

            <ComponentShowcase
              title="MW Brand Color Examples"
              description="Special alerts using MW brand colors for enhanced visual hierarchy"
              preview={
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Energy Blue Brand Alert</h3>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">This alert uses our primary Energy Blue color for brand-related messages.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">Breakthrough Orange Alert</h3>
                        <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">This alert uses our secondary Breakthrough Orange for momentum-related messages.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/20">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 bg-teal-500 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-teal-800 dark:text-teal-200">Flow Teal Accent Alert</h3>
                        <p className="mt-1 text-sm text-teal-700 dark:text-teal-300">This alert uses our Flow Teal accent color for smooth experience messages.</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              code={`<!-- Energy Blue Brand Alert -->
<div class="p-4 border-l-4 border-blue-600 bg-blue-50">
  <div class="flex items-start">
    <div class="w-5 h-5 bg-blue-600 rounded-full"></div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-blue-800">Energy Blue Brand Alert</h3>
      <p class="text-sm text-blue-700">Brand-related messages using Energy Blue.</p>
    </div>
  </div>
</div>

<!-- Breakthrough Orange Alert -->
<div class="p-4 border-l-4 border-orange-500 bg-orange-50">
  <h3 class="text-sm font-medium text-orange-800">Breakthrough Orange Alert</h3>
  <p class="text-sm text-orange-700">Momentum messages using Breakthrough Orange.</p>
</div>`}
            />

            <ComponentShowcase
              title="Spacing & Border Radius Tokens"
              description="Alert layouts using 4pt grid spacing and MW border radius tokens"
              preview={
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-mw-gray-900 dark:text-white">Border Radius Variations</h4>
                    <div className="space-y-3">
                      <Alert className="rounded-none border-blue-200 bg-blue-50 text-blue-800">Sharp corners (none) - Modern, technical feel</Alert>
                      <Alert className="rounded-md border-green-200 bg-green-50 text-green-800">Standard corners (6px) - Default MW radius</Alert>
                      <Alert className="rounded-lg border-orange-200 bg-orange-50 text-orange-800">Large corners (8px) - Friendly, approachable</Alert>
                      <Alert className="rounded-xl border-purple-200 bg-purple-50 text-purple-800">Extra large (12px) - Soft, premium feel</Alert>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-mw-gray-900 dark:text-white">Spacing Variations (4pt Grid)</h4>
                    <div className="space-y-3">
                      <Alert className="p-2 border-gray-200 bg-gray-50 text-gray-800">Compact (8px) - Dense layouts</Alert>
                      <Alert className="p-4 border-gray-200 bg-gray-50 text-gray-800">Standard (16px) - Default spacing</Alert>
                      <Alert className="p-6 border-gray-200 bg-gray-50 text-gray-800">Comfortable (24px) - Generous spacing</Alert>
                    </div>
                  </div>
                </div>
              }
              code={`<!-- Border Radius Tokens -->
<Alert className="rounded-none">Sharp corners (none)</Alert>
<Alert className="rounded-md">Standard corners (6px)</Alert>  
<Alert className="rounded-lg">Large corners (8px)</Alert>
<Alert className="rounded-xl">Extra large (12px)</Alert>

<!-- Spacing Tokens (4pt Grid) -->
<Alert className="p-2">Compact (8px)</Alert>
<Alert className="p-4">Standard (16px)</Alert>
<Alert className="p-6">Comfortable (24px)</Alert>`}
            />
          </div>
        )

      case 'avatar':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Avatar
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                User profile images with fallbacks and grouping.
              </p>
            </div>
            
            <ComponentShowcase
              title="Avatar Examples"
              description="Individual avatars with different configurations"
              preview={
                <div className="flex items-center space-x-4">
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <Avatar fallback="JD" />
                  <Avatar fallback="AB" size="lg" />
                  <Avatar fallback="XY" size="sm" />
                </div>
              }
              code={`<Avatar src="/avatar.jpg" />
<Avatar fallback="JD" />
<Avatar fallback="AB" size="lg" />
<Avatar fallback="XY" size="sm" />`}
            />

            <ComponentShowcase
              title="Avatar Group"
              description="Collection of avatars with overflow handling"
              preview={
                <AvatarGroup max={3}>
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                  <Avatar fallback="AB" />
                  <Avatar fallback="CD" />
                  <Avatar fallback="EF" />
                  <Avatar fallback="GH" />
                </AvatarGroup>
              }
              code={`<AvatarGroup max={3}>
  <Avatar src="/avatar1.jpg" />
  <Avatar fallback="AB" />
  <Avatar fallback="CD" />
  <Avatar fallback="EF" />
  <Avatar fallback="GH" />
</AvatarGroup>`}
            />
          </div>
        )

      case 'spinner':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Spinner & Loading
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Loading indicators showcasing MW brand colors, animation tokens, and 4pt grid sizing.
              </p>
            </div>
            
            <ComponentShowcase
              title="MW Brand Color Spinners"
              description="Spinners using the complete MW brand color palette with animation tokens"
              preview={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center space-y-2">
                    <Spinner className="text-blue-600 h-8 w-8 animate-spin" />
                    <p className="text-sm font-medium text-blue-600">Energy Blue</p>
                    <p className="text-xs text-mw-gray-500">#1d65af</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <Spinner className="text-orange-500 h-8 w-8 animate-spin" />
                    <p className="text-sm font-medium text-orange-500">Breakthrough Orange</p>
                    <p className="text-xs text-mw-gray-500">#4cb0e4</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <Spinner className="text-teal-500 h-8 w-8 animate-spin" />
                    <p className="text-sm font-medium text-teal-500">Flow Teal</p>
                    <p className="text-xs text-mw-gray-500">Seamless processes</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <Spinner className="text-mw-gray-600 h-8 w-8 animate-spin" />
                    <p className="text-sm font-medium text-mw-gray-600">Neutral Gray</p>
                    <p className="text-xs text-mw-gray-500">Default state</p>
                  </div>
                </div>
              }
              code={`<!-- MW Brand Color Spinners -->
<Spinner className="text-blue-600 h-8 w-8 animate-spin" />
<!-- Energy Blue (#1d65af) -->

<Spinner className="text-orange-500 h-8 w-8 animate-spin" />
<!-- Breakthrough Orange (#4cb0e4) -->

<Spinner className="text-teal-500 h-8 w-8 animate-spin" />
<!-- Flow Teal -->

<Spinner className="text-mw-gray-600 h-8 w-8 animate-spin" />
<!-- Neutral Gray -->`}
            />

            <ComponentShowcase
              title="4pt Grid Size System"
              description="Spinner sizes following the 4pt grid system with consistent scaling"
              preview={
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center space-y-2">
                    <Spinner className="text-blue-600 h-4 w-4 animate-spin" />
                    <p className="text-sm font-medium">Small</p>
                    <p className="text-xs text-mw-gray-500">16px (4pt×4)</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <Spinner className="text-blue-600 h-6 w-6 animate-spin" />
                    <p className="text-sm font-medium">Medium</p>
                    <p className="text-xs text-mw-gray-500">24px (4pt×6)</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <Spinner className="text-blue-600 h-8 w-8 animate-spin" />
                    <p className="text-sm font-medium">Large</p>
                    <p className="text-xs text-mw-gray-500">32px (4pt×8)</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <Spinner className="text-blue-600 h-12 w-12 animate-spin" />
                    <p className="text-sm font-medium">X-Large</p>
                    <p className="text-xs text-mw-gray-500">48px (4pt×12)</p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <Spinner className="text-blue-600 h-16 w-16 animate-spin" />
                    <p className="text-sm font-medium">2X-Large</p>
                    <p className="text-xs text-mw-gray-500">64px (4pt×16)</p>
                  </div>
                </div>
              }
              code={`<!-- 4pt Grid Size System -->
<Spinner className="h-4 w-4" /> <!-- 16px Small -->
<Spinner className="h-6 w-6" /> <!-- 24px Medium -->
<Spinner className="h-8 w-8" /> <!-- 32px Large -->
<Spinner className="h-12 w-12" /> <!-- 48px X-Large -->
<Spinner className="h-16 w-16" /> <!-- 64px 2X-Large -->`}
            />

            <ComponentShowcase
              title="MW Animation Token System"
              description="Loading states using MW animation duration and easing tokens"
              preview={
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-mw-gray-900 dark:text-white">Fast Animation (150ms)</h4>
                      <div className="flex items-center space-x-4">
                        <Spinner className="text-blue-600 h-6 w-6" style={{animationDuration: '150ms'}} />
                        <span className="text-sm text-mw-gray-600">Quick feedback for micro-interactions</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-mw-gray-900 dark:text-white">Standard Animation (300ms)</h4>
                      <div className="flex items-center space-x-4">
                        <Spinner className="text-orange-500 h-6 w-6" style={{animationDuration: '300ms'}} />
                        <span className="text-sm text-mw-gray-600">MW default animation speed</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-mw-gray-900 dark:text-white">Slow Animation (500ms)</h4>
                      <div className="flex items-center space-x-4">
                        <Spinner className="text-teal-500 h-6 w-6" style={{animationDuration: '500ms'}} />
                        <span className="text-sm text-mw-gray-600">Calm, steady progress indication</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-mw-gray-900 dark:text-white">Accessibility (1000ms)</h4>
                      <div className="flex items-center space-x-4">
                        <Spinner className="text-green-600 h-6 w-6" style={{animationDuration: '1000ms'}} />
                        <span className="text-sm text-mw-gray-600">Reduced motion preference</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
              code={`<!-- MW Animation Token System -->
<Spinner 
  className="text-blue-600 h-6 w-6" 
  style={{animationDuration: '150ms'}}
/>
<!-- Fast (150ms) - Micro-interactions -->

<Spinner 
  className="text-orange-500 h-6 w-6" 
  style={{animationDuration: '300ms'}}
/>
<!-- Standard (300ms) - MW Default -->

<Spinner 
  className="text-teal-500 h-6 w-6" 
  style={{animationDuration: '500ms'}}
/>
<!-- Slow (500ms) - Steady progress -->

<Spinner 
  className="text-green-600 h-6 w-6" 
  style={{animationDuration: '1000ms'}}
/>
<!-- Accessibility (1000ms) - Reduced motion -->`}
            />

            <ComponentShowcase
              title="Semantic State Loaders"
              description="Loading indicators for different semantic states using MW color system"
              preview={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Spinner className="text-green-600 h-5 w-5" />
                      <div>
                        <h4 className="font-medium text-green-900 dark:text-green-100">Success Loading</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">Processing successful operation...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Spinner className="text-yellow-600 h-5 w-5" />
                      <div>
                        <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Warning Processing</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">Validation in progress...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Spinner className="text-red-600 h-5 w-5" />
                      <div>
                        <h4 className="font-medium text-red-900 dark:text-red-100">Error Recovery</h4>
                        <p className="text-sm text-red-700 dark:text-red-300">Attempting to recover...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Spinner className="text-blue-600 h-5 w-5" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">Info Processing</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Gathering information...</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              code={`<!-- Semantic State Loaders -->
<div className="border border-green-200 bg-green-50">
  <Spinner className="text-green-600" />
  <span>Success Loading - MW Green (#2d7d32)</span>
</div>

<div className="border border-yellow-200 bg-yellow-50">
  <Spinner className="text-yellow-600" />
  <span>Warning - MW Orange (#f9a825)</span>
</div>

<div className="border border-red-200 bg-red-50">
  <Spinner className="text-red-600" />
  <span>Error Recovery - MW Red (#d63535)</span>
</div>

<div className="border border-blue-200 bg-blue-50">
  <Spinner className="text-blue-600" />
  <span>Info - MW Info Blue (#0188d1)</span>
</div>`}
            />
          </div>
        )

      case 'tabs':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Tabs
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Organize content into tabbed sections.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Tabs"
              description="Tabbed interface with content sections"
              preview={
                <Tabs defaultValue="tab1" className="max-w-md">
                  <TabsList>
                    <TabsTrigger value="tab1">Account</TabsTrigger>
                    <TabsTrigger value="tab2">Password</TabsTrigger>
                    <TabsTrigger value="tab3">Notifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm">Account settings and profile information.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm">Change your password and security settings.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-sm">Manage your notification preferences.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              }
              code={`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Account content
  </TabsContent>
  <TabsContent value="tab2">
    Password content
  </TabsContent>
</Tabs>`}
            />
          </div>
        )

      case 'accordion':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Accordion
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Collapsible content sections.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Accordion"
              description="Collapsible content with multiple items"
              preview={
                <Accordion type="multiple" className="max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is MovingWalls?</AccordionTrigger>
                    <AccordionContent>
                      MovingWalls is a global design system that provides consistent UI components and design tokens.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I get started?</AccordionTrigger>
                    <AccordionContent>
                      You can start by installing our component library and following our getting started guide.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes, all components follow WCAG 2.1 AA guidelines and include proper ARIA attributes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              }
              code={`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>
      Answer content goes here.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            />
          </div>
        )

      case 'breadcrumb':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Breadcrumb
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Navigation trail showing current page location.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Breadcrumb"
              description="Navigation trail with links and separators"
              preview={
                <Breadcrumb>
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem href="/components">Components</BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem isLast>Breadcrumb</BreadcrumbItem>
                </Breadcrumb>
              }
              code={`<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/components">Components</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isLast>Current Page</BreadcrumbItem>
</Breadcrumb>`}
            />
          </div>
        )

      case 'pagination':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Pagination
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Navigate through pages of content.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Pagination"
              description="Page navigation with first/last and prev/next controls"
              preview={<PaginationExample />}
              code={`<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  showFirstLast={true}
  showPrevNext={true}
  siblingCount={1}
/>`}
            />
          </div>
        )

      case 'modal':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Modal
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Modal dialogs for focused interactions.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Modal"
              description="Modal dialog with header, body, and footer"
              preview={<ModalExample />}
              code={`<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>
    <h2>Modal Title</h2>
  </ModalHeader>
  <ModalBody>
    <p>Modal content goes here.</p>
  </ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>`}
            />
          </div>
        )

      case 'dropdown':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Dropdown
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Dropdown menus with actions and options.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Dropdown"
              description="Dropdown menu with items and separators"
              preview={
                <Dropdown>
                  <DropdownTrigger>Open Menu</DropdownTrigger>
                  <DropdownContent>
                    <DropdownItem onClick={() => alert('Profile clicked')}>
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={() => alert('Settings clicked')}>
                      Settings
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem onClick={() => alert('Logout clicked')}>
                      Logout
                    </DropdownItem>
                  </DropdownContent>
                </Dropdown>
              }
              code={`<Dropdown>
  <DropdownTrigger>Open Menu</DropdownTrigger>
  <DropdownContent>
    <DropdownItem onClick={() => {}}>Profile</DropdownItem>
    <DropdownItem onClick={() => {}}>Settings</DropdownItem>
    <DropdownSeparator />
    <DropdownItem onClick={() => {}}>Logout</DropdownItem>
  </DropdownContent>
</Dropdown>`}
            />
          </div>
        )

      case 'tooltip':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Tooltip
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Contextual help and information on hover.
              </p>
            </div>
            
            <ComponentShowcase
              title="Tooltip Positioning"
              description="Tooltips with different positioning options"
              preview={
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="This is a tooltip on top" position="top">
                    <Button variant="outline">Hover me (top)</Button>
                  </Tooltip>
                  <Tooltip content="This is a tooltip on the right" position="right">
                    <Button variant="outline">Hover me (right)</Button>
                  </Tooltip>
                  <Tooltip content="This is a tooltip on the bottom" position="bottom">
                    <Button variant="outline">Hover me (bottom)</Button>
                  </Tooltip>
                  <Tooltip content="This is a tooltip on the left" position="left">
                    <Button variant="outline">Hover me (left)</Button>
                  </Tooltip>
                </div>
              }
              code={`<Tooltip content="Helpful information" position="top">
  <Button>Hover me</Button>
</Tooltip>

<Tooltip content="More details here" position="right">
  <span>Hover this text</span>
</Tooltip>`}
            />
          </div>
        )

      case 'textarea':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Textarea
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Multi-line text input controls with resizing options.
              </p>
            </div>
            
            <ComponentShowcase
              title="Textarea Examples"
              description="Multi-line text inputs with different configurations"
              preview={
                <div className="space-y-4 max-w-md">
                  <Textarea 
                    label="Message"
                    placeholder="Enter your message..."
                    rows={4}
                  />
                  <Textarea 
                    label="Description"
                    placeholder="Enter description..."
                    helpText="Maximum 500 characters"
                    resize="vertical"
                  />
                  <Textarea 
                    label="Comments"
                    placeholder="Required field"
                    error="This field is required"
                    resize="none"
                  />
                </div>
              }
              code={`<Textarea 
  label="Message"
  placeholder="Enter your message..."
  rows={4}
/>
<Textarea 
  label="Description"
  helpText="Maximum 500 characters"
  resize="vertical"
/>
<Textarea 
  label="Comments"
  error="This field is required"
  resize="none"
/>`}
            />
          </div>
        )

      case 'switch':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Switch
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Enhanced toggle switches with variants, icons, loading states and more.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Switch Examples"
              description="Toggle switches with different sizes and states"
              preview={
                <div className="space-y-4 max-w-md">
                  <Switch 
                    label="Enable notifications"
                    description="Receive email notifications for updates"
                  />
                  <Switch 
                    label="Dark mode"
                    size="sm"
                  />
                  <Switch 
                    label="Large switch"
                    size="lg"
                  />
                  <Switch 
                    label="Required setting"
                    error="This setting must be enabled"
                  />
                </div>
              }
              code={`<Switch 
  label="Enable notifications"
  description="Receive email notifications"
/>
<Switch label="Dark mode" size="sm" />
<Switch label="Large switch" size="lg" />
<Switch 
  label="Required setting"
  error="This setting must be enabled"
/>`}
            />

            <ComponentShowcase
              title="Switch Variants"
              description="Different color variants for various use cases"
              preview={
                <div className="space-y-4 max-w-md">
                  <Switch 
                    label="Default"
                    variant="default"
                    defaultChecked
                  />
                  <Switch 
                    label="Success"
                    variant="success"
                    defaultChecked
                  />
                  <Switch 
                    label="Warning"
                    variant="warning"
                    defaultChecked
                  />
                  <Switch 
                    label="Danger"
                    variant="danger"
                    defaultChecked
                  />
                </div>
              }
              code={`<Switch label="Default" variant="default" />
<Switch label="Success" variant="success" />
<Switch label="Warning" variant="warning" />
<Switch label="Danger" variant="danger" />`}
            />

            <ComponentShowcase
              title="Switch with Icons & Loading"
              description="Enhanced switches with visual feedback"
              preview={
                <div className="space-y-4 max-w-md">
                  <Switch 
                    label="Show icons"
                    showIcons
                    defaultChecked
                  />
                  <Switch 
                    label="With labels"
                    onLabel="Enabled"
                    offLabel="Disabled"
                    defaultChecked
                  />
                  <Switch 
                    label="Loading state"
                    loading
                  />
                  <Switch 
                    label="Auto-save"
                    loading
                    onLabel="Saving..."
                    offLabel="Disabled"
                  />
                </div>
              }
              code={`<Switch 
  label="Show icons"
  showIcons
  defaultChecked
/>
<Switch 
  label="With labels"
  onLabel="Enabled"
  offLabel="Disabled"
/>
<Switch 
  label="Loading state"
  loading
/>`}
            />

            <ComponentShowcase
              title="Switch Group"
              description="Related switches grouped together"
              preview={
                <SwitchGroup
                  label="Privacy Settings"
                  description="Control your privacy preferences"
                >
                  <Switch
                    label="Profile visibility"
                    description="Make your profile visible to others"
                    defaultChecked
                  />
                  <Switch
                    label="Activity status"
                    description="Show when you're online"
                  />
                  <Switch
                    label="Email notifications"
                    description="Receive email updates"
                    defaultChecked
                  />
                </SwitchGroup>
              }
              code={`<SwitchGroup
  label="Privacy Settings"
  description="Control your privacy preferences"
>
  <Switch
    label="Profile visibility"
    description="Make your profile visible to others"
    defaultChecked
  />
  <Switch
    label="Activity status"
    description="Show when you're online"
  />
  <Switch
    label="Email notifications"
    description="Receive email updates"
    defaultChecked
  />
</SwitchGroup>`}
            />
          </div>
        )

      case 'slider':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Slider
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Range input controls for selecting numeric values.
              </p>
            </div>
            
            <ComponentShowcase
              title="Slider Examples"
              description="Range sliders with different configurations"
              preview={
                <div className="space-y-6 max-w-md">
                  <Slider 
                    label="Volume"
                    defaultValue={50}
                    showValue
                  />
                  <Slider 
                    label="Price Range"
                    min={0}
                    max={1000}
                    step={10}
                    defaultValue={250}
                    showValue
                    formatValue={(val) => `$${val}`}
                  />
                  <Slider 
                    label="Temperature"
                    min={-20}
                    max={40}
                    defaultValue={20}
                    showValue
                    formatValue={(val) => `${val}°C`}
                  />
                </div>
              }
              code={`<Slider 
  label="Volume"
  defaultValue={50}
  showValue
/>
<Slider 
  label="Price Range"
  min={0}
  max={1000}
  step={10}
  defaultValue={250}
  showValue
  formatValue={(val) => \`$\${val}\`}
/>`}
            />
          </div>
        )

      case 'progress':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Progress
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Progress indicators for showing completion status.
              </p>
            </div>
            
            <ComponentShowcase
              title="Progress Examples"
              description="Progress bars with different variants and sizes"
              preview={
                <div className="space-y-6 max-w-md">
                  <Progress value={30} showLabel label="Download Progress" />
                  <Progress value={65} variant="success" showLabel />
                  <Progress value={85} variant="warning" size="lg" showLabel />
                  <Progress value={95} variant="error" size="sm" />
                </div>
              }
              code={`<Progress value={30} showLabel label="Download Progress" />
<Progress value={65} variant="success" showLabel />
<Progress value={85} variant="warning" size="lg" showLabel />
<Progress value={95} variant="error" size="sm" />`}
            />
          </div>
        )

      case 'skeleton':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Skeleton
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Loading placeholders that mimic content structure.
              </p>
            </div>
            
            <ComponentShowcase
              title="Skeleton Examples"
              description="Loading skeletons with different shapes and animations"
              preview={
                <div className="space-y-6 max-w-md">
                  <div className="space-y-3">
                    <Skeleton variant="text" lines={3} />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Skeleton variant="circular" width={50} height={50} />
                    <div className="flex-1 space-y-2">
                      <Skeleton variant="text" width="75%" />
                      <Skeleton variant="text" width="50%" />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" height={120} />
                </div>
              }
              code={`<Skeleton variant="text" lines={3} />

<div className="flex items-center space-x-4">
  <Skeleton variant="circular" width={50} height={50} />
  <div className="flex-1 space-y-2">
    <Skeleton variant="text" width="75%" />
    <Skeleton variant="text" width="50%" />
  </div>
</div>

<Skeleton variant="rectangular" height={120} />`}
            />
          </div>
        )

      case 'separator':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Separator
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Visual dividers for separating content sections.
              </p>
            </div>
            
            <ComponentShowcase
              title="Separator Examples"
              description="Horizontal and vertical separators with different styles"
              preview={
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Content above</p>
                    <Separator />
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Content below</p>
                  </div>
                  <div>
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Dashed separator</p>
                    <Separator variant="dashed" />
                    <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">More content</p>
                  </div>
                  <div className="flex items-center h-12">
                    <span className="text-sm">Left</span>
                    <Separator orientation="vertical" />
                    <span className="text-sm">Right</span>
                  </div>
                </div>
              }
              code={`<Separator />
<Separator variant="dashed" />
<Separator orientation="vertical" />`}
            />
          </div>
        )

      case 'table':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Table
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Data tables with sorting, striping, and hover effects.
              </p>
            </div>
            
            <ComponentShowcase
              title="Table Examples"
              description="Data tables with different configurations"
              preview={
                <Table striped hoverable>
                  <TableHeader>
                    <TableRow>
                      <TableHead sortable>Name</TableHead>
                      <TableHead sortable>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Developer</TableCell>
                      <TableCell><Badge variant="success">Active</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Designer</TableCell>
                      <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              }
              code={`<Table striped hoverable>
  <TableHeader>
    <TableRow>
      <TableHead sortable>Name</TableHead>
      <TableHead sortable>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Developer</TableCell>
      <TableCell><Badge variant="success">Active</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`}
            />
          </div>
        )

      case 'rating':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Rating
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Star rating components for user feedback and display.
              </p>
            </div>
            
            <ComponentShowcase
              title="Rating Examples"
              description="Star ratings with different configurations"
              preview={
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Interactive Rating</p>
                    <Rating value={3} onChange={(value) => console.log(value)} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Read-only Rating</p>
                    <Rating value={4.5} readonly allowHalf />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Large Rating</p>
                    <Rating value={5} size="lg" readonly />
                  </div>
                </div>
              }
              code={`<Rating value={3} onChange={(value) => console.log(value)} />
<Rating value={4.5} readonly allowHalf />
<Rating value={5} size="lg" readonly />`}
            />
          </div>
        )

      case 'datepicker':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Date Picker
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Date selection controls with calendar interface.
              </p>
            </div>
            
            <ComponentShowcase
              title="Date Picker Examples"
              description="Date pickers with different configurations"
              preview={
                <div className="space-y-4 max-w-md">
                  <DatePicker 
                    label="Birth Date"
                    placeholder="Select your birth date"
                  />
                  <DatePicker 
                    label="Event Date"
                    placeholder="Select event date"
                    minDate={new Date()}
                  />
                  <DatePicker 
                    label="Required Date"
                    placeholder="This field is required"
                    error="Please select a date"
                  />
                </div>
              }
              code={`<DatePicker 
  label="Birth Date"
  placeholder="Select your birth date"
/>
<DatePicker 
  label="Event Date"
  minDate={new Date()}
/>
<DatePicker 
  label="Required Date"
  error="Please select a date"
/>`}
            />
          </div>
        )

      case 'toast':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Toast
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Notification messages that appear temporarily to inform users.
              </p>
            </div>
            
            <ComponentShowcase
              title="Toast Examples"
              description="Different types of toast notifications"
              preview={<ToastExample />}
              code={`const { addToast } = useToast()

<Button 
  onClick={() => addToast({
    title: 'Success!',
    description: 'Your action was completed successfully.',
    variant: 'success'
  })}
>
  Show Success Toast
</Button>

<Button 
  onClick={() => addToast({
    title: 'Error',
    description: 'Something went wrong.',
    variant: 'error'
  })}
>
  Show Error Toast
</Button>`}
            />
          </div>
        )

      case 'command':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Command
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Search and command palette component with keyboard navigation.
              </p>
            </div>
            
            <ComponentShowcase
              title="Command Palette"
              description="Searchable command interface"
              preview={
                <div className="max-w-md">
                  <CommandExample />
                </div>
              }
              code={`<Command value={value} onValueChange={setValue}>
  <CommandGroup>
    {filteredItems.map(item => (
      <CommandItem
        key={item.value}
        value={item.value}
        onSelect={() => console.log('Selected:', item.label)}
      >
        {item.label}
      </CommandItem>
    ))}
  </CommandGroup>
</Command>`}
            />
          </div>
        )

      case 'dialog':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Dialog
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Flexible dialog system for confirmations, forms, and detailed content.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Dialog"
              description="Simple dialog with trigger and content"
              preview={
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              }
              code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
            />
          </div>
        )

      case 'popover':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Popover
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Contextual popup content that appears relative to a trigger element.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Popover"
              description="Simple popover with content"
              preview={
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Dimensions</h4>
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                        Set the dimensions for the layer.
                      </p>
                      <div className="grid gap-2">
                        <Input placeholder="Width" />
                        <Input placeholder="Height" />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              }
              code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium">Dimensions</h4>
      <p className="text-sm">Set the dimensions for the layer.</p>
      <div className="grid gap-2">
        <Input placeholder="Width" />
        <Input placeholder="Height" />
      </div>
    </div>
  </PopoverContent>
</Popover>`}
            />
          </div>
        )

      case 'sheet':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Sheet
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Side panel drawers that slide in from the edges of the screen.
              </p>
            </div>
            
            <ComponentShowcase
              title="Sheet Sides"
              description="Sheets can slide in from different sides"
              preview={
                <div className="flex gap-4">
                  {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <Sheet key={side}>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="capitalize">
                          {side}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side={side}>
                        <SheetHeader>
                          <SheetTitle>Edit profile</SheetTitle>
                          <SheetDescription>
                            Make changes to your profile here. Click save when done.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <Input placeholder="Name" />
                          <Input placeholder="Email" />
                        </div>
                        <SheetFooter>
                          <Button type="submit">Save changes</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  ))}
                </div>
              }
              code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Name" />
      <Input placeholder="Email" />
    </div>
    <SheetFooter>
      <Button type="submit">Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
            />
          </div>
        )

      case 'collapsible':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Collapsible
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Simple collapsible content with smooth animations.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Collapsible"
              description="Expandable content sections"
              preview={
                <div className="space-y-4">
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4" />
                        Can I use this in my project?
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 pt-2">
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                        Yes. Free to use for personal and commercial projects. No attribution required.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4" />
                        Is it accessible?
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 pt-2">
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              }
              code={`<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">
      Can I use this in my project?
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Yes. Free to use for personal and commercial projects.</p>
  </CollapsibleContent>
</Collapsible>`}
            />
          </div>
        )

      case 'togglegroup':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Toggle Group
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                A set of two-state buttons that can be toggled on or off.
              </p>
            </div>
            
            <ComponentShowcase
              title="Single Selection"
              description="Only one item can be selected at a time"
              preview={
                <ToggleGroup type="single" defaultValue="center">
                  <ToggleGroupItem value="left">Left</ToggleGroupItem>
                  <ToggleGroupItem value="center">Center</ToggleGroupItem>
                  <ToggleGroupItem value="right">Right</ToggleGroupItem>
                </ToggleGroup>
              }
              code={`<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`}
            />

            <ComponentShowcase
              title="Multiple Selection"
              description="Multiple items can be selected"
              preview={
                <ToggleGroup type="multiple" defaultValue={['bold']}>
                  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
                </ToggleGroup>
              }
              code={`<ToggleGroup type="multiple" defaultValue={['bold']}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>`}
            />
          </div>
        )

      case 'emptystate':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Empty State
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Placeholder content when there is no data to display.
              </p>
            </div>
            
            <ComponentShowcase
              title="No Data State"
              description="When there's no data available"
              preview={
                <div className="border rounded-lg p-8">
                  <NoDataEmptyState 
                    title="No data available"
                    description="There's no data to display at the moment."
                  />
                </div>
              }
              code={`<NoDataEmptyState 
  title="No data available"
  description="There's no data to display at the moment."
/>`}
            />

            <ComponentShowcase
              title="No Results State"
              description="When search returns no results"
              preview={
                <div className="border rounded-lg p-8">
                  <NoResultsEmptyState 
                    title="No results found"
                    description="Try adjusting your search criteria."
                  />
                </div>
              }
              code={`<NoResultsEmptyState 
  title="No results found"
  description="Try adjusting your search criteria."
/>`}
            />
          </div>
        )

      case 'scrollarea':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Scroll Area
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Custom scrollable areas with styled scrollbars.
              </p>
            </div>
            
            <ComponentShowcase
              title="Vertical Scroll"
              description="Scrollable content with custom scrollbar"
              preview={
                <ScrollArea className="h-48 w-full border rounded-lg p-4">
                  <div className="space-y-2">
                    {Array.from({ length: 20 }, (_, i) => (
                      <div key={i} className="p-2 border rounded">
                        Item {i + 1}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              }
              code={`<ScrollArea className="h-48 w-full border rounded-lg p-4">
  <div className="space-y-2">
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="p-2 border rounded">
        Item {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>`}
            />
          </div>
        )

      case 'chip':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Chip
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Interactive tags and labels with remove functionality.
              </p>
            </div>
            
            <ComponentShowcase
              title="Chip Variants"
              description="Different chip styles for various use cases"
              preview={
                <div className="flex flex-wrap gap-2">
                  <Chip variant="default">Default</Chip>
                  <Chip variant="primary">Primary</Chip>
                  <Chip variant="secondary">Secondary</Chip>
                  <Chip variant="success">Success</Chip>
                  <Chip variant="warning">Warning</Chip>
                  <Chip variant="error">Error</Chip>
                  <Chip variant="outline">Outline</Chip>
                </div>
              }
              code={`<Chip variant="default">Default</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="error">Error</Chip>
<Chip variant="outline">Outline</Chip>`}
            />

            <ComponentShowcase
              title="Interactive Chips"
              description="Chips with remove functionality and click handling"
              preview={
                <div className="flex flex-wrap gap-2">
                  <Chip variant="primary" onRemove={() => alert('Removed!')}>
                    Removable
                  </Chip>
                  <Chip variant="secondary" clickable onClick={() => alert('Clicked!')}>
                    Clickable
                  </Chip>
                  <Chip variant="outline" onRemove={() => alert('Removed!')} disabled>
                    Disabled
                  </Chip>
                </div>
              }
              code={`<Chip variant="primary" onRemove={() => handleRemove()}>
  Removable
</Chip>
<Chip variant="secondary" clickable onClick={() => handleClick()}>
  Clickable
</Chip>
<Chip variant="outline" onRemove={() => handleRemove()} disabled>
  Disabled
</Chip>`}
            />
          </div>
        )

      case 'stepper':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Stepper
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Guide users through multi-step processes with clear progress indication.
              </p>
            </div>
            
            <ComponentShowcase
              title="Horizontal Stepper"
              description="Horizontal progress stepper for forms and workflows"
              preview={
                <Stepper
                  orientation="horizontal"
                  steps={[
                    { title: 'Account Info', description: 'Basic details', completed: true },
                    { title: 'Verification', description: 'Email & phone', current: true },
                    { title: 'Payment', description: 'Billing setup' },
                    { title: 'Complete', description: 'Finish setup' }
                  ]}
                />
              }
              code={`<Stepper
  orientation="horizontal"
  steps={[
    { title: 'Account Info', description: 'Basic details', completed: true },
    { title: 'Verification', description: 'Email & phone', current: true },
    { title: 'Payment', description: 'Billing setup' },
    { title: 'Complete', description: 'Finish setup' }
  ]}
/>`}
            />

            <ComponentShowcase
              title="Vertical Stepper"
              description="Vertical stepper for detailed step descriptions"
              preview={
                <div className="max-w-md">
                  <Stepper
                    orientation="vertical"
                    steps={[
                      { title: 'Create Account', description: 'Set up your profile and preferences', completed: true },
                      { title: 'Verify Email', description: 'Check your inbox and click the verification link', current: true },
                      { title: 'Complete Profile', description: 'Add additional information and upload avatar' }
                    ]}
                  />
                </div>
              }
              code={`<Stepper
  orientation="vertical"
  steps={[
    { title: 'Create Account', completed: true },
    { title: 'Verify Email', current: true },
    { title: 'Complete Profile' }
  ]}
/>`}
            />
          </div>
        )

      case 'timeline':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Timeline
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Display chronological events and activities with status indicators.
              </p>
            </div>
            
            <ComponentShowcase
              title="Activity Timeline"
              description="Timeline showing user activities and events"
              preview={
                <div className="max-w-md">
                  <Timeline
                    items={[
                      {
                        title: 'Account created',
                        description: 'Welcome to MovingWalls! Your account has been successfully created.',
                        time: '2 hours ago',
                        status: 'completed'
                      },
                      {
                        title: 'Profile updated',
                        description: 'Profile information and avatar have been updated.',
                        time: '1 hour ago',
                        status: 'completed'
                      },
                      {
                        title: 'Email verification',
                        description: 'Please check your email and click the verification link.',
                        time: '30 minutes ago',
                        status: 'current'
                      },
                      {
                        title: 'Complete setup',
                        description: 'Finish setting up your account preferences.',
                        status: 'pending'
                      }
                    ]}
                  />
                </div>
              }
              code={`<Timeline
  items={[
    {
      title: 'Account created',
      description: 'Welcome to MovingWalls!',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      title: 'Email verification',
      description: 'Please check your email.',
      time: '30 minutes ago',
      status: 'current'
    }
  ]}
/>`}
            />
          </div>
        )

      case 'menu':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Menu
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Context menus with items, separators, and interactive elements.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Menu"
              description="Menu with items, separators, and groups"
              preview={
                <div className="flex justify-center">
                  <Menu>
                    <MenuItem>New File</MenuItem>
                    <MenuItem shortcut="⌘O">Open</MenuItem>
                    <MenuItem>Save</MenuItem>
                    <MenuSeparator />
                    <MenuGroup label="Recent">
                      <MenuItem>Project 1</MenuItem>
                      <MenuItem>Project 2</MenuItem>
                    </MenuGroup>
                    <MenuSeparator />
                    <MenuItem destructive>Delete</MenuItem>
                  </Menu>
                </div>
              }
              code={`<Menu>
  <MenuItem>New File</MenuItem>
  <MenuItem shortcut="⌘O">Open</MenuItem>
  <MenuItem>Save</MenuItem>
  <MenuSeparator />
  <MenuGroup label="Recent">
    <MenuItem>Project 1</MenuItem>
    <MenuItem>Project 2</MenuItem>
  </MenuGroup>
  <MenuSeparator />
  <MenuItem destructive>Delete</MenuItem>
</Menu>`}
            />

            <ComponentShowcase
              title="Interactive Menu Items"
              description="Menu with checkboxes and radio groups"
              preview={
                <div className="flex justify-center">
                  <Menu>
                    <MenuCheckboxItem checked>Show toolbar</MenuCheckboxItem>
                    <MenuCheckboxItem>Show sidebar</MenuCheckboxItem>
                    <MenuSeparator />
                    <MenuRadioGroup value="light">
                      <MenuRadioItem value="light">Light theme</MenuRadioItem>
                      <MenuRadioItem value="dark">Dark theme</MenuRadioItem>
                      <MenuRadioItem value="auto">Auto theme</MenuRadioItem>
                    </MenuRadioGroup>
                  </Menu>
                </div>
              }
              code={`<Menu>
  <MenuCheckboxItem checked>Show toolbar</MenuCheckboxItem>
  <MenuCheckboxItem>Show sidebar</MenuCheckboxItem>
  <MenuSeparator />
  <MenuRadioGroup value="light">
    <MenuRadioItem value="light">Light theme</MenuRadioItem>
    <MenuRadioItem value="dark">Dark theme</MenuRadioItem>
    <MenuRadioItem value="auto">Auto theme</MenuRadioItem>
  </MenuRadioGroup>
</Menu>`}
            />
          </div>
        )

      case 'icon':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Icon
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Icon system with Lucide integration and common icon presets.
              </p>
            </div>
            
            <ComponentShowcase
              title="Icon Examples"
              description="Icons with different sizes and common presets"
              preview={
                <div className="flex flex-wrap items-center gap-4">
                  <SearchIcon />
                  <CloseIcon />
                  <CheckIcon />
                  <Icon icon={Settings} size="sm" />
                  <Icon icon={User} size="md" />
                  <Icon icon={Home} size="lg" />
                </div>
              }
              code={`<SearchIcon />
<CloseIcon />
<CheckIcon />
<Icon icon={Settings} size="sm" />
<Icon icon={User} size="md" />
<Icon icon={Home} size="lg" />`}
            />
          </div>
        )

      case 'calendar':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Calendar
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Full calendar component with events and multiple view options.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Calendar"
              description="Calendar with event support and navigation"
              preview={
                <div className="max-w-2xl">
                  <Calendar
                    value={new Date()}
                    onChange={(date) => console.log('Selected:', date)}
                    events={[
                      {
                        id: '1',
                        title: 'Meeting',
                        date: new Date(),
                        color: 'blue'
                      }
                    ]}
                  />
                </div>
              }
              code={`<Calendar
  value={new Date()}
  onChange={(date) => console.log('Selected:', date)}
  events={[
    {
      id: '1',
      title: 'Meeting',
      date: new Date(),
      color: 'blue'
    }
  ]}
/>`}
            />
          </div>
        )

      case 'datagrid':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Data Grid
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Advanced data table with sorting, filtering, pagination, and selection.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Data Grid"
              description="Data grid with sorting and selection"
              preview={
                <div className="max-w-4xl">
                  <DataGrid
                    data={[
                      { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
                      { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Active' },
                      { id: 3, name: 'Bob Johnson', role: 'Manager', status: 'Inactive' }
                    ]}
                    columns={[
                      { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
                      { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
                      { id: 'status', header: 'Status', accessorKey: 'status' }
                    ]}
                  />
                </div>
              }
              code={`<DataGrid
  data={data}
  columns={[
    { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
    { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
    { id: 'status', header: 'Status', accessorKey: 'status' }
  ]}
/>`}
            />
          </div>
        )

      case 'advancedtable':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Advanced Table
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Comprehensive table component with 50+ features including sorting, filtering, pagination, row actions, bulk actions, column resizing, and more.
              </p>
            </div>
            
            <ComponentShowcase
              title="Advanced Table Features"
              description="Full-featured table with comprehensive functionality"
              preview={
                <div className="text-center py-8">
                  <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
                    Advanced Table Demo
                  </h3>
                  <p className="text-mw-gray-600 dark:text-mw-gray-300 mb-6">
                    See the full Advanced Table in action with employee data, interactive features, and comprehensive functionality.
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => window.open('/advanced-table-demo', '_blank')}
                  >
                    View Live Demo
                  </Button>
                </div>
              }
              code={`// Advanced Table with all features
<AdvancedTable
  data={employeeData}
  columns={columns}
  getRowId={(row) => row.id}
  
  // State management
  state={tableState}
  onStateChange={setTableState}
  
  // Features
  enableSorting={true}
  enableFiltering={true}
  enableGlobalFilter={true}
  enableColumnResizing={true}
  enableColumnVisibility={true}
  enableRowSelection={true}
  enableBulkActions={true}
  enableFullscreen={true}
  
  // Selection
  selection={{
    mode: 'multiple',
    selectedRows: selectedRows,
    onSelectionChange: setSelectedRows
  }}
  
  // Pagination
  pagination={{
    pageIndex: currentPage,
    pageSize: pageSize,
    total: totalCount,
    onPageChange: setCurrentPage,
    onPageSizeChange: setPageSize,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: true
  }}
  
  // Actions
  rowActions={rowActions}
  bulkActions={bulkActions}
  toolbarActions={toolbarActions}
  
  // Styling
  striped={true}
  hoverable={true}
  stickyHeader={true}
  maxHeight="600px"
  
  // Event handlers
  onRowClick={handleRowClick}
  onCellClick={handleCellClick}
/>`}
            />

            <div className="bg-mw-gray-50 dark:bg-mw-gray-800/50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
                Key Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium text-mw-gray-900 dark:text-white">Data Management</h5>
                  <ul className="text-sm text-mw-gray-600 dark:text-mw-gray-300 space-y-1">
                    <li>• Sorting (single/multi-column)</li>
                    <li>• Filtering (column & global)</li>
                    <li>• Search functionality</li>
                    <li>• Data virtualization</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-mw-gray-900 dark:text-white">Interaction</h5>
                  <ul className="text-sm text-mw-gray-600 dark:text-mw-gray-300 space-y-1">
                    <li>• Row selection (single/multi)</li>
                    <li>• Row actions menu</li>
                    <li>• Bulk actions</li>
                    <li>• Click events</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-mw-gray-900 dark:text-white">Layout</h5>
                  <ul className="text-sm text-mw-gray-600 dark:text-mw-gray-300 space-y-1">
                    <li>• Column resizing</li>
                    <li>• Column visibility</li>
                    <li>• Sticky headers/columns</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-mw-gray-900 dark:text-white">Pagination</h5>
                  <ul className="text-sm text-mw-gray-600 dark:text-mw-gray-300 space-y-1">
                    <li>• Page size controls</li>
                    <li>• Quick jump navigation</li>
                    <li>• Total count display</li>
                    <li>• Custom page sizes</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-mw-gray-900 dark:text-white">Customization</h5>
                  <ul className="text-sm text-mw-gray-600 dark:text-mw-gray-300 space-y-1">
                    <li>• Custom cell renderers</li>
                    <li>• Column footers</li>
                    <li>• Custom actions</li>
                    <li>• Theming support</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-mw-gray-900 dark:text-white">Performance</h5>
                  <ul className="text-sm text-mw-gray-600 dark:text-mw-gray-300 space-y-1">
                    <li>• Virtual scrolling</li>
                    <li>• Efficient rendering</li>
                    <li>• Memoized components</li>
                    <li>• Optimized updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'sidebar':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Sidebar
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Navigation sidebar with multiple variants and responsive behavior.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Sidebar"
              description="Sidebar with header, content, and footer sections"
              preview={
                <div className="h-64 border rounded-lg overflow-hidden">
                  <div className="flex h-full">
                    <Sidebar variant="persistent" className="w-64">
                      <SidebarHeader>
                        <h3 className="text-lg font-semibold">Navigation</h3>
                      </SidebarHeader>
                      <SidebarContent>
                        <nav className="space-y-2">
                          <a href="#" className="block px-4 py-2 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800">
                            Dashboard
                          </a>
                          <a href="#" className="block px-4 py-2 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800">
                            Projects
                          </a>
                          <a href="#" className="block px-4 py-2 rounded hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800">
                            Settings
                          </a>
                        </nav>
                      </SidebarContent>
                    </Sidebar>
                    <div className="flex-1 p-4 bg-mw-gray-50 dark:bg-mw-gray-800">
                      <p className="text-sm text-mw-gray-600 dark:text-mw-gray-300">Main content area</p>
                    </div>
                  </div>
                </div>
              }
              code={`<Sidebar variant="persistent">
  <SidebarHeader>
    <h3>Navigation</h3>
  </SidebarHeader>
  <SidebarContent>
    <nav className="space-y-2">
      <a href="#" className="block px-4 py-2 rounded">Dashboard</a>
      <a href="#" className="block px-4 py-2 rounded">Projects</a>
      <a href="#" className="block px-4 py-2 rounded">Settings</a>
    </nav>
  </SidebarContent>
</Sidebar>`}
            />
          </div>
        )

      case 'timepicker':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Time Picker
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Time selection controls with 12h/24h formats and keyboard navigation.
              </p>
            </div>
            
            <ComponentShowcase
              title="Time Picker Examples"
              description="Time selection with different formats and configurations"
              preview={
                <div className="space-y-4 max-w-md">
                  <TimePicker 
                    label="Meeting Time"
                    placeholder="Select meeting time"
                    format="12h"
                  />
                  <TimePicker 
                    label="Event Start"
                    placeholder="Select start time"
                    format="24h"
                    showSeconds
                  />
                  <TimePicker 
                    label="Required Time"
                    placeholder="This field is required"
                    error="Please select a time"
                  />
                </div>
              }
              code={`<TimePicker 
  label="Meeting Time"
  placeholder="Select meeting time"
  format="12h"
/>
<TimePicker 
  label="Event Start"
  format="24h"
  showSeconds
/>
<TimePicker 
  label="Required Time"
  error="Please select a time"
/>`}
            />
          </div>
        )

      case 'form':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Form
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Form layout and structure components with validation support.
              </p>
            </div>
            
            <ComponentShowcase
              title="Form Structure"
              description="Complete form layout with sections and validation"
              preview={
                <div className="max-w-md">
                  <FormSection title="Personal Information" description="Basic details about yourself">
                    <FormGroup>
                      <FormField>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" />
                        </FormControl>
                        <FormDescription>This will be displayed publicly</FormDescription>
                      </FormField>
                    </FormGroup>
                    
                    <FormGroup>
                      <FormField>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" />
                        </FormControl>
                        <FormError>Please enter a valid email address</FormError>
                      </FormField>
                    </FormGroup>
                    
                    <FormActions>
                      <Button variant="primary">Save</Button>
                      <Button variant="outline">Cancel</Button>
                    </FormActions>
                  </FormSection>
                </div>
              }
              code={`<FormSection title="Personal Information">
  <FormGroup>
    <FormField>
      <FormLabel>Full Name</FormLabel>
      <FormControl>
        <Input placeholder="Enter your full name" />
      </FormControl>
      <FormDescription>This will be displayed publicly</FormDescription>
    </FormField>
  </FormGroup>
  
  <FormActions>
    <Button variant="primary">Save</Button>
    <Button variant="outline">Cancel</Button>
  </FormActions>
</FormSection>`}
            />
          </div>
        )

      case 'fileupload':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                File Upload
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                File upload components with drag-drop, previews, and validation.
              </p>
            </div>
            
            <ComponentShowcase
              title="File Upload Variants"
              description="Different file upload configurations"
              preview={
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Dropzone Upload</p>
                    <FileUpload
                      variant="dropzone"
                      accept="image/*"
                      multiple
                      onFilesChange={(files) => console.log('Files:', files)}
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Button Upload</p>
                    <FileUpload
                      variant="button"
                      accept=".pdf,.doc,.docx"
                      onFilesChange={(files) => console.log('Files:', files)}
                    />
                  </div>
                </div>
              }
              code={`<FileUpload
  variant="dropzone"
  accept="image/*"
  multiple
  onFilesChange={(files) => console.log('Files:', files)}
/>

<FileUpload
  variant="button"
  accept=".pdf,.doc,.docx"
  buttonText="Choose Documents"
  onFilesChange={(files) => console.log('Files:', files)}
/>`}
            />
          </div>
        )

      case 'searchbar':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Search Bar
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Search input with autocomplete suggestions and filtering.
              </p>
            </div>
            
            <ComponentShowcase
              title="Search Bar Examples"
              description="Search with suggestions and results"
              preview={
                <div className="space-y-4 max-w-md">
                  <SearchBar
                    placeholder="Search components..."
                    suggestions={['Button', 'Input', 'Card', 'Modal', 'Alert']}
                    onSearch={(query) => console.log('Search:', query)}
                  />
                  
                  <SearchBar
                    placeholder="Search with results..."
                    variant="outlined"
                    onSearch={(query) => console.log('Search:', query)}
                  />
                </div>
              }
              code={`<SearchBar
  placeholder="Search components..."
  suggestions={['Button', 'Input', 'Card', 'Modal', 'Alert']}
  onSearch={(query) => console.log('Search:', query)}
  onSuggestionSelect={(suggestion) => console.log('Selected:', suggestion)}
/>

<SearchBar
  placeholder="Search with results..."
  showResults
  results={[
    { id: '1', title: 'Button Component', description: 'Interactive elements' },
    { id: '2', title: 'Input Component', description: 'Text input controls' }
  ]}
/>`}
            />
          </div>
        )

      case 'autocomplete':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Autocomplete
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Enhanced select with search, creation, and multiple selection capabilities.
              </p>
            </div>
            
            <ComponentShowcase
              title="Autocomplete Examples"
              description="Enhanced select with search and creation"
              preview={
                <div className="space-y-4 max-w-md">
                  <Autocomplete
                    label="Technologies"
                    placeholder="Select technologies..."
                    options={[
                      { value: 'react', label: 'React' },
                      { value: 'vue', label: 'Vue.js' },
                      { value: 'angular', label: 'Angular' },
                      { value: 'svelte', label: 'Svelte' }
                    ]}
                    multiple
                    onChange={(selected) => console.log('Selected:', selected)}
                  />
                  
                  <Autocomplete
                    label="Tags"
                    placeholder="Add tags..."
                    options={[
                      { value: 'ui', label: 'UI' },
                      { value: 'design', label: 'Design' },
                      { value: 'frontend', label: 'Frontend' }
                    ]}
                    creatable
                    multiple
                    onChange={(selected) => console.log('Selected:', selected)}
                  />
                </div>
              }
              code={`<Autocomplete
  label="Technologies"
  placeholder="Select technologies..."
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' }
  ]}
  searchable
  multiple
  onSelectionChange={(selected) => console.log('Selected:', selected)}
/>

<Autocomplete
  label="Tags"
  placeholder="Add tags..."
  creatable
  multiple
/>`}
            />
          </div>
        )

      case 'list':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                List
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Data display lists with different variants and interactive elements.
              </p>
            </div>
            
            <ComponentShowcase
              title="List Variants"
              description="Different list styles for various use cases"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Basic List</h4>
                    <List variant="ordered">
                      <ListItem>First item with some content</ListItem>
                      <ListItem>Second item with more details</ListItem>
                      <ListItem>Third item to complete the list</ListItem>
                    </List>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Navigation List</h4>
                    <NavigationList items={[
                      { label: 'Dashboard', href: '#', active: true },
                      { label: 'Projects', href: '#' },
                      { label: 'Settings', href: '#' }
                    ]} />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Description List</h4>
                    <DescriptionList items={[
                      { term: 'Name', description: 'MovingWalls Design System' },
                      { term: 'Version', description: '1.0.0' },
                      { term: 'License', description: 'MIT' }
                    ]} />
                  </div>
                </div>
              }
              code={`<List ordered>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>

<NavigationList>
  <ListItem href="#" active>Dashboard</ListItem>
  <ListItem href="#">Projects</ListItem>
  <ListItem href="#">Settings</ListItem>
</NavigationList>

<DescriptionList>
  <ListItem term="Name" description="MovingWalls Design System" />
  <ListItem term="Version" description="1.0.0" />
  <ListItem term="License" description="MIT" />
</DescriptionList>`}
            />
          </div>
        )

      case 'treeview':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Tree View
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Hierarchical data display like file explorer with expansion and selection.
              </p>
            </div>
            
            <ComponentShowcase
              title="Tree View Example"
              description="Hierarchical data with expandable nodes"
              preview={
                <div className="max-w-md">
                  <TreeView
                    data={[
                      {
                        id: '1',
                        label: 'Components',
                        children: [
                          { id: '1-1', label: 'Button.tsx' },
                          { id: '1-2', label: 'Input.tsx' },
                          {
                            id: '1-3',
                            label: 'Layout',
                            children: [
                              { id: '1-3-1', label: 'Card.tsx' },
                              { id: '1-3-2', label: 'Container.tsx' }
                            ]
                          }
                        ]
                      },
                      {
                        id: '2',
                        label: 'Utils',
                        children: [
                          { id: '2-1', label: 'helpers.ts' },
                          { id: '2-2', label: 'constants.ts' }
                        ]
                      }
                    ]}
                    onSelect={(selectedIds, node) => console.log('Selected:', selectedIds, node)}
                    onExpand={(expandedIds) => console.log('Expanded:', expandedIds)}
                  />
                </div>
              }
              code={`<TreeView
  data={[
    {
      id: '1',
      label: 'Components',
      children: [
        { id: '1-1', label: 'Button.tsx' },
        { id: '1-2', label: 'Input.tsx' },
        {
          id: '1-3',
          label: 'Layout',
          children: [
            { id: '1-3-1', label: 'Card.tsx' },
            { id: '1-3-2', label: 'Container.tsx' }
          ]
        }
      ]
    }
  ]}
  onNodeSelect={(node) => console.log('Selected:', node)}
  onNodeToggle={(nodeId, expanded) => console.log('Toggle:', nodeId, expanded)}
/>`}
            />
          </div>
        )

      case 'carousel':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Carousel
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Image and content carousels with autoplay and touch support.
              </p>
            </div>
            
            <ComponentShowcase
              title="Carousel Examples"
              description="Image carousels with navigation and autoplay"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Basic Carousel</h4>
                    <Carousel className="max-w-md">
                      <CarouselSlide>
                        <div className="bg-mw-blue-100 dark:bg-mw-blue-900/20 h-32 rounded flex items-center justify-center">
                          <span className="text-mw-blue-700 dark:text-mw-blue-300">Slide 1</span>
                        </div>
                      </CarouselSlide>
                      <CarouselSlide>
                        <div className="bg-mw-gray-100 dark:bg-mw-gray-800 h-32 rounded flex items-center justify-center">
                          <span className="text-mw-gray-700 dark:text-mw-gray-300">Slide 2</span>
                        </div>
                      </CarouselSlide>
                      <CarouselSlide>
                        <div className="bg-green-100 dark:bg-green-900/20 h-32 rounded flex items-center justify-center">
                          <span className="text-green-700 dark:text-green-300">Slide 3</span>
                        </div>
                      </CarouselSlide>
                    </Carousel>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Image Carousel</h4>
                    <ImageCarousel
                      images={[
                        { src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop', alt: 'Landscape 1' },
                        { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop', alt: 'Landscape 2' },
                        { src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=200&fit=crop', alt: 'Landscape 3' }
                      ]}
                      autoplay
                      autoplayInterval={3000}
                      className="max-w-md"
                    />
                  </div>
                </div>
              }
              code={`<Carousel>
  <CarouselSlide>
    <div className="bg-blue-100 h-32 rounded flex items-center justify-center">
      <span>Slide 1</span>
    </div>
  </CarouselSlide>
  <CarouselSlide>
    <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
      <span>Slide 2</span>
    </div>
  </CarouselSlide>
</Carousel>

<ImageCarousel
  images={[
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' }
  ]}
  autoplay
  interval={3000}
/>`}
            />
          </div>
        )

      case 'notification':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Notification
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                System notifications with badges and notification bell component.
              </p>
            </div>
            
            <ComponentShowcase
              title="Notification Examples"
              description="System notifications with different types and actions"
              preview={
                <div className="space-y-4 max-w-md">
                  <Notification
                    notification={{
                      id: '1',
                      type: 'success',
                      title: 'Success!',
                      message: 'Your profile has been updated successfully.',
                      timestamp: new Date(),
                      status: 'unread'
                    }}
                  />
                  
                  <Notification
                    notification={{
                      id: '2',
                      type: 'warning',
                      title: 'Warning',
                      message: 'Please verify your email address to continue.',
                      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                      status: 'read',
                      actions: [
                        { label: 'Verify', onClick: () => console.log('Verify clicked'), variant: 'primary' },
                        { label: 'Later', onClick: () => console.log('Later clicked') }
                      ]
                    }}
                  />
                  
                  <div className="flex items-center space-x-4">
                    <NotificationBadge count={5}>
                      <Button variant="outline">Messages</Button>
                    </NotificationBadge>
                    
                    <NotificationBell
                      notifications={[
                        { id: '1', type: 'info', title: 'New message', message: 'You have a new message', timestamp: new Date(), status: 'unread' },
                        { id: '2', type: 'success', title: 'Task completed', message: 'Your task was completed', timestamp: new Date(), status: 'read' }
                      ]}
                    />
                  </div>
                </div>
              }
              code={`<Notification
  notification={{
    id: '1',
    type: 'success',
    title: 'Success!',
    message: 'Your profile has been updated successfully.',
    timestamp: new Date(),
    status: 'unread'
  }}
/>

<NotificationBadge count={5}>
  <Button variant="outline">Messages</Button>
</NotificationBadge>

<NotificationBell
  notifications={notifications}
/>`}
            />
          </div>
        )

      case 'snackbar':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Snackbar
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Toast notifications with animations and contextual actions.
              </p>
            </div>
            
            <ComponentShowcase
              title="Snackbar Usage"
              description="Toast notifications that appear temporarily"
              preview={
                <div className="space-x-4">
                  <Button 
                    onClick={() => {
                      // This would work within a SnackbarProvider
                      console.log('Show success snackbar')
                    }}
                  >
                    Show Success
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      console.log('Show warning snackbar')
                    }}
                  >
                    Show Warning
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      console.log('Show error snackbar')
                    }}
                  >
                    Show Error
                  </Button>
                </div>
              }
              code={`// Wrap your app with SnackbarProvider
<SnackbarProvider position="bottom-right">
  <App />
</SnackbarProvider>

// Use the snackbar hooks
const { show } = useSnackbar()
const { success, error, warning, info } = useSnackbarHelpers()

// Show snackbars
<Button onClick={() => success('Operation completed successfully!')}>
  Show Success
</Button>

<Button onClick={() => error('Something went wrong!')}>
  Show Error
</Button>

<Button onClick={() => show({
  type: 'info',
  title: 'Information',
  message: 'Here is some important information',
  action: {
    label: 'Learn More',
    onClick: () => console.log('Learn more clicked')
  }
})}>
  Show with Action
</Button>`}
            />
          </div>
        )

      case 'container':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Container
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Layout containers with responsive breakpoints and different arrangements.
              </p>
            </div>
            
            <ComponentShowcase
              title="Container Examples"
              description="Different container types for layout organization"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Responsive Container</h4>
                    <ResponsiveContainer className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded">
                      <p className="text-sm">This container adapts to screen size</p>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Grid Container</h4>
                    <GridContainer cols={3} gap={4} className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded">
                      <div className="bg-mw-blue-100 dark:bg-mw-blue-900/20 p-2 rounded text-center text-sm">Item 1</div>
                      <div className="bg-mw-blue-100 dark:bg-mw-blue-900/20 p-2 rounded text-center text-sm">Item 2</div>
                      <div className="bg-mw-blue-100 dark:bg-mw-blue-900/20 p-2 rounded text-center text-sm">Item 3</div>
                    </GridContainer>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Flex Container</h4>
                    <FlexContainer direction="row" justify="between" align="center" className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded">
                      <span className="text-sm">Left</span>
                      <span className="text-sm">Center</span>
                      <span className="text-sm">Right</span>
                    </FlexContainer>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Stack</h4>
                    <Stack spacing={2} className="bg-mw-gray-50 dark:bg-mw-gray-800 p-4 rounded">
                      <div className="bg-mw-blue-100 dark:bg-mw-blue-900/20 p-2 rounded text-sm">Stack Item 1</div>
                      <div className="bg-mw-blue-100 dark:bg-mw-blue-900/20 p-2 rounded text-sm">Stack Item 2</div>
                      <div className="bg-mw-blue-100 dark:bg-mw-blue-900/20 p-2 rounded text-sm">Stack Item 3</div>
                    </Stack>
                  </div>
                </div>
              }
              code={`<ResponsiveContainer>
  <p>This container adapts to screen size</p>
</ResponsiveContainer>

<GridContainer cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GridContainer>

<FlexContainer direction="row" justify="between" align="center">
  <span>Left</span>
  <span>Center</span>
  <span>Right</span>
</FlexContainer>

<Stack space="sm">
  <div>Stack Item 1</div>
  <div>Stack Item 2</div>
  <div>Stack Item 3</div>
</Stack>`}
            />
          </div>
        )

      case 'panel':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Panel
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Resizable panels with splitters for creating complex layouts.
              </p>
            </div>
            
            <ComponentShowcase
              title="Panel Examples"
              description="Resizable panels and layout splits"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Split Panel</h4>
                    <div className="h-48 border rounded-lg overflow-hidden">
                      <SplitPanel
                        leftPanel={
                          <div className="p-4">
                            <h5 className="text-sm font-medium mb-2">Left Panel</h5>
                            <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
                              This is the left panel content. You can resize this panel.
                            </p>
                          </div>
                        }
                        rightPanel={
                          <div className="p-4">
                            <h5 className="text-sm font-medium mb-2">Right Panel</h5>
                            <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
                              This is the right panel content. It adjusts automatically.
                            </p>
                          </div>
                        }
                        defaultLeftSize={30}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Panel Group</h4>
                    <div className="h-48 border rounded-lg overflow-hidden">
                      <PanelGroup direction="horizontal">
                        <Panel defaultSize={25} minSize={15} maxSize={40}>
                          <PanelHeader title="Sidebar" collapsible />
                          <div className="p-4">
                            <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Sidebar content</p>
                          </div>
                        </Panel>
                        <PanelResizer />
                        <Panel>
                          <PanelHeader title="Main Content" />
                          <div className="p-4">
                            <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Main content area</p>
                          </div>
                        </Panel>
                        <PanelResizer />
                        <Panel defaultSize={25}>
                          <PanelHeader title="Inspector" />
                          <div className="p-4">
                            <p className="text-xs text-mw-gray-600 dark:text-mw-gray-400">Inspector content</p>
                          </div>
                        </Panel>
                      </PanelGroup>
                    </div>
                  </div>
                </div>
              }
              code={`<SplitPanel
  leftPanel={<div>Left Panel Content</div>}
  rightPanel={<div>Right Panel Content</div>}
  defaultLeftSize={30}
/>

<PanelGroup direction="horizontal">
  <Panel defaultSize={25} minSize={15} maxSize={40}>
    <PanelHeader title="Sidebar" collapsible />
    <div>Sidebar content</div>
  </Panel>
  <PanelResizer />
  <Panel>
    <PanelHeader title="Main Content" />
    <div>Main content area</div>
  </Panel>
</PanelGroup>`}
            />
          </div>
        )

      case 'daterangepicker':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">Date Range Picker</h1>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
                Select date ranges with presets and flexible calendar interface.
              </p>
            </div>

            <ComponentShowcase
              title="Date Range Picker Examples"
              description="Date range selection with various configurations"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Basic Date Range</h4>
                    <DateRangePicker 
                      placeholder="Select date range"
                      onChange={(range) => console.log('Range:', range)}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">With Presets</h4>
                    <DateRangePicker 
                      placeholder="Select date range"
                      numberOfMonths={2}
                      onChange={(range) => console.log('Range:', range)}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Single Month</h4>
                    <DateRangePicker 
                      placeholder="Select date range"
                      numberOfMonths={1}
                      clearable={false}
                      onChange={(range) => console.log('Range:', range)}
                    />
                  </div>
                </div>
              }
              code={`<DateRangePicker 
  placeholder="Select date range"
  onChange={(range) => console.log('Range:', range)}
/>

<DateRangePicker 
  numberOfMonths={2}
  onChange={(range) => console.log('Range:', range)}
/>

<DateRangePicker 
  numberOfMonths={1}
  clearable={false}
  onChange={(range) => console.log('Range:', range)}
/>`}
            />
          </div>
        )

      case 'timerangepicker':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">Time Range Picker</h1>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
                Select time ranges with 12/24 hour formats and preset options.
              </p>
            </div>

            <ComponentShowcase
              title="Time Range Picker Examples"
              description="Time range selection with various formats and presets"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">12-Hour Format</h4>
                    <TimeRangePicker 
                      format="12"
                      placeholder="Select time range"
                      onChange={(range) => console.log('Range:', range)}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">24-Hour Format</h4>
                    <TimeRangePicker 
                      format="24"
                      placeholder="Select time range"
                      onChange={(range) => console.log('Range:', range)}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">With Custom Step</h4>
                    <TimeRangePicker 
                      format="12"
                      minuteStep={30}
                      placeholder="Select time range"
                      onChange={(range) => console.log('Range:', range)}
                    />
                  </div>
                </div>
              }
              code={`<TimeRangePicker 
  format="12"
  placeholder="Select time range"
  onChange={(range) => console.log('Range:', range)}
/>

<TimeRangePicker 
  format="24"
  placeholder="Select time range"
  onChange={(range) => console.log('Range:', range)}
/>

<TimeRangePicker 
  format="12"
  minuteStep={30}
  onChange={(range) => console.log('Range:', range)}
/>`}
            />
          </div>
        )

      case 'richtexteditor':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">Rich Text Editor</h1>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
                WYSIWYG editor with formatting toolbar and markdown support.
              </p>
            </div>

            <ComponentShowcase
              title="Rich Text Editor Examples"
              description="Text editing with rich formatting capabilities"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Basic Editor</h4>
                    <RichTextEditor 
                      placeholder="Start writing..."
                      onChange={(content) => console.log('Content:', content)}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">With Preview</h4>
                    <RichTextEditor 
                      placeholder="Start writing..."
                      enablePreview={true}
                      onChange={(content) => console.log('Content:', content)}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bottom Toolbar</h4>
                    <RichTextEditor 
                      placeholder="Start writing..."
                      toolbarPosition="bottom"
                      minHeight={150}
                      onChange={(content) => console.log('Content:', content)}
                    />
                  </div>
                </div>
              }
              code={`<RichTextEditor 
  placeholder="Start writing..."
  onChange={(content) => console.log('Content:', content)}
/>

<RichTextEditor 
  enablePreview={true}
  onChange={(content) => console.log('Content:', content)}
/>

<RichTextEditor 
  toolbarPosition="bottom"
  minHeight={150}
  onChange={(content) => console.log('Content:', content)}
/>`}
            />
          </div>
        )

      case 'documenteditor':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">Document Editor</h1>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
                Advanced document editor with multiple view modes and collaboration features.
              </p>
            </div>

            <ComponentShowcase
              title="Document Editor Examples"
              description="Full-featured document editing experience"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Basic Document Editor</h4>
                    <div className="h-96 border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg overflow-hidden">
                      <DocumentEditor 
                        title="My Document"
                        mode="edit"
                        onChange={(content) => console.log('Content:', content)}
                        onSave={(content) => console.log('Saved:', content)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Split View Mode</h4>
                    <div className="h-96 border border-mw-gray-300 dark:border-mw-gray-600 rounded-lg overflow-hidden">
                      <DocumentEditor 
                        title="Split View Document"
                        mode="split"
                        autoSave={true}
                        onChange={(content) => console.log('Content:', content)}
                      />
                    </div>
                  </div>
                </div>
              }
              code={`<DocumentEditor 
  title="My Document"
  mode="edit"
  onChange={(content) => console.log('Content:', content)}
  onSave={(content) => console.log('Saved:', content)}
/>

<DocumentEditor 
  title="Split View Document"
  mode="split"
  autoSave={true}
  onChange={(content) => console.log('Content:', content)}
/>`}
            />
          </div>
        )

      case 'filter':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">Filter</h1>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300">
                Advanced filtering interface with multiple field types and operators.
              </p>
            </div>

            <ComponentShowcase
              title="Filter Examples"
              description="Flexible filtering with various field types"
              preview={
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Basic Filter</h4>
                    <Filter 
                      fields={[
                        { key: 'name', label: 'Name', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: [
                          { value: 'active', label: 'Active' },
                          { value: 'inactive', label: 'Inactive' }
                        ]},
                        { key: 'age', label: 'Age', type: 'number' },
                        { key: 'created', label: 'Created Date', type: 'date' }
                      ]}
                      onChange={(filters) => console.log('Filters:', filters)}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">With Presets</h4>
                    <Filter 
                      fields={[
                        { key: 'category', label: 'Category', type: 'select', options: [
                          { value: 'electronics', label: 'Electronics' },
                          { value: 'clothing', label: 'Clothing' },
                          { value: 'books', label: 'Books' }
                        ]},
                        { key: 'price', label: 'Price', type: 'number' },
                        { key: 'inStock', label: 'In Stock', type: 'boolean' }
                      ]}
                      presets={[
                        {
                          label: 'Electronics In Stock',
                          filters: [
                            { id: '1', field: 'category', operator: 'equals', value: 'electronics', type: 'select' },
                            { id: '2', field: 'inStock', operator: 'equals', value: true, type: 'boolean' }
                          ]
                        }
                      ]}
                      allowMultiple={true}
                      showCount={true}
                      onChange={(filters) => console.log('Filters:', filters)}
                    />
                  </div>
                </div>
              }
              code={`<Filter 
  fields={[
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]},
    { key: 'age', label: 'Age', type: 'number' }
  ]}
  onChange={(filters) => console.log('Filters:', filters)}
/>

<Filter 
  fields={fields}
  presets={[
    {
      label: 'Electronics In Stock',
      filters: [
        { field: 'category', operator: 'equals', value: 'electronics' },
        { field: 'inStock', operator: 'equals', value: true }
      ]
    }
  ]}
  allowMultiple={true}
  showCount={true}
  onChange={(filters) => console.log('Filters:', filters)}
/>`}
            />
          </div>
        )

      case 'thumbnail':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Thumbnail
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Media preview components for images, videos, and files with interactive features.
              </p>
            </div>

            <ComponentShowcase
              title="Basic Thumbnails"
              description="Different types and sizes of thumbnails"
              preview={
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    <Thumbnail
                      src="https://picsum.photos/400/300?random=1"
                      alt="Sample image"
                      title="Image 1"
                      subtitle="Sample description"
                      size="md"
                      clickable
                      showPreview
                      onPreview={() => console.log('Preview clicked')}
                    />
                    <Thumbnail
                      src="https://picsum.photos/400/300?random=2"
                      alt="Sample image"
                      title="Image 2"
                      type="image"
                      size="md"
                      selected
                    />
                    <VideoThumbnail
                      src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                      alt="Sample video"
                      title="Video Sample"
                      duration="1:30"
                      size="md"
                    />
                    <Thumbnail
                      src=""
                      alt="Document"
                      title="Document.pdf"
                      type="document"
                      size="md"
                    />
                  </div>
                </div>
              }
              code={`<Thumbnail
  src="https://picsum.photos/400/300"
  alt="Sample image"
  title="Image Title"
  subtitle="Description"
  size="md"
  clickable
  showPreview
  onPreview={() => console.log('Preview')}
/>

<VideoThumbnail
  src="video.mp4"
  title="Video Sample"
  duration="1:30"
  size="md"
/>

<Thumbnail
  src=""
  title="Document.pdf"
  type="document"
  size="md"
/>`}
            />

            <ComponentShowcase
              title="Thumbnail Gallery"
              description="Grid layout for multiple thumbnails"
              preview={
                <ThumbnailGallery
                  items={[
                    { id: '1', src: 'https://picsum.photos/300/200?random=3', title: 'Photo 1', type: 'image' },
                    { id: '2', src: 'https://picsum.photos/300/200?random=4', title: 'Photo 2', type: 'image' },
                    { id: '3', src: 'https://picsum.photos/300/200?random=5', title: 'Photo 3', type: 'image' },
                    { id: '4', src: '', title: 'Video.mp4', type: 'video' },
                    { id: '5', src: '', title: 'Document.pdf', type: 'document' },
                    { id: '6', src: '', title: 'Audio.mp3', type: 'audio' }
                  ]}
                  columns={3}
                  selectable
                  selectedIds={['1', '3']}
                  onSelectionChange={(ids) => console.log('Selected:', ids)}
                />
              }
              code={`<ThumbnailGallery
  items={[
    { id: '1', src: 'photo1.jpg', title: 'Photo 1', type: 'image' },
    { id: '2', src: 'photo2.jpg', title: 'Photo 2', type: 'image' },
    { id: '3', src: '', title: 'Document.pdf', type: 'document' }
  ]}
  columns={3}
  selectable
  selectedIds={['1']}
  onSelectionChange={(ids) => console.log('Selected:', ids)}
/>`}
            />
          </div>
        )

      case 'dragdrop':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Drag & Drop
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Advanced drag and drop interface for file uploads and sortable lists.
              </p>
            </div>

            <ComponentShowcase
              title="File Drop Zone"
              description="Drag and drop files with validation"
              preview={
                <div className="space-y-6">
                  <DragDrop
                    onFileDrop={(files) => console.log('Files dropped:', files)}
                    accept={['image/*', 'application/pdf']}
                    maxSize={5 * 1024 * 1024} // 5MB
                    maxFiles={5}
                    multiple
                    showPreview
                  />
                </div>
              }
              code={`<DragDrop
  onFileDrop={(files) => console.log('Files:', files)}
  accept={['image/*', 'application/pdf']}
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={5}
  multiple
  showPreview
/>`}
            />

            <ComponentShowcase
              title="Compact Drop Zone"
              description="Space-efficient drag and drop"
              preview={
                <DragDrop
                  onFileDrop={(files) => console.log('Files dropped:', files)}
                  accept={['image/*']}
                  multiple={false}
                  compact
                />
              }
              code={`<DragDrop
  onFileDrop={(files) => console.log('Files:', files)}
  accept={['image/*']}
  multiple={false}
  compact
/>`}
            />

            <ComponentShowcase
              title="Sortable List"
              description="Drag and drop to reorder items"
              preview={
                <SortableList
                  items={[
                    { id: '1', content: <div className="p-2">Task 1: Review design files</div> },
                    { id: '2', content: <div className="p-2">Task 2: Update documentation</div> },
                    { id: '3', content: <div className="p-2">Task 3: Test new features</div> },
                    { id: '4', content: <div className="p-2">Task 4: Deploy to staging</div> }
                  ]}
                  onReorder={(items) => console.log('Reordered:', items)}
                />
              }
              code={`<SortableList
  items={[
    { id: '1', content: <div>Task 1</div> },
    { id: '2', content: <div>Task 2</div> },
    { id: '3', content: <div>Task 3</div> }
  ]}
  onReorder={(items) => console.log('Reordered:', items)}
/>`}
            />
          </div>
        )

      case 'collapsiblecode':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-mw-gray-900 dark:text-white mb-4">
                Collapsible Code
              </h2>
              <p className="text-lg text-mw-gray-600 dark:text-mw-gray-300 mb-8">
                Collapsible code blocks with syntax highlighting and copy functionality for documentation and tutorials.
              </p>
            </div>
            
            <ComponentShowcase
              title="Basic Collapsible Code"
              description="Code blocks that can be expanded/collapsed with copy functionality"
              preview={
                <div className="space-y-4">
                  <CollapsibleCode
                    title="React Component Example"
                    code={`import React from 'react'

function HelloWorld({ name }: { name: string }) {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1 className="text-xl font-bold">Hello, {name}!</h1>
      <p className="text-gray-600">Welcome to our application.</p>
    </div>
  )
}

export default HelloWorld`}
                    language="tsx"
                  />
                  
                  <CollapsibleCode
                    title="CSS Styles"
                    code={`.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}`}
                    language="css"
                    defaultExpanded={true}
                  />
                </div>
              }
              code={`<CollapsibleCode
  title="React Component Example"
  code={\`import React from 'react'

function HelloWorld({ name }: { name: string }) {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1 className="text-xl font-bold">Hello, {name}!</h1>
      <p className="text-gray-600">Welcome to our application.</p>
    </div>
  )
}

export default HelloWorld\`}
  language="tsx"
/>

<CollapsibleCode
  title="CSS Styles"
  code={\`/* CSS code here */\`}
  language="css"
  defaultExpanded={true}
/>`}
            />

            <ComponentShowcase
              title="Different Languages"
              description="Syntax highlighting support for various programming languages"
              preview={
                <div className="space-y-4">
                  <CollapsibleCode
                    title="JavaScript Function"
                    code={`function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}

const cart = [
  { name: 'Apple', price: 1.20, quantity: 3 },
  { name: 'Banana', price: 0.80, quantity: 5 }
];

console.log('Total:', calculateTotal(cart));`}
                    language="javascript"
                  />
                  
                  <CollapsibleCode
                    title="Python Script"
                    code={`def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    
    return sequence

# Generate first 10 Fibonacci numbers
result = fibonacci(10)
print(f"First 10 Fibonacci numbers: {result}")`}
                    language="python"
                  />
                  
                  <CollapsibleCode
                    title="JSON Configuration"
                    code={`{
  "name": "mw-design-system",
  "version": "1.0.0",
  "description": "MovingWalls Design System",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "tailwindcss": "^3.3.0"
  },
  "keywords": ["design-system", "react", "typescript", "tailwind"]
}`}
                    language="json"
                  />
                </div>
              }
              code={`<CollapsibleCode
  title="JavaScript Function"
  code={\`function calculateTotal(items) {
    return items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }\`}
  language="javascript"
/>

<CollapsibleCode
  title="Python Script"
  code={\`def fibonacci(n):
    if n <= 0:
        return []
    # ... rest of the code
  \`}
  language="python"
/>

<CollapsibleCode
  title="JSON Configuration"
  code={\`{
    "name": "my-project",
    "version": "1.0.0"
  }\`}
  language="json"
/>`}
            />

            <ComponentShowcase
              title="Advanced Options"
              description="Customization options for different use cases"
              preview={
                <div className="space-y-4">
                  <CollapsibleCode
                    code={`// Simple inline code without title
const greeting = "Hello, World!";
console.log(greeting);`}
                    language="javascript"
                  />
                  
                  <CollapsibleCode
                    title="Auto-expanded Code"
                    code={`// This code block is expanded by default
import { useState, useEffect } from 'react'

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}`}
                    language="typescript"
                    defaultExpanded={true}
                  />
                </div>
              }
              code={`// Without title
<CollapsibleCode
  code={\`const greeting = "Hello, World!";\`}
  language="javascript"
/>

// Expanded by default
<CollapsibleCode
  title="Auto-expanded Code"
  code={\`// Your code here\`}
  language="typescript"
  defaultExpanded={true}
/>`}
            />
          </div>
        )
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-mw-gray-900 dark:text-white mb-4">
              Component Coming Soon
            </h2>
            <p className="text-mw-gray-600 dark:text-mw-gray-300">
              This component documentation is being prepared.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <PageHero
        title="Components"
        description="Comprehensive UI component library with interactive examples and code snippets. Built with accessibility and consistency in mind."
        badge={{
          text: "78+ Components",
          variant: "primary"
        }}
        stats={[
          { label: "Total Components", value: "78" },
          { label: "Categories", value: "7" },
          { label: "Accessibility", value: "WCAG 2.1" }
        ]}
      />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mw-gray-400" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="w-full pl-10 pr-4 py-2 border border-mw-gray-300 dark:border-mw-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-mw-blue-500 focus:border-transparent dark:bg-mw-gray-800 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Component Categories */}
                <nav className="space-y-4">
                  {filteredCategories.map((category) => (
                    <div key={category.id}>
                      <h3 className="text-sm font-semibold text-mw-gray-900 dark:text-white mb-2 px-2">
                        {category.name}
                      </h3>
                      <ul className="space-y-1">
                        {category.components.map((component) => (
                          <li key={component.id}>
                            <button
                              onClick={() => setActiveComponent(component.id)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 flex items-center justify-between group ${
                                activeComponent === component.id
                                  ? 'bg-mw-blue-100 dark:bg-mw-blue-900/20 text-mw-blue-700 dark:text-mw-blue-300'
                                  : 'text-mw-gray-600 dark:text-mw-gray-300 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800 hover:text-mw-gray-900 dark:hover:text-white'
                              }`}
                            >
                              <span>{component.name}</span>
                              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                activeComponent === component.id ? 'text-mw-blue-600 dark:text-mw-blue-400' : 'opacity-0 group-hover:opacity-100'
                              }`} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="min-h-[600px]">
                {renderComponentContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
