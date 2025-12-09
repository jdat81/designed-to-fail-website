# Interactive Visualization Suggestions for "Designed to Fail" Website

**Created:** December 7, 2025
**Purpose:** Ideas for interactive web visualizations to enhance the book's data presentation

These are suggested interactive features that can be tested separately before integrating into the website. Each suggestion includes the technology stack and key features.

---

## 1. Territory Expansion Timeline (Figures 5.1-5.4)

### Concept
An animated timeline slider that shows US territorial growth from 1770 to 1850, with smooth transitions between years.

### Key Features
- **Slider control** to scrub through years (1770, 1783, 1803, 1819, 1845, 1848, 1850)
- **Animated map transitions** showing territory changes
- **Color-coded regions**: Free states, Slave states, Territories, Foreign powers
- **Popup information** on click showing acquisition details (price, treaty, conflict)
- **Area counter** showing total square miles as it grows

### Technology
- **D3.js** for map rendering and transitions
- **TopoJSON** for efficient map data
- **React** wrapper for state management

### Data Structure
```javascript
const territoryData = [
  {
    year: 1770,
    totalArea: 400000,
    regions: {
      colonies: ["MA", "NY", "PA", ...],
      british: ["OH", "MI", ...],
      spanish: ["FL", "LA", ...],
      french: [...]
    }
  },
  // ... more years
]
```

---

## 2. Trust Decline Interactive Chart (Figure 8.1)

### Concept
A line chart with hover interactions showing detailed context for each data point, with historical event annotations.

### Key Features
- **Hover tooltips** showing exact percentage and historical context
- **Clickable event markers** (JFK assassination, Vietnam escalation, Watergate)
- **Comparison toggle** to overlay modern trust data (1978-2024)
- **Annotation system** linking data points to chapter content

### Technology
- **Recharts** or **Chart.js** for the base chart
- **Framer Motion** for smooth animations
- **React state** for interactivity

### Sample Code
```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

const TrustDeclineChart = () => {
  const events = [
    { year: 1963, label: "JFK Assassination", chapter: 8 },
    { year: 1968, label: "MLK & RFK Killed", chapter: 8 },
    { year: 1974, label: "Nixon Resigns", chapter: 8 }
  ];

  return (
    <LineChart data={trustData}>
      <Line type="monotone" dataKey="trust" stroke="#dc2626" />
      {events.map(e => (
        <ReferenceLine x={e.year} stroke="#666" strokeDasharray="3 3" />
      ))}
    </LineChart>
  );
};
```

---

## 3. Income Inequality Stacked Bar Animation (Figures 9.1-9.3)

### Concept
Animated stacked bar chart showing income distribution changes over time, with play/pause controls.

### Key Features
- **Auto-play animation** cycling through years 1968-2023
- **Play/pause controls** for user control
- **Stacked segments** for each income quintile
- **Hover details** showing exact percentages
- **"Now vs Then" comparison mode** showing 1968 vs 2023 side-by-side

### Technology
- **D3.js** for custom animations
- **React Spring** for smooth transitions

### Animation Approach
```javascript
// Transition between years with smooth interpolation
const animateToYear = (targetYear) => {
  d3.selectAll('.bar-segment')
    .transition()
    .duration(750)
    .attr('height', d => yScale(d.values[targetYear]))
    .attr('y', d => calculateStackPosition(d, targetYear));
};
```

---

## 4. Walmart Expansion Map Animation (Figures 10.1-10.2)

### Concept
Animated map showing Walmart stores appearing chronologically, like dots spreading across the US.

### Key Features
- **Time-lapse animation** from 1962 to 2005
- **Speed control** (1x, 2x, 5x)
- **Store count ticker** updating in real-time
- **Regional density heatmap** overlay option
- **Click on states** for state-specific growth data

### Technology
- **Mapbox GL** or **Leaflet** for map rendering
- **GeoJSON** for store location data
- **CSS animations** for store appearance effects

### Data Requirements
```javascript
const storeLocations = [
  { year: 1962, lat: 36.33, lng: -94.11, city: "Rogers, AR" },
  { year: 1964, lat: 36.06, lng: -94.16, city: "Harrison, AR" },
  // ... thousands of stores
];
```

---

## 5. Housing Bubble Interactive (Figures 11.1-11.2)

### Concept
Dual-view showing national trend and state-by-state breakdown with synchronized interactions.

### Key Features
- **Main chart** showing national home price index
- **State selector** to overlay individual state trends
- **"Crisis zone" highlight** (2007-2010) with annotations
- **Before/after comparison** slider
- **Mortgage calculator** showing how bubble affected affordability

### Technology
- **Recharts** for main chart
- **React state** for multi-select functionality

---

## 6. Wealth Distribution Treemap (Figure 11.3)

### Concept
Visual treemap showing relative wealth of different groups, with drill-down capability.

### Key Features
- **Proportional rectangles** showing wealth distribution
- **Click to drill down** into Top 1% breakdown
- **Historical comparison** toggle (1990 vs 2025)
- **"If wealth were evenly distributed" comparison mode**

### Technology
- **D3.js treemap** layout
- **React for interactivity**

---

## 7. Mineral Production Bar Race (Figure 5.5)

### Concept
Animated bar chart race showing how US mineral dominance grew from 1870 to 1913.

### Key Features
- **Racing bars** showing percentage changes over time
- **Country labels** showing competitors (UK, Germany, etc.)
- **Pause on key years** for annotation
- **Final state** showing 1913 dominance

### Technology
- **D3.js** for bar race animation
- **Flourish** as alternative (no-code option)

---

## Implementation Priority

### Phase 1 (High Impact, Moderate Effort)
1. Trust Decline Chart - Direct tie to book's central thesis
2. Territory Timeline - Visual storytelling of expansion

### Phase 2 (High Impact, Higher Effort)
3. Income Inequality Animation - Key economic data
4. Housing Bubble Interactive - Resonates with readers' experience

### Phase 3 (Nice to Have)
5. Walmart Map Animation - Dramatic but data-intensive
6. Wealth Treemap - Good for sharing/social
7. Mineral Bar Race - Fun but less central

---

## Testing Environment Setup

To test these visualizations before adding to the website:

```bash
# Create a separate testing directory
mkdir visualization-sandbox
cd visualization-sandbox

# Initialize with Vite + React
npm create vite@latest . -- --template react-ts
npm install d3 recharts framer-motion

# Run development server
npm run dev
```

Each visualization can be developed and tested in isolation before being integrated into the main Next.js website.

---

## Resources

- **D3.js Gallery**: https://observablehq.com/@d3/gallery
- **Recharts Examples**: https://recharts.org/en-US/examples
- **Map Inspiration**: https://www.visualcapitalist.com/
- **Data Sources**: Federal Reserve FRED, Census Bureau, Pew Research
