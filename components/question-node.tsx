"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface Node {
  id: string
  titleKey: string
  subtitleKey?: string
  options?: Node[]
  link?: string
}

export function QuestionNode({ node }: { node: Node }) {
  const { t } = useLanguage()
  const [currentNode, setCurrentNode] = useState(node)
  const [optionIndex, setOptionIndex] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [isShattered, setIsShattered] = useState(false)
  const [easterEggMessage, setEasterEggMessage] = useState("")
  const clickTimestampsRef = useRef<number[]>([])
  const currentOption = currentNode.options?.[optionIndex]

  const handleNoClick = () => {
    const now = Date.now()
    const recentClicks = clickTimestampsRef.current.filter(time => now - time < 2000)
    clickTimestampsRef.current = [...recentClicks, now]

    if (clickTimestampsRef.current.length >= 5 && !showEasterEgg) {
      setIsShattered(true)
      const messages = t('common.easterEggs') as string[]
      const randomIndex = Math.floor(Math.random() * messages.length)
      setEasterEggMessage(messages[randomIndex])
      setTimeout(() => {
        setShowEasterEgg(true)
      }, 500)
    }

    if (currentNode.options && optionIndex + 1 < currentNode.options.length) {
      setOptionIndex(optionIndex + 1)
    } else {
      setCurrentNode(node)
      setOptionIndex(0)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showEasterEgg ? (
        <motion.div
          key="easter-egg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-8 md:space-y-12"
        >
          <div className="text-center space-y-8">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-5xl md:text-7xl font-bold text-white font-red-hat tracking-tight">
                {easterEggMessage}
              </h2>
            </div>
            <div className="flex justify-center">
              <button
                className="flex items-center justify-center gap-2 py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium bg-[#111827] hover:bg-[#1f2937] text-white rounded-full transition-colors shadow-lg font-red-hat"
                onClick={() => window.location.reload()}
              >
                {t('common.startOver')}
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={currentNode.id + optionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={isShattered ? {
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            filter: ["brightness(1)", "brightness(1.5)", "brightness(0)"],
            transition: { duration: 0.5 }
          } : {
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            if (isShattered) {
              setShowEasterEgg(true)
            }
          }}
          className="flex flex-col items-center space-y-8 md:space-y-12"
        >
          {currentOption && (
            <>
              <div className="text-center space-y-2 md:space-y-3">
                <h2 className="text-5xl md:text-7xl font-bold text-white font-red-hat tracking-tight">
                  {t(currentOption.titleKey)}
                </h2>
                {currentOption.subtitleKey && (
                  <p className="text-xl md:text-2xl text-white/70 font-normal tracking-wide">
                    {t(currentOption.subtitleKey)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3 md:gap-4 w-full max-w-md px-4 md:px-0">
                <button
                  className="flex items-center justify-center gap-2 py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium bg-[#111827] hover:bg-[#1f2937] text-white rounded-full transition-colors shadow-lg font-red-hat"
                  onClick={() => {
                    if (currentOption.link) {
                      window.open(currentOption.link, '_blank')
                    } else if (currentOption.options) {
                      setCurrentNode(currentOption)
                      setOptionIndex(0)
                    }
                  }}
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6" />
                  {t('common.soundsAwesome')}
                </button>
                <button
                  className="flex items-center justify-center gap-2 py-3 md:py-4 px-6 md:px-8 text-lg md:text-xl font-medium bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full transition-colors shadow-lg font-red-hat"
                  onClick={handleNoClick}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                  {t('common.notOnYourLife')}
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 