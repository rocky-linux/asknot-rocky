"use client"

import { QuestionNode } from "@/components/question-node"
import questionsData from "@/questions/default.yml"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#10B981] to-[#0a8f63] p-4 text-white">
      <div className="w-full max-w-4xl space-y-8 md:space-y-12 p-4 md:p-8 mt-8 md:mt-0">
        <div className="flex flex-col items-center space-y-8 md:space-y-12">
          <Image 
            src="/images/logo-white.svg" 
            alt="Rocky Linux Logo" 
            width={180} 
            height={48}
            priority
            className="h-8 md:h-12 w-auto"
          />
          <div className="text-center space-y-2 md:space-y-4">
            <h2 className="text-xl md:text-2xl text-white/80 font-normal font-red-hat tracking-wide">
              {t('home.wantToHelp')}
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-red-hat tracking-tight">
              {t('home.areaOfInterest')}
            </h1>
          </div>
        </div>
        <QuestionNode node={questionsData.tree.options[0]} />
      </div>
      <footer className="w-full p-4 flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between text-sm text-center md:text-left">
        <div className="text-white/60">
          {t('home.footer.generatedBy')} <a href="https://github.com/rocky-linux/asknot-rocky" className="underline hover:text-white">asknot-rocky</a>.{' '}
          {t('home.footer.inspiredBy')} <a href="https://github.com/fedora-infra/asknot-ng" className="underline hover:text-white">asknot-ng</a>.
        </div>
        <LanguageSwitcher />
      </footer>
    </main>
  )
}
