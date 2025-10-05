'use client'
import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { Logo, Logomark } from '@/components/Logo'
import { ThemeSelector } from '@/components/ThemeSelector'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import './page.css'

function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="sticky left-0 top-0 z-[100] w-full dark:bg-slate-900"
    >
      <div className="!duration-8000 flex w-full flex-none flex-wrap items-center justify-between px-4 transition sm:px-6 lg:px-8 dark:bg-transparent dark:shadow-none">
        <div className="flex h-16 w-full justify-between">
          <div className="flex w-full justify-between">
            <div className="flex shrink-0 items-center">
              <Link href="/" aria-label="Home page" className="flex">
                <Logomark className="h-9 w-9 lg:hidden" />
                <Logo />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/braid-docs/docs"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-black hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
              >
                Docs
              </a>
            </div>
          </div>

          <div className="sm:gapx-8 -mr-2 flex items-center gap-2">
            <ThemeSelector className="relative z-10 my-5 ml-2" />
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default function MatrixPage({ children }) {
  const [tableState, setTableState] = useState({
    tableWidth: '100vw',
    transition: 'all 500ms ease-in-out',
    transform: 'translateX(0vw)',
    col1Width: '33.33vw',
    col2Width: '33.33vw',
    col3Width: '33.33vw',
    open: false,
  })

  function grow(idx) {
    if (tableState.open) {
      setTableState((prev) => ({
        ...prev,
        tableWidth: '100vw',
        transform: 'translateX(0vw)',
        col1Width: '33.33vw',
        col2Width: '33.33vw',
        col3Width: '33.33vw',
        open: !prev.open,
      }))
      return
    }
    if (idx === 1) {
      setTableState((prev) => ({
        ...prev,
        tableWidth: '168vw',
        transform: 'translateX(0vw)',
        col1Width: '100vw',
        open: !prev.open,
      }))
    } else if (idx === 2) {
      setTableState((prev) => ({
        ...prev,
        tableWidth: '168vw',
        transform: 'translateX(-33.33vw)',
        col2Width: '100vw',
        open: !prev.open,
      }))
    } else if (idx === 3) {
      setTableState((prev) => ({
        ...prev,
        tableWidth: '168vw',
        transform: 'translateX(-66.66vw)',
        col3Width: '100vw',
        open: !prev.open,
      }))
    } else {
      setTableState((prev) => ({
        ...prev,
        tableWidth: '100vw',
        transform: 'translateX(0vw)',
        col1Width: '33.33vw',
        col2Width: '33.33vw',
        col3Width: '33.33vw',
        open: !prev.open,
      }))
    }
  }

  function getTableLayout() {
    return clsx(
      '-mt-[100px] border-collapse border border-black dark:border-gray-600',
    )
  }

  function drawIntro() {
    return (
      <>
        {/* Section 1: Intro */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 px-6 py-20 lg:px-8 dark:bg-slate-900 dark:bg-none">
          <div className="mx-auto max-w-3xl">
            <h2 className="mt-2 text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
              Overview of biological and artificial intelligence
            </h2>
            <p className="mt-8 text-pretty text-center text-lg text-gray-800 sm:text-xl/8 dark:text-gray-300">
              A comparison of some of the ways that the human brain, traditional
              computers, and neuromorphic computers process are similar and
              different.
            </p>
          </div>
        </div>
      </>
    )
  }

  function drawTable() {
    return (
      // <table className={getTableLayout()}>
      <table
        // className={getTableLayout()}
        style={{
          width: tableState.tableWidth,
          transform: tableState.transform,
          transition: 'all 500ms ease-in-out',
          'margin-top': '-66px',
        }}
      >
        <colgroup>
          <col
            style={{
              width: tableState.col1Width,
              transition: 'width 500ms ease-in-out',
            }}
          />
          <col
            style={{
              width: tableState.col2Width,
              transition: 'width 500ms ease-in-out',
            }}
          />
          <col
            style={{
              width: tableState.col3Width,
              transition: 'width 500ms ease-in-out',
            }}
          />
        </colgroup>
        <thead className="sticky top-[0px] z-40 shadow-sm shadow-black/100 dark:shadow-white/100">
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="bg-teal-50 px-10 pb-10 pt-[100px] text-left dark:border-gray-600 dark:bg-gray-700">
              <div className="flex items-start justify-between">
                <h2 className="text-4xl font-extrabold text-black dark:text-white">
                  The Brain
                </h2>
                <button
                  onClick={function () {
                    grow(1)
                  }}
                  className="flex items-center justify-center rounded-full border-2 border-black p-3 font-bold text-gray-900 dark:border-white dark:text-white"
                >
                  {tableState.open ? (
                    <ChevronLeftIcon className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" strokeWidth={3} />
                  )}
                </button>
              </div>
            </th>
            <th className="bg-indigo-50 px-10 pb-10 pt-[100px] text-left dark:border-gray-600 dark:bg-gray-800">
              <div className="flex items-start justify-between">
                <h2 className="text-4xl font-extrabold text-black dark:text-white">
                  Von Neumann
                </h2>
                <button
                  onClick={function () {
                    grow(2)
                  }}
                  className="flex items-center justify-center rounded-full border-2 border-black p-3 font-bold text-gray-900 dark:border-white dark:text-white"
                >
                  {tableState.open ? (
                    <ChevronLeftIcon className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" strokeWidth={3} />
                  )}
                </button>
              </div>
            </th>
            <th className="bg-pink-50 px-10 pb-10 pt-[100px] text-left dark:border-gray-600 dark:bg-gray-950">
              <div className="flex items-start justify-between">
                <h2 className="text-4xl font-extrabold text-black dark:text-white">
                  Neuromorphic
                </h2>
                <button
                  onClick={function () {
                    grow(3)
                  }}
                  className="flex items-center justify-center rounded-full border-2 border-black p-3 font-bold text-gray-900 dark:border-white dark:text-white"
                >
                  {tableState.open ? (
                    <ChevronLeftIcon className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" strokeWidth={3} />
                  )}
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">1. Building Blocks</h2>
            </td>
            <td className="bg-indigo-50 px-10 pt-16 dark:bg-gray-800">
              <h2
                className={`text-2xl font-extrabold transition-opacity duration-500 ease-in-out ${tableState.open ? 'opacity-100' : 'opacity-0'}`}
              >
                1. Building Blocks
              </h2>
            </td>
            <td className="bg-pink-50 px-10 pt-16 dark:bg-gray-950">
              <h2
                className={`text-2xl font-extrabold transition-opacity duration-500 ease-in-out ${tableState.open ? 'opacity-100' : 'opacity-0'}`}
              >
                1. Building Blocks
              </h2>
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <h3 className="mb-4 mt-0 text-lg font-bold text-blue-950 dark:text-slate-100">
                Neurons
              </h3>
              <img
                src="/braid-docs/images/brain/neuron-anatomy.png"
                alt="Placeholder image"
                className="mb-4 w-full max-w-xl dark:invert"
              />
              <p className="mb-4">
                Neurons are cells in the nervous system that communicate with
                one another by sending and receiving electrical pulses (called
                spikes). These signals help people think, feel, and react to the
                world around them.
              </p>
              <ul className="mb-4 list-disc pl-8">
                <li className="mb-2">
                  Spikes enter a neuron through dendrites
                </li>
                <li className="mb-2">
                  Charge is then aggregated in the cell body
                </li>
                <li className="mb-2">
                  When a threshold is reached, an electrical pulse travels down
                  the axon (called an “action potential”). The charge is then
                  passed to connected neurons through small gaps called
                  synapses.
                </li>
              </ul>
            </td>
            <td className="bg-indigo-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <h3 className="mb-4 mt-0 text-lg font-bold text-blue-950 dark:text-slate-100">
                Transistors
              </h3>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Placeholder image"
                className="mb-4 w-full max-w-md dark:invert"
              />
              <p>
                Arithmetic Logic Unit (ALU), control unit, registers, memory
              </p>
            </td>
            <td className="bg-pink-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              <h3 className="mb-4 mt-0 text-lg font-bold text-blue-950 dark:text-slate-100">
                Memristors and Memtransistors
              </h3>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Placeholder image"
                className="mb-4 w-full max-w-md dark:invert"
              />
              <p>
                Memristors, memtransistors, and other devices that mimic neurons
                and synapses in hardware
                <br />
                These emerging devices allow for energy-efficient, local
                computation and memory storage — enabling brain-like processing
                in silicon.
              </p>
            </td>
          </tr>
          <tr className="border-t border-black dark:border-gray-400">
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">2. Connectivity</h2>
            </td>
            <td className="bg-indigo-50 px-10 pt-16 dark:bg-gray-800">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  2. Connectivity
                </h2>
              )}
            </td>
            <td className="bg-pink-50 px-10 pt-16 dark:bg-gray-950">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  2. Connectivity
                </h2>
              )}
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Synapses form sparse, dynamic, directed networks
            </td>
            <td className="bg-indigo-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Data buses connect CPU, memory, and I/O components
            </td>
            <td className="bg-pink-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              Event-based spiking connections with configurable topology
            </td>
          </tr>
          <tr className="border-t border-black dark:border-gray-400">
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">3. Memory</h2>
            </td>
            <td className="bg-indigo-50 px-10 pt-16 dark:bg-gray-800">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  3. Memory
                </h2>
              )}
            </td>
            <td className="bg-pink-50 px-10 pt-16 dark:bg-gray-950">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  3. Memory
                </h2>
              )}
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Distributed across the network; stored in synaptic weights
            </td>
            <td className="bg-indigo-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Centralized RAM and storage, separate from processing
            </td>
            <td className="bg-pink-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              Co-located with processing units; memory often embedded in
              synapses
            </td>
          </tr>
          <tr className="border-t border-black dark:border-gray-400">
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">
                4. Computation &amp; Coordination
              </h2>
            </td>
            <td className="bg-indigo-50 px-10 pt-16 dark:bg-gray-800">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  4. Computation &amp; Coordination
                </h2>
              )}
            </td>
            <td className="bg-pink-50 px-10 pt-16 dark:bg-gray-950">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  4. Computation &amp; Coordination
                </h2>
              )}
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Parallel, asynchronous, locally driven by neural activity
            </td>
            <td className="bg-indigo-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Centralized, synchronous, sequential instruction processing
              (clocked)
            </td>
            <td className="bg-pink-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              <h3 className="text-lg font-bold text-blue-950 dark:text-slate-100">
                Asynchronous, event-driven, massively parallel
              </h3>
              <p>TODO: link to SNN demo.</p>
            </td>
          </tr>
          <tr className="border-t border-black dark:border-gray-400">
            <th className="bg-teal-50 px-10 pt-16 text-left text-2xl font-extrabold dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                5. Learning
              </h2>
            </th>
            <td className="bg-indigo-50 px-10 pt-16 dark:bg-gray-800">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  5. Learning
                </h2>
              )}
            </td>
            <td className="bg-pink-50 px-10 pt-16 dark:bg-gray-950">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  5. Learning
                </h2>
              )}
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <h3 className="text-lg font-bold text-blue-950 dark:text-slate-100">
                Synaptic Plasticity
              </h3>
              <p>
                The number of connections and the strength of the connections
                between neurons allows the brain to learn, remember, and adapt
                over time. When two neurons repeatedly activate together, their
                synapse becomes stronger. If neurons rarely fire together, the
                connection weakens over time. This process of strengthening and
                weakening synapses is called synaptic plasticity.
              </p>
            </td>
            <td className="bg-indigo-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              External: Learning occurs via software/programming
            </td>
            <td className="bg-pink-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              On-chip learning (e.g., Hebbian, STDP); weights adapt in response
              to spikes
            </td>
          </tr>
          <tr className="border-t border-black dark:border-gray-400">
            <th className="bg-teal-50 px-10 pt-16 text-left text-2xl font-extrabold dark:bg-gray-700">
              6. Efficiency &amp; Scale
            </th>
            <td className="bg-indigo-50 px-10 pt-16 dark:bg-gray-800">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  6. Efficiency &amp; Scale
                </h2>
              )}
            </td>
            <td className="bg-pink-50 px-10 pt-16 dark:bg-gray-950">
              {tableState.open && (
                <h2 className="text-2xl font-extrabold transition-opacity duration-500 ease-in-out">
                  6. Efficiency &amp; Scale
                </h2>
              )}
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Ultra-low power (~20W), scales to ~86B neurons
            </td>
            <td className="bg-indigo-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Power-hungry, limited by memory bandwidth and Moore&apos;s Law
            </td>
            <td className="bg-pink-50 px-10 py-6 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              Ultra-low power (e.g., &lt;1W), well-suited for edge computing and
              large-scale networks
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <>
      <Navbar />
      {/* {drawIntro()} */}
      {/* {drawMatrix()} */}
      {drawTable()}
    </>
  )
}
