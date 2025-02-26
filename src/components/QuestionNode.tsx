"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./Button"

const POSITIVE_RESPONSES = [
  "Sounds awesome!",
  "Yes, please!",
  "Let's do it!",
  "Count me in!",
  "Absolutely!",
  "That's perfect!",
  "I'm in!",
  "Show me more!",
]

const NEGATIVE_RESPONSES = [
  "Not on your life!",
  "No thanks!",
  "Pass!",
  "Next option!",
  "Not for me!",
  "Skip this!",
  "Nope!",
  "Let's try something else!",
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

const findNodeById = (node: Node, id: string): { currentNode: Node, parentNode: Node | null, optionIndex: number } | null => {
  if (node.options) {
    const directOptionIndex = node.options.findIndex(option => option.id === id)
    if (directOptionIndex !== -1) {
      const targetNode = node.options[directOptionIndex]
      if (targetNode.options) {
        return {
          currentNode: targetNode,
          parentNode: node,
          optionIndex: 0
        }
      }
      return {
        currentNode: node,
        parentNode: null,
        optionIndex: directOptionIndex
      }
    }

    for (const option of node.options) {
      if (option.options) {
        const found = findNodeById(option, id)
        if (found) return found
      }
    }
  }

  return null
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

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const found = findNodeById(node, hash)
      if (found) {
        setCurrentNode(found.currentNode)
        setParentNode(found.parentNode)
        setOptionIndex(found.optionIndex)
      }
    }
  }, [node])

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
              <Button
                onClick={() => {
                  setCurrentNode(node)
                  setOptionIndex(0)
                  setShowStartOver(false)
                  setPositiveButtonText(getRandomItem(POSITIVE_RESPONSES))
                  setNegativeButtonText(getRandomItem(NEGATIVE_RESPONSES))
                }}
              >
                Start Over
              </Button>
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
              <Button
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
              </Button>
              <Button
                variant="negative"
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
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 