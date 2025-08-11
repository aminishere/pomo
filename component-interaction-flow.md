# 🔄 Component Interaction Flow Diagram

## 📊 Detailed Component Communication

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              APPLICATION FLOW                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

1. INITIAL LOAD
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │───▶│   App.jsx   │───▶│   Auth.jsx  │───▶│   User      │
│   Loads     │    │ (authed=    │    │ (Login/Reg  │    │   Input     │
│             │    │  false)     │    │   Form)     │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
2. AUTHENTICATION
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Auth.jsx  │───▶│ sessionService│───▶│   Backend   │───▶│   Database  │
│ (Form Submit)│    │ (login/reg) │    │ (Port 5000) │    │ (MongoDB)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   JWT Token │    │ setAuthToken│    │   Response  │    │   User Data │
│   Received  │    │ (token)     │    │ (token)     │    │   Stored    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │
       ▼
┌─────────────┐    ┌─────────────┐
│   App.jsx   │───▶│   Timer.jsx │
│ (authed=    │    │ (Main Timer │
│  true)      │    │  Component) │
└─────────────┘    └─────────────┘

3. TIMER INTERACTION
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───▶│   Timer.jsx │───▶│   App.jsx   │
│   Clicks    │    │ (Start/Pause│    │ (State      │
│   Start     │    │  Button)    │    │  Updates)   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │
                           ▼
                   ┌─────────────┐
                   │ setInterval │
                   │ (Countdown) │
                   └─────────────┘
                           │
                           ▼
                   ┌─────────────┐
                   │ Timer       │
                   │ Complete    │
                   └─────────────┘
                           │
                           ▼
                   ┌─────────────┐    ┌─────────────┐
                   │ handleSession│───▶│   App.jsx   │
                   │ Complete    │    │ (workSessions│
                   │ Callback    │    │  Update)    │
                   └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                     ┌─────────────┐
                                     │ Cycle       │
                                     │ Complete?   │
                                     └─────────────┘
                                              │
                                              ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ saveSession │───▶│ sessionService│
                                     │ (API Call)  │    │ (POST /api/  │
                                     └─────────────┘    │  sessions)   │
                                                        └─────────────┘

4. DATA DISPLAY
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   App.jsx   │───▶│   Stats.jsx │───▶│   User      │
│ (session    │    │ (Analytics  │    │   Views     │
│  History)   │    │  Display)   │    │   Stats     │
└─────────────┘    └─────────────┘    └─────────────┘
       │
       ▼
┌─────────────┐    ┌─────────────┐
│ Session     │───▶│ Session     │
│ Tracker     │    │ History     │
│ Component   │    │ Display     │
└─────────────┘    └─────────────┘
```

## 🔄 State Flow Between Components

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              STATE MANAGEMENT FLOW                              │
└─────────────────────────────────────────────────────────────────────────────────┘

APP.JSX STATE:
┌─────────────────────────────────────────────────────────────────────────────────┐
│ State Variables:                                                                │
│ • workSessions: number (0-3)                                                   │
│ • completedCycles: number                                                      │
│ • sessionHistory: array                                                        │
│ • isLoading: boolean                                                           │
│ • authed: boolean                                                              │
└─────────────────────────────────────────────────────────────────────────────────┘

STATE FLOW:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Auth.jsx  │───▶│   App.jsx   │───▶│   Timer.jsx │───▶│   App.jsx   │
│ (onAuth)    │    │ (setAuthed) │    │ (onSession  │    │ (update     │
│             │    │             │    │  Complete)  │    │  workSessions│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                              │
                                                              ▼
                                                     ┌─────────────┐
                                                     │ Stats.jsx   │
                                                     │ (session    │
                                                     │  History)   │
                                                     └─────────────┘

TIMER.JSX STATE:
┌─────────────────────────────────────────────────────────────────────────────────┐
│ State Variables:                                                                │
│ • selectedMinutes: number (25/10/20)                                           │
│ • secondsLeft: number                                                           │
│ • isRunning: boolean                                                            │
│ • pomodoroCount: number (0-3)                                                  │
│ • autoStart: boolean                                                            │
└─────────────────────────────────────────────────────────────────────────────────┘

STATE INTERACTIONS:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───▶│ isRunning   │───▶│ setInterval │
│   Action    │    │ (true)      │    │ (Timer)     │
└─────────────┘    └─────────────┘    └─────────────┘
                           │
                           ▼
                   ┌─────────────┐    ┌─────────────┐
                   │ secondsLeft │───▶│ Timer       │
                   │ (Decrease)  │    │ Complete    │
                   └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                     ┌─────────────┐    ┌─────────────┐
                                     │ pomodoroCount│───▶│ App.jsx     │
                                     │ (Increment) │    │ (Callback)  │
                                     └─────────────┘    └─────────────┘
```

