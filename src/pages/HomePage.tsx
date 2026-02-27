import { m, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HowItWorks } from '../components/HowItWorks'
import { type LeadFormValues, LeadForm } from '../components/LeadForm'
import { generateGiftCode } from '../lib/generateCode'
import { saveLead } from '../lib/leadStorage'

export function HomePage() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  async function handleSubmit(data: LeadFormValues) {
    const code = generateGiftCode()

    await saveLead({
      id: code,
      fullName: data.fullName,
      whatsapp: data.whatsapp,
      email: data.email,
      createdAt: new Date().toISOString(),
    })

    navigate('/sucesso', { state: { code } })
  }

  return (
    <div className="min-h-screen font-[Plus_Jakarta_Sans,sans-serif]">
      <section
        id="inicio"
        className="relative isolate flex min-h-[420px] h-[50vh] items-center justify-center overflow-hidden px-6 text-white"
      >
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src="/assets/Hero animada.mp4"
          poster="/assets/Hero estatica.png"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 -z-10 bg-black/50" />
        <div className="absolute top-6 flex w-full justify-center">
          <img
            src="/assets/Logo-Fundo transparente branco.png"
            alt="Bonafide Seguros"
            className="h-16 w-auto object-contain sm:h-20"
          />
        </div>

        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="glass-card mx-auto max-w-2xl border-white/30 bg-white/12 px-6 py-8">
          <m.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            className="text-balance text-4xl font-semibold sm:text-6xl"
          >
            Escaneie e ganhe sua squeeze
          </m.h1>
          <m.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mx-auto mt-4 max-w-xl text-lg text-white/85"
          >
            Bonafide Seguros, sua saude em 1o lugar.
          </m.p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white px-6 py-20 text-slate-900">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-3 text-center text-3xl font-semibold">Como participar</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            Processo rapido para retirar sua squeeze no evento.
          </p>
          <HowItWorks variant="light" />
        </div>
      </section>

      <section
        id="cadastro"
        className="bg-[linear-gradient(140deg,#0284c7_0%,#0369a1_45%,#0c4a6e_100%)] px-6 py-20 text-white"
      >
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="mb-5 text-center text-3xl font-semibold">Faca seu cadastro</h2>
          <LeadForm onSubmit={handleSubmit} />
          <p className="mt-10 text-center text-xs leading-relaxed text-white/70">
            BONAFIDE - CORRETORA DE SEGUROS LTDA | CNPJ 28.914.268/0001-58 | Rua Barao de Teffe, 633,
            Jundiai - SP.
          </p>
        </div>
      </section>
    </div>
  )
}
