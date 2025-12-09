# Interactive Graph Suggestions for "Designed to Fail" Website

**Document Created:** December 7, 2025
**Author:** Data Visualization Engineering Team
**Purpose:** Technical specification for converting static figures to interactive web visualizations

---

## Table of Contents
1. [Current Architecture Analysis](#current-architecture-analysis)
2. [Recommended Technology Stack](#recommended-technology-stack)
3. [Interactive Implementations by Figure](#interactive-implementations-by-figure)
4. [Testing and Deployment Strategy](#testing-and-deployment-strategy)

---

## Current Architecture Analysis

### Website Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Build Tool:** npm/pnpm
- **Deployment:** Vercel-ready

### Current Figure Rendering
- Static PNG images generated via R/ggplot2
- Images stored in `/public/images/figures/`
- Displayed using Next.js `<Image>` component
- Responsive sizing via Tailwind classes

### Recommended Interactive Libraries

| Library | Best For | Bundle Size | Learning Curve |
|---------|----------|-------------|----------------|
| **Recharts** | Simple charts, React-native | ~45KB | Low |
| **D3.js** | Complex custom visualizations | ~75KB | High |
| **Plotly.js** | Scientific charts, 3D | ~1MB | Medium |
| **Observable Plot** | Data exploration | ~50KB | Medium |
| **Framer Motion** | Animations | ~30KB | Low |

**Recommendation:** Use **Recharts** for line/bar charts and **D3.js** for maps.

---

## Recommended Technology Stack

### Primary: Recharts + D3.js Hybrid

```bash
# Install dependencies
npm install recharts d3 @types/d3 framer-motion
```

### Component Architecture

```
website/
├── components/
│   └── visualizations/
│       ├── InteractiveChart.tsx      # Base wrapper
│       ├── TerritoryMap.tsx          # D3 map component
│       ├── TrustDeclineChart.tsx     # Recharts line
│       ├── IncomeInequalityChart.tsx # Recharts multi-line
│       ├── WalmartGrowthChart.tsx    # Recharts area
│       ├── HousingBubbleChart.tsx    # Recharts with annotations
│       └── WealthDistributionChart.tsx # Recharts bar
```

---

## Interactive Implementations by Figure

### Figure 5.1-5.4: Territory Expansion Maps

**Interactivity Goals:**
- Animated timeline slider (1775 → 1850)
- Hover tooltips showing territory details
- Click to zoom on regions
- Smooth transitions between time periods

**Implementation with D3.js:**

```tsx
// components/visualizations/TerritoryTimeline.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'

interface TerritoryData {
  year: number
  states: string[]
  territories: string[]
  foreign: string[]
}

const territorySnapshots: TerritoryData[] = [
  { year: 1775, states: [], territories: ['thirteen_colonies'], foreign: ['spain', 'britain', 'france'] },
  { year: 1800, states: ['free_states_1800'], territories: ['nw_territory'], foreign: ['spain', 'france'] },
  { year: 1809, states: ['states_1809'], territories: ['louisiana'], foreign: ['spain'] },
  { year: 1850, states: ['states_1850'], territories: ['western_territories'], foreign: ['mexico'] }
]

export default function TerritoryTimeline() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [currentYear, setCurrentYear] = useState(1775)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 800
    const height = 500

    // Projection for US map
    const projection = d3.geoAlbersUsa()
      .scale(1000)
      .translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    // Load TopoJSON and render
    d3.json('/data/us-states.json').then((us: any) => {
      const states = feature(us, us.objects.states)

      svg.selectAll('path')
        .data(states.features)
        .join('path')
        .attr('d', path)
        .attr('fill', d => getColorForYear(d, currentYear))
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .transition()
        .duration(500)
    })
  }, [currentYear])

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return

    const years = [1775, 1800, 1809, 1850]
    let index = years.indexOf(currentYear)

    const interval = setInterval(() => {
      index = (index + 1) % years.length
      setCurrentYear(years[index])
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying, currentYear])

  const handleMouseOver = (event: any, d: any) => {
    d3.select(event.target)
      .attr('stroke', '#000')
      .attr('stroke-width', 2)

    // Show tooltip
    const tooltip = d3.select('#tooltip')
    tooltip.style('opacity', 1)
      .html(`<strong>${d.properties.name}</strong><br/>Status: ${getStatus(d, currentYear)}`)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 28) + 'px')
  }

  const handleMouseOut = (event: any) => {
    d3.select(event.target)
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)

    d3.select('#tooltip').style('opacity', 0)
  }

  return (
    <div className="relative">
      {/* Timeline controls */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <input
          type="range"
          min={1775}
          max={1850}
          step={25}
          value={currentYear}
          onChange={(e) => setCurrentYear(Number(e.target.value))}
          className="flex-1"
        />

        <span className="text-2xl font-bold">{currentYear}</span>
      </div>

      {/* Map SVG */}
      <svg ref={svgRef} width={800} height={500} className="border rounded-lg" />

      {/* Tooltip */}
      <div
        id="tooltip"
        className="absolute bg-white px-3 py-2 rounded shadow-lg opacity-0 pointer-events-none transition-opacity"
      />

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#0072B2]" />
          <span>States</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#E69F00]" />
          <span>Territories</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#e8e8e8]" />
          <span>Foreign</span>
        </div>
      </div>
    </div>
  )
}

function getColorForYear(feature: any, year: number): string {
  // Color logic based on territory status
  const name = feature.properties.name.toLowerCase()
  // ... implementation details
  return '#0072B2' // Default blue
}

function getStatus(feature: any, year: number): string {
  // Return status text
  return 'State'
}
```

---

### Figure 5.5: Mineral Production Chart

**Interactivity Goals:**
- Hover to highlight bar and show exact value
- Click to see comparison with modern data
- Sort animation (by value or alphabetically)

**Implementation with Recharts:**

```tsx
// components/visualizations/MineralChart.tsx
'use client'

import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { motion } from 'framer-motion'

const mineralData = [
  { name: 'Natural Gas', value: 95, modern: 23 },
  { name: 'Petroleum', value: 65, modern: 12 },
  { name: 'Copper', value: 56, modern: 6 },
  { name: 'Phosphate', value: 43, modern: 25 },
  { name: 'Coal', value: 39, modern: 8 },
  { name: 'Molybdenum', value: 38, modern: 24 },
  { name: 'Bauxite', value: 37, modern: 0 },
  { name: 'Zinc', value: 37, modern: 5 },
  { name: 'Iron Ore', value: 36, modern: 2 },
  { name: 'Lead', value: 34, modern: 5 },
  { name: 'Silver', value: 30, modern: 4 },
  { name: 'Salt', value: 20, modern: 15 },
  { name: 'Gold', value: 20, modern: 6 },
  { name: 'Tungsten', value: 17, modern: 0 }
]

// Viridis color scale
const getViridisColor = (value: number, max: number) => {
  const t = value / max
  // Simplified viridis approximation
  const r = Math.round(68 + t * 85)
  const g = Math.round(1 + t * 200)
  const b = Math.round(84 + t * 80)
  return `rgb(${r}, ${g}, ${b})`
}

export default function MineralChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [showModern, setShowModern] = useState(false)

  const sortedData = [...mineralData].sort((a, b) =>
    showModern ? b.modern - a.modern : b.value - a.value
  )

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowModern(false)}
          className={`px-4 py-2 rounded ${!showModern ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          1913 Data
        </button>
        <button
          onClick={() => setShowModern(true)}
          className={`px-4 py-2 rounded ${showModern ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Modern Comparison
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 20, right: 60, left: 100, bottom: 20 }}
        >
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="name" width={90} />
          <Tooltip
            formatter={(value: number) => [`${value}%`, showModern ? 'Modern Share' : '1913 Share']}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          <Bar
            dataKey={showModern ? 'modern' : 'value'}
            onMouseEnter={(_, index) => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={getViridisColor(showModern ? entry.modern : entry.value, 95)}
                opacity={hoveredBar === null || hoveredBar === index ? 1 : 0.5}
                style={{ transition: 'opacity 0.2s' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Caption */}
      <p className="text-center text-gray-600 mt-4">
        {showModern
          ? 'U.S. share of world mineral production today - dominance has declined'
          : 'In 1913, the U.S. led the world in production of every major mineral'}
      </p>
    </div>
  )
}
```

---

### Figure 8.1: Trust Decline Chart

**Interactivity Goals:**
- Animated line drawing on scroll
- Hover points for exact values
- Click events to show historical context popups
- Presidential term highlighting

**Implementation with Recharts + Framer Motion:**

```tsx
// components/visualizations/TrustDeclineChart.tsx
'use client'

import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceArea, Dot
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

const trustData = [
  { year: 1958, trust: 73, president: 'Eisenhower', party: 'R' },
  { year: 1964, trust: 77, president: 'Johnson', party: 'D', event: 'Post-JFK assassination rally' },
  { year: 1966, trust: 65, president: 'Johnson', party: 'D', event: 'Vietnam escalation' },
  { year: 1968, trust: 61, president: 'Johnson', party: 'D', event: 'MLK & RFK assassinated' },
  { year: 1970, trust: 54, president: 'Nixon', party: 'R' },
  { year: 1972, trust: 53, president: 'Nixon', party: 'R' },
  { year: 1974, trust: 36, president: 'Nixon/Ford', party: 'R', event: 'Watergate scandal' },
  { year: 1976, trust: 34, president: 'Ford', party: 'R' },
  { year: 1978, trust: 30, president: 'Carter', party: 'D' }
]

const events = [
  { year: 1963, label: 'JFK', description: 'President Kennedy assassinated in Dallas' },
  { year: 1968, label: 'MLK/RFK', description: 'Martin Luther King Jr. and Robert Kennedy killed' },
  { year: 1974, label: 'Watergate', description: 'Nixon resigns over Watergate scandal' }
]

interface CustomDotProps {
  cx?: number
  cy?: number
  payload?: any
  onClick?: (data: any) => void
}

const CustomDot = ({ cx, cy, payload, onClick }: CustomDotProps) => {
  const hasEvent = payload?.event

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={hasEvent ? 8 : 5}
      fill={hasEvent ? '#D55E00' : '#D55E00'}
      stroke="#fff"
      strokeWidth={2}
      style={{ cursor: hasEvent ? 'pointer' : 'default' }}
      onClick={() => hasEvent && onClick?.(payload)}
      whileHover={{ scale: 1.3 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: (payload?.year - 1958) * 0.05 }}
    />
  )
}

export default function TrustDeclineChart() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={trustData} margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
          {/* Presidential terms background */}
          <ReferenceArea x1={1958} x2={1961} fill="#D55E00" fillOpacity={0.08} />
          <ReferenceArea x1={1961} x2={1969} fill="#56B4E9" fillOpacity={0.1} />
          <ReferenceArea x1={1969} x2={1977} fill="#D55E00" fillOpacity={0.08} />
          <ReferenceArea x1={1977} x2={1978} fill="#56B4E9" fillOpacity={0.1} />

          {/* Event markers */}
          {events.map(e => (
            <ReferenceLine
              key={e.year}
              x={e.year}
              stroke="#666"
              strokeDasharray="5 5"
              label={{ value: e.label, position: 'bottom', fontSize: 11, fill: '#555' }}
            />
          ))}

          <XAxis dataKey="year" tickLine={false} />
          <YAxis
            domain={[20, 85]}
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Trust Level']}
            labelFormatter={(year) => {
              const d = trustData.find(t => t.year === year)
              return `${year} - ${d?.president} (${d?.party})`
            }}
          />

          <Line
            type="monotone"
            dataKey="trust"
            stroke="#D55E00"
            strokeWidth={3}
            dot={<CustomDot onClick={setSelectedEvent} />}
            animationDuration={2000}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Event popup */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl max-w-xs border"
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h4 className="font-bold text-lg">{selectedEvent.year}</h4>
            <p className="text-gray-600 mt-1">{selectedEvent.event}</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">{selectedEvent.trust}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#56B4E9] opacity-50" />
          <span>Democratic President</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#D55E00] opacity-30" />
          <span>Republican President</span>
        </div>
      </div>
    </div>
  )
}
```

---

### Figures 9.1-9.3: Income/Wealth Inequality Charts

**Interactivity Goals:**
- Toggle between income groups
- Animated transitions between views
- Hover to compare values across groups
- Year slider for temporal exploration

**Implementation:**

```tsx
// components/visualizations/IncomeInequalityChart.tsx
'use client'

import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, Brush
} from 'recharts'

// Okabe-Ito colors for colorblind accessibility
const COLORS = {
  'Bottom 20%': '#CC79A7',
  'Second 20%': '#0072B2',
  'Middle 20%': '#009E73',
  'Fourth 20%': '#E69F00',
  'Top 5%': '#D55E00'
}

const incomeData = [
  { year: 1968, bottom: 14, second: 32, middle: 52, fourth: 75, top5: 175 },
  { year: 1978, bottom: 15, second: 35, middle: 58, fourth: 85, top5: 200 },
  { year: 1988, bottom: 15.5, second: 37, middle: 62, fourth: 95, top5: 280 },
  { year: 1998, bottom: 16, second: 40, middle: 68, fourth: 108, top5: 380 },
  { year: 2008, bottom: 15.5, second: 41, middle: 70, fourth: 115, top5: 400 },
  { year: 2018, bottom: 15, second: 42, middle: 73, fourth: 125, top5: 480 },
  { year: 2023, bottom: 16, second: 44, middle: 77, fourth: 133, top5: 550 }
]

export default function IncomeInequalityChart() {
  const [visibleGroups, setVisibleGroups] = useState<Set<string>>(
    new Set(['bottom', 'middle', 'top5'])
  )

  const toggleGroup = (group: string) => {
    const newGroups = new Set(visibleGroups)
    if (newGroups.has(group)) {
      newGroups.delete(group)
    } else {
      newGroups.add(group)
    }
    setVisibleGroups(newGroups)
  }

  const formatDollar = (value: number) => `$${value}K`

  return (
    <div>
      {/* Group toggles */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.entries(COLORS).map(([name, color]) => {
          const key = name.toLowerCase().replace(/\s+/g, '').replace('%', '')
            .replace('bottom20', 'bottom')
            .replace('second20', 'second')
            .replace('middle20', 'middle')
            .replace('fourth20', 'fourth')
            .replace('top5', 'top5')

          const isActive = visibleGroups.has(key)

          return (
            <button
              key={name}
              onClick={() => toggleGroup(key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                isActive ? 'opacity-100' : 'opacity-40'
              }`}
              style={{
                backgroundColor: isActive ? color : '#e5e5e5',
                color: isActive ? '#fff' : '#666'
              }}
            >
              {name}
            </button>
          )
        })}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis dataKey="year" />
          <YAxis tickFormatter={formatDollar} />
          <Tooltip
            formatter={(value: number, name: string) => [formatDollar(value), name]}
            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
          />
          <Legend />

          {visibleGroups.has('bottom') && (
            <Line
              type="monotone"
              dataKey="bottom"
              name="Bottom 20%"
              stroke={COLORS['Bottom 20%']}
              strokeWidth={2}
              dot={{ r: 4 }}
              animationDuration={1000}
            />
          )}
          {visibleGroups.has('second') && (
            <Line
              type="monotone"
              dataKey="second"
              name="Second 20%"
              stroke={COLORS['Second 20%']}
              strokeWidth={2}
              dot={{ r: 4 }}
              animationDuration={1000}
            />
          )}
          {visibleGroups.has('middle') && (
            <Line
              type="monotone"
              dataKey="middle"
              name="Middle 20%"
              stroke={COLORS['Middle 20%']}
              strokeWidth={2}
              dot={{ r: 4 }}
              animationDuration={1000}
            />
          )}
          {visibleGroups.has('fourth') && (
            <Line
              type="monotone"
              dataKey="fourth"
              name="Fourth 20%"
              stroke={COLORS['Fourth 20%']}
              strokeWidth={2}
              dot={{ r: 4 }}
              animationDuration={1000}
            />
          )}
          {visibleGroups.has('top5') && (
            <Line
              type="monotone"
              dataKey="top5"
              name="Top 5%"
              stroke={COLORS['Top 5%']}
              strokeWidth={3}
              dot={{ r: 5 }}
              animationDuration={1000}
            />
          )}

          {/* Brush for year range selection */}
          <Brush dataKey="year" height={30} stroke="#0072B2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

---

### Figures 10.1-10.2: Walmart Growth

**Interactivity Goals:**
- Animated store count ticker
- Map with store locations appearing over time
- Hover to show regional statistics

**Key Implementation Notes:**
- Use requestAnimationFrame for smooth counter animation
- TopoJSON for efficient map data
- Canvas rendering for 6000+ store points

---

### Figures 11.1-11.4: Housing & Wealth

**Interactivity Goals:**
- Zoom into crisis period
- Compare states side-by-side
- Wealth distribution as animated treemap

---

## Testing and Deployment Strategy

### Isolated Testing Environment

Create `/website/test/visualization-sandbox.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Figure Preview - Designed to Fail</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      max-width: 1600px;
      margin: 0 auto;
    }
    .card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .card img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    .card h3 {
      margin: 12px 0 8px;
      font-size: 14px;
      color: #333;
    }
    .card p {
      margin: 0;
      font-size: 12px;
      color: #666;
    }
    h1 {
      text-align: center;
      color: #1a1a2e;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <h1>Figure Preview - Enhanced Color Palettes</h1>
  <div class="grid" id="figures"></div>

  <script>
    const figures = [
      { file: '5-1-territories-1770.png', title: 'Figure 5.1', desc: 'American Territories, 1775' },
      { file: '5-2-territories-1800.png', title: 'Figure 5.2', desc: 'American Territories, 1800' },
      { file: '5-3-territories-1809.png', title: 'Figure 5.3', desc: 'American Territories, 1809' },
      { file: '5-4-territories-1850.png', title: 'Figure 5.4', desc: 'American Territories, 1850' },
      { file: '5-5-minerals-1913.png', title: 'Figure 5.5', desc: 'U.S. Mineral Production (1913)' },
      { file: '8-1-trust-decline.png', title: 'Figure 8.1', desc: 'Trust in Government Decline' },
      { file: '9-1-mean-income.png', title: 'Figure 9.1', desc: 'Mean Income by Quintile' },
      { file: '9-2-share-income.png', title: 'Figure 9.2', desc: 'Share of Income Distribution' },
      { file: '9-3-wealth-share.png', title: 'Figure 9.3', desc: 'Wealth Share by Group' },
      { file: '10-1-wal-growth.png', title: 'Figure 10.1', desc: 'Walmart Growth 1962-2005' },
      { file: '10-2-wal-maps.png', title: 'Figure 10.2', desc: 'Walmart Geographic Expansion' },
      { file: '11-1-national-home-prices.png', title: 'Figure 11.1', desc: 'National Home Price Index' },
      { file: '11-2-state-home-prices.png', title: 'Figure 11.2', desc: 'State Home Price Comparison' },
      { file: '11-3-wealth-distribution-2025.png', title: 'Figure 11.3', desc: 'Wealth Distribution 2025' },
      { file: '11-4-income-share.png', title: 'Figure 11.4', desc: 'Income Share by Tier' }
    ];

    const container = document.getElementById('figures');
    figures.forEach(fig => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="../public/images/figures/${fig.file}" alt="${fig.title}" loading="lazy" />
        <h3>${fig.title}</h3>
        <p>${fig.desc}</p>
      `;
      container.appendChild(card);
    });
  </script>
