import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data & Visualizations',
  description: 'Key figures and visualizations from Designed to Fail.',
}

export default function FiguresLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
