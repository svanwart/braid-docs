'use client'
import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { Logo, Logomark } from '@/components/Logo'
import { ThemeSelector } from '@/components/ThemeSelector'
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
    layout: { 'w-[100vw]': true },
    col1Width: 'w-[33.33vw]',
    col2Width: 'w-[33.33vw]',
    col3Width: 'w-[33.33vw]',
    open: false,
  })

  function grow(idx) {
    if (tableState.open) {
      setTableState((prev) => ({
        ...prev,
        layout: {
          'w-[100vw]': true,
          transform: true,
          '-translate-x-[0vw]': true,
          transition: true,
        },
        col1Width: 'w-[33.33vw]',
        col2Width: 'w-[33.33vw]',
        col3Width: 'w-[33.33vw]',
        open: !prev.open,
      }))
      return
    }
    if (idx === 1) {
      setTableState((prev) => ({
        ...prev,
        layout: {
          'w-[168vw]': true,
          transform: true,
          '-translate-x-[0vw]': true,
        },
        col1Width: 'w-[100vw]',
        open: !prev.open,
      }))
    } else if (idx === 2) {
      setTableState((prev) => ({
        ...prev,
        layout: {
          'w-[168vw]': true,
          transform: true,
          '-translate-x-[33.33vw]': true,
        },
        col2Width: 'w-[100vw]',
        open: !prev.open,
      }))
    } else if (idx === 3) {
      setTableState((prev) => ({
        ...prev,
        layout: {
          'w-[168vw]': true,
          transform: true,
          '-translate-x-[66.66vw]': true,
        },
        col3Width: 'w-[100vw]',
        open: !prev.open,
      }))
    } else {
      setTableState((prev) => ({
        ...prev,
        layout: {
          'w-[100vw]': true,
          transform: true,
          '-translate-x-[0vw]': true,
          transition: true,
        },
        col1Width: 'w-[33.33vw]',
        col2Width: 'w-[33.33vw]',
        col3Width: 'w-[33.33vw]',
        open: !prev.open,
      }))
    }
  }

  function getTableLayout() {
    return clsx(
      '-mt-[100px] border-collapse border border-black dark:border-gray-600',
      tableState.layout,
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
              A comparison of some of the ways that the human brain,
              "traditional computers", and neuromorphic computers process are
              similar and different.
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
        className={getTableLayout()}
        style={{
          transition: 'all 1000ms ease-in-out',
        }}
      >
        <colgroup>
          <col
            className={clsx(tableState.col1Width, {
              transition: true,
              '!duration-[1000]': true,
              'ease-in-out': true,
            })}
          />
          <col
            className={clsx(tableState.col2Width, {
              transition: true,
              '!duration-[1000]': true,
              'ease-in-out': true,
            })}
          />
          <col
            className={clsx(tableState.col3Width, {
              transition: true,
              '!duration-[1000]': true,
              'ease-in-out': true,
            })}
          />
        </colgroup>
        <thead className="sticky top-[0px] z-40 shadow-sm shadow-black/100">
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
                  className="border-2 border-black px-4 py-2 font-bold text-gray-900 dark:border-white dark:text-white"
                >
                  {open ? 'Less' : 'More'}
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
                  className="border-2 border-black px-4 py-2 font-bold text-gray-900 dark:border-white dark:text-white"
                >
                  {open ? 'Less' : 'More'}
                </button>
              </div>
            </th>
            <th className="bg-pink-50 px-10 pb-10 pt-[100px] text-left dark:border-gray-600 dark:bg-gray-950">
              <div className="flex items-start justify-between">
                <h2 className="text-4xl font-extrabold text-black dark:text-white">
                  Neuromorphic Computing
                </h2>
                <button
                  onClick={function () {
                    grow(3)
                  }}
                  className="border-2 border-black px-4 py-2 font-bold text-gray-900 dark:border-white dark:text-white"
                >
                  {open ? 'Less' : 'More'}
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">Building Blocks</h2>
            </td>
            <td className="bg-indigo-50 px-10 py-10 dark:bg-gray-800"></td>
            <td className="bg-pink-50 px-10 py-10 dark:bg-gray-950"></td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <h3 className="text-lg font-bold text-blue-950 dark:text-slate-100">
                Neurons
              </h3>
              <p>Neurons, axons, synapses...</p>
            </td>
            <td className="bg-indigo-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Arithmetic Logic Unit (ALU), control unit, registers, memory
            </td>
            <td className="min- bg-pink-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              Memristors, memtransistors, and other devices that mimic neurons
              and synapses in hardware
              <br />
              These emerging devices allow for energy-efficient, local
              computation and memory storage — enabling brain-like processing in
              silicon.
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">Connectivity</h2>
            </td>
            <td className="bg-indigo-50 px-10 py-10 dark:bg-gray-800"></td>
            <td className="bg-pink-50 px-10 py-10 dark:bg-gray-950"></td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Synapses form sparse, dynamic, directed networks
            </td>
            <td className="bg-indigo-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Data buses connect CPU, memory, and I/O components
            </td>
            <td className="bg-pink-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              Event-based spiking connections with configurable topology
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">Memory</h2>
            </td>
            <td className="bg-indigo-50 px-10 py-10 dark:bg-gray-800"></td>
            <td className="bg-pink-50 px-10 py-10 dark:bg-gray-950"></td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Distributed across the network; stored in synaptic weights
            </td>
            <td className="bg-indigo-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Centralized RAM and storage, separate from processing
            </td>
            <td className="bg-pink-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              Co-located with processing units; memory often embedded in
              synapses
            </td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 pt-16 dark:bg-gray-700">
              <h2 className="text-2xl font-extrabold">
                Computation &amp; Coordination
              </h2>
            </td>
            <td className="bg-indigo-50 px-10 py-10 dark:bg-gray-800"></td>
            <td className="bg-pink-50 px-10 py-10 dark:bg-gray-950"></td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Parallel, asynchronous, locally driven by neural activity
            </td>
            <td className="bg-indigo-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Centralized, synchronous, sequential instruction processing
              (clocked)
            </td>
            <td className="bg-pink-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              <h3 className="text-lg font-bold text-blue-950 dark:text-slate-100">
                Asynchronous, event-driven, massively parallel
              </h3>
              <p>TODO: link to SNN demo.</p>
            </td>
          </tr>
          <tr>
            <th className="bg-teal-50 px-10 pt-16 text-left text-2xl font-extrabold dark:bg-gray-700">
              Learning
            </th>
            <td className="bg-indigo-50 px-10 py-10 dark:bg-gray-800"></td>
            <td className="bg-pink-50 px-10 py-10 dark:bg-gray-950"></td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
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
            <td className="bg-indigo-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              External: Learning occurs via software/programming
            </td>
            <td className="bg-pink-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
              On-chip learning (e.g., Hebbian, STDP); weights adapt in response
              to spikes
            </td>
          </tr>
          <tr>
            <th className="bg-teal-50 px-10 pt-16 text-left text-2xl font-extrabold dark:bg-gray-700">
              Efficiency &amp; Scale
            </th>
            <td className="bg-indigo-50 px-10 py-10 dark:bg-gray-800"></td>
            <td className="bg-pink-50 px-10 py-10 dark:bg-gray-950"></td>
          </tr>
          <tr>
            <td className="bg-teal-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Ultra-low power (~20W), scales to ~86B neurons
            </td>
            <td className="bg-indigo-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              Power-hungry, limited by memory bandwidth and Moore&apos;s Law
            </td>
            <td className="bg-pink-50 px-10 py-10 text-gray-700 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300">
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
