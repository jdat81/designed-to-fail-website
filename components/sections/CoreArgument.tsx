'use client'

import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'

export default function CoreArgumentSection() {
  return (
    <section className="section bg-white">
      <div className="container-narrow">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-red/10 text-accent-red font-sans font-semibold text-sm uppercase tracking-wider mb-6">
              The Core Argument
            </span>
          </div>
        </ScrollReveal>

        <StaggerContainer className="space-y-8">
          <StaggerItem>
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              Americans love their country but profoundly distrust their government. Today, only 14% of Americans believe they can trust their government most or even some of the time. This wasn&apos;t always the case—in 1958, 73% of Americans trusted government.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              What happened? The conventional explanations point to Vietnam, Watergate, partisan polarization, or cultural decline. But the real answer lies deeper—in the very design of American political institutions.
            </p>
          </StaggerItem>

          <StaggerItem>
            <blockquote className="blockquote my-4">
              &ldquo;The Constitution was constructed in 1787 precisely because the governing elite in America were terrified of the untamed democratic forces they believed the Revolution itself had unleashed.&rdquo;
            </blockquote>
          </StaggerItem>

          <StaggerItem>
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              The checks and balances we celebrate as keystones of American democracy were specifically designed to be barriers to democracy. The Founders weren&apos;t creating a government that could respond to majority preferences—they were preventing one.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              This book traces how 18th-century anti-majoritarian institutions, designed by elites fearful of popular rule, consistently produce gridlock, fuel cynicism, empower narrow interests, and fail to serve the democratic ideals Americans hold dear.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
