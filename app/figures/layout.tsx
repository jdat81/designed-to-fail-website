import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data & Visualizations',
  description: '14 figures documenting 250 years of institutional design, territorial expansion, economic transformation, and the collapse of trust in American democracy.',
}

export default function FiguresLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
