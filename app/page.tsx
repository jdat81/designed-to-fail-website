import Hero from '@/components/sections/Hero'
import DataShowcase from '@/components/sections/DataShowcase'
import ChapterGrid from '@/components/sections/ChapterGrid'
import AuthorSpotlight from '@/components/sections/AuthorSpotlight'
import CoreArgumentSection from '@/components/sections/CoreArgument'
import FinalCTA from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreArgumentSection />
      <DataShowcase />
      <ChapterGrid />
      <AuthorSpotlight />
      <FinalCTA />
    </>
  )
}
