import { m, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type AppShellProps = PropsWithChildren<{
  showVideo?: boolean
}>

export function AppShell({ children, showVideo = false }: AppShellProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03152f] text-white">
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/Hero animada.mp4"
          poster="/assets/Hero estatica.png"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#0a5db3_0%,#03152f_50%,#020b19_100%)]" />
      )}

      <div className="absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-8 pt-6 sm:px-10">
        <m.header
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="mb-8 flex justify-center"
        >
          <img
            src="/assets/Logo-Fundo transparente branco.png"
            alt="Bonafide Seguros"
            className="h-10 w-auto object-contain"
          />
        </m.header>

        <main className="flex-1">{children}</main>

        <footer className="mt-10 text-center text-xs leading-relaxed text-white/60">
          <img
            src="/assets/Logo-Fundo transparente branco.png"
            alt="Bonafide Seguros"
            className="mx-auto mb-3 h-12 w-auto object-contain opacity-95 sm:h-14"
          />
          BONAFIDE - CORRETORA DE SEGUROS LTDA | CNPJ 28.914.268/0001-58 | Rua Barao de Teffe, 633,
          Jundiai - SP.
        </footer>
      </div>
    </div>
  )
}
