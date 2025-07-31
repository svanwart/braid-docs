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
      className="sticky left-0 top-0 z-20 w-full dark:bg-slate-900"
    >
      <div className="flex w-full flex-none flex-wrap items-center justify-between px-4 transition duration-500 sm:px-6 lg:px-8 dark:bg-transparent dark:shadow-none">
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
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
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
  const [layout, setLayout] = useState({})
  const [open, setOpen] = useState(false)

  function grow(idx) {
    if (idx === 1) {
      setLayout({ gc1: !open })
    } else if (idx === 2) {
      setLayout({ gc2: !open })
    } else if (idx === 3) {
      setLayout({ gc3: !open })
    } else {
      setLayout({})
    }
    setOpen(!open)
  }
  function getLayout() {
    return clsx(
      'mx-auto -mt-[100px] grid w-full grid-cols-1 md:grid-cols-3',
      layout,
    )
  }
  return (
    <div className="flex w-full flex-col">
      <Navbar />

      {/* Section 1: Intro */}
      {/* <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 px-6 py-20 lg:px-8 dark:bg-slate-900 dark:bg-none">
        <div className="mx-auto max-w-3xl">
          <h2 className="mt-2 text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
            Overview of biological and artificial intelligence
          </h2>
          <p className="mt-8 text-pretty text-center text-lg text-gray-800 sm:text-xl/8 dark:text-gray-300">
            A comparison of some of the ways that the human brain, "traditional
            computers", and neuromorphic computers process are similar and
            different.
          </p>
        </div>
      </div> */}

      <div className={getLayout()} id="matrix">
        <div className="col1 relative sticky -top-[130px] border-b-2 border-black bg-teal-50 px-8 pb-12 pt-48">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            The Brain
          </h2>
          <button
            onClick={function () {
              grow(1)
            }}
            className="absolute bottom-4 right-4 border-2 border-black px-4 py-2 font-bold text-gray-900 dark:text-white"
          >
            More
          </button>
        </div>
        <div className="col2 relative sticky -top-[130px] border-b-2 border-black bg-indigo-50 px-8 pb-12 pt-48">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Traditional Computing
          </h2>
          <button
            onClick={function () {
              grow(2)
            }}
            className="absolute bottom-4 right-4 border-2 border-black px-4 py-2 font-bold text-gray-900 dark:text-white"
          >
            More
          </button>
        </div>
        <div className="col3 relative sticky -top-[130px] border-b-2 border-black bg-pink-50 px-8 pb-12 pt-48">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Neuromorphic Computing
          </h2>
          <button
            onClick={function () {
              grow(3)
            }}
            className="absolute bottom-4 right-4 border-2 border-black px-4 py-2 font-bold text-gray-900 dark:text-white"
          >
            More
          </button>
        </div>

        {/* Building Blocks */}
        <h3 className="col1 bg-teal-50 px-8 pb-8 pt-12 text-3xl font-extrabold">
          Building Blocks
        </h3>
        <span className="col2 bg-indigo-50 px-8 py-2"></span>
        <span className="col3 bg-pink-50 px-8 py-2"></span>

        <div className="col1 bg-teal-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Neurons
          </h3>
          <p>
            Neurons are cells in the nervous system that communicate with one
            another by sending and receiving electrical pulses (called spikes).
            These signals help people think, feel, and react to the world around
            them. There are roughly 100 billion neurons and 100 trillion
            synapses in the human body.
          </p>
        </div>
        <div className="col2 bg-indigo-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Transistors
          </h3>
          <p>
            Transistors are the basic building blocks of most computers. They
            work by controlling the flow of electric current, acting like tiny
            switches that can turn on or off to represent binary information (0s
            and 1s).
          </p>
        </div>
        <div className="col3 bg-pink-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Memristors & Memtransistors
          </h3>
          <p>
            Neuromorphic chips use different fundamental building blocks.
            Instead of separating logic and memory, innovations like the
            “memristor” and the “synaptic transistor” co-locate memory and
            processing in one place, mimicking how actual neurons work.
          </p>
        </div>

        {/* Connections */}
        <h3 className="col1 border-t-2 border-black bg-teal-50 px-8 pb-8 pt-12 text-3xl font-extrabold">
          Connections
        </h3>
        <span className="col2 border-t-2 border-black bg-indigo-50 px-8 py-2"></span>
        <span className="col3 border-t-2 border-black bg-pink-50 px-8 py-2"></span>

        <div className="col1 bg-teal-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Neural Circuits
          </h3>
          <p>
            The human brain is a complex network of neurons that communicate
            with one another through synapses. These synapses are the
            connections between neurons that allow them to communicate with one
            another.
          </p>
        </div>
        <div className="col2 bg-indigo-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Circuits and microchips
          </h3>
          <p>
            There are billions of transistors in a single computer chip.
            Transistors can be assembled together to form “logic gates,” which
            are in turn used to build larger circuits that can perform
            calculations and make decisions.
          </p>
        </div>
        <div className="col3 bg-pink-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Neuromorphic circuits
          </h3>
          <p>TBD.</p>
        </div>

        {/* Coordination */}
        <h3 className="col1 border-t-2 border-black bg-teal-50 px-8 pb-8 pt-12 text-3xl font-extrabold">
          Coordination
        </h3>
        <span className="col2 border-t-2 border-black bg-indigo-50 px-8 py-2"></span>
        <span className="col3 border-t-2 border-black bg-pink-50 px-8 py-2"></span>

        <div className="col1 bg-teal-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            The Nervous System
          </h3>
          <p>
            The brain is like a massively parallel, self-rewiring CPU that never
            turns off and can be powered by a sandwich! The brain doesn&apos;t
            have a single &quot;central processor.&quot; Rather, many regions
            work together to complete tasks and respond to the environment.
          </p>
        </div>
        <div className="col2 bg-indigo-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            The Von Neumann Architecture
          </h3>
          <p>
            Most computers follow the Von Neumann architecture (designed in the
            1940s). The CPU fetches an instruction, decodes it, executes it, and
            repeats (very quickly), based on the computer&apos;s clock speed.
            Most modern CPUs operate in the gigahertz range. 2.4 GHz is
            equivalent to 2.4 billion cycles (calculations) per second.
          </p>
        </div>
        <div className="col3 bg-pink-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Neuromorphic Chips
          </h3>
          <p>TBD.</p>
        </div>

        {/* Learning */}
        <h3 className="col1 border-t-2 border-black bg-teal-50 px-8 pb-8 pt-12 text-3xl font-extrabold">
          Learning
        </h3>
        <span className="col2 border-t-2 border-black bg-indigo-50 px-8 py-2"></span>
        <span className="col3 border-t-2 border-black bg-pink-50 px-8 py-2"></span>

        <div className="col1 bg-teal-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Synaptic Plasticity
          </h3>
          <p>
            The number of connections and the strength of the connections
            between neurons allows the brain to learn, remember, and adapt over
            time. When two neurons repeatedly activate together, their synapse
            becomes stronger. If neurons rarely fire together, the connection
            weakens over time. This process of strengthening and weakening
            synapses is called synaptic plasticity.
          </p>
        </div>
        <div className="col2 bg-indigo-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Neural Networks
          </h3>
          <p>
            A neural network is one type of machine learning model that is
            inspired by the brain. Neural networks are trained to perform
            classification tasks, often using large quantities of labeled data.
            “Artificial neurons” (perceptrons) are organized into layers and
            connected via weighted edges. Over time, each of the connection
            strengths between the neurons (weights) are adjusted so that labeled
            data are classified as accurately as possible - through a process
            known as backpropagation. Once the network is &quot;trained,&quot;
            it can classify new examples it has never seen before.
          </p>
        </div>
        <div className="col3 bg-pink-50 px-8 py-12">
          <h3 className="text-xl font-semibold text-blue-950 dark:text-slate-100">
            Spiking Neural Networks
          </h3>
          <p>
            Neuromorphic systems enable a new class of algorithms inspired by
            the brain&apos;s efficiency and adaptability. Spiking Neural
            Networks (SNNs) use discrete spikes instead of continuous
            activations, requiring new approaches to training and architecture.
            Small Data Learning: Learns from limited data, ideal for low-power
            and edge applications.
          </p>
        </div>
      </div>
    </div>
  )
}