</body>
</html>
```

### Deployment Checklist

1. **Performance**
   - [ ] Lazy load interactive components
   - [ ] Use dynamic imports: `dynamic(() => import('./Chart'), { ssr: false })`
   - [ ] Implement intersection observer for scroll-triggered animations

2. **Accessibility**
   - [ ] Add ARIA labels to all interactive elements
   - [ ] Ensure keyboard navigation works
   - [ ] Test with screen readers
   - [ ] Verify colorblind-friendly palettes

3. **Mobile**
   - [ ] Test touch interactions
   - [ ] Adjust chart dimensions for small screens
   - [ ] Consider disabling complex animations on mobile

4. **Fallbacks**
   - [ ] Static PNG fallback for no-JS environments
   - [ ] Loading states during hydration
   - [ ] Error boundaries for chart failures

---

## Summary

| Figure | Recommended Library | Priority | Estimated Effort |
|--------|---------------------|----------|------------------|
| 5.1-5.4 Territory Maps | D3.js | High | 8 hours |
| 5.5 Minerals | Recharts | Medium | 3 hours |
| 8.1 Trust | Recharts + Framer | High | 4 hours |
| 9.1-9.3 Income/Wealth | Recharts | High | 5 hours |
| 10.1-10.2 Walmart | D3.js + Recharts | Medium | 6 hours |
| 11.1-11.4 Housing | Recharts | Medium | 4 hours |

**Total Estimated Effort:** 30 hours

---

*Document maintained by the Data Visualization Engineering Team*
