import { Cardholder, Gift, QrCode } from '@phosphor-icons/react'
import { m, useReducedMotion } from 'framer-motion'

const steps = [
  {
    icon: Cardholder,
    title: 'Cadastre-se',
    description: 'Preencha seus dados para garantir a participacao.',
  },
  {
    icon: QrCode,
    title: 'Gere o codigo',
    description: 'Receba seu codigo unico instantaneamente.',
  },
  {
    icon: Gift,
    title: 'Retire na tenda',
    description: 'Apresente o codigo e retire sua squeeze exclusiva.',
  },
]

type HowItWorksProps = {
  variant?: 'dark' | 'light'
}

export function HowItWorks({ variant = 'dark' }: HowItWorksProps) {
  const shouldReduceMotion = useReducedMotion()
  const isLight = variant === 'light'

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.icon

        return (
          <m.article
            key={step.title}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              delay: shouldReduceMotion ? 0 : index * 0.1,
              duration: shouldReduceMotion ? 0 : 0.4,
            }}
            className={
              isLight
                ? 'step-card-light rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-500/10'
                : 'glass-card'
            }
            whileHover={
              isLight && !shouldReduceMotion
                ? { y: -8, rotateX: -4, rotateY: 3, scale: 1.015 }
                : undefined
            }
            style={isLight ? { transformStyle: 'preserve-3d' } : undefined}
          >
            <Icon
              size={36}
              weight="duotone"
              className={isLight ? 'mb-3 text-blue-600' : 'mb-3 text-cyan-300'}
            />
            <h3 className={isLight ? 'mb-1 text-lg font-semibold text-slate-900' : 'mb-1 text-lg font-semibold'}>
              {step.title}
            </h3>
            <p className={isLight ? 'text-sm text-slate-600' : 'text-sm text-white/75'}>{step.description}</p>
          </m.article>
        )
      })}
    </section>
  )
}
