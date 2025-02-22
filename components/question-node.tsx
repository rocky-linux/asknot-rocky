"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"

interface Node {
  id: string
  title: string
  options?: Node[]
  link?: string
  subtitle?: string
}

export function QuestionNode({ node }: { node: Node }) {
  const [currentNode, setCurrentNode] = useState(node)
  const [optionIndex, setOptionIndex] = useState(0)
  const currentOption = currentNode.options?.[optionIndex]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentNode.id + optionIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center space-y-12"
      >
        {currentOption && (
          <>
            <div className="text-center space-y-3">
              <h2 className="text-7xl font-bold text-white font-red-hat tracking-tight">{currentOption.title}</h2>
              <p className="text-2xl text-white/70 font-normal tracking-wide">{currentOption.subtitle}</p>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-md">
              <button
                className="flex items-center justify-center gap-2 py-4 px-8 text-xl font-medium bg-[#111827] hover:bg-[#1f2937] text-white rounded-full transition-colors shadow-lg font-red-hat"
                onClick={() => {
                  if (currentOption.link) {
                    window.open(currentOption.link, '_blank')
                  } else if (currentOption.options) {
                    setCurrentNode(currentOption)
                    setOptionIndex(0)
                  }
                }}
              >
                <Check className="w-6 h-6" />
                Sounds awesome
              </button>
              <button
                className="flex items-center justify-center gap-2 py-4 px-8 text-xl font-medium bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full transition-colors shadow-lg font-red-hat"
                onClick={() => {
                  if (currentNode.options && optionIndex + 1 < currentNode.options.length) {
                    setOptionIndex(optionIndex + 1)
                  } else {
                    setCurrentNode(node)
                    setOptionIndex(0)
                  }
                }}
              >
                <X className="w-6 h-6" />
                Not on your life
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
} 