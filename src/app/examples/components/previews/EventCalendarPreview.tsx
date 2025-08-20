'use client'

import { useState, useMemo } from 'react'
import { Calendar } from '@/components/ui/Calendar'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal'
import { Form, FormField, FormLabel, FormControl } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Edit2, 
  Trash2,
  Filter,
  Search,
  Download,
  Settings
} from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  date: Date
  color?: string
  allDay?: boolean
  startTime?: string
  endTime?: string
  description?: string
  category?: string
  attendees?: string[]
  location?: string
}

// Generate sample events
const generateSampleEvents = (): CalendarEvent[] => {
  const today = new Date()
  const events: CalendarEvent[] = []
  
  // Current month events
  for (let i = 0; i < 15; i++) {
    const eventDate = new Date(today.getFullYear(), today.getMonth(), Math.floor(Math.random() * 28) + 1)
    events.push({
      id: `event-${i + 1}`,
      title: [
        'Team Standup',
        'Client Meeting',
        'Design Review',
        'Sprint Planning',
        'Code Review',
        'Product Demo',
        'All Hands',
        'Workshop',
        'Training Session',
        'Project Kickoff'
      ][i % 10],
      date: eventDate,
      color: ['blue', 'green', 'red', 'yellow', 'purple'][Math.floor(Math.random() * 5)],
      allDay: Math.random() > 0.7,
      startTime: `${9 + Math.floor(Math.random() * 8)}:${['00', '30'][Math.floor(Math.random() * 2)]}`,
      endTime: `${10 + Math.floor(Math.random() * 6)}:${['00', '30'][Math.floor(Math.random() * 2)]}`,
      description: 'Important team meeting to discuss project progress and next steps.',
      category: ['meeting', 'workshop', 'deadline', 'social'][Math.floor(Math.random() * 4)],
      attendees: ['john@example.com', 'jane@example.com', 'bob@example.com'].slice(0, Math.floor(Math.random() * 3) + 1),
      location: ['Creative Studio', 'Virtual - Teams', 'Brand Lounge', 'Client Experience Center'][Math.floor(Math.random() * 4)]
    })
  }
  
  return events
}

