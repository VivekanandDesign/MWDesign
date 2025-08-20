'use client'

import { useState, useMemo } from 'react'
import { AdvancedTable, AdvancedTableColumn, AdvancedTableState } from '@/components/ui/AdvancedTable'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  User, 
  CheckCircle,
  XCircle,
  Clock,
  Star,
  TrendingUp,
  FileText,
  Users,
  DollarSign
} from 'lucide-react'

// Sample data interface
interface Employee {
  id: number
  name: string
  email: string
  department: string
  position: string
  salary: number
  performanceScore: number
  status: 'active' | 'inactive' | 'pending'
  joinDate: Date
  phone: string
  projects: number
  completedTasks: number
  totalTasks: number
  rating: number
  isRemote: boolean
}

// Generate sample data
const generateSampleData = (): Employee[] => {
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance']
  const positions = ['Senior', 'Mid-level', 'Junior', 'Lead', 'Manager', 'Director']
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending']
  
  return Array.from({ length: 25 }, (_, i) => {
    const deptIndex = i % departments.length
    const joinDate = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
    const totalTasks = 20 + Math.floor(Math.random() * 30)
    const completedTasks = Math.floor(totalTasks * (0.6 + Math.random() * 0.4))
    
    return {
      id: i + 1,
      name: `Employee ${i + 1}`,
      email: `employee${i + 1}@movingwalls.com`,
      department: departments[deptIndex],
      position: `${positions[Math.floor(Math.random() * positions.length)]} ${departments[deptIndex].slice(0, -1)}`,
      salary: 50000 + Math.floor(Math.random() * 100000),
      performanceScore: 60 + Math.floor(Math.random() * 40),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      joinDate,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      projects: 1 + Math.floor(Math.random() * 8),
      completedTasks,
      totalTasks,
      rating: 3 + Math.random() * 2,
      isRemote: Math.random() > 0.6
    }
  })
}

