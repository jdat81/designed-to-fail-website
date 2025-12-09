import { Figure } from '@/lib/types'

export const figures: Figure[] = [
  {
    number: "5.1",
    slug: "5-1-territories-1850",
    caption: "American Territorial Expansion, 1775-1850",
    image: "/images/figures/5-4-territories-1850.png",
    context: "From thirteen colonies hugging the Atlantic coast to a continental empire stretching to the Pacific. This 75-year transformation was built on the genocide of Native populations, the exploitation of unparalleled natural resources, and the unique capacity of American political institutions to facilitate westward expansion.",
    chapter: 5,
    theme: "territory"
  },
  {
    number: "8.1",
    slug: "8-1-trust-decline",
    caption: "The Collapse of Trust in Government, 1958-1978",
    image: "/images/figures/8-1-trust-decline.png",
    context: "Trust in government fell from 73% in 1958 to 30% in 1978—one of the most significant shifts in American political culture. This twenty-year collapse, driven by Vietnam, assassinations, and Watergate, fundamentally altered the relationship between Americans and their government.",
    chapter: 8,
    theme: "trust"
  },
  {
    number: "9.1",
    slug: "9-1-inequality",
    caption: "The Great Divergence: Income and Wealth Inequality, 1968-2023",
    image: "/images/figures/9-1-mean-income.png",
    context: "Since 1968, top 5% income has soared while middle and lower quintiles stagnated. The widening gap between trend lines visualizes how economic growth has been captured almost entirely by the wealthy, leaving most Americans behind despite decades of rising productivity.",
    chapter: 9,
    theme: "inequality"
  },
  {
    number: "11.4",
    slug: "11-4-income-share",
    caption: "Share of Total U.S. Household Income by Tier, 1970-2022",
    image: "/images/figures/11-4-income-share.png",
    context: "Over 50 years, the upper tier's share of income grew while middle and lower tiers declined. This long-term structural shift shows how America's institutions have systematically redistributed economic gains upward, hollowing out the middle class.",
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
