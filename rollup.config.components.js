// Auto-generated Rollup configuration for component bundles
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const external = ['react', 'react-dom'];
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

const baseConfig = {
  external,
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs({
      include: /node_modules/
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      rootDir: './src'
    }),
    postcss({
      extract: false,
      inject: true,
      minimize: true
    })
  ]
};

export default [
  // Individual component bundles
  
  {
    ...baseConfig,
    input: 'src/components/ui/Accordion.tsx',
    output: [
      {
        file: 'dist/components/accordion.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/accordion.umd.js',
        format: 'umd',
        name: 'MovingWallsAccordion',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/AdvancedTable.tsx',
    output: [
      {
        file: 'dist/components/advancedtable.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/advancedtable.umd.js',
        format: 'umd',
        name: 'MovingWallsAdvancedTable',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Alert.tsx',
    output: [
      {
        file: 'dist/components/alert.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/alert.umd.js',
        format: 'umd',
        name: 'MovingWallsAlert',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Autocomplete.tsx',
    output: [
      {
        file: 'dist/components/autocomplete.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/autocomplete.umd.js',
        format: 'umd',
        name: 'MovingWallsAutocomplete',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Avatar.tsx',
    output: [
      {
        file: 'dist/components/avatar.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/avatar.umd.js',
        format: 'umd',
        name: 'MovingWallsAvatar',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Badge.tsx',
    output: [
      {
        file: 'dist/components/badge.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/badge.umd.js',
        format: 'umd',
        name: 'MovingWallsBadge',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Breadcrumb.tsx',
    output: [
      {
        file: 'dist/components/breadcrumb.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/breadcrumb.umd.js',
        format: 'umd',
        name: 'MovingWallsBreadcrumb',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Button.tsx',
    output: [
      {
        file: 'dist/components/button.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/button.umd.js',
        format: 'umd',
        name: 'MovingWallsButton',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Calendar.tsx',
    output: [
      {
        file: 'dist/components/calendar.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/calendar.umd.js',
        format: 'umd',
        name: 'MovingWallsCalendar',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Card.tsx',
    output: [
      {
        file: 'dist/components/card.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/card.umd.js',
        format: 'umd',
        name: 'MovingWallsCard',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Carousel.tsx',
    output: [
      {
        file: 'dist/components/carousel.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/carousel.umd.js',
        format: 'umd',
        name: 'MovingWallsCarousel',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Checkbox.tsx',
    output: [
      {
        file: 'dist/components/checkbox.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/checkbox.umd.js',
        format: 'umd',
        name: 'MovingWallsCheckbox',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Chip.tsx',
    output: [
      {
        file: 'dist/components/chip.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/chip.umd.js',
        format: 'umd',
        name: 'MovingWallsChip',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Collapsible.tsx',
    output: [
      {
        file: 'dist/components/collapsible.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/collapsible.umd.js',
        format: 'umd',
        name: 'MovingWallsCollapsible',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/CollapsibleCode.tsx',
    output: [
      {
        file: 'dist/components/collapsiblecode.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/collapsiblecode.umd.js',
        format: 'umd',
        name: 'MovingWallsCollapsibleCode',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Command.tsx',
    output: [
      {
        file: 'dist/components/command.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/command.umd.js',
        format: 'umd',
        name: 'MovingWallsCommand',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Container.tsx',
    output: [
      {
        file: 'dist/components/container.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/container.umd.js',
        format: 'umd',
        name: 'MovingWallsContainer',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/DataGrid.tsx',
    output: [
      {
        file: 'dist/components/datagrid.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/datagrid.umd.js',
        format: 'umd',
        name: 'MovingWallsDataGrid',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/DatePicker.tsx',
    output: [
      {
        file: 'dist/components/datepicker.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/datepicker.umd.js',
        format: 'umd',
        name: 'MovingWallsDatePicker',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/DateRangePicker.tsx',
    output: [
      {
        file: 'dist/components/daterangepicker.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/daterangepicker.umd.js',
        format: 'umd',
        name: 'MovingWallsDateRangePicker',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Dialog.tsx',
    output: [
      {
        file: 'dist/components/dialog.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/dialog.umd.js',
        format: 'umd',
        name: 'MovingWallsDialog',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/DocumentEditor.tsx',
    output: [
      {
        file: 'dist/components/documenteditor.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/documenteditor.umd.js',
        format: 'umd',
        name: 'MovingWallsDocumentEditor',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/DragDrop.tsx',
    output: [
      {
        file: 'dist/components/dragdrop.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/dragdrop.umd.js',
        format: 'umd',
        name: 'MovingWallsDragDrop',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Dropdown.tsx',
    output: [
      {
        file: 'dist/components/dropdown.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/dropdown.umd.js',
        format: 'umd',
        name: 'MovingWallsDropdown',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/EmptyState.tsx',
    output: [
      {
        file: 'dist/components/emptystate.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/emptystate.umd.js',
        format: 'umd',
        name: 'MovingWallsEmptyState',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/FileUpload.tsx',
    output: [
      {
        file: 'dist/components/fileupload.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/fileupload.umd.js',
        format: 'umd',
        name: 'MovingWallsFileUpload',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Filter.tsx',
    output: [
      {
        file: 'dist/components/filter.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/filter.umd.js',
        format: 'umd',
        name: 'MovingWallsFilter',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Form.tsx',
    output: [
      {
        file: 'dist/components/form.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/form.umd.js',
        format: 'umd',
        name: 'MovingWallsForm',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Icon.tsx',
    output: [
      {
        file: 'dist/components/icon.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/icon.umd.js',
        format: 'umd',
        name: 'MovingWallsIcon',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Input.tsx',
    output: [
      {
        file: 'dist/components/input.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/input.umd.js',
        format: 'umd',
        name: 'MovingWallsInput',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/List.tsx',
    output: [
      {
        file: 'dist/components/list.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/list.umd.js',
        format: 'umd',
        name: 'MovingWallsList',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/MWLoader.tsx',
    output: [
      {
        file: 'dist/components/mwloader.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/mwloader.umd.js',
        format: 'umd',
        name: 'MovingWallsMWLoader',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Menu.tsx',
    output: [
      {
        file: 'dist/components/menu.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/menu.umd.js',
        format: 'umd',
        name: 'MovingWallsMenu',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Modal.tsx',
    output: [
      {
        file: 'dist/components/modal.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/modal.umd.js',
        format: 'umd',
        name: 'MovingWallsModal',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Notification.tsx',
    output: [
      {
        file: 'dist/components/notification.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/notification.umd.js',
        format: 'umd',
        name: 'MovingWallsNotification',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Pagination.tsx',
    output: [
      {
        file: 'dist/components/pagination.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/pagination.umd.js',
        format: 'umd',
        name: 'MovingWallsPagination',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Panel.tsx',
    output: [
      {
        file: 'dist/components/panel.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/panel.umd.js',
        format: 'umd',
        name: 'MovingWallsPanel',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Popover.tsx',
    output: [
      {
        file: 'dist/components/popover.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/popover.umd.js',
        format: 'umd',
        name: 'MovingWallsPopover',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Progress.tsx',
    output: [
      {
        file: 'dist/components/progress.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/progress.umd.js',
        format: 'umd',
        name: 'MovingWallsProgress',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Rating.tsx',
    output: [
      {
        file: 'dist/components/rating.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/rating.umd.js',
        format: 'umd',
        name: 'MovingWallsRating',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/RichTextEditor.tsx',
    output: [
      {
        file: 'dist/components/richtexteditor.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/richtexteditor.umd.js',
        format: 'umd',
        name: 'MovingWallsRichTextEditor',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/ScrollArea.tsx',
    output: [
      {
        file: 'dist/components/scrollarea.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/scrollarea.umd.js',
        format: 'umd',
        name: 'MovingWallsScrollArea',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/SearchBar.tsx',
    output: [
      {
        file: 'dist/components/searchbar.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/searchbar.umd.js',
        format: 'umd',
        name: 'MovingWallsSearchBar',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Select.tsx',
    output: [
      {
        file: 'dist/components/select.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/select.umd.js',
        format: 'umd',
        name: 'MovingWallsSelect',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Separator.tsx',
    output: [
      {
        file: 'dist/components/separator.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/separator.umd.js',
        format: 'umd',
        name: 'MovingWallsSeparator',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Sheet.tsx',
    output: [
      {
        file: 'dist/components/sheet.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/sheet.umd.js',
        format: 'umd',
        name: 'MovingWallsSheet',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Sidebar.tsx',
    output: [
      {
        file: 'dist/components/sidebar.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/sidebar.umd.js',
        format: 'umd',
        name: 'MovingWallsSidebar',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Skeleton.tsx',
    output: [
      {
        file: 'dist/components/skeleton.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/skeleton.umd.js',
        format: 'umd',
        name: 'MovingWallsSkeleton',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Slider.tsx',
    output: [
      {
        file: 'dist/components/slider.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/slider.umd.js',
        format: 'umd',
        name: 'MovingWallsSlider',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Snackbar.tsx',
    output: [
      {
        file: 'dist/components/snackbar.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/snackbar.umd.js',
        format: 'umd',
        name: 'MovingWallsSnackbar',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Spinner.tsx',
    output: [
      {
        file: 'dist/components/spinner.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/spinner.umd.js',
        format: 'umd',
        name: 'MovingWallsSpinner',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Stepper.tsx',
    output: [
      {
        file: 'dist/components/stepper.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/stepper.umd.js',
        format: 'umd',
        name: 'MovingWallsStepper',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Switch.tsx',
    output: [
      {
        file: 'dist/components/switch.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/switch.umd.js',
        format: 'umd',
        name: 'MovingWallsSwitch',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Table.tsx',
    output: [
      {
        file: 'dist/components/table.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/table.umd.js',
        format: 'umd',
        name: 'MovingWallsTable',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Tabs.tsx',
    output: [
      {
        file: 'dist/components/tabs.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/tabs.umd.js',
        format: 'umd',
        name: 'MovingWallsTabs',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Textarea.tsx',
    output: [
      {
        file: 'dist/components/textarea.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/textarea.umd.js',
        format: 'umd',
        name: 'MovingWallsTextarea',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Thumbnail.tsx',
    output: [
      {
        file: 'dist/components/thumbnail.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/thumbnail.umd.js',
        format: 'umd',
        name: 'MovingWallsThumbnail',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/TimePicker.tsx',
    output: [
      {
        file: 'dist/components/timepicker.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/timepicker.umd.js',
        format: 'umd',
        name: 'MovingWallsTimePicker',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/TimeRangePicker.tsx',
    output: [
      {
        file: 'dist/components/timerangepicker.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/timerangepicker.umd.js',
        format: 'umd',
        name: 'MovingWallsTimeRangePicker',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Timeline.tsx',
    output: [
      {
        file: 'dist/components/timeline.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/timeline.umd.js',
        format: 'umd',
        name: 'MovingWallsTimeline',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Toast.tsx',
    output: [
      {
        file: 'dist/components/toast.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/toast.umd.js',
        format: 'umd',
        name: 'MovingWallsToast',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/ToggleGroup.tsx',
    output: [
      {
        file: 'dist/components/togglegroup.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/togglegroup.umd.js',
        format: 'umd',
        name: 'MovingWallsToggleGroup',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/Tooltip.tsx',
    output: [
      {
        file: 'dist/components/tooltip.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/tooltip.umd.js',
        format: 'umd',
        name: 'MovingWallsTooltip',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },

  {
    ...baseConfig,
    input: 'src/components/ui/TreeView.tsx',
    output: [
      {
        file: 'dist/components/treeview.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist/components/treeview.umd.js',
        format: 'umd',
        name: 'MovingWallsTreeView',
        globals,
        sourcemap: true
      }
    ],
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      })
    ]
  },
  
  // Category bundles
  
  {
    ...baseConfig,
    input: {
      'Input': 'src/components/ui/Input.tsx',
      'Checkbox': 'src/components/ui/Checkbox.tsx',
      'Select': 'src/components/ui/Select.tsx',
      'Form': 'src/components/ui/Form.tsx',
      'Textarea': 'src/components/ui/Textarea.tsx',
      'Switch': 'src/components/ui/Switch.tsx',
      'Slider': 'src/components/ui/Slider.tsx'
    },
    output: {
      dir: 'dist/categories/forms',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },

  {
    ...baseConfig,
    input: {
      'Tabs': 'src/components/ui/Tabs.tsx',
      'Breadcrumb': 'src/components/ui/Breadcrumb.tsx',
      'Menu': 'src/components/ui/Menu.tsx',
      'Pagination': 'src/components/ui/Pagination.tsx',
      'Stepper': 'src/components/ui/Stepper.tsx'
    },
    output: {
      dir: 'dist/categories/navigation',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },

  {
    ...baseConfig,
    input: {
      'Alert': 'src/components/ui/Alert.tsx',
      'Toast': 'src/components/ui/Toast.tsx',
      'Notification': 'src/components/ui/Notification.tsx',
      'Progress': 'src/components/ui/Progress.tsx',
      'Spinner': 'src/components/ui/Spinner.tsx',
      'Skeleton': 'src/components/ui/Skeleton.tsx'
    },
    output: {
      dir: 'dist/categories/feedback',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },

  {
    ...baseConfig,
    input: {
      'Card': 'src/components/ui/Card.tsx',
      'Container': 'src/components/ui/Container.tsx',
      'Panel': 'src/components/ui/Panel.tsx',
      'Sheet': 'src/components/ui/Sheet.tsx',
      'Sidebar': 'src/components/ui/Sidebar.tsx',
      'Separator': 'src/components/ui/Separator.tsx'
    },
    output: {
      dir: 'dist/categories/layout',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },

  {
    ...baseConfig,
    input: {
      'Table': 'src/components/ui/Table.tsx',
      'DataGrid': 'src/components/ui/DataGrid.tsx',
      'List': 'src/components/ui/List.tsx',
      'TreeView': 'src/components/ui/TreeView.tsx',
      'Calendar': 'src/components/ui/Calendar.tsx'
    },
    output: {
      dir: 'dist/categories/data',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },

  {
    ...baseConfig,
    input: {
      'Modal': 'src/components/ui/Modal.tsx',
      'Dialog': 'src/components/ui/Dialog.tsx',
      'Popover': 'src/components/ui/Popover.tsx',
      'Tooltip': 'src/components/ui/Tooltip.tsx',
      'Dropdown': 'src/components/ui/Dropdown.tsx'
    },
    output: {
      dir: 'dist/categories/overlays',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },

  {
    ...baseConfig,
    input: {
      'Button': 'src/components/ui/Button.tsx',
      'Badge': 'src/components/ui/Badge.tsx',
      'Avatar': 'src/components/ui/Avatar.tsx',
      'Chip': 'src/components/ui/Chip.tsx',
      'ToggleGroup': 'src/components/ui/ToggleGroup.tsx'
    },
    output: {
      dir: 'dist/categories/interactive',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },

  {
    ...baseConfig,
    input: {
      'RichTextEditor': 'src/components/ui/RichTextEditor.tsx',
      'DocumentEditor': 'src/components/ui/DocumentEditor.tsx',
      'FileUpload': 'src/components/ui/FileUpload.tsx',
      'DragDrop': 'src/components/ui/DragDrop.tsx',
      'Carousel': 'src/components/ui/Carousel.tsx'
    },
    output: {
      dir: 'dist/categories/advanced',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  }
];