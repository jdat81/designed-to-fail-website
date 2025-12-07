export interface Author {
  name: string
  slug: string
  role: string
  years?: string
  isMemorial: boolean
  image?: string
  shortBio: string
  fullBio: string[]
  credentials: string[]
  notableWorks: {
    title: string
    year: number
    description: string
  }[]
  quotes: string[]
}

export const authors: Author[] = [
  {
    name: 'Sven Steinmo',
    slug: 'sven-steinmo',
    role: 'Political Scientist',
    years: '1953–2024',
    isMemorial: true,
    // image: '/images/sven-steinmo.jpg', // Add when available
    shortBio: 'One of the most influential political scientists of his generation. Steinmo coined the term "historical institutionalism" and transformed how we understand the relationship between institutions and political outcomes.',
    fullBio: [
      'Sven Steinmo (1953–2024) was one of the most influential political scientists of his generation. A professor at the University of Colorado Boulder and later at the European University Institute in Florence, Italy, Steinmo spent his career examining how institutions shape political outcomes and why similar democracies produce such different results.',
      'Steinmo coined the term "historical institutionalism" in his groundbreaking 1992 book "Structuring Politics," co-edited with Kathleen Thelen and Frank Longstreth. This approach revolutionized political science by showing that institutions are not neutral structures but products of historical struggle that continue to shape political possibilities.',
      'His comparative work on taxation and the welfare state demonstrated that Americans pay more for less government because of institutional fragmentation, not cultural values. This insight became central to "Designed to Fail," his final major work.',
      'Steinmo passed away in July 2024, before this book was published. His longtime collaborator John D\'Attoma completed the manuscript, ensuring their shared vision of explaining American political dysfunction reached readers.',
    ],
    credentials: [
      'Professor, University of Colorado Boulder',
      'Professor, European University Institute (Florence)',
      'Coined "historical institutionalism"',
      'Author of 8 books on comparative politics',
    ],
    notableWorks: [
      {
        title: 'Structuring Politics',
        year: 1992,
        description: 'Co-edited volume that introduced historical institutionalism to political science.',
      },
      {
        title: 'Taxation and Democracy',
        year: 1993,
        description: 'Comparative analysis of tax systems in Sweden, Britain, and the United States.',
      },
      {
        title: 'The Evolution of Modern States',
        year: 2010,
        description: 'Examination of how advanced democracies adapted to global economic pressures.',
      },
      {
        title: 'Designed to Fail',
        year: 2025,
        description: 'Final work explaining why American institutions produce dysfunction (with John D\'Attoma).',
      },
    ],
    quotes: [
      'Institutions are not neutral structures—they are the products of political struggle.',
      'Americans are not uniquely anti-government. They are uniquely disappointed by their government.',
      'The Constitution was designed to prevent tyranny. But it also prevents democracy.',
    ],
  },
  {
    name: "John D'Attoma",
    slug: 'john-dattoma',
    role: 'Political Scientist',
    isMemorial: false,
    image: '/images/authors/JohnD.JPG',
    shortBio: 'Specializing in comparative politics, political economy, and experimental methods. D\'Attoma completed this manuscript after Steinmo\'s passing, carrying forward their shared vision of understanding how institutional design shapes democratic outcomes.',
    fullBio: [
      'John D\'Attoma is a political scientist specializing in comparative politics, political economy, and experimental methods. His research examines how institutions shape citizen behavior, tax compliance, and trust in government.',
      'D\'Attoma\'s work combines rigorous quantitative methods with deep comparative analysis, building on the historical institutionalist tradition pioneered by his longtime collaborator Sven Steinmo. Together, they conducted extensive research on American attitudes toward government and taxation.',
      'After Steinmo\'s passing in July 2024, D\'Attoma completed "Designed to Fail," ensuring their years of collaborative research reached publication. The book represents the culmination of their shared inquiry into why Americans, despite being among the most egalitarian people in the world, live in one of the most unequal democracies.',
      'D\'Attoma continues to research and teach on questions of institutional design, democratic governance, and comparative political economy.',
    ],
    credentials: [
      'Political Scientist and Researcher',
      'Specialist in comparative politics and experimental methods',
      'Expert on tax compliance and citizen behavior',
      'Longtime collaborator of Sven Steinmo',
    ],
    notableWorks: [
      {
        title: 'Designed to Fail',
        year: 2025,
        description: 'Co-authored with Sven Steinmo, examining institutional roots of American political dysfunction.',
      },
    ],
    quotes: [
      'This book is Sven\'s final gift to readers who want to understand American democracy.',
      'The evidence is clear: Americans are not getting the government they want because they cannot.',
    ],
  },
]

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}
