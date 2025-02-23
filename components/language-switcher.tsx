"use client"

import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 justify-center">
      <Globe className="w-4 h-4 text-white/60" aria-hidden="true" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
        className="bg-transparent text-white/60 text-sm border-none hover:text-white focus:text-white transition-colors cursor-pointer focus:outline-none"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  )
} 