import { m, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HowItWorks } from '../components/HowItWorks'
import { type LeadFormValues, LeadForm } from '../components/LeadForm'
import { generateGiftCode } from '../lib/generateCode'
import { saveLead } from '../lib/leadStorage'

const promotionRules = [
  'Promoção válida exclusivamente durante o evento e enquanto durarem os estoques das squeezes.',
  'Cada participante poderá realizar apenas 1 cadastro válido e retirar 1 brinde mediante apresentação do código gerado.',
  'O código é pessoal, intransferível e deve ser apresentado na tenda da Bonafide Seguros para validação.',
  'Cadastros com informações incompletas, incorretas ou duplicadas poderão ser desconsiderados pela organização.',
  'A retirada do brinde está condicionada à confirmação do cadastro e à disponibilidade no local da ação.',
  'Ao participar, o usuário declara estar ciente de que os dados informados poderão ser utilizados para contato comercial da Bonafide Seguros.',
]

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
        className="relative isolate flex min-h-[620px] h-[75vh] items-center justify-center overflow-hidden px-6 text-white"
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
              Sua saúde em primeiro lugar.
            </m.p>
            <a
              href="#cadastro"
              className="btn-primary mx-auto mt-6 inline-flex w-auto items-center justify-center px-8"
            >
              Ir para cadastro
            </a>
          </div>
        </div>

        <a
          href="#como-funciona"
          className="scroll-indicator absolute bottom-5 left-1/2 -translate-x-1/2"
          aria-label="Rolar para a próxima seção"
        >
          <span className="scroll-indicator__mouse" />
          <span className="scroll-indicator__text">Role para baixo</span>
        </a>
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
          <img
            src="/assets/Logo-Fundo transparente branco.png"
            alt="Bonafide Seguros"
            className="mx-auto mt-10 h-16 w-auto object-contain opacity-95 sm:h-20"
          />
          <p className="mt-10 text-center text-xs leading-relaxed text-white/70">
            BONAFIDE - CORRETORA DE SEGUROS LTDA | CNPJ 28.914.268/0001-58 | Rua Barao de Teffe, 633,
            Jundiai - SP.
          </p>
        </div>
      </section>

      <section id="regras" className="bg-[#061a33] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Regulamento</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Regras da promoção</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
              Condições gerais para participação na ação &quot;Escaneie e Ganhe&quot; da Bonafide Seguros.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {promotionRules.map((rule, index) => (
              <div
                key={rule}
                className="rounded-3xl border border-white/12 bg-white/6 p-5 shadow-[0_16px_40px_rgba(8,145,178,0.08)] backdrop-blur-md"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Regra {index + 1}
                </p>
                <p className="text-sm leading-7 text-white/82">{rule}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-white/55">
            Em caso de divergência operacional, prevalecem os critérios de validação aplicados pela equipe da
            Bonafide Seguros no local do evento.
          </p>
        </div>
      </section>
    </div>
  )
}
