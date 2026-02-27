import { CheckCircle, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { m, useReducedMotion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { getLastCode } from '../lib/leadStorage'

type SuccessLocationState = {
  code?: string
}

export function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  const codeFromState = (location.state as SuccessLocationState | null)?.code
  const code = codeFromState ?? getLastCode() ?? 'BONA-XXXX'

  return (
    <AppShell>
      <section className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <m.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="glass-card w-full text-center"
        >
          <m.div
            initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 220, damping: 18, delay: 0.15 }
            }
            className="mb-5 inline-flex"
          >
            <CheckCircle size={84} weight="fill" className="text-cyan-300" />
          </m.div>

          <h1 className="text-3xl font-semibold">Cadastro concluido com sucesso!</h1>

          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/65">Seu codigo unico</p>
          <p className="mt-2 text-4xl font-bold tracking-[0.22em] text-cyan-300 sm:text-5xl">{code}</p>

          <p className="mx-auto mt-6 max-w-lg text-white/80">
            Apresente este codigo agora mesmo na nossa tenda para retirar sua squeeze exclusiva.
          </p>

          <a
            href="https://www.instagram.com/bonafideseguros"
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2"
          >
            <InstagramLogo size={20} weight="duotone" />
            Siga nosso Instagram
          </a>

          <a
            href="https://api.whatsapp.com/send/?phone=11976750119&text=Ol%C3%A1%2C+Tudo+Bem%3F+gostaria+de+saber+mais+sobre%3A+&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            <WhatsappLogo size={20} weight="duotone" />
            Chamar no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-3 text-sm text-white/70 transition hover:text-white"
          >
            Voltar para o inicio
          </button>
        </m.div>
      </section>
    </AppShell>
  )
}
