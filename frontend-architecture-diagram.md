# 🎯 Pomodoro Timer Frontend Architecture Diagrams

## 📊 Component Hierarchy Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ State Management:                                    │   │
│  │ • workSessions (0-3)                                │   │
│  │ • completedCycles                                   │   │
│  │ • sessionHistory []                                 │   │
│  │ • isLoading                                         │   │
│  │ • authed                                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Conditional Rendering:                               │   │
│  │ ┌─────────────┐    ┌─────────────┐                  │   │
│  │ │   Auth      │    │   Timer     │                  │   │
│  │ │ Component   │    │ Component   │                  │   │
│  │ │ (Login/Reg) │    │ (25/10/20)  │                  │   │
│  │ └─────────────┘    └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Footer Components:                                   │   │
│  │ ┌─────────────┐    ┌─────────────┐                  │   │
│  │ │   Stats     │    │ Session     │                  │   │
│  │ │ Component   │    │ Tracker     │                  │   │
│  │ │ (Analytics) │    │ Component   │                  │   │
│  │ └─────────────┘    └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │   Timer     │    │   App       │
│  Action     │───▶│ Component   │───▶│ Component   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │                   │
                           ▼                   ▼
                   ┌─────────────┐    ┌─────────────┐
                   │ Session     │    │ API Service │
                   │ Complete    │    │ Layer       │
                   │ Callback    │    │ (fetch)     │
                   └─────────────┘    └─────────────┘
                                              │
                                              ▼
                                     ┌─────────────┐
                                     │   Backend   │
                                     │   Server    │
                                     │  (Port 5000)│
                                     └─────────────┘
```

## ⏱️ Timer State Machine Diagram

```
┌─────────────┐    Start    ┌─────────────┐
│   Idle      │────────────▶│  Running    │
│ (25:00)     │             │ (Counting)  │
└─────────────┘             └─────────────┘
       ▲                          │
       │ Pause                     │ Complete
       │                          ▼
┌─────────────┐    Resume   ┌─────────────┐
│  Paused     │◀───────────│  Complete   │
│ (Stopped)   │             │ (Auto Next) │
└─────────────┘             └─────────────┘
                                    │
                                    ▼ Auto-advance
                            ┌─────────────┐
                            │ Next Mode   │
                            │ (10/20/25)  │
                            └─────────────┘
```

## 🔐 Authentication Flow Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Auth      │    │   API       │    │   App       │
│ Component   │───▶│ Service     │───▶│ Component   │
│ (Form)      │    │ (fetch)     │    │ (State)     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Login/Reg   │    │ JWT Token   │    │ authed=true │
│ Validation  │    │ Storage     │    │ Load Data   │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 📱 Responsive Layout Structure

```
Desktop Layout (md: breakpoint)
┌─────────────────────────────────────────────────────────────┐
│                    Header (Title)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ┌─────────────────────────┐                   │
│              │      Timer/Auth         │                   │
│              │     (Centered)          │                   │
│              └─────────────────────────┘                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer:                                                     │
│ ┌─────────────────┐  ┌─────────────────┐                   │
│ │     Stats       │  │ Session Tracker │                   │
│ │   (Left)        │  │    (Right)      │                   │
│ └─────────────────┘  └─────────────────┘                   │
└─────────────────────────────────────────────────────────────┘

Mobile Layout (default)
┌─────────────────────────────────────────────────────────────┐
│                    Header (Title)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ┌─────────────────────────┐                   │
│              │      Timer/Auth         │                   │
│              │     (Centered)          │                   │
│              └─────────────────────────┘                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Footer:                                                     │
│ ┌─────────────────────────────────────┐                     │
│ │            Stats                    │                     │
│ └─────────────────────────────────────┘                     │
│ ┌─────────────────────────────────────┐                     │
│ │        Session Tracker              │                     │
│ └─────────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Styling Architecture (Tailwind CSS)

```
┌─────────────────────────────────────────────────────────────┐
│                    Global Styles                            │
│  • Dark Mode: bg-zinc-100 dark:bg-zinc-950                 │
│  • Text: text-zinc-900 dark:text-zinc-100                  │
│  • Responsive: sm:, md:, lg: prefixes                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Component Styles                           │
│  • Cards: bg-white dark:bg-zinc-900 rounded-lg shadow      │
│  • Buttons: px-4 py-2 rounded bg-blue-600 text-white       │
│  • Forms: border rounded px-3 py-2 bg-transparent          │
│  • Layout: flex flex-col min-h-screen p-6                  │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Key React Hooks Usage

```
useState Hooks:
┌─────────────────────────────────────────────────────────────┐
│ App.jsx:                                                    │
│ • workSessions: number (0-3)                               │
│ • completedCycles: number                                  │
│ • sessionHistory: array                                    │
│ • isLoading: boolean                                       │
│ • authed: boolean                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Timer.jsx:                                                  │
│ • selectedMinutes: number (25/10/20)                       │
│ • secondsLeft: number                                       │
│ • isRunning: boolean                                        │
│ • pomodoroCount: number (0-3)                              │
│ • autoStart: boolean                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Auth.jsx:                                                   │
│ • mode: string ('login'/'register')                        │
│ • email: string                                            │
│ • password: string                                         │
│ • error: string                                            │
└─────────────────────────────────────────────────────────────┘

useEffect Hooks:
┌─────────────────────────────────────────────────────────────┐
│ Timer.jsx:                                                  │
│ • Timer countdown (setInterval)                            │
│ • Document title updates                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ App.jsx:                                                    │
│ • Load sessions when authenticated                          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Performance Optimization Patterns

```
┌─────────────────────────────────────────────────────────────┐
│                    Memory Management                        │
│  • setInterval cleanup in useEffect                        │
│  • Event listener cleanup                                  │
│  • Component unmounting                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    State Optimization                       │
│  • Functional updates: setState(prev => newValue)          │
│  • Conditional rendering to prevent unnecessary renders    │
│  • Proper dependency arrays in useEffect                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    API Optimization                         │
│  • Loading states to prevent multiple requests             │
│  • Error boundaries for graceful failure                   │
│  • Token-based authentication                              │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Key Learning Points

1. **Component Composition**: App orchestrates multiple child components
2. **State Lifting**: Shared state moved to common parent
3. **Conditional Rendering**: Different UI based on authentication state
4. **Callback Props**: Parent-child communication pattern
5. **Service Layer**: Centralized API communication
6. **Responsive Design**: Mobile-first approach with Tailwind
7. **Real-time Updates**: Timer with setInterval and cleanup
8. **Error Handling**: Try-catch blocks and user feedback
