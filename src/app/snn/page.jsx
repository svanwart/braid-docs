import { snnSections } from '../data/snn'
import PageLayout from '@/components/layouts/PageLayout'
import TabbedSection from '@/components/TabbedSection'
import HeaderPanel from '@/components/HeaderPanel'
export default function SNNPage() {
  return (
    <PageLayout>
      {/* Section 1: Intro */}
      <HeaderPanel title="Spiking Neural Networks">
        The goal of this page is to provide enough context and intuition about
        Spiking Neural Networks (SNNs) so that different audiences can
        understand how they work, how they differ from other types of neural
        networks, and potential uses.
      </HeaderPanel>

      <div className="m-auto max-w-5xl bg-white px-6 py-12 lg:px-8 dark:bg-slate-900 dark:bg-none">
        <TabbedSection sections={snnSections} />
      </div>
    </PageLayout>
  )
}
