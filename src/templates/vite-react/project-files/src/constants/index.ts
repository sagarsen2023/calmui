export const APP_NAME = 'Vite React App'
export const APP_VERSION = '1.0.0'

// API Configuration
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3001'

// UI Constants
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
