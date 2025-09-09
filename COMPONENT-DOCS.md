# MovingWalls Design System - Complete Component Documentation

> 📦 **Package**: `movingwalls-ds@1.0.0`  
> 🌐 **NPM**: https://www.npmjs.com/package/movingwalls-ds  
> 📖 **Live Demo**: https://mwdesignsystem.netlify.app

## 🚀 Installation & Setup

```bash
npm install movingwalls-ds
# or
yarn add movingwalls-ds
```

```tsx
import { Button, Card, Badge } from 'movingwalls-ds';
import 'movingwalls-ds/dist/styles/index.css';
```

---

## 📋 Table of Contents

- [🎛️ Form Controls](#-form-controls)
- [🎨 Display Components](#-display-components)
- [📐 Layout Components](#-layout-components)
- [🔔 Feedback Components](#-feedback-components)
- [🧭 Navigation Components](#-navigation-components)
- [💫 Overlay Components](#-overlay-components)
- [🛠️ Utility Components](#-utility-components)
- [📱 Media Components](#-media-components)
- [📄 File & Drag Components](#-file--drag-components)
- [🎯 Icon System](#-icon-system)
- [🎨 Design Tokens](#-design-tokens)

---

## 🎛️ Form Controls

### Button

**Interactive elements for actions with multiple variants and sizes.**

```tsx
import { Button } from 'movingwalls-ds';

// Basic usage
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// With icons
<Button>
  <Icon name="plus" className="w-4 h-4 mr-2" />
  Add Item
</Button>
```

**Props**:
- `variant`: `"primary" | "secondary" | "outline" | "ghost" | "destructive"`
- `size`: `"sm" | "md" | "lg"`
- `disabled`: `boolean`
- `loading`: `boolean`
- `onClick`: `() => void`

### Input

**Text input controls with validation states and various types.**

```tsx
import { Input } from 'movingwalls-ds';

// Basic usage
<Input placeholder="Enter your name" />
<Input type="email" placeholder="Enter your email" />
<Input type="password" placeholder="Enter password" />

// States
<Input error="This field is required" />
<Input success="Valid input" />
<Input disabled />

// Sizes
<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />

// With icons
<Input
  icon={<Icon name="search" />}
  placeholder="Search..."
/>
```

**Props**:
- `type`: `"text" | "email" | "password" | "number" | "tel" | "url"`
- `size`: `"sm" | "md" | "lg"`
- `error`: `string`
- `success`: `string`
- `disabled`: `boolean`
- `icon`: `ReactNode`

### Textarea

**Multi-line text input with auto-resize capability.**

```tsx
import { Textarea } from 'movingwalls-ds';

<Textarea 
  placeholder="Enter your message..."
  rows={4}
  autoResize
/>

<Textarea 
  error="Message is required"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

**Props**:
- `rows`: `number`
- `autoResize`: `boolean`
- `maxRows`: `number`
- `error`: `string`
- `disabled`: `boolean`

### Checkbox & Radio

**Selection controls for single and multiple choices.**

```tsx
import { Checkbox, Radio } from 'movingwalls-ds';

// Checkbox
<Checkbox 
  checked={checked}
  onChange={setChecked}
  label="I agree to the terms"
/>

<Checkbox 
  indeterminate
  label="Select all"
/>

// Radio buttons
<div>
  <Radio name="size" value="small" label="Small" />
  <Radio name="size" value="medium" label="Medium" />
  <Radio name="size" value="large" label="Large" />
</div>
```

**Props**:
- `checked`: `boolean`
- `indeterminate`: `boolean`
- `disabled`: `boolean`
- `label`: `string`
- `name`: `string` (for Radio)
- `value`: `string` (for Radio)

### Switch

**Toggle switches for binary choices.**

```tsx
import { Switch, SwitchGroup } from 'movingwalls-ds';

// Basic switch
<Switch 
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
/>

// Switch group
<SwitchGroup>
  <Switch label="Email notifications" />
  <Switch label="Push notifications" />
  <Switch label="SMS notifications" />
</SwitchGroup>
```

**Props**:
- `checked`: `boolean`
- `disabled`: `boolean`
- `label`: `string`
- `size`: `"sm" | "md" | "lg"`

### Select

**Dropdown selection with search and multiple selection support.**

```tsx
import { Select } from 'movingwalls-ds';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' }
];

// Basic select
<Select 
  options={options}
  placeholder="Select country"
  onChange={(value) => console.log(value)}
/>

// Multiple selection
<Select 
  options={options}
  multiple
  placeholder="Select countries"
/>

// With search
<Select 
  options={options}
  searchable
  placeholder="Search and select"
/>
```

**Props**:
- `options`: `Array<{value: string, label: string}>`
- `multiple`: `boolean`
- `searchable`: `boolean`
- `disabled`: `boolean`
- `placeholder`: `string`

### Slider

**Range input controls for numeric values.**

```tsx
import { Slider } from 'movingwalls-ds';

// Single value
<Slider 
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={1}
/>

// Range slider
<Slider 
  value={[20, 80]}
  onChange={setRange}
  min={0}
  max={100}
  range
/>

// With marks
<Slider 
  value={value}
  onChange={setValue}
  marks={{
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%'
  }}
/>
```

**Props**:
- `value`: `number | [number, number]`
- `min`: `number`
- `max`: `number`
- `step`: `number`
- `range`: `boolean`
- `marks`: `object`
- `disabled`: `boolean`

### DatePicker

**Date selection with calendar interface.**

```tsx
import { DatePicker } from 'movingwalls-ds';

<DatePicker 
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select date"
/>

<DatePicker 
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date()}
  maxDate={new Date('2024-12-31')}
/>
```

**Props**:
- `value`: `Date | null`
- `onChange`: `(date: Date | null) => void`
- `minDate`: `Date`
- `maxDate`: `Date`
- `disabled`: `boolean`
- `placeholder`: `string`

### DateRangePicker

**Date range selection with dual calendar interface.**

```tsx
import { DateRangePicker } from 'movingwalls-ds';

<DateRangePicker 
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select date range"
/>
```

**Props**:
- `value`: `{start: Date | null, end: Date | null}`
- `onChange`: `(range) => void`
- `minDate`: `Date`
- `maxDate`: `Date`

### TimePicker

**Time selection controls with various formats.**

```tsx
import { TimePicker } from 'movingwalls-ds';

<TimePicker 
  value={selectedTime}
  onChange={setSelectedTime}
  format="12h" // or "24h"
/>
```

**Props**:
- `value`: `string`
- `onChange`: `(time: string) => void`
- `format`: `"12h" | "24h"`
- `step`: `number` (minutes)

### TimeRangePicker

**Time range selection for start and end times.**

```tsx
import { TimeRangePicker } from 'movingwalls-ds';

<TimeRangePicker 
  value={timeRange}
  onChange={setTimeRange}
  format="12h"
/>
```

**Props**:
- `value`: `{start: string, end: string}`
- `onChange`: `(range) => void`
- `format`: `"12h" | "24h"`

### Rating

**Star rating input for user feedback.**

```tsx
import { Rating } from 'movingwalls-ds';

<Rating 
  value={rating}
  onChange={setRating}
  max={5}
  allowHalf
/>

<Rating 
  value={4.5}
  readOnly
  showValue
/>
```

**Props**:
- `value`: `number`
- `onChange`: `(value: number) => void`
- `max`: `number`
- `allowHalf`: `boolean`
- `readOnly`: `boolean`
- `showValue`: `boolean`

### ToggleGroup

**Multiple choice selection with toggle buttons.**

```tsx
import { ToggleGroup, ToggleGroupItem } from 'movingwalls-ds';

<ToggleGroup 
  value={selectedValue}
  onChange={setSelectedValue}
  type="single" // or "multiple"
>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
```

**Props**:
- `type`: `"single" | "multiple"`
- `value`: `string | string[]`
- `onChange`: `(value) => void`
- `disabled`: `boolean`

### Form

**Form layout and structure with validation.**

```tsx
import { 
  Form, FormSection, FormGroup, FormField, 
  FormLabel, FormControl, FormDescription, 
  FormError, FormActions, Fieldset 
} from 'movingwalls-ds';

<Form onSubmit={handleSubmit}>
  <FormSection title="Personal Information">
    <FormField>
      <FormLabel>Name *</FormLabel>
      <FormControl>
        <Input placeholder="Your name" />
      </FormControl>
      <FormDescription>Enter your full name</FormDescription>
      <FormError>Name is required</FormError>
    </FormField>
    
    <FormField>
      <FormLabel>Email *</FormLabel>
      <FormControl>
        <Input type="email" placeholder="your@email.com" />
      </FormControl>
    </FormField>
  </FormSection>
  
  <FormActions>
    <Button type="submit">Submit</Button>
    <Button variant="outline" type="button">Cancel</Button>
  </FormActions>
</Form>
```

### FileUpload

**File upload with drag-drop interface.**

```tsx
import { FileUpload } from 'movingwalls-ds';

<FileUpload 
  onFileSelect={handleFileSelect}
  accept="image/*"
  multiple
  maxSize={5000000} // 5MB
/>

<FileUpload 
  onFileSelect={handleFileSelect}
  accept=".pdf,.doc,.docx"
  dropzoneText="Drop documents here"
/>
```

**Props**:
- `onFileSelect`: `(files: File[]) => void`
- `accept`: `string`
- `multiple`: `boolean`
- `maxSize`: `number`
- `disabled`: `boolean`

### SearchBar

**Search input with suggestions and results.**

```tsx
import { SearchBar, SearchResults } from 'movingwalls-ds';

<SearchBar 
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
  placeholder="Search..."
  suggestions={suggestions}
/>

<SearchResults 
  results={searchResults}
  onSelect={handleSelect}
  loading={isLoading}
/>
```

### Autocomplete

**Enhanced select with search and async loading.**

```tsx
import { Autocomplete } from 'movingwalls-ds';

<Autocomplete 
  options={options}
  onSearch={handleSearch}
  onChange={handleChange}
  placeholder="Search and select..."
  loading={isLoading}
/>
```

### Filter

**Advanced filtering interface with multiple criteria.**

```tsx
import { Filter } from 'movingwalls-ds';

const fields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: [...] }
];

<Filter 
  fields={fields}
  value={filters}
  onChange={setFilters}
  onApply={handleApplyFilters}
/>
```

### RichTextEditor

**WYSIWYG text editor with formatting options.**

```tsx
import { RichTextEditor } from 'movingwalls-ds';

<RichTextEditor 
  value={content}
  onChange={setContent}
  placeholder="Start writing..."
  toolbar={['bold', 'italic', 'link', 'list']}
/>
```

### DocumentEditor

**Advanced document editing with collaboration features.**

```tsx
import { DocumentEditor } from 'movingwalls-ds';

<DocumentEditor 
  content={document}
  onChange={handleDocumentChange}
  collaborative
  comments
/>
```

---

## 🎨 Display Components

### Card

**Flexible content containers with header, body, and footer.**

```tsx
import { Card, CardHeader, CardContent, CardFooter } from 'movingwalls-ds';

<Card>
  <CardHeader>
    <h3>Card Title</h3>
    <p>Card subtitle</p>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Simple card
<Card className="p-6">
  <h3 className="font-bold">Simple Card</h3>
  <p>Content here</p>
</Card>
```

**Props**:
- `variant`: `"default" | "elevated" | "outlined"`
- `padding`: `"none" | "sm" | "md" | "lg"`

### Badge

**Status and label indicators with various styles.**

```tsx
import { Badge } from 'movingwalls-ds';

<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With dot indicator
<Badge dot variant="success">Online</Badge>
```

**Props**:
- `variant`: `"primary" | "secondary" | "success" | "warning" | "error"`
- `size`: `"sm" | "md" | "lg"`
- `dot`: `boolean`

### Alert

**Contextual feedback messages with icons.**

```tsx
import { Alert } from 'movingwalls-ds';

<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="success" title="Success" dismissible>
  Operation completed successfully!
</Alert>

<Alert variant="warning" title="Warning">
  Please review your input.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

**Props**:
- `variant`: `"info" | "success" | "warning" | "error"`
- `title`: `string`
- `dismissible`: `boolean`
- `onDismiss`: `() => void`

### Avatar

**User profile images with fallbacks and grouping.**

```tsx
import { Avatar, AvatarGroup } from 'movingwalls-ds';

// Single avatar
<Avatar 
  src="/user-avatar.jpg"
  alt="John Doe"
  fallback="JD"
  size="md"
/>

// Avatar group
<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
</AvatarGroup>
```

**Props**:
- `src`: `string`
- `alt`: `string`
- `fallback`: `string`
- `size`: `"xs" | "sm" | "md" | "lg" | "xl"`

### Progress

**Progress indicators for loading states.**

```tsx
import { Progress } from 'movingwalls-ds';

<Progress value={65} max={100} />

<Progress 
  value={45} 
  max={100}
  showValue
  label="Upload progress"
/>

// Indeterminate progress
<Progress indeterminate />
```

**Props**:
- `value`: `number`
- `max`: `number`
- `showValue`: `boolean`
- `label`: `string`
- `indeterminate`: `boolean`

### Skeleton

**Loading placeholders for content.**

```tsx
import { Skeleton } from 'movingwalls-ds';

<div>
  <Skeleton className="h-4 w-full mb-2" />
  <Skeleton className="h-4 w-3/4 mb-2" />
  <Skeleton className="h-4 w-1/2" />
</div>

// Avatar skeleton
<Skeleton className="h-12 w-12 rounded-full" />

// Card skeleton
<div className="space-y-3">
  <Skeleton className="h-24 w-full rounded" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>
```

### Separator

**Content dividers with various orientations.**

```tsx
import { Separator } from 'movingwalls-ds';

<div>
  <p>Content above</p>
  <Separator />
  <p>Content below</p>
</div>

// Vertical separator
<div className="flex items-center space-x-4">
  <span>Left</span>
  <Separator orientation="vertical" className="h-6" />
  <span>Right</span>
</div>
```

**Props**:
- `orientation`: `"horizontal" | "vertical"`

### Table

**Data tables with sorting and styling.**

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from 'movingwalls-ds';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>
        <Badge variant="success">Active</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### AdvancedTable

**Comprehensive table with 50+ features including sorting, filtering, pagination, row selection, and more.**

```tsx
import { AdvancedTable } from 'movingwalls-ds';

const columns = [
  { 
    key: 'name', 
    title: 'Name', 
    sortable: true,
    filterable: true 
  },
  { 
    key: 'email', 
    title: 'Email',
    sortable: true 
  },
  { 
    key: 'status', 
    title: 'Status',
    render: (value) => <Badge variant={value}>{value}</Badge>
  }
];

<AdvancedTable 
  columns={columns}
  data={tableData}
  sortable
  filterable
  selectable
  pagination
  exportable
  onRowSelect={handleRowSelect}
  onSort={handleSort}
  onFilter={handleFilter}
/>
```

**Features**:
- ✅ Sorting (single/multi-column)
- ✅ Filtering (text, select, date, number)
- ✅ Pagination with size controls
- ✅ Row selection (single/multiple)
- ✅ Column resizing and reordering
- ✅ Bulk actions
- ✅ Export (CSV, Excel, PDF)
- ✅ Virtual scrolling for large datasets
- ✅ Sticky headers and columns
- ✅ Row expansion and grouping

### EmptyState

**No data placeholders with customizable content.**

```tsx
import { EmptyState, NoDataEmptyState, NoResultsEmptyState } from 'movingwalls-ds';

<EmptyState 
  icon={<Icon name="inbox" />}
  title="No messages"
  description="You don't have any messages yet."
  action={
    <Button>Create Message</Button>
  }
/>

// Pre-built variants
<NoDataEmptyState />
<NoResultsEmptyState onReset={clearFilters} />
```

### Chip

**Interactive tags and labels with remove functionality.**

```tsx
import { Chip, Tag } from 'movingwalls-ds';

<Chip 
  label="React"
  onRemove={() => removeTag('react')}
  variant="primary"
/>

<Tag variant="outline">JavaScript</Tag>

// Chip group
<div className="flex flex-wrap gap-2">
  {tags.map(tag => (
    <Chip 
      key={tag.id}
      label={tag.name}
      onRemove={() => removeTag(tag.id)}
    />
  ))}
</div>
```

### CollapsibleCode

**Code blocks with expand/collapse functionality.**

```tsx
import { CollapsibleCode } from 'movingwalls-ds';

<CollapsibleCode 
  code={longCodeExample}
  language="javascript"
  maxLines={10}
/>
```

### List

**Data display lists with various layouts.**

```tsx
import { List, ListItem, DescriptionList, NavigationList } from 'movingwalls-ds';

// Basic list
<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</List>

// Description list
<DescriptionList>
  <dt>Name</dt>
  <dd>John Doe</dd>
  <dt>Email</dt>
  <dd>john@example.com</dd>
</DescriptionList>

// Navigation list
<NavigationList>
  <ListItem href="/dashboard">Dashboard</ListItem>
  <ListItem href="/settings">Settings</ListItem>
</NavigationList>
```

### Carousel

**Image and content carousels with navigation.**

```tsx
import { Carousel, CarouselSlide, ImageCarousel } from 'movingwalls-ds';

<Carousel autoPlay interval={3000}>
  <CarouselSlide>
    <img src="/image1.jpg" alt="Slide 1" />
  </CarouselSlide>
  <CarouselSlide>
    <img src="/image2.jpg" alt="Slide 2" />
  </CarouselSlide>
</Carousel>

// Image carousel
<ImageCarousel 
  images={imageUrls}
  showThumbnails
  showDots
/>
```

---

## 📐 Layout Components

### Container

**Layout containers with responsive behavior.**

```tsx
import { Container, ResponsiveContainer, GridContainer, FlexContainer, Stack, HStack } from 'movingwalls-ds';

// Basic container
<Container maxWidth="lg">
  <p>Centered content with max width</p>
</Container>

// Responsive container
<ResponsiveContainer>
  <p>Responsive layout</p>
</ResponsiveContainer>

// Grid container
<GridContainer columns={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GridContainer>

// Flex containers
<FlexContainer direction="row" justify="between">
  <div>Left</div>
  <div>Right</div>
</FlexContainer>

// Stack layouts
<Stack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

<HStack spacing={2}>
  <Button>Left</Button>
  <Button>Right</Button>
</HStack>
```

### Tabs

**Tabbed interfaces with content panels.**

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'movingwalls-ds';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Overview</TabsTrigger>
    <TabsTrigger value="tab2">Details</TabsTrigger>
    <TabsTrigger value="tab3">Settings</TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1">
    <p>Overview content</p>
  </TabsContent>
  
  <TabsContent value="tab2">
    <p>Details content</p>
  </TabsContent>
  
  <TabsContent value="tab3">
    <p>Settings content</p>
  </TabsContent>
</Tabs>
```

### Accordion

**Collapsible content sections.**

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'movingwalls-ds';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Getting Started</AccordionTrigger>
    <AccordionContent>
      Learn how to get started with our platform.
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-2">
    <AccordionTrigger>Advanced Features</AccordionTrigger>
    <AccordionContent>
      Explore advanced features and capabilities.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple items can be open
<Accordion type="multiple">
  {/* ... */}
</Accordion>
```

### Collapsible

**Simple collapsible content.**

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from 'movingwalls-ds';

<Collapsible>
  <CollapsibleTrigger>
    Show more details
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Additional content that can be collapsed.</p>
  </CollapsibleContent>
</Collapsible>
```

### ScrollArea

**Custom scrollable areas with styled scrollbars.**

```tsx
import { ScrollArea } from 'movingwalls-ds';

<ScrollArea className="h-96 w-full">
  <div className="p-4">
    {/* Long content that scrolls */}
    {Array.from({ length: 100 }, (_, i) => (
      <p key={i}>Line {i + 1}</p>
    ))}
  </div>
</ScrollArea>
```

### Stepper

**Step-by-step process visualization.**

```tsx
import { Stepper } from 'movingwalls-ds';

const steps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Verify', description: 'Verify your email' },
  { title: 'Complete', description: 'You\'re all set!' }
];

<Stepper 
  steps={steps}
  currentStep={2}
  orientation="horizontal"
/>
```

### Timeline

**Chronological event display.**

```tsx
import { Timeline, TimelineItem } from 'movingwalls-ds';

<Timeline>
  <TimelineItem 
    time="2 hours ago"
    title="Order shipped"
    description="Your order has been shipped and is on its way."
    icon={<Icon name="truck" />}
  />
  
  <TimelineItem 
    time="1 day ago"
    title="Order confirmed"
    description="We've received and confirmed your order."
    icon={<Icon name="check" />}
  />
</Timeline>
```

### Sidebar

**Navigation sidebar with collapsible functionality.**

```tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger } from 'movingwalls-ds';

<Sidebar 
  isOpen={sidebarOpen}
  onOpenChange={setSidebarOpen}
  collapsible
>
  <SidebarHeader>
    <h2>Navigation</h2>
  </SidebarHeader>
  
  <SidebarContent>
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/settings">Settings</a>
    </nav>
  </SidebarContent>
  
  <SidebarFooter>
    <Button variant="ghost">Sign Out</Button>
  </SidebarFooter>
</Sidebar>

{/* Trigger button */}
<SidebarTrigger />
```

---

## 🔔 Feedback Components

### Spinner & Loading

**Loading indicators with various styles.**

```tsx
import { Spinner, Loading } from 'movingwalls-ds';

// Basic spinner
<Spinner size="md" />

// Loading component with text
<Loading text="Loading..." />

// Sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### MW Loaders

**Custom branded loading animations.**

```tsx
import { 
  MWLoader, 
  MWDotsLoader, 
  MWProgressiveLoader,
  MWHeartbeatLoader,
  MWMatrixLoader,
  MWBounceLoader
} from 'movingwalls-ds';

<MWLoader size="md" />
<MWDotsLoader color="primary" />
<MWProgressiveLoader />
<MWHeartbeatLoader />
<MWMatrixLoader />
<MWBounceLoader />
```

### Toast

**Notification messages with actions.**

```tsx
import { ToastProvider, useToast } from 'movingwalls-ds';

// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// In your component
function MyComponent() {
  const { toast } = useToast();
  
  const showToast = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
      variant: "success",
      duration: 3000
    });
  };
  
  return <Button onClick={showToast}>Save</Button>;
}
```

### Notification

**System notifications with actions and states.**

```tsx
import { Notification, NotificationList, NotificationBadge, NotificationBell } from 'movingwalls-ds';

// Single notification
<Notification 
  title="New message"
  message="You have a new message from John Doe"
  variant="info"
  timestamp={new Date()}
  onDismiss={() => {}}
/>

// Notification list
<NotificationList 
  notifications={notifications}
  onNotificationClick={handleClick}
  onNotificationDismiss={handleDismiss}
/>

// Notification bell with badge
<NotificationBell 
  count={5}
  onClick={openNotifications}
/>
```

### Snackbar

**Toast notifications with animations.**

```tsx
import { SnackbarProvider, useSnackbar } from 'movingwalls-ds';

// Wrap your app
<SnackbarProvider>
  <App />
</SnackbarProvider>

// In your component
function MyComponent() {
  const { showSnackbar } = useSnackbar();
  
  const showSuccess = () => {
    showSnackbar({
      message: "Operation successful!",
      variant: "success",
      action: {
        label: "Undo",
        onClick: handleUndo
      }
    });
  };
  
  return <Button onClick={showSuccess}>Save</Button>;
}
```

---

## 🧭 Navigation Components

### Breadcrumb

**Navigation trails showing current location.**

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from 'movingwalls-ds';

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem current>Laptop</BreadcrumbItem>
</Breadcrumb>
```

### Pagination

**Page navigation with various styles.**

```tsx
import { Pagination } from 'movingwalls-ds';

<Pagination 
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  showFirstLast
  showPrevNext
/>

// Simple pagination
<Pagination 
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
  variant="simple"
/>
```

### Menu

**Context menus and navigation with submenus.**

```tsx
import { Menu, MenuItem, MenuSeparator, MenuGroup, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem } from 'movingwalls-ds';

<Menu>
  <MenuItem onSelect={() => handleAction('edit')}>
    <Icon name="edit" />
    Edit
  </MenuItem>
  
  <MenuItem onSelect={() => handleAction('copy')}>
    <Icon name="copy" />
    Copy
  </MenuItem>
  
  <MenuSeparator />
  
  <MenuGroup label="View">
    <MenuCheckboxItem 
      checked={showSidebar}
      onCheckedChange={setShowSidebar}
    >
      Show Sidebar
    </MenuCheckboxItem>
  </MenuGroup>
  
  <MenuSeparator />
  
  <MenuRadioGroup value={theme} onValueChange={setTheme}>
    <MenuRadioItem value="light">Light</MenuRadioItem>
    <MenuRadioItem value="dark">Dark</MenuRadioItem>
    <MenuRadioItem value="system">System</MenuRadioItem>
  </MenuRadioGroup>
</Menu>
```

---

## 💫 Overlay Components

### Modal

**Dialog overlays with customizable content.**

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'movingwalls-ds';

<Modal 
  isOpen={isOpen}
  onClose={onClose}
  size="md"
>
  <ModalHeader>
    <h2>Confirm Action</h2>
  </ModalHeader>
  
  <ModalBody>
    <p>Are you sure you want to delete this item?</p>
  </ModalBody>
  
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>
      Cancel
    </Button>
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  </ModalFooter>
</Modal>
```

### Dialog

**Flexible dialog system with triggers.**

```tsx
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from 'movingwalls-ds';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        This is a dialog description.
      </DialogDescription>
    </DialogHeader>
    
    <div className="py-4">
      {/* Dialog content */}
    </div>
    
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Sheet

**Side panel drawers with slide animations.**

```tsx
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetTrigger } from 'movingwalls-ds';

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>
        Manage your account settings here.
      </SheetDescription>
    </SheetHeader>
    
    <div className="py-6">
      {/* Sheet content */}
    </div>
    
    <SheetFooter>
      <Button>Save Changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Popover

**Contextual popups with positioning.**

```tsx
import { Popover, PopoverTrigger, PopoverContent } from 'movingwalls-ds';

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  
  <PopoverContent side="top">
    <div className="p-4">
      <h4 className="font-medium">Popover Content</h4>
      <p className="text-sm text-gray-600">
        This is some popover content.
      </p>
    </div>
  </PopoverContent>
</Popover>
```

### Dropdown

**Dropdown menus with items and separators.**

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from 'movingwalls-ds';

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="outline">
      Options
      <Icon name="chevron-down" />
    </Button>
  </DropdownTrigger>
  
  <DropdownContent>
    <DropdownItem onSelect={() => handleAction('edit')}>
      Edit
    </DropdownItem>
    <DropdownItem onSelect={() => handleAction('duplicate')}>
      Duplicate
    </DropdownItem>
    <DropdownSeparator />
    <DropdownItem 
      onSelect={() => handleAction('delete')}
      className="text-red-600"
    >
      Delete
    </DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Tooltip

**Contextual help and information.**

```tsx
import { Tooltip } from 'movingwalls-ds';

<Tooltip content="This is a helpful tooltip">
  <Button variant="outline">Hover me</Button>
</Tooltip>

<Tooltip 
  content="Delete this item permanently"
  side="top"
  delay={500}
>
  <Button variant="destructive" size="sm">
    <Icon name="trash" />
  </Button>
</Tooltip>
```

---

## 🛠️ Utility Components

### Command

**Command palette with search and actions.**

```tsx
import { Command, CommandGroup, CommandItem, CommandSeparator } from 'movingwalls-ds';

<Command>
  <Command.Input placeholder="Search commands..." />
  
  <CommandGroup heading="Actions">
    <CommandItem onSelect={() => createNew()}>
      <Icon name="plus" />
      Create New
    </CommandItem>
    <CommandItem onSelect={() => openSettings()}>
      <Icon name="settings" />
      Settings
    </CommandItem>
  </CommandGroup>
  
  <CommandSeparator />
  
  <CommandGroup heading="Recent">
    <CommandItem onSelect={() => openRecent('file1')}>
      Document 1
    </CommandItem>
    <CommandItem onSelect={() => openRecent('file2')}>
      Document 2
    </CommandItem>
  </CommandGroup>
</Command>
```

### Calendar

**Calendar with date selection and events.**

```tsx
import { Calendar } from 'movingwalls-ds';

<Calendar 
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  events={calendarEvents}
  onEventClick={handleEventClick}
/>

// Date range selection
<Calendar 
  mode="range"
  selectedRange={dateRange}
  onRangeSelect={setDateRange}
/>
```

### Panel

**Resizable panels with splitters.**

```tsx
import { PanelGroup, Panel, PanelResizer, PanelHeader, SplitPanel, StackPanel, SidebarPanel } from 'movingwalls-ds';

<PanelGroup direction="horizontal">
  <Panel defaultSize={30} minSize={20}>
    <PanelHeader>Sidebar</PanelHeader>
    <div>Sidebar content</div>
  </Panel>
  
  <PanelResizer />
  
  <Panel defaultSize={70}>
    <PanelHeader>Main Content</PanelHeader>
    <div>Main content area</div>
  </Panel>
</PanelGroup>

// Split panel
<SplitPanel 
  leftPanel={<div>Left content</div>}
  rightPanel={<div>Right content</div>}
  initialSplit={0.3}
/>
```

### DataGrid

**Advanced data tables with virtual scrolling.**

```tsx
import { DataGrid } from 'movingwalls-ds';

const columns = [
  { key: 'id', title: 'ID', width: 80 },
  { key: 'name', title: 'Name', width: 200, sortable: true },
  { key: 'email', title: 'Email', width: 250, sortable: true },
  { key: 'status', title: 'Status', width: 120 }
];

<DataGrid 
  columns={columns}
  data={gridData}
  height={400}
  sortable
  filterable
  selectable
  virtualScrolling
  onRowSelect={handleRowSelect}
  onSort={handleSort}
/>
```

### TreeView

**Hierarchical data display with expand/collapse.**

```tsx
import { TreeView } from 'movingwalls-ds';

const treeData = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1.1', label: 'Reports' },
      { id: '1.2', label: 'Presentations' }
    ]
  },
  {
    id: '2',
    label: 'Images',
    children: [
      { id: '2.1', label: 'Photos' },
      { id: '2.2', label: 'Icons' }
    ]
  }
];

<TreeView 
  data={treeData}
  onNodeSelect={handleNodeSelect}
  onNodeToggle={handleNodeToggle}
  expandedNodes={expandedNodes}
  selectedNodes={selectedNodes}
/>
```

---

## 📱 Media Components

### Thumbnail

**Media preview components with various layouts.**

```tsx
import { Thumbnail, VideoThumbnail, ImageThumbnail, ThumbnailGallery } from 'movingwalls-ds';

// Basic thumbnail
<Thumbnail 
  src="/image.jpg"
  alt="Image preview"
  size="md"
  onClick={() => openFullImage()}
/>

// Video thumbnail
<VideoThumbnail 
  src="/video.mp4"
  poster="/video-poster.jpg"
  duration="2:34"
/>

// Image thumbnail with overlay
<ImageThumbnail 
  src="/photo.jpg"
  alt="Photo"
  showOverlay
  overlayContent={
    <div>
      <Icon name="heart" />
      <span>24 likes</span>
    </div>
  }
/>

// Thumbnail gallery
<ThumbnailGallery 
  images={imageUrls}
  onImageClick={openLightbox}
  columns={4}
  spacing="md"
/>
```

---

## 📄 File & Drag Components

### DragDrop

**Advanced drag and drop interfaces.**

```tsx
import { DragDrop, SortableList, useDragDrop } from 'movingwalls-ds';

// Drag and drop area
<DragDrop 
  onDrop={handleDrop}
  accept="image/*"
  multiple
>
  <div className="border-2 border-dashed p-8 text-center">
    Drop files here or click to browse
  </div>
</DragDrop>

// Sortable list
<SortableList 
  items={sortableItems}
  onReorder={handleReorder}
  renderItem={(item) => (
    <div className="p-4 bg-white rounded shadow">
      {item.title}
    </div>
  )}
/>

// Custom drag and drop with hook
function CustomDragDrop() {
  const { dragRef, dropRef, isDragging, isOver } = useDragDrop({
    onDrop: handleDrop,
    onDragStart: handleDragStart
  });
  
  return (
    <div ref={dropRef} className={isOver ? 'bg-blue-50' : ''}>
      <div ref={dragRef} className={isDragging ? 'opacity-50' : ''}>
        Draggable content
      </div>
    </div>
  );
}
```

---

## 🎯 Icon System

**Complete icon system with 2000+ Lucide icons.**

```tsx
import { Icon } from 'movingwalls-ds';

// Basic usage
<Icon name="heart" size={24} />
<Icon name="star" size="lg" />
<Icon name="check-circle" className="text-green-500" />

// Sizes
<Icon name="home" size="xs" />    {/* 12px */}
<Icon name="home" size="sm" />    {/* 16px */}
<Icon name="home" size="md" />    {/* 20px */}
<Icon name="home" size="lg" />    {/* 24px */}
<Icon name="home" size="xl" />    {/* 32px */}
<Icon name="home" size={48} />    {/* Custom size */}

// Colors and styling
<Icon name="heart" className="text-red-500" />
<Icon name="star" style={{ color: '#fbbf24' }} />

// Predefined icons with semantic names
import { 
  SearchIcon, CloseIcon, CheckIcon, 
  ChevronDownIcon, ChevronUpIcon, 
  InfoIcon, AlertTriangleIcon 
} from 'movingwalls-ds';

<SearchIcon size="md" />
<CloseIcon size="sm" />
<CheckIcon className="text-green-500" />
```

**Available Icons**: 2000+ icons from Lucide React including:
- **UI**: arrow-right, arrow-left, chevron-down, chevron-up, plus, minus, x, check
- **Actions**: edit, delete, save, copy, download, upload, refresh
- **Communication**: mail, phone, message-circle, send
- **Media**: play, pause, stop, volume, camera, image
- **Business**: calendar, clock, user, users, building, briefcase
- **And many more...**

---

## 🎨 Design Tokens

**Comprehensive design system with tokens for colors, typography, spacing, and more.**

### CSS Custom Properties

```css
/* Import design tokens */
@import 'movingwalls-ds/dist/tokens/tokens.css';

.my-component {
  /* Colors */
  color: var(--color-primary-500);
  background: var(--color-gray-50);
  border-color: var(--color-gray-200);
  
  /* Typography */
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-relaxed);
  
  /* Spacing */
  padding: var(--spacing-4) var(--spacing-6);
  margin: var(--spacing-2) 0;
  
  /* Border radius */
  border-radius: var(--radius-md);
  
  /* Shadows */
  box-shadow: var(--shadow-md);
  
  /* Transitions */
  transition: var(--transition-fast);
}
```

### SCSS Variables

```scss
@import 'movingwalls-ds/dist/tokens/tokens.scss';

.my-component {
  color: $color-primary-500;
  font-size: $font-size-lg;
  padding: $spacing-4 $spacing-6;
  border-radius: $radius-md;
  box-shadow: $shadow-md;
}
```

### JavaScript Tokens

```javascript
import tokens from 'movingwalls-ds/dist/tokens/tokens.json';

// Use in styled-components
const StyledButton = styled.button`
  background-color: ${tokens.colors.primary['500']};
  font-size: ${tokens.fontSize.lg};
  padding: ${tokens.spacing['3']} ${tokens.spacing['6']};
  border-radius: ${tokens.borderRadius.md};
`;

// Use in Tailwind config
module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      fontSize: tokens.fontSize,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius
    }
  }
};
```

### Available Token Categories

**Colors**:
- Primary: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- Gray: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- Success, Warning, Error, Info: Same scale
- White, Black, Transparent

**Typography**:
- Font Size: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- Font Weight: thin, light, normal, medium, semibold, bold, extrabold
- Line Height: tight, snug, normal, relaxed, loose

**Spacing**: 
- Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64

**Border Radius**:
- none, sm, md, lg, xl, 2xl, 3xl, full

**Shadows**:
- sm, md, lg, xl, 2xl, inner, none

**Breakpoints**:
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

---

## 🔧 TypeScript Support

All components come with complete TypeScript definitions:

```tsx
import { ButtonProps, CardProps, ModalProps } from 'movingwalls-ds';

// Component props
interface MyComponentProps {
  variant: ButtonProps['variant'];
  size: CardProps['size'];
  onClose: ModalProps['onClose'];
}

// Type-safe component usage
const MyComponent: React.FC<MyComponentProps> = ({ variant, size, onClose }) => {
  return (
    <Card size={size}>
      <Button variant={variant} onClick={onClose}>
        Close
      </Button>
    </Card>
  );
};
```

---

## 📚 Examples & Patterns

### Dashboard Layout

```tsx
import { 
  Container, Sidebar, SidebarHeader, SidebarContent,
  Card, CardHeader, CardContent, Button, Badge,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from 'movingwalls-ds';

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader>Dashboard</SidebarHeader>
        <SidebarContent>
          <nav>/* Navigation items */</nav>
        </SidebarContent>
      </Sidebar>
      
      <main className="flex-1 overflow-auto">
        <Container className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>Total Users</CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234</div>
                <Badge variant="success">+12%</Badge>
              </CardContent>
            </Card>
            {/* More stat cards */}
          </div>
          
          <Card>
            <CardHeader>Recent Activity</CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Table rows */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  );
}
```

### Form with Validation

```tsx
import { 
  Form, FormField, FormLabel, FormControl, FormError,
  Input, Select, Switch, Button, Card
} from 'movingwalls-ds';

function UserForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  
  return (
    <Card className="max-w-md mx-auto">
      <Form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel>Name *</FormLabel>
          <FormControl>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              error={errors.name}
            />
          </FormControl>
          {errors.name && <FormError>{errors.name}</FormError>}
        </FormField>
        
        <FormField>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Select 
              options={roleOptions}
              value={formData.role}
              onChange={(value) => setFormData({...formData, role: value})}
            />
          </FormControl>
        </FormField>
        
        <FormField>
          <Switch 
            checked={formData.notifications}
            onChange={(checked) => setFormData({...formData, notifications: checked})}
            label="Email notifications"
          />
        </FormField>
        
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button variant="outline" type="button">Cancel</Button>
        </div>
      </Form>
    </Card>
  );
}
```

---

## 📖 Additional Resources

- **🌐 Live Demo**: https://mwdesignsystem.netlify.app
- **📦 NPM Package**: https://www.npmjs.com/package/movingwalls-ds
- **💻 GitHub Repository**: https://github.com/VivekanandDesign/MWDesign
- **📋 CDN Usage**: See [USAGE.md](./USAGE.md) for CDN implementation examples

---

**MovingWalls Design System** - Built with ❤️ for React developers worldwide.

> All components are accessible, responsive, and follow modern design principles. Perfect for building production-ready applications with consistent design and excellent developer experience.
