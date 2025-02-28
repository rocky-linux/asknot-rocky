/**
 * QuestionNode Component
 *
 * A dynamic component that implements the decision tree navigation for the
 * "Ask Not Rocky" flow. It presents users with a series of questions and options,
 * allowing them to navigate through different paths to find their area of interest
 * in the Rocky Linux project.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import { Button } from './Button';

import { useLanguage } from '@/i18n/LanguageContext';
import { questionTree } from '@/questions/questions';

/**
 * Represents a node in the question tree
 */
interface Node {
  id: string;
  options?: Node[];
  link?: string | null;
}

/**
 * Translation type for question options
 */
interface Translation {
  title: string;
  subtitle: string;
}

/**
 * Type for question translations
 */
interface QuestionTranslations {
  [key: string]: {
    title: string;
    subtitle: string;
    options: {
      [key: string]: Translation;
    };
  };
}

/**
 * Recursively finds a node in the question tree by its ID
 * @param node - The current node to search from
 * @param id - The ID of the node to find
 * @returns Object containing the found node, its parent, and its index in the parent's options
 */
const findNodeById = (
  node: Node,
  id: string
): { currentNode: Node; parentNode: Node | null; optionIndex: number } | null => {
  if (node.options) {
    const directOptionIndex = node.options.findIndex(option => option.id === id);
    if (directOptionIndex !== -1) {
      const targetNode = node.options[directOptionIndex];
      if (targetNode.options) {
        return {
          currentNode: targetNode,
          parentNode: node,
          optionIndex: 0,
        };
      }
      return {
        currentNode: node,
        parentNode: null,
        optionIndex: directOptionIndex,
      };
    }

    for (const option of node.options) {
      if (option.options) {
        const found = findNodeById(option, id);
        if (found) return found;
      }
    }
  }

  return null;
};

/**
 * Gets a random item from an array
 * @param array - The array to select from
 * @returns A random item from the array
 */
const getRandomItem = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export function QuestionNode() {
  const { translations } = useLanguage();
  const [currentNode, setCurrentNode] = useState<Node>(questionTree);
  const [optionIndex, setOptionIndex] = useState(0);
  const [positiveButtonText, setPositiveButtonText] = useState(() =>
    getRandomItem(translations.home.responses.positive)
  );
  const [negativeButtonText, setNegativeButtonText] = useState(() =>
    getRandomItem(translations.home.responses.negative)
  );
  const [showStartOver, setShowStartOver] = useState(false);
  const [parentNode, setParentNode] = useState<Node | null>(null);
  const [parentOptionIndex, setParentOptionIndex] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hash = window.location.hash.slice(1);
    if (hash) {
      const found = findNodeById(questionTree, hash);
      if (found) {
        setCurrentNode(found.currentNode);
        setParentNode(found.parentNode);
        setOptionIndex(found.optionIndex);
      }
    }
  }, []);

  // Update button text when translations change
  useEffect(() => {
    setPositiveButtonText(getRandomItem(translations.home.responses.positive));
    setNegativeButtonText(getRandomItem(translations.home.responses.negative));
  }, [translations]);

  const currentOption = currentNode.options?.[optionIndex];
  const isLastOption = currentNode.options && optionIndex + 1 >= currentNode.options.length;
  const isMainLevel = currentNode === questionTree;

  if (!isClient) return null;
  if (!currentOption && !showStartOver) return null;

  const questions = translations.questions as QuestionTranslations;

  const getCurrentOptionTranslation = (): Translation | null => {
    if (!currentOption) return null;

    // If we're at the root level, get the translation for the current option
    if (isMainLevel) {
      return questions[currentOption.id]
        ? {
            title: questions[currentOption.id].title,
            subtitle: questions[currentOption.id].subtitle,
          }
        : null;
    }

    // For nested options, get the translation from the parent's options
    const translation = questions[currentNode.id]?.options?.[currentOption.id];
    return translation
      ? {
          title: translation.title,
          subtitle: translation.subtitle,
        }
      : null;
  };

  const currentTranslation = getCurrentOptionTranslation();
  if (!currentTranslation && !showStartOver) return null;

  const updateButtonTexts = () => {
    setPositiveButtonText(getRandomItem(translations.home.responses.positive));
    setNegativeButtonText(getRandomItem(translations.home.responses.negative));
  };

  const renderContent = () => {
    if (showStartOver) {
      return (
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
              {translations.home.endFlow.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-normal tracking-wide">
              {translations.home.endFlow.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 w-full max-w-md mx-auto">
            <Button
              onClick={() => {
                setCurrentNode(questionTree);
                setOptionIndex(0);
                setShowStartOver(false);
                updateButtonTexts();
              }}
            >
              {translations.home.endFlow.startOver}
            </Button>
            <p className="text-sm md:text-base text-white/60 italic mt-4">
              {translations.home.endFlow.notFound}{' '}
              <a
                href="https://chat.rockylinux.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 underline underline-offset-2"
              >
                {translations.home.endFlow.mattermost}
              </a>{' '}
              {translations.home.endFlow.help}
            </p>
          </div>
        </motion.div>
      );
    }

    if (!currentTranslation) return null;

    return (
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
            {currentTranslation.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-normal tracking-wide">
            {currentTranslation.subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-md mx-auto">
          <Button
            onClick={() => {
              if (currentOption?.link) {
                window.open(currentOption.link, '_blank');
              } else if (currentOption?.options) {
                setParentNode(currentNode);
                setParentOptionIndex(optionIndex);
                setCurrentNode(currentOption);
                setOptionIndex(0);
                updateButtonTexts();
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
                  setShowStartOver(true);
                } else if (parentNode) {
                  setCurrentNode(parentNode);
                  setOptionIndex(parentOptionIndex + 1);
                  setParentNode(null);
                  setParentOptionIndex(0);
                  updateButtonTexts();
                }
              } else {
                setOptionIndex(optionIndex + 1);
                updateButtonTexts();
              }
            }}
          >
            {negativeButtonText}
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
}
