"use client"

import { createContext, useContext, useState } from 'react'
import en from '@/translations/en'
import es from '@/translations/es'

type TranslationValue = string | string[] | { [key: string]: TranslationValue }

interface Translations extends Record<string, TranslationValue> {
  meta: {
    title: string
    description: string
  }
  common: {
    soundsAwesome: string
    notOnYourLife: string
    easterEggs: string[]
    startOver: string
  }
  home: {
    wantToHelp: string
    areaOfInterest: string
    footer: {
      generatedBy: string
      inspiredBy: string
    }
  }
  questions: {
    segue1: string
    segue2: string
    [key: string]: TranslationValue
  }
}

const translations: { [key: string]: Translations } = { en, es }
type Language = keyof typeof translations

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | string[]
}>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string | string[] => {
    const keys = key.split('.')
    let value: TranslationValue = translations[language]
    
    for (const k of keys) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        value = value[k as keyof typeof value]
      } else {
        return typeof value === 'string' ? value : key
      }
    }
    
    if (Array.isArray(value) || typeof value === 'string') {
      return value
    }
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext) 