import { Figure } from '@/lib/types'

export const figures: Figure[] = [
  {
    number: "5.1",
    slug: "5-1-territories-1770",
    caption: "American Territories, 1770",
    context: "Shows the original thirteen colonies hugging the Atlantic coast, with vast territories to the west claimed by European powers. This map establishes the geographic starting point for America's continental expansion, illustrating the limited territory from which the United States would grow into a continental empire within 80 years.",
    chapter: 5,
    theme: "territory"
  },
  {
    number: "5.2",
    slug: "5-2-territories-1800",
    caption: "American Territories, 1800",
    context: "Documents early westward expansion following the Revolution, showing territories beginning to push beyond the Appalachians. The map illustrates the first phase of systematic displacement of Native American populations and the extension of American territorial claims.",
    chapter: 5,
    theme: "territory"
  },
  {
    number: "5.3",
    slug: "5-3-territories-1809",
    caption: "American Territories, 1809",
    context: "Captures the Louisiana Purchase's impact, showing massive territorial expansion that doubled the nation's size. This acquisition provided access to extraordinary natural resources and demonstrated the federal government's capacity for decisive action in foreign affairs and territorial acquisition.",
    chapter: 5,
    theme: "territory"
  },
  {
    number: "5.4",
    slug: "5-4-territories-1850",
    caption: "American Territories, 1850",
    context: "Shows the United States stretching from Atlantic to Pacific following the Mexican-American War and western settlement. This map captures the fulfillment of 'Manifest Destiny'—the continental empire built on genocide of Native populations and exploitation of unparalleled natural resources.",
    chapter: 5,
    theme: "territory"
  },
  {
    number: "5.5",
    slug: "5-5-minerals-1913",
    caption: "US Mineral Output: 1913",
    context: "Documents America's extraordinary mineral wealth at the peak of industrial expansion. The data shows the United States as the world's leading producer of coal, iron, copper, and other essential industrial resources.",
    chapter: 5,
    theme: "economy"
  },
  {
    number: "8.1",
    slug: "8-1-trust-decline",
    caption: "The Collapse of Trust in Government, 1958-1978",
    context: "Dramatic visualization of trust in government falling from 73% in 1958 to 30% in 1978. This twenty-year collapse represents one of the most significant shifts in American political culture.",
    chapter: 8,
    theme: "trust"
  },
  {
    number: "9.1",
    slug: "9-1-mean-income",
    caption: "Trends in mean household income across different income quintiles and the top 5 percent from 1968 to 2023",
    context: "Shows diverging economic fortunes since 1968: top 5% income soared while middle and lower quintiles stagnated. The widening gap between trend lines visualizes how economic growth has been captured almost entirely by the wealthy.",
    chapter: 9,
    theme: "inequality"
  },
  {
    number: "9.2",
    slug: "9-2-share-income",
    caption: "Share of total household income held by different income quintiles and the top percentile from 1968 to 2023",
    context: "Illustrates the top percentile's growing share of total income from roughly 10% in 1968 to over 20% by 2023, while other quintiles' shares declined.",
    chapter: 9,
    theme: "inequality"
  },
  {
    number: "9.3",
    slug: "9-3-wealth-share",
    caption: "Share of total wealth held by different wealth percentiles from 1968 to 2023",
    context: "Even more dramatic than income inequality, this figure shows wealth concentration accelerating over 55 years. The top percentile now controls a historically unprecedented share of national wealth.",
    chapter: 9,
    theme: "inequality"
  },
  {
    number: "10.1",
    slug: "10-1-wal-growth",
    caption: "Growth of Walmart 1962-2005",
    context: "Charts Walmart's explosive growth from single Arkansas store to world's largest retailer. The exponential growth curve illustrates corporate consolidation's acceleration and small retailers' displacement.",
    chapter: 10,
    theme: "economy"
  },
  {
    number: "10.2",
    slug: "10-2-wal-maps",
    caption: "United States Geographic Expansion of Walmart 1962-2005",
    context: "Maps showing Walmart's spread from Arkansas across the nation, store by store. The geographic progression illustrates systematic corporate colonization of American retail landscape.",
    chapter: 10,
    theme: "economy"
  },
  {
    number: "11.1",
    slug: "11-1-national-home-prices",
    caption: "U.S. National Home Price Index 2000-2010: The Housing Bubble",
    context: "Shows home prices skyrocketing from 2000 to 2006 peak, then crashing after 2007. The bubble's symmetrical rise and fall illustrates speculative mania and devastating collapse.",
    chapter: 11,
    theme: "economy"
  },
  {
    number: "11.2",
    slug: "11-2-state-home-prices",
    caption: "Top 5 States by Home Price Appreciation (2000-2005)",
    context: "Details extreme price appreciation in Nevada, Arizona, Florida, California, and other bubble states. These states experienced both the most dramatic gains and the most devastating losses.",
    chapter: 11,
    theme: "economy"
  },
  {
    number: "11.3",
    slug: "11-3-wealth-distribution-2025",
    caption: "Distribution of Household Wealth in the U.S (Q1 2025)",
    context: "Current snapshot of extreme wealth concentration: top 1% owns disproportionate share while bottom 50% owns virtually nothing.",
    chapter: 11,
    theme: "inequality"
  },
  {
    number: "11.4",
    slug: "11-4-income-share",
    caption: "Share of Total U.S. Household Income by Tier, 1970-2022",
    context: "Long-term view of income distribution showing upper tier's growing share and middle/lower tiers' declining shares over 50+ years.",
    chapter: 11,
    theme: "inequality"
  }
]

export function getFigureBySlug(slug: string): Figure | undefined {
  return figures.find(f => f.slug === slug)
}

export function getFiguresByChapter(chapterNum: number): Figure[] {
  return figures.filter(f => f.chapter === chapterNum)
}

export function getFiguresByTheme(theme: Figure['theme']): Figure[] {
  return figures.filter(f => f.theme === theme)
}
