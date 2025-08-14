'use client'

import React from 'react'
import { LucideProps } from 'lucide-react'

// Re-export all Lucide icons we use
export {
  // Arrows & Direction
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  ChevronsUp as DoubleArrowUp, ChevronsDown as DoubleArrowDown,
  ChevronsLeft as DoubleArrowLeft, ChevronsRight as DoubleArrowRight,
  TrendingUp, TrendingDown, CornerUpLeft, CornerUpRight,
  ArrowUpRight, ArrowDownLeft, ArrowUpLeft, ArrowDownRight,
  MoveUp, MoveDown, MoveLeft, MoveRight, Move, Maximize, Minimize,

  // Interface
  Menu, X, Plus, Minus, Settings, MoreHorizontal, MoreVertical,
  Search, Filter, ArrowUpDown as SortAsc, ArrowDownUp as SortDesc,
  RotateCcw as Refresh, Download, Upload, Edit, Trash, Copy,
  Share, Save, Printer as Print, Bookmark, Scissors as Cut,
  Clipboard, ClipboardCopy, ClipboardPaste, Undo, Redo,
  ZoomIn, ZoomOut, Maximize2 as Fullscreen, Minimize2,
  Grid, List, LayoutGrid, LayoutList, Columns, Rows,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline, Strikethrough, Type,

  // Communication
  Mail, MessageSquare, MessageCircle, Phone, Video,
  Bell, BellOff, Heart, Star, ThumbsUp, ThumbsDown,
  Send, Reply, Forward, AtSign, Hash,
  Users, User, UserPlus, UserMinus, UserCheck, UserX,
  Contact, PhoneCall, MessageSquareMore, MessageSquarePlus, MessageSquareX,
  Voicemail, Mic, MicOff, PhoneIncoming, PhoneOutgoing,

  // Media & Files
  Play, Pause, Square as Stop, SkipForward, SkipBack,
  Volume2 as Volume, VolumeX as VolumeOff, Volume1, VolumeOff as Mute,
  Image, File, FileText, Folder, FolderOpen, Camera, Music,
  Archive, Paperclip as Attachment, FileImage, FileVideo,
  FileAudio, FilePlus, FileMinus, FileCheck, FileX,
  FolderPlus, FolderMinus, FolderCheck, FolderX,
  VideoIcon as VideoFile, Mic as Record, Radio,
  Headphones, Speaker, Disc, Film, ImageIcon,

  // Business & Finance
  DollarSign, CreditCard, ShoppingCart, ShoppingBag,
  Receipt, BarChart, PieChart, Activity, Target, Award,
  Calendar, Clock, Timer, TrendingUp as GrowthChart,
  Calculator, Coins, Banknote, Wallet, PiggyBank,
  Building, Building2, Store, Briefcase, Factory,
  HandCoins, Receipt as Invoice, Package, Truck,
  ShoppingBasket, Tag, Tags, Percent, Gift,

  // Technology
  Smartphone, Laptop, Monitor, Tablet, Watch,
  Wifi, WifiOff, Bluetooth, Battery, BatteryLow, Power,
  Code, Terminal, Database, Server, Cloud, HardDrive,
  Cpu, MemoryStick, Usb, Zap, Plug, Cable,
  Router, Antenna, Signal, SignalHigh, SignalLow, SignalZero,
  Github, GitBranch, GitCommit, GitMerge, GitPullRequest,
  Bug, Wrench, Hammer, Settings2, Cog,

  // Status & Feedback
  Check, CheckCircle, XCircle, AlertTriangle, AlertCircle,
  Info, HelpCircle, Eye, EyeOff, Lock, Unlock, Shield,
  ShieldCheck, Loader2 as Loading, Loader, CheckCircle2,
  XCircle as ErrorCircle, AlertOctagon, AlertTriangle as Warning,
  CheckSquare, Square, Circle, Dot, DotSquare,
  ToggleLeft, ToggleRight, PowerOff, Power as PowerOn,
  Lightbulb, LightbulbOff, Sun, Moon, CloudRain, CloudSnow,

  // Navigation
  Home, MapPin, Map, Navigation, Compass, Globe,
  ExternalLink, Link, Unlink, Anchor, Route, Flag,
  ArrowBigUp, ArrowBigDown, ArrowBigLeft, ArrowBigRight,
  Navigation2, Locate, LocateFixed, LocateOff,
  Milestone, Signpost,

  // Design & Layout
  Layout, LayoutDashboard, LayoutTemplate, LayoutPanelLeft,
  Grid2X2 as Grid2x2, Grid3X3 as Grid3x3, 
  Sidebar, SidebarOpen, SidebarClose,
  PanelLeft, PanelRight, PanelTop, PanelBottom,
  SplitSquareHorizontal, SplitSquareVertical, Square as Box,
  RectangleHorizontal, RectangleVertical, Circle as CircleIcon,
  Triangle, Diamond, Pentagon, Hexagon, Octagon,

  // Transportation
  Car, Bus, Bike, Plane, Train, Ship, Rocket,
  Fuel, ParkingCircle, Map as Road, TrafficCone,
  Car as Taxi, Ambulance,

  // Weather & Nature
  CloudLightning, Rainbow, Umbrella, Snowflake, Droplets, Wind,
  Thermometer, ThermometerSun, ThermometerSnowflake,
  TreePine, Trees, Flower, Flower2, Leaf, Sprout as Seedling,
  Mountain, MountainSnow, Waves, Flame, Zap as Lightning,

  // Sports & Activities
  Trophy, Medal, Crown, Gamepad, Gamepad2, Dice1, Dice2,
  Dice3, Dice4, Dice5, Dice6, Target as Bullseye,
  Dumbbell, Activity as Fitness, HeartHandshake,

  // Food & Drink
  Coffee, Coffee as Tea, Beer, Wine, Pizza, Utensils, UtensilsCrossed,
  ChefHat, Cookie, Cake, IceCream2 as IceCream, Apple, Banana,
  Cherry, Grape, Carrot, Salad,

  // Health & Medical
  Heart as HealthHeart, HeartPulse, Stethoscope, Pill,
  Syringe, Thermometer as MedicalThermometer, Bandage,
  Cross, Plus as MedicalPlus, Microscope, TestTube, Dna, Brain,

  // Education & Learning
  GraduationCap, BookOpen, Book, School,
  PenTool, Pencil, Pen, Eraser, Ruler, Calculator as Calc,
  Globe as WorldIcon, Award as Diploma, 
  Presentation, Projector,

  // Shopping & E-commerce
  Package2, PackageCheck, PackageX, PackagePlus,
  MapPin as Location, CreditCard as Payment,
  Banknote as Cash, Coins as Money, Receipt as Bill,
  Tag as Price, Tags as Prices, Percent as Discount,
  Gift as Present, Ticket, Barcode, QrCode,

  // Security & Privacy
  Key, KeyRound, ShieldAlert, ShieldX,
  Eye as ViewIcon, EyeOff as HideIcon,
  UserCheck as Verified, UserX as Blocked, Ban,
  AlertTriangle as SecurityAlert, Fingerprint, Scan,
  Camera as Surveillance,

  // Social & Community
  Users as Community, User as Person, UserPlus as AddUser,
  UserMinus as RemoveUser, Heart as Like, Share as ShareIcon,
  MessageCircle as Comment, Bell as Notification,
  Star as Rating, ThumbsUp as Approve, ThumbsDown as Disapprove,
  Flag as Report, Crown as Premium, Badge as Achievement,
  Award as Recognition, Handshake,

  // Office & Productivity
  Calendar as Schedule, Clock as Time,
  Timer as Stopwatch, AlarmClock, NotebookPen as Notes,
  StickyNote as Sticky, Pin, Paperclip as Attach,
  FileText as Document, Folder as Directory, Archive as Zip,
  Printer as PrintIcon, Phone as Telephone,
  Mail as Email, Send as SendIcon, Inbox,

  // Additional
  type LucideProps
} from 'lucide-react'

// Import base icons for filled variants
import { Heart as HeartBase, Star as StarBase } from 'lucide-react'

// Custom filled variants
export const HeartFilled: React.FC<LucideProps> = (props) => (
  <HeartBase {...props} fill="currentColor" />
)

export const StarFilled: React.FC<LucideProps> = (props) => (
  <StarBase {...props} fill="currentColor" />
)

// Aliases for consistency
export { Info as InfoCircle, HelpCircle as Help } from 'lucide-react'
