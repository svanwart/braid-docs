'use client'
import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { Logo, Logomark } from '@/components/Logo'
import { ThemeSelector } from '@/components/ThemeSelector'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import './page.css'
import Module from '@/components/Module'
import Neurons from '@/components/modules/brain/Neurons'
import GenericDetails from '@/components/modules/GenericDetails'
import SynapticPlasticity from '@/components/modules/brain/SynapticPlasticity'

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

          <div className="-mr-2 flex items-center gap-2 sm:gap-x-8">
            <ThemeSelector className="relative z-10 my-5 ml-2" />
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default function MatrixPage() {
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

  function getHeader(title, idx) {
    return (
      <div className="flex items-start justify-between">
        <h2 className="h2 mx-auto w-full max-w-5xl">{title}</h2>
        <button className="arrow-button" onClick={() => grow(idx)}>
          {tableState.open ? (
            <ChevronLeftIcon className="h-4 w-4" strokeWidth={3} />
          ) : (
            <ChevronRightIcon className="h-4 w-4" strokeWidth={3} />
          )}
        </button>
      </div>
    )
  }

  function drawTable() {
    return (
      <table
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
            <th className="cell1-header-primary">
              {getHeader('The Brain', 1)}
            </th>
            <th className="cell2-header-primary">
              {getHeader('Von Neumann', 2)}
            </th>
            <th className="cell3-header-primary">
              {getHeader('Neuromorphic', 3)}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="cell1-header">
              <h2 className="h2-small">1. Building Blocks</h2>
            </td>
            <td className="cell2-header">
              <h2
                className={`h2-small ${tableState.open ? 'opacity-100' : 'opacity-0'}`}
              >
                1. Building Blocks
              </h2>
            </td>
            <td className="cell3-header">
              <h2
                className={`h2-small ${tableState.open ? 'opacity-100' : 'opacity-0'}`}
              >
                1. Building Blocks
              </h2>
            </td>
          </tr>
          <tr>
            <td className="cell1">
              {
                <Module
                  title="Neurons"
                  isOpen={tableState.open}
                  imgSrc="/braid-docs/images/brain/neuron-anatomy.png"
                  description="Neurons are cells in the nervous system that communicate with one another by sending and receiving electrical pulses (called spikes). These signals help people think, feel, and react to the world around them."
                  detailModule={<Neurons />}
                />
              }
            </td>
            <td className="cell2">
              <Module
                title="Transistors"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Arithmetic Logic Unit (ALU), control unit, registers, memory"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell3">
              <Module
                title="Memristors and Memtransistors"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Memristors, memtransistors, and other devices that mimic neurons and synapses in hardware."
                detailModule={<GenericDetails />}
              />
            </td>
          </tr>
          <tr className="row-border">
            <td className="cell1-header">
              <h2 className="h2-small">2. Connectivity</h2>
            </td>
            <td className="cell2-header">
              {tableState.open && <h2 className="h2-small">2. Connectivity</h2>}
            </td>
            <td className="cell3-header">
              {tableState.open && <h2 className="h2-small">2. Connectivity</h2>}
            </td>
          </tr>
          <tr>
            <td className="cell1">
              {
                <Module
                  title="Synapses"
                  isOpen={tableState.open}
                  imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  description="Synapses form sparse, dynamic, directed networks"
                  detailModule={<GenericDetails />}
                />
              }
            </td>
            <td className="cell2">
              <Module
                title="Data Buses"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Data buses connect CPU, memory, and I/O components"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell3">
              <Module
                title="Crossbar Arrays"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Event-based spiking connections with configurable topology"
                detailModule={<GenericDetails />}
              />
            </td>
          </tr>
          <tr className="row-border">
            <td className="cell1-header">
              <h2 className="h2-small">3. Memory</h2>
            </td>
            <td className="cell2-header">
              {tableState.open && <h2 className="h2-small">3. Memory</h2>}
            </td>
            <td className="cell3-header">
              {tableState.open && <h2 className="h2-small">3. Memory</h2>}
            </td>
          </tr>
          <tr>
            <td className="cell1">
              <Module
                title="Distributed Memory"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Distributed across the network; stored in synaptic weights"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell2">
              <Module
                title="Centralized Memory"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Centralized RAM and storage, separate from processing"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell3">
              <Module
                title="Distributed Memory"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Co-located with processing units; memory often embedded in
              synapses"
                detailModule={<GenericDetails />}
              />
            </td>
          </tr>
          <tr className="row-border">
            <td className="cell1-header">
              <h2 className="h2-small">4. Computation &amp; Coordination</h2>
            </td>
            <td className="cell2-header">
              {tableState.open && (
                <h2 className="h2-small">4. Computation &amp; Coordination</h2>
              )}
            </td>
            <td className="cell3-header">
              {tableState.open && (
                <h2 className="h2-small">4. Computation &amp; Coordination</h2>
              )}
            </td>
          </tr>
          <tr>
            <td className="cell1">
              <Module
                title="Recurrent Neural Networks"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Parallel, asynchronous, locally driven by neural activity"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell2">
              <Module
                title="CPU Architecture"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Centralized, synchronous, sequential instruction processing
              (clocked)"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell3">
              <Module
                title="Event-Driven Processing"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Asynchronous, event-driven, massively parallel"
                detailModule={<GenericDetails />}
              />
            </td>
          </tr>
          <tr className="row-border">
            <td className="cell1-header">
              <h2 className="h2-small">5. Learning</h2>
            </td>
            <td className="cell2-header">
              {tableState.open && <h2 className="h2-small">5. Learning</h2>}
            </td>
            <td className="cell3-header">
              {tableState.open && <h2 className="h2-small">5. Learning</h2>}
            </td>
          </tr>
          <tr>
            <td className="cell1">
              <Module
                title="Synaptic Plasticity"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="The number of connections and the strength of the connections between neurons allows the brain to learn, remember, and adapt over time."
                detailModule={<SynapticPlasticity />}
              ></Module>
            </td>
            <td className="cell2">
              <Module
                title="Software Learning"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="External: Learning occurs via software/programming"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell3">
              <Module
                title="On-Chip Learning"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="On-chip learning (e.g., Hebbian, STDP); weights adapt in response
              to spikes"
                detailModule={<GenericDetails />}
              />
            </td>
          </tr>
          <tr className="row-border">
            <td className="cell1-header">
              <h2 className="h2-small">6. Efficiency &amp; Scale</h2>
            </td>
            <td className="cell2-header">
              {tableState.open && (
                <h2 className="h2-small">6. Efficiency &amp; Scale</h2>
              )}
            </td>
            <td className="cell3-header">
              {tableState.open && (
                <h2 className="h2-small">6. Efficiency &amp; Scale</h2>
              )}
            </td>
          </tr>
          <tr>
            <td className="cell1">
              <Module
                title="Biological Efficiency"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Ultra-low power (~20W), scales to ~86B neurons"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell2">
              <Module
                title="Traditional Computing"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Power-hungry, limited by memory bandwidth and Moore's Law"
                detailModule={<GenericDetails />}
              />
            </td>
            <td className="cell3">
              <Module
                title="Edge Computing"
                isOpen={tableState.open}
                imgSrc="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                description="Ultra-low power (e.g., &lt;1W), well-suited for edge computing and
              large-scale networks"
                detailModule={<GenericDetails />}
              />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <>
      <Navbar />
      {drawTable()}
    </>
  )
}