## 🎯 Key Interaction Points

### 1. **Authentication Flow**
```
User Input → Auth Component → API Service → Backend → Database
     ↑                                                      ↓
     ← Auth Success ← Token Storage ← Response ← Validation ←
```

### 2. **Timer Session Flow**
```
User Start → Timer State → Countdown → Session Complete → App State → API Save
     ↑                                                              ↓
     ← Auto-advance ← Next Session ← Mode Selection ← Cycle Check ←
```

### 3. **Data Display Flow**
```
App State → Stats Component → Data Processing → UI Display
     ↓
Session Tracker → History Display → User View
```

## 🔧 Component Responsibilities

### **App.jsx (Parent/Orchestrator)**
- **State Management**: Central state for entire application
- **Conditional Rendering**: Shows Auth or Timer based on authentication
- **Data Fetching**: Loads session history from API
- **Callback Handling**: Receives events from child components

### **Timer.jsx (Core Engine)**
- **Timer Logic**: Real-time countdown with setInterval
- **Session Management**: Tracks work sessions and cycles
- **Auto-advancement**: Automatically progresses between sessions
- **UI Updates**: Updates document title and progress indicators

### **Auth.jsx (Authentication)**
- **Form Handling**: Login and registration forms
- **Validation**: Client-side form validation
- **API Communication**: Calls authentication endpoints
- **Error Handling**: Displays error messages to user

### **Stats.jsx (Analytics)**
- **Data Processing**: Calculates statistics from session history
- **Time Calculations**: Converts cycles to hours and minutes
- **Responsive Display**: Shows stats in grid layout
- **Loading States**: Handles data loading and empty states

### **SessionTracker.jsx (History)**
- **List Rendering**: Displays recent session history
- **Date Formatting**: Formats dates for user display
- **Empty States**: Shows message when no history available

### **sessionService.js (API Layer)**
- **HTTP Communication**: Handles all API calls
- **Token Management**: Stores and sends JWT tokens
- **Error Handling**: Centralized error handling for API calls
- **Data Transformation**: Converts between API and component formats

## 🎨 UI/UX Interaction Patterns

### **Responsive Design Flow**
```
Mobile (default) → Tablet (sm:) → Desktop (md:) → Large (lg:)
     ↓                ↓              ↓              ↓
Single Column → Two Columns → Three Columns → Four Columns
```

### **Dark Mode Flow**
```
System Preference → CSS Classes → Component Styling → User Experience
     ↓                ↓              ↓              ↓
Light Theme → Dark Theme → Automatic Switch → Consistent UI
```

### **Loading State Flow**
```
User Action → Loading State → API Call → Success/Error → UI Update
     ↓              ↓            ↓          ↓            ↓
Show Spinner → Disable Input → Fetch Data → Handle Response → Update Display
```

## 🚀 Performance Optimization Flow

### **Memory Management**
```
Component Mount → useEffect → setInterval → Component Unmount → Cleanup
     ↓              ↓            ↓              ↓              ↓
Initialize → Start Timer → Run Timer → Remove Timer → Clear Memory
```

### **State Optimization**
```
State Change → Functional Update → Prevent Re-render → Optimize Performance
     ↓              ↓                ↓                ↓
User Action → setState(prev => new) → React.memo → Faster App
```

This comprehensive interaction flow shows how all components work together to create a cohesive, performant, and user-friendly Pomodoro timer application.
