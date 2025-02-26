"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const POSITIVE_RESPONSES = [
  "Sounds Awesome!",
  "Yes, Please!",
  "Let's Do It!",
  "Count Me In!",
  "Absolutely!",
  "That's Perfect!",
  "I'm In!",
  "Show Me More!",
]

const NEGATIVE_RESPONSES = [
  "Not on your life!",
  "No Thanks!",
  "Pass!",
  "Next Option!",
  "Not For Me!",
  "Skip This!",
  "Nope!",
  "Let's Try Something Else!",
]

const getRandomItem = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

interface Node {
  id: string
  titleKey: string
  subtitleKey?: string
  options?: Node[]
  link?: string
}

export function QuestionNode({ node }: { node: Node }) {
  const [currentNode, setCurrentNode] = useState(node)
  const [optionIndex, setOptionIndex] = useState(0)
  const [positiveButtonText, setPositiveButtonText] = useState(getRandomItem(POSITIVE_RESPONSES))
  const [negativeButtonText, setNegativeButtonText] = useState(getRandomItem(NEGATIVE_RESPONSES))
  const [showStartOver, setShowStartOver] = useState(false)
  const [parentNode, setParentNode] = useState<Node | null>(null)
  const [parentOptionIndex, setParentOptionIndex] = useState<number>(0)
  const currentOption = currentNode.options?.[optionIndex]
  const isLastOption = currentNode.options && optionIndex + 1 >= currentNode.options.length
  const isMainLevel = currentNode === node

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {showStartOver ? (
          <motion.div
            key="start-over"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center space-y-8"
          >
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-5xl md:text-7xl font-bold text-white font-red-hat tracking-tight">
                That's all of our teams.
              </h2>
              <p className="text-xl md:text-2xl text-white/70 font-normal tracking-wide">
                  try starting over and exploring the sub-options. we promise there's something for everyone!
              </p>
            </div>
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-md mx-auto">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium bg-[#111827] hover:bg-[#1f2937] text-white rounded-full transition-colors shadow-lg font-red-hat cursor-pointer"
                onClick={() => {
                  setCurrentNode(node)
                  setOptionIndex(0)
                  setShowStartOver(false)
                  setPositiveButtonText(getRandomItem(POSITIVE_RESPONSES))
                  setNegativeButtonText(getRandomItem(NEGATIVE_RESPONSES))
                }}
              >
                Start Over
              </motion.button>
              <p className="text-sm md:text-base text-white/60 italic mt-4">
                Not finding something that interests you? Join our{' '}
                <a 
                  href="https://chat.rockylinux.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 underline underline-offset-2"
                >
                  Mattermost instance
                </a>
                {' '}and we'll help!
              </p>
            </div>
          </motion.div>
        ) : currentOption && (
          <motion.div
            key={currentNode.id + optionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center space-y-8"
          >
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-5xl md:text-7xl font-bold text-white font-red-hat tracking-tight">
                {currentOption.titleKey}
              </h2>
              {currentOption.subtitleKey && (
                <p className="text-xl md:text-2xl text-white/70 font-normal tracking-wide">
                  {currentOption.subtitleKey}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-md mx-auto">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium bg-[#111827] hover:bg-[#1f2937] text-white rounded-full transition-colors shadow-lg font-red-hat cursor-pointer"
                onClick={() => {
                  if (currentOption.link) {
                    window.open(currentOption.link, '_blank')
                  } else if (currentOption.options) {
                    setParentNode(currentNode)
                    setParentOptionIndex(optionIndex)
                    setCurrentNode(currentOption)
                    setOptionIndex(0)
                    setPositiveButtonText(getRandomItem(POSITIVE_RESPONSES))
                    setNegativeButtonText(getRandomItem(NEGATIVE_RESPONSES))
                  }
                }}
              >
                {positiveButtonText}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full transition-colors shadow-lg font-red-hat cursor-pointer"
                onClick={() => {
                  if (isLastOption) {
                    if (isMainLevel) {
                      setShowStartOver(true)
                    } else if (parentNode) {
                      setCurrentNode(parentNode)
                      setOptionIndex(parentOptionIndex + 1)
                      setParentNode(null)
                      setParentOptionIndex(0)
                      setPositiveButtonText(getRandomItem(POSITIVE_RESPONSES))
                      setNegativeButtonText(getRandomItem(NEGATIVE_RESPONSES))
                    }
                  } else {
                    setOptionIndex(optionIndex + 1)
                    setPositiveButtonText(getRandomItem(POSITIVE_RESPONSES))
                    setNegativeButtonText(getRandomItem(NEGATIVE_RESPONSES))
                  }
                }}
              >
                {negativeButtonText}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 