export function EventCalendarPreview() {
  const [events, setEvents] = useState<CalendarEvent[]>(generateSampleEvents())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  // Filter events by category
  const filteredEvents = useMemo(() => {
    if (filterCategory === 'all') return events
    return events.filter(event => event.category === filterCategory)
  }, [events, filterCategory])

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    return filteredEvents.filter(event => 
      event.date.toDateString() === selectedDate.toDateString()
    )
  }, [filteredEvents, selectedDate])

  // Statistics
  const stats = useMemo(() => {
    const today = new Date()
    const thisMonth = filteredEvents.filter(event => 
      event.date.getMonth() === today.getMonth() && 
      event.date.getFullYear() === today.getFullYear()
    )
    
    return {
      totalEvents: filteredEvents.length,
      thisMonth: thisMonth.length,
      upcoming: filteredEvents.filter(event => event.date >= today).length,
      categories: [...new Set(filteredEvents.map(e => e.category))].length
    }
  }, [filteredEvents])

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsEditing(false)
    setIsEventModalOpen(true)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleCreateEvent = () => {
    setSelectedEvent(null)
    setIsEditing(true)
    setIsEventModalOpen(true)
  }

  const handleEditEvent = () => {
    setIsEditing(true)
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(prev => prev.filter(e => e.id !== selectedEvent.id))
      setIsEventModalOpen(false)
      setSelectedEvent(null)
    }
  }

  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    if (isEditing && selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, ...eventData }
          : e
      ))
    } else if (isEditing) {
      // Create new event
      const newEvent: CalendarEvent = {
        id: `event-${Date.now()}`,
        title: eventData.title || 'New Event',
        date: selectedDate,
        color: eventData.color || 'blue',
        allDay: eventData.allDay || false,
        startTime: eventData.startTime || '09:00',
        endTime: eventData.endTime || '10:00',
        description: eventData.description || '',
        category: eventData.category || 'meeting',
        attendees: eventData.attendees || [],
        location: eventData.location || ''
      }
      setEvents(prev => [...prev, newEvent])
    }
    setIsEventModalOpen(false)
    setSelectedEvent(null)
    setIsEditing(false)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-mw-primary-100 dark:bg-mw-primary-900/30 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-mw-primary-600 dark:text-mw-primary-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.totalEvents}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Total Events
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.thisMonth}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  This Month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.upcoming}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Upcoming
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.categories}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Categories
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button onClick={handleCreateEvent} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">View:</span>
            <div className="flex rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-sm capitalize transition-colors ${
                    viewMode === mode
                      ? 'bg-mw-primary-600 text-white'
                      : 'text-mw-gray-600 dark:text-mw-gray-400 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800'
                  } ${mode === 'month' ? 'rounded-l-md' : mode === 'day' ? 'rounded-r-md' : ''}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'meeting', label: 'Meetings' },
              { value: 'workshop', label: 'Workshops' },
              { value: 'deadline', label: 'Deadlines' },
              { value: 'social', label: 'Social' }
            ]}
            className="w-40"
          />
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

        {/* Main Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Calendar
              value={selectedDate}
              onChange={handleDateClick}
              events={filteredEvents}
              onEventClick={handleEventClick}
              view={viewMode}
              onViewChange={setViewMode}
              showViewModeButtons={false}
              className="w-full"
            />
          </div>        {/* Event Details Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg cursor-pointer hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800 transition-colors"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                event.color === 'blue' ? 'bg-blue-500' :
                                event.color === 'green' ? 'bg-green-500' :
                                event.color === 'red' ? 'bg-red-500' :
                                event.color === 'yellow' ? 'bg-yellow-500' :
                                'bg-purple-500'
                              }`}
                            />
                            <h4 className="font-medium text-mw-gray-900 dark:text-white text-sm">
                              {event.title}
                            </h4>
                          </div>
                          <div className="mt-1 text-xs text-mw-gray-600 dark:text-mw-gray-400">
                            {event.allDay ? 'All day' : `${event.startTime} - ${event.endTime}`}
                          </div>
                          {event.location && (
                            <div className="mt-1 flex items-center space-x-1 text-xs text-mw-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-mw-gray-500 dark:text-mw-gray-400">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No events for this date</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={handleCreateEvent}
                  >
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Modal */}
      <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)}>
        <ModalHeader>
          <h2 className="text-lg font-semibold">
            {isEditing ? (selectedEvent ? 'Edit Event' : 'Create Event') : 'Event Details'}
          </h2>
        </ModalHeader>
        <ModalBody>
          {selectedEvent && !isEditing ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  {selectedEvent.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">{selectedEvent.category}</Badge>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedEvent.color === 'blue' ? 'bg-blue-500' :
                      selectedEvent.color === 'green' ? 'bg-green-500' :
                      selectedEvent.color === 'red' ? 'bg-red-500' :
                      selectedEvent.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Date:</span>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400">
                    {selectedEvent.date.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Time:</span>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400">
                    {selectedEvent.allDay ? 'All day' : `${selectedEvent.startTime} - ${selectedEvent.endTime}`}
                  </p>
                </div>
                {selectedEvent.location && (
                  <div className="col-span-2">
                    <span className="font-medium">Location:</span>
                    <p className="text-mw-gray-600 dark:text-mw-gray-400">
                      {selectedEvent.location}
                    </p>
                  </div>
                )}
              </div>
              
              {selectedEvent.description && (
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400 mt-1">
                    {selectedEvent.description}
                  </p>
                </div>
              )}
              
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div>
                  <span className="font-medium">Attendees:</span>
                  <div className="flex items-center space-x-2 mt-2">
                    {selectedEvent.attendees.slice(0, 3).map((attendee, index) => (
                      <Avatar key={index} className="w-6 h-6">
                        <span className="text-xs">{attendee[0].toUpperCase()}</span>
                      </Avatar>
                    ))}
                    {selectedEvent.attendees.length > 3 && (
                      <span className="text-xs text-mw-gray-500">
                        +{selectedEvent.attendees.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Form className="space-y-4">
              <FormField>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter event title"
                    defaultValue={selectedEvent?.title || ''}
                  />
                </FormControl>
              </FormField>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={selectedEvent?.category || 'meeting'}
                      onChange={() => {}}
                      options={[
                        { value: 'meeting', label: 'Meeting' },
                        { value: 'workshop', label: 'Workshop' },
                        { value: 'deadline', label: 'Deadline' },
                        { value: 'social', label: 'Social' }
                      ]}
                    />
                  </FormControl>
                </FormField>
                
                <FormField>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={selectedEvent?.color || 'blue'}
                      onChange={() => {}}
                      options={[
                        { value: 'blue', label: 'Blue' },
                        { value: 'green', label: 'Green' },
                        { value: 'red', label: 'Red' },
                        { value: 'yellow', label: 'Yellow' },
                        { value: 'purple', label: 'Purple' }
                      ]}
                    />
                  </FormControl>
                </FormField>
              </div>
              
              <FormField>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location"
                    defaultValue={selectedEvent?.location || ''}
                  />
                </FormControl>
              </FormField>
              
              <FormField>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter event description"
                    defaultValue={selectedEvent?.description || ''}
                    rows={3}
                  />
                </FormControl>
              </FormField>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedEvent && !isEditing ? (
            <div className="flex justify-between w-full">
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleEditEvent}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={handleDeleteEvent}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
              <Button onClick={() => setIsEventModalOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEventModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveEvent({})}>
                {selectedEvent ? 'Update' : 'Create'} Event
              </Button>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </div>
  )
}
