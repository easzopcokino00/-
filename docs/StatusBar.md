# StatusBar Documentation

## Overview
The StatusBar component provides real-time status updates and notifications throughout the application.

## Features
- Real-time status indicators
- Progress tracking
- Error notifications
- Success messages

## Usage
```javascript
import { StatusBar } from './components/StatusBar';

<StatusBar 
  status="loading"
  message="Processing world data..."
  progress={75}
/>
```

## Props
- `status`: 'loading' | 'success' | 'error' | 'warning'
- `message`: string - Status message to display
- `progress`: number - Progress percentage (0-100)