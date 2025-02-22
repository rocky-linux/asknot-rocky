"use client"

import { useState } from "react"

interface Node {
  id: string
  title: string
  options?: Node[]
  link?: string
}

export function QuestionNode({ node }: { node: Node }) {
  const [currentNode, setCurrentNode] = useState(node)
  const [optionIndex, setOptionIndex] = useState(0)
  const currentOption = currentNode.options?.[optionIndex]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">
        {currentNode.title}
      </h1>
      {currentOption && (
        <div className="space-y-4">
          <button 
            className="w-full py-6 text-2xl text-white bg-black rounded-xl hover:bg-black/90"
            onClick={() => {
              if (currentOption.link) {
                window.open(currentOption.link, '_blank')
              } else {
                setCurrentNode(currentOption)
                setOptionIndex(0)
              }
            }}
          >
            {currentOption.title}
          </button>
          <button 
            className="w-full py-6 text-2xl text-white bg-red-600 rounded-xl hover:bg-red-700"
            onClick={() => {
              if (currentNode.options && optionIndex + 1 < currentNode.options.length) {
                setOptionIndex(optionIndex + 1)
              } else {
                window.location.reload()
              }
            }}
          >
            Not on your life!
          </button>
        </div>
      )}
    </div>
  )
} 