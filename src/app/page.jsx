import Link from 'next/link'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Logo, Logomark } from '@/components/Logo'

const chapters = [
    {
      title: 'Executive Summary',
      description: 'About this research project',
      source:
        'https://picsum.photos/300/300.jpg?a=0',
      url: '/docs/computation/intro/',
    },
  {
    title: 'Computer Hardware',
    description: 'How does a mix of metal, sand, and glass make a computer?',
    source:
      '/braid-docs/images/computers/computer.jpg',
    url: '/docs/computation/intro/',
  },
  {
    title: 'Biological Hardware: The Brain',
    description: 'How does the brain work?',
    source:
      '/braid-docs/images/brain/brain-card.png',
    url: '/docs/the-brain/intro/',
  },
  {
    title: 'Artificial Intelligence',
    description: 'TBD',
    source: 'https://picsum.photos/300/300.jpg?a=1',
    url: '/docs/ai/',
  },
  {
    title: 'Nanomaterials Research',
    description: 'TBD',
    source: 'https://picsum.photos/300/300.jpg?a=1',
    url: '/docs/ai/',
  },
  {
    title: 'Brain-Inspired Computing (Neuromorphic Computing)',
    description: 'TBD',
    source: 'https://picsum.photos/300/300.jpg?a=2',
    url: '/docs/neuromorphic-computing/',
  },
  {
    title: 'Cerebellum-Inspired Circuits',
    description: 'TBD',
    source: 'https://picsum.photos/300/300.jpg?a=3',
    url: '/docs/cerebellum-inspired-hardware/',
  },
  {
    title: 'Potential Applications & Broader Impacts',
    description: '3.9 MB',
    source: 'https://picsum.photos/300/300.jpg?a=4',
    url: '#'
  }
];

const footerLinks = {
    solutions: [
        { name: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
    ],
    support: [
        { name: 'Submit ticket', href: '#' },
        { name: 'Documentation', href: '#' },
    ],
    company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
    ],
    legal: [
        { name: 'Terms of service', href: '#' },
        { name: 'Privacy policy', href: '#' },
        { name: 'License', href: '#' },
    ]
};

function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow-sm dark:bg-slate-900">
      <div className=" w-full flex flex-none flex-wrap items-center justify-between bg-white px-4 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none dark:bg-transparent">
        <div className="flex h-16 justify-between w-full">
          <div className="flex justify-between w-full">
            <div className="flex shrink-0 items-center">
                <Link href="/" aria-label="Home page" className="flex">
                    <Logomark className="h-9 w-9 lg:hidden" />
                    <Logo />
                </Link>
                </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <a
                href="/braid-docs/docs/computation/intro"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400"
              >
                Docs
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400"
              >
                Team
              </a>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-3">
          {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
          <DisclosureButton
            as="a"
            href="/braid-docs/docs/computation/intro"
            className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
          >
            Docs
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:"
          >
            Team
          </DisclosureButton>
          
        </div>
       
      </DisclosurePanel>
    </Disclosure>
  )
}




export default function HomePage({ children }) {
    return (
        <div className="flex flex-col w-full">
            <Navbar />

            {/* Section 1: Intro */}
            <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-slate-900">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-base/7 font-semibold text-sky-600 dark:text-sky-500">Frontiers in AI</p>
                    <h2 className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">Cerebellum-Inspired Hardware Research</h2>
                    <p className="mt-8 text-lg text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-300">
                    This is a work-in-progress resource to explore selected ideas and impacts of neuromorphic research...
                    </p>
                </div>
            </div>

            {/* Section 2: Modules */}
            <div className="bg-gray-100 dark:bg-slate-800">
                <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
                    <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                    >
                    {chapters.map((chapter, index) => (
                        <li className="relative" key={`${chapter.title}-${index}`}>
                        <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                            <img
                            alt=""
                            src={chapter.source}
                            className="pointer-events-none h-[230px] w-full object-cover object-center group-hover:opacity-75"
                            />
                            <Link
                            href={chapter.url}
                            className="focus:outline-hidden absolute inset-0"
                            >
                            <span className="sr-only">View details for {chapter.title}</span>
                            </Link>
                        </div>
                        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 dark:text-white">
                            {index + 1}. {chapter.title}
                        </p>
                        <p className="pointer-events-none block text-sm font-medium text-gray-500 dark:text-gray-300">
                            {chapter.description}
                        </p>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>


            {/* footer */}
            <footer className="bg-white dark:bg-slate-900">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <img
                        alt="Company name"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-9"
                    />
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Solutions</h3>
                            <ul role="list" className="mt-6 space-y-4">
                            {footerLinks.solutions.map((item) => (
                                <li key={item.name}>
                                <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300">
                                    {item.name}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0">
                            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Support</h3>
                            <ul role="list" className="mt-6 space-y-4">
                            {footerLinks.support.map((item) => (
                                <li key={item.name}>
                                <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300">
                                    {item.name}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Company</h3>
                            <ul role="list" className="mt-6 space-y-4">
                            {footerLinks.company.map((item) => (
                                <li key={item.name}>
                                <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300">
                                    {item.name}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className="mt-10 md:mt-0">
                            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">Legal</h3>
                            <ul role="list" className="mt-6 space-y-4">
                            {footerLinks.legal.map((item) => (
                                <li key={item.name}>
                                <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-gray-300">
                                    {item.name}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>
        </div>
    )
  }
  