export function AdvancedTablePreview() {
  const [data] = useState<Employee[]>(generateSampleData())
  const [tableState, setTableState] = useState<Partial<AdvancedTableState>>({
    sorting: [{ columnId: 'name', direction: 'asc' }],
    filters: [],
    globalFilter: '',
    columnVisibility: {},
    density: 'normal'
  })
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(8)

  // Define columns
  const columns: AdvancedTableColumn<Employee>[] = [
    {
      id: 'employee',
      header: 'Employee',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
      searchable: true,
      sticky: 'left',
      minWidth: 200,
      cell: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <span className="text-xs font-medium">
              {row.name.split(' ').map(n => n[0]).join('')}
            </span>
          </Avatar>
          <div>
            <div className="font-medium text-mw-gray-900 dark:text-white">
              {row.name}
            </div>
            <div className="text-xs text-mw-gray-500 dark:text-mw-gray-400">
              {row.email}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
      sortable: true,
      filterable: true,
      type: 'badge',
      cell: (value) => (
        <Badge variant="secondary" className="text-xs">
          {value}
        </Badge>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      type: 'badge',
      cell: (value) => {
        const variants = {
          active: 'success',
          inactive: 'error',
          pending: 'warning'
        } as const
        
        const icons = {
          active: <CheckCircle className="w-3 h-3" />,
          inactive: <XCircle className="w-3 h-3" />,
          pending: <Clock className="w-3 h-3" />
        }
        
        return (
          <Badge variant={variants[value as keyof typeof variants]} className="text-xs flex items-center space-x-1">
            {icons[value as keyof typeof icons]}
            <span className="capitalize">{value}</span>
          </Badge>
        )
      }
    },
    {
      id: 'performance',
      header: 'Performance',
      accessorKey: 'performanceScore',
      sortable: true,
      filterable: true,
      type: 'progress',
      align: 'center',
      cell: (value) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-mw-gray-200 dark:bg-mw-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                value >= 80 ? 'bg-green-500' :
                value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-xs font-medium min-w-[3rem]">{value}%</span>
        </div>
      )
    },
    {
      id: 'salary',
      header: 'Salary',
      accessorKey: 'salary',
      sortable: true,
      filterable: true,
      type: 'number',
      align: 'right',
      cell: (value) => (
        <span className="font-medium">
          ${value.toLocaleString()}
        </span>
      )
    },
    {
      id: 'rating',
      header: 'Rating',
      accessorKey: 'rating',
      sortable: true,
      align: 'center',
      cell: (value) => (
        <div className="flex items-center justify-center space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(value)
                  ? 'text-yellow-500 fill-current'
                  : 'text-mw-gray-300 dark:text-mw-gray-600'
              }`}
            />
          ))}
          <span className="text-xs ml-1 text-mw-gray-600 dark:text-mw-gray-400">
            {value.toFixed(1)}
          </span>
        </div>
      )
    },
    {
      id: 'remote',
      header: 'Remote',
      accessorKey: 'isRemote',
      sortable: true,
      filterable: true,
      type: 'boolean',
      align: 'center'
    }
  ]

  // Row actions
  const rowActions = [
    {
      label: 'View Details',
      icon: <Eye className="w-4 h-4" />,
      onClick: (row: Employee) => {
        console.log('View employee:', row.name)
      },
      tooltip: 'View employee details'
    },
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: (row: Employee) => {
        console.log('Edit employee:', row.name)
      },
      tooltip: 'Edit employee information'
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      variant: 'destructive' as const,
      onClick: (row: Employee) => {
        console.log('Delete employee:', row.name)
      },
      disabled: (row: Employee) => row.status === 'active',
      tooltip: 'Delete employee (disabled for active employees)'
    }
  ]

  // Bulk actions
  const bulkActions = [
    {
      label: 'Export Selected',
      icon: <Download className="w-4 h-4" />,
      onClick: (rows: Employee[]) => {
        console.log('Export employees:', rows.map(r => r.name))
      },
      tooltip: 'Export selected employees to CSV'
    },
    {
      label: 'Deactivate',
      icon: <XCircle className="w-4 h-4" />,
      variant: 'destructive' as const,
      onClick: (rows: Employee[]) => {
        console.log('Deactivate employees:', rows.map(r => r.name))
      }
    }
  ]

  // Toolbar actions
  const toolbarActions = [
    {
      label: 'Add Employee',
      icon: <User className="w-4 h-4" />,
      variant: 'primary' as const,
      onClick: () => {
        console.log('Add new employee')
      }
    },
    {
      label: 'Export All',
      icon: <Download className="w-4 h-4" />,
      onClick: () => {
        console.log('Export all employees')
      }
    }
  ]

  // Pagination data
  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize])

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-mw-gray-800 p-4 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-mw-primary-100 dark:bg-mw-primary-900/30 rounded-lg">
              <Users className="w-5 h-5 text-mw-primary-600 dark:text-mw-primary-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-mw-gray-900 dark:text-white">
                {data.length}
              </div>
              <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Total Employees
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-mw-gray-800 p-4 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-mw-gray-900 dark:text-white">
                {data.filter(emp => emp.status === 'active').length}
              </div>
              <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Active
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-mw-gray-800 p-4 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-mw-gray-900 dark:text-white">
                {Math.round(data.reduce((sum, emp) => sum + emp.performanceScore, 0) / data.length)}%
              </div>
              <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Avg Performance
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-mw-gray-800 p-4 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-mw-flow-100 dark:bg-mw-flow-900/30 rounded-lg">
              <DollarSign className="w-5 h-5 text-mw-flow-600 dark:text-mw-flow-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-mw-gray-900 dark:text-white">
                ${Math.round(data.reduce((sum, emp) => sum + emp.salary, 0) / data.length / 1000)}K
              </div>
              <div className="text-sm text-mw-gray-600 dark:text-mw-gray-400">
                Avg Salary
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Table */}
      <AdvancedTable
        data={paginatedData}
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
        
        // Selection
        selection={{
          mode: 'multiple',
          selectedRows: selectedRows,
          onSelectionChange: (newSelection, selectedData) => {
            setSelectedRows(newSelection)
            console.log('Selected employees:', selectedData.map(emp => emp.name))
          }
        }}
        
        // Pagination
        pagination={{
          pageIndex: currentPage,
          pageSize: pageSize,
          total: data.length,
          onPageChange: setCurrentPage,
          onPageSizeChange: (newSize) => {
            setPageSize(newSize)
            setCurrentPage(0)
          },
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: true,
          pageSizeOptions: [5, 8, 10, 25]
        }}
        
        // Actions
        rowActions={rowActions}
        bulkActions={bulkActions}
        toolbarActions={toolbarActions}
        
        // Styling
        striped={true}
        hoverable={true}
        stickyHeader={true}
        maxHeight="500px"
        
        // Event handlers
        onRowClick={(row) => console.log('Row clicked:', row.name)}
        onCellClick={(value, row, column) => {
          console.log('Cell clicked:', { value, employee: row.name, column: column.id })
        }}
        
        className="shadow-lg"
      />
    </div>
  )
}
