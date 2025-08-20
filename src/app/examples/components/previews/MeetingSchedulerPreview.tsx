'use client'

import { useState, useMemo } from 'react'
import { Calendar } from '@/components/ui/Calendar'
import { TimePicker } from '@/components/ui/TimePicker'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal'
import { Form, FormField, FormLabel, FormControl } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Switch } from '@/components/ui/Switch'
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
  Video,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  RefreshCw
} from 'lucide-react'

interface TimeSlot {
  start: string
  end: string
  available: boolean
  room?: string
  attendees?: string[]
}

interface Meeting {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  room: string
  organizer: string
  attendees: string[]
  status: 'confirmed' | 'tentative' | 'cancelled'
  isRecurring: boolean
  recurringPattern?: string
  timezone: string
  description?: string
  type: 'meeting' | 'interview' | 'presentation' | 'workshop'
}

interface Room {
  id: string
  name: string
  capacity: number
  equipment: string[]
  available: boolean
}

// Generate sample data
const generateSampleMeetings = (): Meeting[] => {
  const today = new Date()
  const meetings: Meeting[] = []
  
  const titles = [
    'Team Standup',
    'Client Review',
    'Sprint Planning',
    'Design Workshop',
    'Code Review',
    'Project Kickoff',
    'Strategy Session',
    'Training Session',
    'Interview - Frontend Dev',
    'Board Meeting'
  ]
  
  for (let i = 0; i < 12; i++) {
    const meetingDate = new Date(today.getFullYear(), today.getMonth(), Math.floor(Math.random() * 28) + 1)
    const startHour = 9 + Math.floor(Math.random() * 8)
    
    meetings.push({
      id: `meeting-${i + 1}`,
      title: titles[i % titles.length],
      date: meetingDate,
      startTime: `${startHour.toString().padStart(2, '0')}:00`,
      endTime: `${(startHour + 1).toString().padStart(2, '0')}:00`,
      room: ['Creative Studio', 'Innovation Hub', 'Collaboration Space', 'Virtual - Teams'][Math.floor(Math.random() * 4)],
      organizer: 'john.doe@company.com',
      attendees: [
        'jane.smith@company.com',
        'bob.wilson@company.com',
        'alice.brown@company.com'
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      status: ['confirmed', 'tentative', 'cancelled'][Math.floor(Math.random() * 3)] as any,
      isRecurring: Math.random() > 0.7,
      recurringPattern: Math.random() > 0.5 ? 'Weekly' : 'Daily',
      timezone: 'America/New_York',
      description: 'Important team meeting to discuss project progress.',
      type: ['meeting', 'interview', 'presentation', 'workshop'][Math.floor(Math.random() * 4)] as any
    })
  }
  
  return meetings
}

const generateRooms = (): Room[] => [
  {
    id: 'room-1',
    name: 'Creative Studio',
    capacity: 12,
    equipment: ['Smart Display', 'Digital Whiteboard', 'Video Conference'],
    available: true
  },
  {
    id: 'room-2',
    name: 'Innovation Hub',
    capacity: 8,
    equipment: ['Interactive Screen', 'Wireless Presentation'],
    available: false
  },
  {
    id: 'room-3',
    name: 'Collaboration Space',
    capacity: 4,
    equipment: ['Touch Display', 'Wireless Connectivity'],
    available: true
  },
  {
    id: 'room-4',
    name: 'Executive Boardroom',
    capacity: 16,
    equipment: ['Premium Display', 'Video Conference', 'Audio System'],
    available: true
  }
]

export function MeetingSchedulerPreview() {
  const [meetings, setMeetings] = useState<Meeting[]>(generateSampleMeetings())
  const [rooms] = useState<Room[]>(generateRooms())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [viewMode, setViewMode] = useState<'calendar' | 'schedule' | 'rooms'>('calendar')

  // Generate time slots for selected date
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = []
    const selectedDateMeetings = meetings.filter(m => 
      m.date.toDateString() === selectedDate.toDateString()
    )
    
    for (let hour = 9; hour < 18; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`
      const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`
      
      const conflictingMeeting = selectedDateMeetings.find(m => 
        m.startTime === startTime || 
        (m.startTime < startTime && m.endTime > startTime)
      )
      
      slots.push({
        start: startTime,
        end: endTime,
        available: !conflictingMeeting,
        room: conflictingMeeting?.room,
        attendees: conflictingMeeting?.attendees
      })
    }
    
    return slots
  }, [meetings, selectedDate])

  // Statistics
  const stats = useMemo(() => {
    const today = new Date()
    const thisWeek = meetings.filter(m => {
      const diff = Math.abs(m.date.getTime() - today.getTime())
      return diff <= 7 * 24 * 60 * 60 * 1000
    })
    
    return {
      totalMeetings: meetings.length,
      thisWeek: thisWeek.length,
      confirmed: meetings.filter(m => m.status === 'confirmed').length,
      availableRooms: rooms.filter(r => r.available).length
    }
  }, [meetings, rooms])

  const handleCreateMeeting = (timeSlot?: TimeSlot) => {
    setSelectedTimeSlot(timeSlot || null)
    setSelectedMeeting(null)
    setIsCreating(true)
    setIsMeetingModalOpen(true)
  }

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setIsCreating(false)
    setIsMeetingModalOpen(true)
  }

  const handleSaveMeeting = () => {
    // Placeholder for saving logic
    setIsMeetingModalOpen(false)
    setSelectedMeeting(null)
    setIsCreating(false)
  }

  const handleDeleteMeeting = () => {
    if (selectedMeeting) {
      setMeetings(prev => prev.filter(m => m.id !== selectedMeeting.id))
      setIsMeetingModalOpen(false)
      setSelectedMeeting(null)
    }
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
                  {stats.totalMeetings}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Total Meetings
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.confirmed}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Confirmed
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.thisWeek}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  This Week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-mw-gray-900 dark:text-white">
                  {stats.availableRooms}
                </div>
                <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                  Available Rooms
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Button onClick={() => handleCreateMeeting()} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Schedule Meeting</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-mw-gray-600 dark:text-mw-gray-400">View:</span>
            <div className="flex rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
              {(['calendar', 'schedule', 'rooms'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-sm capitalize transition-colors ${
                    viewMode === mode
                      ? 'bg-mw-primary-600 text-white'
                      : 'text-mw-gray-600 dark:text-mw-gray-400 hover:bg-mw-gray-100 dark:hover:bg-mw-gray-800'
                  } ${mode === 'calendar' ? 'rounded-l-md' : mode === 'rooms' ? 'rounded-r-md' : ''}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Calendar
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {viewMode === 'calendar' && (
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              events={meetings.map(m => ({
                id: m.id,
                title: m.title,
                date: m.date,
                color: m.status === 'confirmed' ? 'green' : m.status === 'tentative' ? 'yellow' : 'red'
              }))}
              onEventClick={(event) => {
                const meeting = meetings.find(m => m.id === event.id)
                if (meeting) handleMeetingClick(meeting)
              }}
              className="w-full"
            />
          )}

          {viewMode === 'schedule' && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                  Schedule for {selectedDate.toLocaleDateString()}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        slot.available
                          ? 'border-mw-gray-200 dark:border-mw-gray-700 hover:border-mw-primary-300 hover:bg-mw-primary-50 dark:hover:bg-mw-primary-900/20'
                          : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                      }`}
                      onClick={() => slot.available && handleCreateMeeting(slot)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-medium text-mw-gray-900 dark:text-white">
                            {slot.start} - {slot.end}
                          </div>
                          {slot.available ? (
                            <Badge variant="success" className="text-xs">Available</Badge>
                          ) : (
                            <Badge variant="error" className="text-xs">Occupied</Badge>
                          )}
                        </div>
                        {!slot.available && slot.room && (
                          <div className="text-xs text-mw-gray-600 dark:text-mw-gray-400">
                            {slot.room}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {viewMode === 'rooms' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <Card key={room.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                        {room.name}
                      </h3>
                      <Badge variant={room.available ? 'success' : 'error'} className="text-xs">
                        {room.available ? 'Available' : 'In Use'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="w-4 h-4 text-mw-gray-400" />
                        <span className="text-mw-gray-600 dark:text-mw-gray-400">
                          Capacity: {room.capacity} people
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-mw-gray-900 dark:text-white">Equipment:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {room.equipment.map((equipment, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {equipment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full" 
                        disabled={!room.available}
                        onClick={() => handleCreateMeeting()}
                      >
                        Book Room
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Today's Meetings */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Today's Meetings
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meetings
                  .filter(m => m.date.toDateString() === new Date().toDateString())
                  .slice(0, 3)
                  .map((meeting) => (
                    <div
                      key={meeting.id}
                      className="p-3 border border-mw-gray-200 dark:border-mw-gray-700 rounded-lg cursor-pointer hover:bg-mw-gray-50 dark:hover:bg-mw-gray-800 transition-colors"
                      onClick={() => handleMeetingClick(meeting)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-mw-gray-900 dark:text-white text-sm">
                            {meeting.title}
                          </h4>
                          <div className="mt-1 text-xs text-mw-gray-600 dark:text-mw-gray-400">
                            {meeting.startTime} - {meeting.endTime}
                          </div>
                          <div className="mt-1 flex items-center space-x-1 text-xs text-mw-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{meeting.room}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            meeting.status === 'confirmed' ? 'success' :
                            meeting.status === 'tentative' ? 'warning' : 'error'
                          } 
                          className="text-xs"
                        >
                          {meeting.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white">
                Quick Actions
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Start Instant Meeting
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  Schedule Recurring
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Find Available Time
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Meeting Modal */}
      <Modal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)}>
        <ModalHeader>
          <h2 className="text-lg font-semibold">
            {isCreating ? 'Schedule New Meeting' : 'Meeting Details'}
          </h2>
        </ModalHeader>
        <ModalBody>
          {selectedMeeting && !isCreating ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-mw-gray-900 dark:text-white">
                  {selectedMeeting.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">{selectedMeeting.type}</Badge>
                  <Badge 
                    variant={
                      selectedMeeting.status === 'confirmed' ? 'success' :
                      selectedMeeting.status === 'tentative' ? 'warning' : 'error'
                    }
                  >
                    {selectedMeeting.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Date:</span>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400">
                    {selectedMeeting.date.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Time:</span>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400">
                    {selectedMeeting.startTime} - {selectedMeeting.endTime}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Room:</span>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400">
                    {selectedMeeting.room}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Timezone:</span>
                  <p className="text-mw-gray-600 dark:text-mw-gray-400">
                    {selectedMeeting.timezone}
                  </p>
                </div>
              </div>
              
              <div>
                <span className="font-medium">Attendees:</span>
                <div className="flex items-center space-x-2 mt-2">
                  {selectedMeeting.attendees.slice(0, 3).map((attendee, index) => (
                    <Avatar key={index} className="w-6 h-6">
                      <span className="text-xs">{attendee[0].toUpperCase()}</span>
                    </Avatar>
                  ))}
                  {selectedMeeting.attendees.length > 3 && (
                    <span className="text-xs text-mw-gray-500">
                      +{selectedMeeting.attendees.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Form className="space-y-4">
              <FormField>
                <FormLabel>Meeting Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter meeting title" />
                </FormControl>
              </FormField>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <TimePicker 
                      value={selectedTimeSlot?.start || '09:00'}
                      onChange={() => {}}
                    />
                  </FormControl>
                </FormField>
                
                <FormField>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <TimePicker 
                      value={selectedTimeSlot?.end || '10:00'}
                      onChange={() => {}}
                    />
                  </FormControl>
                </FormField>
              </div>
              
              <FormField>
                <FormLabel>Room</FormLabel>
                <FormControl>
                  <Select
                    onChange={() => {}}
                    options={rooms.map(room => ({
                      value: room.id,
                      label: `${room.name} (${room.capacity} people)`,
                      disabled: !room.available
                    }))}
                  />
                </FormControl>
              </FormField>
              
              <FormField>
                <FormLabel>Attendees</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email addresses separated by commas" />
                </FormControl>
              </FormField>
              
              <FormField>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Meeting agenda and notes" rows={3} />
                </FormControl>
              </FormField>
              
              <div className="flex items-center space-x-4">
                <Switch label="Recurring Meeting" />
                <Switch label="Send Invitations" />
              </div>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedMeeting && !isCreating ? (
            <div className="flex justify-between w-full">
              <Button variant="destructive" onClick={handleDeleteMeeting}>
                Cancel Meeting
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsMeetingModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => setIsCreating(true)}>
                  Edit Meeting
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsMeetingModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveMeeting}>
                Schedule Meeting
              </Button>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </div>
  )
}
