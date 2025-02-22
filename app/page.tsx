import { QuestionNode } from "@/components/question-node"
import questionsData from "@/questions/default.yml"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#10B981] to-[#0a8f63] p-4 text-white">
      <div className="w-full max-w-4xl space-y-12 p-8">
        <div className="flex flex-col items-center space-y-12">
          <Image 
            src="/images/logo-white.svg" 
            alt="Rocky Linux Logo" 
            width={180} 
            height={48}
            priority
            className="h-12 w-auto"
          />
          <div className="text-center space-y-4">
            <h2 className="text-2xl text-white/80 font-normal font-red-hat tracking-wide">Want to help Rocky Linux? Tell me...</h2>
            <h1 className="text-6xl font-bold text-white font-red-hat tracking-tight">what's your area of interest?</h1>
          </div>
        </div>
        <QuestionNode node={questionsData.tree} />
      </div>
      <footer className="absolute bottom-0 w-full p-4 text-center text-white/60 text-sm">
        Generated by <a href="https://github.com/rocky-linux/asknot-rocky" className="underline hover:text-white">asknot-rocky</a>.
        Inspired by <a href="https://github.com/fedora-infra/asknot-ng" className="underline hover:text-white">asknot-ng</a>.
      </footer>
    </main>
  )
}
