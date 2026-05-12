# Deriv Analysis Tool - Development Plan

Create a professional trading analysis dashboard for Deriv options (Volatility Indices).

## 1. Core Architecture
- **State Management**: React `useState` and `useEffect` for real-time tick simulation and analysis.
- **Components**: Modular React components for each analysis type (Even/Odd, Over/Under, Matches/Differs, Rise/Fall).
- **Styling**: Tailwind CSS with a Fintech/OLED Dark theme.
- **Charts**: Recharts for frequency and trend visualization.
- **Icons**: Lucide React for a clean UI.

## 2. Feature Implementation
### A. Market & Settings
- Market selector (Volatility 10, 25, 50, 75, 100).
- Global settings: Analysis duration (tick count: 10, 25, 50, 100).

### B. Analysis Modes
1.  **Even/Odd**: Real-time percentage tracking of even vs odd digits.
2.  **Over/Under**: Distribution tracking based on user-defined threshold (default 4.5).
3.  **Matches/Differs**: 0-9 digit frequency heat map.
4.  **Rise/Fall**: Tracking price movements (up/down streaks and SMA).

### C. Live Tick Stream
- Simulated tick engine providing price updates every 1-2 seconds.
- Calculation of 'Last Digit' for each tick.
- History view of recent ticks with color coding (Green for rise, Red for fall).

## 3. Component Structure
- `App.tsx`: Layout and state orchestration.
- `Sidebar.tsx`: Navigation between different analysis tools.
- `Header.tsx`: Brand and market status.
- `AnalysisSection.tsx`: Dynamic container based on selected mode.
- `TickFeed.tsx`: Sidebar/Panel for real-time tick flow.
- `DigitFrequencies.tsx`: Reusable chart for digit distribution.
- `SignalCard.tsx`: AI/Pattern-based recommendation signals.

## 4. UI/UX Refinement
- Mobile-first responsive design.
- Glassmorphic card containers.
- Framer Motion for smooth value transitions.
- High-contrast visual feedback for signals.
